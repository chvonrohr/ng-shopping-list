import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editIndex: number;
  editItem: Ingredient = null;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((i: number) => {
      this.editIndex = i;
      this.editItem = this.shoppingListService.getIngredients()[i];
      this.slForm.setValue({ name: this.editItem.name, amount: this.editItem.amount });
    });
  }

  onSubmit(f: NgForm) {
    const ingredient = new Ingredient(f.value.name, f.value.amount);
    if (this.editItem) {
      this.shoppingListService.updateIngredient(this.editIndex, ingredient);
      this.editItem = null;
      this.editIndex = null;
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    f.reset();
  }

  onDelete() {
    if (this.editIndex >= 0) {
      this.shoppingListService.removeIngredient(this.editIndex);
      this.onClear();
    }
  }

  onClear() {
    this.slForm.reset();
    this.editIndex = this.editItem = null;
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
