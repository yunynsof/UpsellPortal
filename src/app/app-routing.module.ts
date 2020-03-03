import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule) },
  
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [ AuthGuard ]},
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule', canActivate: [ AuthGuard ] },
  { path: 'createcampaign', loadChildren: './createcampaign/createcampaign.module#CreatecampaignPageModule', canActivate: [ AuthGuard ] },
  { path: 'modifiedcampaign', loadChildren: './modifiedcampaign/modifiedcampaign.module#ModifiedcampaignPageModule', canActivate: [ AuthGuard ] },
  { path: 'admincampaign', loadChildren: './admincampaign/admincampaign.module#AdmincampaignPageModule', canActivate: [ AuthGuard ]  },
  { path: 'groupcampaign', loadChildren: './pages/groupcampaign/groupcampaign.module#GroupcampaignPageModule', canActivate: [ AuthGuard ] },
  { path: 'notificationcampaign', loadChildren: './pages/notificationcampaign/notificationcampaign.module#NotificationcampaignPageModule', canActivate: [ AuthGuard ] },
  { path: 'eventcampaign', loadChildren: './pages/eventcampaign/eventcampaign.module#EventcampaignPageModule', canActivate: [ AuthGuard ] },
  { path: 'addcategory', loadChildren: './pages/addcategory/addcategory.module#AddcategoryPageModule', canActivate: [ AuthGuard ] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
