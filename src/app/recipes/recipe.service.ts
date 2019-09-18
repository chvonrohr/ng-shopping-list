import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = []; //[
  //   new Recipe(
  //     'Test Recipe',
  //     'This is a dest',
  //     'https://deliciouslyella.com/wp-content/uploads/2019/07/speedy-tomato-pasta-recipe-2.jpg',
  //     [
  //       new Ingredient('Tomate', 5), new Ingredient('Banane', 1)
  //     ]),
  //   new Recipe(
  //     'Another Recipe',
  //     'This is a dest',
  //     'https://deliciouslyella.com/wp-content/uploads/2019/07/speedy-tomato-pasta-recipe-2.jpg',
  //     [
  //       new Ingredient('Tomate', 5), new Ingredient('Banane', 1)
  //     ]),
  //   new Recipe(
  //     'Third Recipe',
  //     'This is a dest',
  //     'https://deliciouslyella.com/wp-content/uploads/2019/07/speedy-tomato-pasta-recipe-2.jpg',
  //     [
  //       new Ingredient('Tomate', 5), new Ingredient('Banane', 1)
  //     ])
  // ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice(0);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(i: number, newRecipe: Recipe) {
    this.recipes[i] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  removeRecipe(i: number) {
    this.recipes.splice(i, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
