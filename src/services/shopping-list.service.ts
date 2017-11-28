import { AuthService } from './auth.service';
import { IngredientModel } from './../models/ingredient.model';
import {Http, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/rx';

@Injectable()
export class ShoppingListService {
    private ingredients: IngredientModel[] = [];

    

    constructor (   private http: Http,
                    private authService: AuthService) {}

    addItem (name: string, amount: number) {
        let i:number=0;

        for (let ingredient of this.ingredients) {
          if (ingredient.name==name) {
                this.ingredients[i].amount++;
                break;
            }
            i++;
        }
        
        if(i==this.ingredients.length)
            this.ingredients.push (new IngredientModel(name, amount));
    }

    addItems (items: IngredientModel[]) {
        this.ingredients.push(...items);
    }

    getItems () {
        return this.ingredients.slice();
    }

    removeItems (index:number) {
        this.ingredients.splice(index, 1);
    }
    
    createFirebaseUrl (token: string) {
        const fbUrl = 'https://ionic-recipebook-e4573.firebaseio.com/';
        const fbNode = 'shopping-list.json';

        const userId = this.authService.getActiveUser().uid;

        return fbUrl+userId+'/'+fbNode+'?auth='+token;
    }
    
    storeList (token:string) {       
        const url = this.createFirebaseUrl(token);
        return this.http.put (url, this.ingredients)
                .map ((response: Response)=> {
                    return response.json();
                });

    }

    fetchList (token: string) {
        const url = this.createFirebaseUrl(token);
        return this.http.get (url)
                .map (res=>res.json() ? res.json() : [])                
                .do (data=>this.ingredients=data);
    }
}