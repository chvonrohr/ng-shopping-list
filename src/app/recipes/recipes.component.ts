import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [ RecipeService ]
})
export class RecipesComponent implements OnInit, OnDestroy {

  recipeDetail: Recipe;
  recipeSubscriptin: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeSubscriptin = this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.recipeDetail = recipe;
    });
  }

  ngOnDestroy(): void {
    this.recipeSubscriptin.unsubscribe();
  }

}
