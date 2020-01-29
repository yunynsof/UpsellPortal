import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule) },
  
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'createcampaign', loadChildren: './createcampaign/createcampaign.module#CreatecampaignPageModule' },
  { path: 'modifiedcampaign', loadChildren: './modifiedcampaign/modifiedcampaign.module#ModifiedcampaignPageModule' },
  { path: 'admincampaign', loadChildren: './admincampaign/admincampaign.module#AdmincampaignPageModule' },
  { path: 'groupcampaign', loadChildren: './pages/groupcampaign/groupcampaign.module#GroupcampaignPageModule' },
  { path: 'notificationcampaign', loadChildren: './pages/notificationcampaign/notificationcampaign.module#NotificationcampaignPageModule' },
  { path: 'eventcampaign', loadChildren: './pages/eventcampaign/eventcampaign.module#EventcampaignPageModule' },
  { path: 'addcategory', loadChildren: './pages/addcategory/addcategory.module#AddcategoryPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
