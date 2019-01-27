import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListingPage } from '/listing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
listing: ListingPage;
export class HomePage {



  constructor(public navCtrl: NavController) {
   
    
   
  }
   
}
 navigateToListing() {
    this.navCtrl.setRoot(listing);
    }

