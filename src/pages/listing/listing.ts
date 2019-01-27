import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})
export class ListingPage {
    YourFancyButton: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  this.YourFancyButton = ListingPage;
  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad ListingPage');
    
    let v = document.querySelectorAll('#vopseluri option');
    let cv = document.querySelector('#cauta-vopsea');
    
    cv.addEventListener('click', (event) => event.preventDefault);
   /* function nuSelecta(e){
        e.preventDefault;
    }*/
    /*
    cv.querySelector('input').addEventListener('keyup', cautareVopseluri);
    function cautareVopseluri(){
        let textCautat = cv.querySelector('input').value;
        for (let i = 1; i < v.length; i++){
            if (v[i].innerHTML.indexOf(textCautat) == -1){
                v[i].style.display = 'none';
            } else {
                v[i].style.display = 'block';
            }
        }
    }*/
    
  }

}
