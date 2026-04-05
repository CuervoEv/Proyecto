import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { RecoverComponent } from './auth/recover-password/recover-password';
import { DashboardComponent } from './user-area/dashboard/dashboard';
import { ProfileComponent } from './user-area/profile/profile';
import { SettingsComponent } from './user-area/settings/settings';
import { ListComponent } from './main-module/list/list';
import { About } from './info-pages/about/about';
import { Services } from './info-pages/services/services';
import { Contact } from './info-pages/contact/contact';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'list', redirectTo: 'hogares', pathMatch: 'full' },
  { path: 'hogares', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'about', component: About },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },

  { path: '**', redirectTo: 'login' }
];