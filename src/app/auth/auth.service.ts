import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { Group } from './dto/group';
import { Notification } from './dto/notification';
import { Event } from './dto/event';
import { Category } from './dto/category';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AlertService } from '../auth/alert.service';
import { ModalController } from '@ionic/angular';

const TOKEN_KEY = '';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:3000';
  URL_SERVER: string = 'http://192.168.159.13:7004';
  authSubject = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private modalController: ModalController,
    private alertService: AlertService
  ) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user);
  }

  login(user: User) {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.post(`${this.URL_SERVER}/upsell-authentication-api/resources/v1/jwttoken/authenticate?claim=${user.claim}&secret=${user.secret}&realm=upsell`, "", { headers: headers, observe: 'response' }).pipe(
      tap(async (res) => {
        localStorage.setItem(TOKEN_KEY, res.headers.get('authorization'));
        this.authSubject.next(true);
      })
    );
  }

  createCampaignForm(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    console.log(data);
    console.log(JSON.stringify(data));
    return this.httpClient.post(`${this.URL_SERVER}/upsell-campaign-api/resources/v1/campaign`, data, { headers });
  }

  modifiedCampaignForm(id, campaign) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    console.log(campaign);
    console.log(JSON.stringify(campaign));
    return this.httpClient.put(`${this.URL_SERVER}/upsell-campaign-api/resources/v1/campaign/${id}`, campaign, { headers });
  }

  groupCampaignForm(group: Group) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return this.httpClient.post(`${this.URL_SERVER}/upsell-category-api/resources/v1/group`, group, { headers });
  }

  notificationCampaignForm(notification: Notification) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/notificationcampaign`, notification);
  }

  eventCampaignForm(event: Event) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/eventcampaign`, event);
  }

  addCategoryForm(category: Category) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return this.httpClient.post(`${this.URL_SERVER}/upsell-category-api/resources/v1/category`, category, { headers });
  }

  addSubCategoryForm(data1) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    let subCategory = {
      name: data1.subCategory,
      description: data1.desSubCategory
    };
    return this.httpClient.post(`${this.URL_SERVER}/upsell-category-api/resources/v1/category/${data1.idCategory}/subcategory`, subCategory, { headers });
  }

  MethodPutCampaign(campaign) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return this.httpClient.put(`${this.URL_SERVER}/upsell-campaign-api/resources/v1/campaign/${campaign.id}/${campaign.status}`, null, { headers });
  }

  MethodDeleteCampaign(idCampaign) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return this.httpClient.delete(`${this.URL_SERVER}/upsell-campaign-api/resources/v1/campaign/${idCampaign}`, { headers });
  }

  getCategories() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });

    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/upsell-category-api/resources/v1/category`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getGroup() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/upsell-category-api/resources/v1/group`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  saveCategory(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return this.httpClient.post(`${this.URL_SERVER}/upsell-category-api-web/resources/category`, JSON.stringify(data), { headers });
  }

  getEventProduct() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/upsell-event-api/resources/v1/eventProduct`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getEventPrize() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/upsell-event-api/resources/v1/eventPrize`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getExacaster() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/upsell-exacaster-api/resources/v1/exacasterCmpHeader`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getCampaign(alertService) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': localStorage.getItem(TOKEN_KEY),
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/upsell-campaign-api/resources/v1/campaign`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        alertService.dismiss();
        if (err.statusText == 'Unauthorized') {
          this.alertService.errorConnection('Autenticacion', err.statusText);
        } else {
          this.alertService.errorConnection('Conexion', err.statusText);
        }
        this.modalController.getTop().then(v => v ? this.modalController.dismiss() : null)
      });
    });
  }

  async logout() {
    localStorage.setItem(TOKEN_KEY, null);
    localStorage.clear();
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
  isAuthenticated() {
    return this.authSubject.value;
  }

  isAuth() {
    return localStorage.getItem(TOKEN_KEY);
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.isAuth();
    if (!token) return true;

    const date = helper.getTokenExpirationDate(token);
    console.log(date);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

}

