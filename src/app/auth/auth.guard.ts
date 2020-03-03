import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private navController: NavController,
    public auth: AuthService) { }

  canActivate(): boolean {

    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.navController.navigateRoot(['login']);
    return false;
  }
}