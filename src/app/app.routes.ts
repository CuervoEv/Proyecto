import { Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';

import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { RecoverComponent } from './auth/recover-password/recover-password';
import { DashboardComponent } from './user-area/dashboard/dashboard';
import { ProfileComponent } from './user-area/profile/profile';
import { SettingsComponent } from './user-area/settings/settings';
import { About } from './info-pages/about/about';
import { Services } from './info-pages/services/services';
import { Contact } from './info-pages/contact/contact';
import { MisHogaresComponent } from './hogares/pages/mis-hogares/mis-hogares';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'about', component: About },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },
  //  { path: 'mis-hogares', component: MisHogaresComponent, canActivate: [AuthGuard] },
  { path: 'mis-hogares', component: MisHogaresComponent,},

  { path: '**', redirectTo: 'login' }
];