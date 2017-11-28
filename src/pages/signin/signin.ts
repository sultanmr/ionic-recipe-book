import { AuthService } from './../../services/auth.service';
import { SignupPage } from './../signup/signup';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  constructor(private navController: NavController,
              private authService: AuthService,
              private loadingController: LoadingController,
              private alertController: AlertController) {}

  onSignin(f: NgForm) {
    const loading = this.loadingController.create({
      content: 'Signin...'
    });
    loading.present();
    
    this.authService.signin(f.value.email, f.value.password)
      .then ((data)=> {
        loading.dismiss();
      })
      .catch((error)=> {
        loading.dismiss();
        this.alertController.create({
          title: 'Signin failed',
          subTitle: error.message,
          buttons: ['OK']
        }).present();        
      });
  }

  onGoogleSignin() {
    const loading = this.loadingController.create({
      content: 'Signin...'
    });
    loading.present();
    
    this.authService.signInWithGoogle()
      .then ((data)=> {
        loading.dismiss();
      })
      .catch((error)=> {
        loading.dismiss();
        this.alertController.create({
          title: 'Signin failed',
          subTitle: error.message,
          buttons: ['OK']
        }).present();        
      });
  }
  onRegister() {
    this.navController.push(SignupPage);
  }
}
