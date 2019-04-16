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
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
 
  }





  ionViewDidLoad() {
    
    
    
    
    
  }
  vops() {
        document.getElementById('modal-costum').style.display = 'flex';

        let cv = document.getElementById('cauta-vopsea').getElementsByTagName('input')[0],
            v = document.getElementById('lista-vopseluri').getElementsByTagName('ion-item');

        cv.addEventListener('keyup', cautareVopseluri);
        function cautareVopseluri(){
        let textCautat = cv.value;
        for (let i = 0; i < v.length; i++){
            if (v[i].getElementsByTagName('ion-label')[0].innerHTML.toLowerCase().indexOf(textCautat.toLowerCase()) == -1){
                (v[i] as HTMLElement).style.display = 'none';
            } else {
                (v[i] as HTMLElement).style.display = 'flex';
            }
        }
        }
    }
    inchideModal() {
        let modalCostum = document.getElementById('modal-costum');
        //console.log((event.target as HTMLElement).getAttribute('id'))
        if ((event.target as HTMLElement).getAttribute('id') == 'modal-costum'){
            (modalCostum as HTMLElement).style.display = 'none'
        }
    }

}
