import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { listing } from '../pages/page-listing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
   
    
   
  }
  navigateToListing(): void {
       this.navCtrl.push(listing);
    }

}
