import { DbOptionsPage } from './../db-options/db-options';
import { AuthService } from './../../services/auth.service';
import { IngredientModel } from './../../models/ingredient.model';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: IngredientModel[];

  constructor ( private shoppingListService: ShoppingListService,
                private popoverController: PopoverController,
                private authService: AuthService ,
                private loadController: LoadingController,
                private alertController: AlertController
              ) {}

  ionViewWillEnter () {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  private loadItems () {
    this.listItems = this.shoppingListService.getItems();
  }

  onCheckItem (index: number) {
    this.shoppingListService.removeItems(index);
    this.loadItems();
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
              
              this.shoppingListService.fetchList(token)
                .subscribe( 
                    list=>this.listItems = list, 
                    error=>this.handleError(error.message)
                )
            }
          ).catch(error=>this.handleError(error.message));
        } else if(data.action=='store'){
          this.authService.getActiveUser().getToken()
            .then (
              (token:string)=> {
                this.shoppingListService.storeList(token)
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
