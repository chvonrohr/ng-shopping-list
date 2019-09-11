import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is a dest', 'https://deliciouslyella.com/wp-content/uploads/2019/07/speedy-tomato-pasta-recipe-2.jpg'),
    new Recipe('Another Recipe', 'This is a dest', 'https://deliciouslyella.com/wp-content/uploads/2019/07/speedy-tomato-pasta-recipe-2.jpg'),
    new Recipe('Third Recipe', 'This is a dest', 'https://deliciouslyella.com/wp-content/uploads/2019/07/speedy-tomato-pasta-recipe-2.jpg')
  ];

  getRecipes() {
    return this.recipes.slice(0);
  }
}
