import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListingPage } from '../listing/listing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
   
    
   
  }
  navigateToListing(): void {
       this.navCtrl.push(ListingPage);
  }

}
