import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private tokenExpirationTimer: any;
  private authUri = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  getUri(action: string) {
    return this.authUri + action + '?key=' + environment.firebaseAPIKey;
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.getUri('signUp'), {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.getUri('signInWithPassword'), {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    clearTimeout(this.tokenExpirationTimer);
  }

  autoLogin() {
    const userData: {
      email: string; id: string; _token: string; _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));


    if (!userData) {
      return;
    }

    console.log(userData, 'autologin');
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    console.log(loadedUser.token, 'autologin');
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);

    console.log(user, 'new login');
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    console.log(errorRes, 'res');
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User not found';
        break;
    }

    return throwError(errorMessage);
  }
}
