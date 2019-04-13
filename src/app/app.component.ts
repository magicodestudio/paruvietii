import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  showSplash = true; // <-- show animation


  constructor(public platform: Platform) {
    this.handleSplashScreen();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  async handleSplashScreen(): Promise<void> {
    try {
      // wait for App to finish loading
      await this.platform.ready();
    } catch (error) {
      alert('Platform initialization bug');
    }
    
    // Any operation that shoud be performed BEFORE showing user UI,
    // in a real App that may be cookie based authentication check e.g.
    // await this.authProvider.authenticate(...)
    
    // fade out and remove the #splash-screen
    const splash = document.getElementById('splash-screen');
    //splash.style.opacity = '0';
    //setTimeout(() => { splash.remove() }, 300);
    timer(5000).subscribe(() => splash.remove());
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();


      //timer(3000).subscribe(() => this.showSplash = false); // <-- hide animation after 3s
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
