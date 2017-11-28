import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor ( private authService: AuthService,
                private loadingController: LoadingController,
                private alertController: AlertController
              ) {}

  onSignup(f: NgForm) {
    const loading = this.loadingController.create({
      content: 'Signup...'
    });
    loading.present();
    
    this.authService.signup(f.value.email, f.value.password)
      .then ((data)=> {
        loading.dismiss();
      })
      .catch((error)=> {
        loading.dismiss();
        this.alertController.create({
          title: 'Signup failed',
          subTitle: error.message,
          buttons: ['OK']
        }).present();

        
      })
  }
}
