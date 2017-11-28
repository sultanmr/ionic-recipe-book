import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
@Component({
    selector: 'db-options',
    templateUrl: 'db-options.html'
})
export class DbOptionsPage {
    constructor (private viewController: ViewController) {
        
    }
    onAction (action:string) {
        this.viewController.dismiss({
            action:action
        });
    }
}