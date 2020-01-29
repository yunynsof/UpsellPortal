import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/auth/alert.service';
import { Router } from "@angular/router";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-eventcampaign',
  templateUrl: './eventcampaign.page.html',
  styleUrls: ['./eventcampaign.page.scss'],
})
export class EventcampaignPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private navController: NavController,
  ) { }

  ngOnInit() {
  }
  eventCampaignForm(form) {
    this.authService.eventCampaignForm(form.value).subscribe((res) => {
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
