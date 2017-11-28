import { AuthService } from './auth.service';
import { IngredientModel } from './../models/ingredient.model';
import { RecipeModel } from './../models/recipe.model';


import {Http, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/rx';

@Injectable()
export class RecipesService {
    private recipes: RecipeModel[]=[];

    constructor (   private http: Http,
        private authService: AuthService) {}
        
    addRecipe(title: string, 
        description: string, 
        difficulty: string,
        ingredients: IngredientModel[]) {
        this.recipes.push(new RecipeModel(title, description, difficulty, ingredients));
    }

    getRecipes () {
        return this.recipes.slice();
    }

    updateRecipe (index: number,
            title: string,
            description: string,
            difficulty: string,
            ingredients: IngredientModel[]) {
        this.recipes[index] = new RecipeModel(title, description, difficulty, ingredients);
    }

    removeRecipe (index: number) {
        this.recipes.splice (index, 1);
    }

    createFirebaseUrl (token: string) {
        const fbUrl = 'https://ionic-recipebook-e4573.firebaseio.com/';
        const fbNode = 'recipes-list.json';

        const userId = this.authService.getActiveUser().uid;

        return fbUrl+userId+'/'+fbNode+'?auth='+token;
    }
    
    storeList (token:string) {       
        const url = this.createFirebaseUrl(token);
        return this.http.put (url, this.recipes)
                .map ((response: Response)=> {
                    return response.json();
                });

    }

    fetchList (token: string) {
        const url = this.createFirebaseUrl(token);
        return this.http.get (url)
                .map (res=> {
                    const recipes: RecipeModel[] = res.json() ? res.json() : [];
                    for (let item of recipes) {
                        if (!item.hasOwnProperty ('ingredients')) {
                            item.ingredients = [];
                        }
                    }
                    return recipes;
                })
                .do ((data:RecipeModel[])=>this.recipes=data);
    }

    
}