import { ShoppingListService } from './../../services/shopping-list.service';
import { ShoppingListPage } from './../shopping-list/shopping-list';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { RecipesService } from './../../services/recipes.service';
import { RecipeModel } from './../../models/recipe.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe: RecipeModel;
  index: number;

  constructor (
                private navParams: NavParams,
                private navCtrl: NavController,
                private alertController: AlertController,
                private recipesService: RecipesService,
                private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    
   this.recipe = this.navParams.get('recipe');
   this.index = this.navParams.get('index');
  }

  
  onAddIngredients() {
    for(let ingridient of this.recipe.ingredients) {
      this.shoppingListService.addItem(ingridient.name, ingridient.amount);     
    }
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipePage, {mode:'Edit', recipe:this.recipe, index:this.index});
  }
  onDeleteRecipe(){
    this.alertController.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'Yes, Delete it', handler: data=> {
            this.recipesService.removeRecipe(this.index);
            this.navCtrl.pop();
          }
        },
        {
          text: 'Cancel', role:'cancel'
        }
        
      ]
    }).present();

   
  }

}
