import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private authService: AuthService,
    public alertController: AlertController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController,
  ) {
    this.initializePage();
  }

  initializePage() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.authService.isAuth() != null || !this.authService.isTokenExpired()) {
        this.navController.navigateRoot(['home']);
      } else {
        this.navController.navigateRoot(['login']);
      }
    });
  }

  ngOnInit() {
  }

  isLoggedIn() {
    this.authService.isLoggedIn().subscribe((state) => {
      if (state) {
        console.log('Logged IN');
        console.log(this.authService.isAuth());
      } else {
        console.log('Logged OUT');
      }
    });
  }
}
