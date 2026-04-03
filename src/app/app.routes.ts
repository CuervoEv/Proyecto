import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password';
import { DashboardComponent } from './user-area/dashboard/dashboard';
import { ProfileComponent } from './user-area/profile/profile';
import { SettingsComponent } from './user-area/settings/settings';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },

  { path: '**', redirectTo: 'login' }
];