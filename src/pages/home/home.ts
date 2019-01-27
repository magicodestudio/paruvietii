import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
   
    import { listing } '../pages/listing';
    YourFancyButton(x){
        this.navCtrl.setRoot(x);
    }
  }

}
