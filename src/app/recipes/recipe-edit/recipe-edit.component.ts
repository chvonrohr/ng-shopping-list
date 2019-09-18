import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = !!params.id;
    });

    this.initForm();
  }

  /**
   * load edit / new data from recipe
   */
  initForm() {
    let recipe = new Recipe();
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);
      recipeIngredients = new FormArray(recipe.ingredients.map(ingredient => {
        return new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        });
      }));
    }

    this.form = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      desc: new FormControl(recipe.desc, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      ingredients: recipeIngredients
    });
  }

  getIngredientControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngerdient(i: number) {
    (this.form.get('ingredients') as FormArray).removeAt(i);
  }

  onSubmit() {
    const fValues = this.form.value;
    const newRecipe = new Recipe(fValues.name, fValues.desc, fValues.imagePath, fValues.ingredients);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
      this.router.navigate(['..'], {relativeTo: this.route});
    } else {
      this.recipeService.addRecipe(newRecipe);
      this.router.navigate(['..', this.recipeService.getRecipes().length - 1], {relativeTo: this.route});
    }

  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onRemove() {
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}

