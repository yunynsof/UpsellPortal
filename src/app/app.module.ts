import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from  './auth/auth.module';
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";
import { DataTablesModule } from 'angular-datatables';
import { ModifiedcampaignPageModule } from '../app/modifiedcampaign/modifiedcampaign.module';  
import { AddcategoryPageModule } from '../app/pages/addcategory/addcategory.module';  
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { BnNgIdleService } from 'bn-ng-idle';
import { HttpClientModule } from '@angular/common/http';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AuthModule,
    Ionic4DatepickerModule,
    DataTablesModule,
    ModifiedcampaignPageModule, 
    AddcategoryPageModule, 
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot()],
    
  providers: [
    StatusBar,
    SplashScreen,
    BnNgIdleService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, 
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
