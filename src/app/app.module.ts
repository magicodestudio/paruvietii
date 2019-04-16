import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SettingsPage } from '../pages/settings/settings';
import { ClientsPage } from '../pages/clients/clients';
import { CalendarPage } from '../pages/calendar/calendar';
import { FormulasPage } from '../pages/formulas/formulas';
import { ServicesPage } from '../pages/services/services';
import { NewsPage } from '../pages/news/news';
import { MyProfilePage } from '../pages/my-profile/my-profile';

//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SettingsPage,
    ClientsPage,
    CalendarPage, 
    FormulasPage,
    ServicesPage,
    NewsPage, 
    MyProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SettingsPage,
    ClientsPage,
    CalendarPage, 
    FormulasPage,
    ServicesPage,
    NewsPage, 
    MyProfilePage
  ],
  providers: [
    //StatusBar,
    //SplashScreen,
    Network,
    Camera,
    File,
    FileTransfer,
    FileTransferObject,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
