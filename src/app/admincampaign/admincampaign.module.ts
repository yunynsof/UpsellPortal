import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdmincampaignPage } from './admincampaign.page';
import { DataTablesModule } from 'angular-datatables';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: AdmincampaignPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataTablesModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdmincampaignPage]
})
export class AdmincampaignPageModule {}
