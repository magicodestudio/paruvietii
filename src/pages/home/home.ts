import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
   
    import { LISTING } from '../pages/listing/listing';
    pageNav(){
        this.navCtrl.setRoot(LISTING);
    }
  }

}
