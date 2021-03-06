import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalController, NavParams } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MySpotsPage } from '../pages/my-spots/my-spots';
import { ReservePage } from '../pages/reserve/reserve';
import { AuthService } from '../services/auth.service';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AccountPage } from '../pages/account/account';
import { HistoryPage } from '../pages/history/history';
import { AppConfig } from '../config/app.config';

import { MakeReservePage } from '../pages/make-reserve/make-reserve';
import { DetailsPage } from '../pages/details/details';

import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import { AddSpotPage } from '../pages/add-spot/add-spot';


@Component({
  templateUrl: 'app.html', providers:[CacheService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  //pages: Array<{title: string, component: any}>;

  constructor(private _cacheService: CacheService,public appConfig: AppConfig,public modalCtrl: ModalController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public authService:AuthService) {
    this.initializeApp();

    /*var token_raw = this.getCookie('access_token').replace('s:','').split('.');
    var token = token_raw[0];

    if (token_raw[0] != '') {
      this.authService.login(token);
    } else {
      this.authService.logout();
    }

    if (this.authService.getToken() != '') {
      this.authService.isAuth = true;
    }*/
    /*var s = {"values":[["41.88523011803571", "-87.63557374477386"]]};
    this.authService.getPricePrediction(s).subscribe(
      data => {
        console.log(data);

      },
      err => {
        console.log(err);
      },
      () => console.log('')
    );*/



    var self = this;
    this.authService.refresh().then((isLogged) => {
      console.log(isLogged);
      if (isLogged) {
        self.nav.setRoot(ReservePage);
      }
    });
  }
  getCookie(cookiename)
  {
    var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }

  getPages(isAuthUser) {
    if (isAuthUser) {
      return [
        { title: 'Home', component: HomePage, icon:'home' },
        { title: 'My Spots', component: MySpotsPage, icon:'list' },
        { title: 'Reserve Spot', component: ReservePage, icon:'navigate' },
        { title: 'History', component: HistoryPage, icon:'archive' },
        { title: 'My Account', component: AccountPage, icon:'person' },
        { title: 'Legal', component: HomePage, icon:'construct' }
      ];
    } else {
      return [
        { title: 'Home', component: HomePage, icon:'home' },
        { title: 'Legal', component: HomePage, icon:'construct' }
      ];
    }


  }

  login() {
    let profileModal = this.modalCtrl.create(LoginPage, { });
    profileModal.onDidDismiss(status => {
      if (status) {
        this.nav.setRoot(ReservePage);
      }
    });
    profileModal.present();

  }

  register() {
    let profileModal = this.modalCtrl.create(RegisterPage, { });
    profileModal.onDidDismiss(status => {
      if (status) {
        this.nav.setRoot(HomePage);
      }
    });
    profileModal.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
