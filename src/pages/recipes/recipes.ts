import { AuthService } from './../../services/auth.service';
import { DbOptionsPage } from './../db-options/db-options';
import { RecipePage } from './../recipe/recipe';
import { RecipeModel } from './../../models/recipe.model';
import { RecipesService } from './../../services/recipes.service';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { NavController, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipeList: RecipeModel[]=[];

  constructor ( private navCtrl: NavController,
                private recipesService: RecipesService,
                private popoverController: PopoverController,
                private authService: AuthService ,
                private loadController: LoadingController,
                private alertController: AlertController
              ) {}

  ionViewWillEnter () {
    this.recipeList = this.recipesService.getRecipes();
  }

  onNewReceipe() {
    this.navCtrl.push(EditRecipePage, {mode:'New'});
  }
  
  onLoadRecipe(recipe: RecipeModel, index: number) {
    this.navCtrl.push(RecipePage,{index:index, recipe: recipe});
  }
  onShowOptions(event: MouseEvent) { 
    const popover = this.popoverController.create(DbOptionsPage);
    popover.present({ev:event});
    const loading = this.loadController.create({content:'Please wait...'});
    popover.onDidDismiss(
      data=> {
       if (!data) return;
        loading.present();
        if(data.action=='load') {
          this.authService.getActiveUser().getToken()
          .then (
            (token:string)=> {
              
              this.recipesService.fetchList(token)
                .subscribe( 
                    list=> this.recipeList = list, 
                    error=>this.handleError(error.message)
                )
            }
          ).catch(error=>this.handleError(error.message));
        } else if(data.action=='store'){
          this.authService.getActiveUser().getToken()
            .then (
              (token:string)=> {
                this.recipesService.storeList(token)
                  .subscribe( 
                      ()=>console.log('success'), 
                      error=>this.handleError(error.message)
                  )
              }
            ).catch(error=> this.handleError(error.message));
        }
        loading.dismiss();
      }
    );
  }

  private handleError (errorMessage: string) {
    this.alertController.create ({
      title: 'An error occured',
      message: errorMessage,
      buttons: ['OK']
    }).present();
  }
}
