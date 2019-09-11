import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-list';

  page = "recipes";

  onNavigate(page: string) {
    this.page = page;
  }
}
