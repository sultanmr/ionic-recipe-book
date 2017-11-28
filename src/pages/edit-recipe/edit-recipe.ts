import { IngredientModel } from './../../models/ingredient.model';
import { RecipeModel } from './../../models/recipe.model';
import { RecipesService } from './../../services/recipes.service';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  index:number;
  recipe: RecipeModel;
  mode='New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  constructor(  private navParams: NavParams,
                private actionSheetController: ActionSheetController,
                private alertController: AlertController,
                private toastController: ToastController,
                private recipesService: RecipesService,
                private navController: NavController) {

  }

  ngOnInit () {
    this.mode = this.navParams.get('mode');
    

    if(this.mode=='Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    this.initializeForm();
  }
 private initializeForm () {
  let title = null;
  let description = null;
  let difficulty = 'Medium';
  let ingredients = [];
  if (this.mode=='Edit') {
    title = this.recipe.title;
    description = this.recipe.description;
    difficulty = this.recipe.difficulty;

    for (let ingredient of this.recipe.ingredients)  {
      ingredients.push(new FormControl(ingredient.name, Validators.required));
    }
  }

  this.recipeForm = new FormGroup({
    'title': new FormControl(title, Validators.required),
    'description': new FormControl(description, Validators.required),
    'difficulty': new FormControl(difficulty, Validators.required),
    'ingredients': new FormArray(ingredients)
  });
 }

 onSubmit () {
  const value = this.recipeForm.value;
  let ingredients = [];
  if(value.ingredients.length>0) {
    ingredients = value.ingredients
                    .map((name)=>{ 
                            return {name:name, amount:1};
                    });
  }
  if (this.mode=='Edit') {
    this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    
  }else {
    this.recipesService.addRecipe(value.title, value.description,value.difficulty, ingredients);
    
  }
   this.navController.popToRoot();
  
}

 onManageIngredients() {
  const actionSheet = this.actionSheetController.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Add Ingredient',
        handler: ()=>{
          this.newIngredientAlert().present();
        }
      },
      {
        text: 'Remove all ingredients',
        handler: ()=> {
          const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
          const len = fArray.length;
          if (len>0) {
            for (let i=len-1; i>=0;i--) {
              fArray.removeAt(i);
            }
            this.toastMessage('All ingredients deleted');
          }
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  });

  actionSheet.present();
 }

 private toastMessage (msg:string, dur=1000) {
  this.toastController.create ({
    message: msg,
    duration: dur,
    position: 'top'
  }).present();
 }

 private newIngredientAlert () {
   return this.alertController.create({
     title: 'Add Ingredent',
     inputs: [
       {
         name: 'name',
         placeholder: 'Name'
       }
     ],
     buttons: [
       {
         text: 'Cancel',
         role: 'cancel'
        
       },
       {
         text: 'Add',
         handler: (data)=> {
           if (data.name.trim()=='' || data.name==null) {
            this.toastMessage ('Please enter a valid value');            
           }

           (<FormArray>this.recipeForm.get('ingredients'))
                .push(new FormControl(data.name, Validators.required))
          this.toastMessage('Item Added');

         }
       }
     ]
   });
  
 }
}
