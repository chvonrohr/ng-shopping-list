

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  private apiUrl = 'https://ng-shopping-list-c2e17.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.apiUrl + 'recipes.json', recipes).subscribe(response => {
      console.log(response, 'response');
    });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl + 'recipes.json')
            .pipe(
              map(recipes => {
                return recipes.map(recipe => {
                  return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                });
              }),
              tap(recipes => {
                this.recipeService.setRecipes(recipes);
              })
            );
  }

}
