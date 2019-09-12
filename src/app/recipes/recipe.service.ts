import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'This is a dest',
      'https://deliciouslyella.com/wp-content/uploads/2019/07/speedy-tomato-pasta-recipe-2.jpg',
      [
        new Ingredient("Tomate", 5), new Ingredient("Banane", 1)
      ]),
    new Recipe(
      'Another Recipe',
      'This is a dest',
      'https://deliciouslyella.com/wp-content/uploads/2019/07/speedy-tomato-pasta-recipe-2.jpg',
      [
        new Ingredient("Tomate", 5), new Ingredient("Banane", 1)
      ]),
    new Recipe(
      'Third Recipe',
      'This is a dest',
      'https://deliciouslyella.com/wp-content/uploads/2019/07/speedy-tomato-pasta-recipe-2.jpg',
      [
        new Ingredient("Tomate", 5), new Ingredient("Banane", 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(0);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
