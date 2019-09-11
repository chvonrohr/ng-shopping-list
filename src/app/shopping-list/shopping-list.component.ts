import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient("tomato", 5),
    new Ingredient("apple", 3)
  ];

  constructor() { }

  ngOnInit() {
  }

  onIngredientAdded(ingredient: Ingredient){
    console.log(ingredient, 'add');
    this.ingredients.push(ingredient);
  }
}
