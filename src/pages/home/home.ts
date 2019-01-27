import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
   
    import { listing } from '../pages/listing';
    pageNav(x){
        this.navCtrl.setRoot(x);
    }
  }

}
