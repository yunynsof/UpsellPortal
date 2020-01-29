import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router, NavigationStart } from "@angular/router";
import { AlertService } from './auth/alert.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { Location } from '@angular/common';
import { AutocloseOverlaysService } from './auth/AutocloseOverlays.Service ';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private bnIdle: BnNgIdleService,
    private location: Location,
    private navController: NavController,
    private autocloseOverlaysService: AutocloseOverlaysService
  ) {
   this.router.events.subscribe((event: any): void => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.autocloseOverlaysService.trigger();
        }
      }
    });
    this.initializeApp();
  }

  ngOnInit(): void {

    this.bnIdle.startWatching(600).subscribe((res) => {
      if (res) {
        this.autocloseOverlaysService.trigger();
        this.authService.logout();
        this.navController.navigateRoot('/login');
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
    this.alertService.presentToast("Cerrando Sesión");
  }

  isLogin(path) {

    var title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice(1);
    if (path == title || "upsell-portal-web/www/login" == title) {
      return false;
    }
    else {
      return true;
    }
  }

}
