import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { Network } from '@ionic-native/network';

import { RegisterPage } from '../register/register';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData : any;
  userData = {"email": "","parola": ""};
  submiterrors: any = [];

  constructor(public navCtrl: NavController, 
          public navParams: NavParams, 
          public toastCtrl: ToastController,
          private network: Network,
          public authService:AuthServiceProvider,
          public loadingController:LoadingController,
          public platform: Platform, ) {

    }


  gotoRegister() {
  	this.navCtrl.push(RegisterPage);
  }

  authlogin() {
    //alert(this.userData.acord);
    this.submiterrors = [];
    //// check to confirm the username and password fields are filled
    if (this.userData.email==""){
      this.submiterrors.push("Email field is empty!");
    } else if (this.userData.parola==""){
      this.submiterrors.push("Password field is empty!");
    } 

    if (this.submiterrors.length > 0) {
      var mesaj = this.submiterrors.join("<br />");
      this.presentToast(mesaj, 'bottom', 'io-toast-red');
    } else {

      let loader = this.loadingController.create({
        content: "Processing please wait…",

      });

      loader.present().then(() => {
        //fields are completed, proceeding to send data
        this.authService.postData(this.userData,'signin').then((result) => {

              this.responseData = result;
              loader.dismiss();

              if (this.responseData.status == 'Authentication succesful!') {
                this.presentToast('Success! id='+this.responseData.hrid, 'bottom', 'io-toast-green');
                //this.navCtrl.push(LoginPage);



              } else {
                this.presentToast(this.responseData.status, 'bottom', 'io-toast-red');
              }

              

              //if(this.responseData.userData){
                //alert(result.status);
            //localStorage.setItem('userData', JSON.stringify(this.responseData));
                //this.navCtrl.push(TabsPage);
              //} else { 
              //  this.presentToast('User already exists!', 'bottom', 'io-toast-red'); 
              //}
          }, (err) => {
              // Error log
              this.presentToast(JSON.stringify(err), 'bottom', 'io-toast-red');
          });
      });

    }



  }


  private presentToast(text, pozitie, clasa) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 4000,
        position: pozitie,
        cssClass: clasa,
        showCloseButton: true,
        closeButtonText: 'Done'
      });
      toast.present();
  }

}
