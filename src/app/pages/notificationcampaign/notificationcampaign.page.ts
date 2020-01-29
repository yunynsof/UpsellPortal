import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/auth/alert.service';
import { Router } from "@angular/router";
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notificationcampaign',
  templateUrl: './notificationcampaign.page.html',
  styleUrls: ['./notificationcampaign.page.scss'],
})
export class NotificationcampaignPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private navController: NavController,
    private modalController: ModalController,
  ) { }

  art = {
    exacaster: null,
    typeMessage: null,
    message: null,
  }
  articulos = [
    {
      nexacasterame: 'Nigel Nixon',
      typeMessage: 'System Engineer',
      message: 'Boston',
     
    }, {

      exacaster: 'Garrett Bell',
      typeMessage: 'CEO',
      message: 'California',
     
    },
    {
      exacaster: 'Milla Kunios',
      typeMessage: 'Senior Java Developer',
      message: 'Los Angeles',
      

    }, {

      exacaster: 'Cristiano Ronaldo',
      typeMessage: 'Senior Ionic Developer',
      message: 'Madrid',
     
    },
    {
      exacaster: 'Airi Satou',
      typeMessage: 'Accountan',
      message: 'Tokyo',
     

    }, {
      exacaster: 'Brielle Williamson',
      typeMessage: 'Integration Specialist',
      message: 'New York',
    
    }, {
      exacaster: 'Tiger Nixon',
      typeMessage: 'System Architect',
      message: 'Edinburgh',
     
    }, {

      exacaster: 'Garrett Winters',
      typeMessage: 'Accountant',
      message: 'Tokyo',
     
    },
    {
      exacaster: 'Ashton Cox',
      typeMessage: 'Junior Technical Author',
      message: 'San Francisco',
  

    }, {

      exacaster: 'Cedric Kelly',
      typeMessage: 'Senior Javascript Developer',
      message: 'Edinburgh',
  
    },
    {
      exacaster: 'Airi Satou',
      typeMessage: 'Accountan',
      message: 'Tokyo',
    

    }, {
      exacaster: 'Brielle Williamson',
      typeMessage: 'Integration Specialist',
      message: 'New York',
   
    }, {
      exacaster: 'Tiger Nixon',
      typeMessage: 'System Architect',
      message: 'Edinburgh',
    
    }, {

      exacaster: 'Garrett Winters',
      typeMessage: 'Accountant',
      message: 'Tokyo',
     
    },
    {
      exacaster: 'Ashton Cox',
      typeMessage: 'Junior Technical Author',
      message: 'San Francisco',
      

    }, {

      exacaster: 'Cedric Kelly',
      typeMessage: 'Senior Javascript Developer',
      message: 'Edinburgh',
     
    },
    {
      exacaster: 'Airi Satou',
      typeMessage: 'Accountan',
      message: 'Tokyo',
     

    }, {
      exacaster: 'Brielle Williamson',
      typeMessage: 'Integration Specialist',
      message: 'New York',
    
    }
  ];


  async moveToFirst() {
    const modal = await this.modalController.create({
      component: NotificationcampaignPage
    });

    return await modal.present();
  }


  ngOnInit() {
  }

  notificationCampaignForm(form) {
    this.authService.notificationCampaignForm(form.value).subscribe((res) => {
      this.alertService.presentToast("");
    }, error => {
      this.alertService.errorCreateGroup(error);
    },
      () => {
        this.navController.navigateRoot('/groupcampaign');
      }
    );
  }

}
