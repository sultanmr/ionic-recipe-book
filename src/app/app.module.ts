import { DbOptionsPage } from './../pages/db-options/db-options';
import { AuthService } from './../services/auth.service';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { RecipesService } from './../services/recipes.service';
import { ShoppingListService } from './../services/shopping-list.service';
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { TabsPage } from './../pages/tabs/tabs';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp,
    SigninPage, SignupPage,DbOptionsPage,
    EditRecipePage,TabsPage,ShoppingListPage,RecipePage,RecipesPage,EditRecipePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage, SignupPage,DbOptionsPage,
    EditRecipePage,TabsPage,ShoppingListPage,RecipePage,RecipesPage,EditRecipePage
    
  ],
  providers: [

    AuthService,
    ShoppingListService,
    RecipesService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
