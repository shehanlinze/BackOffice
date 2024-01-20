import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { ClassesComponent } from './layouts/classes/classes.component';
import { ProfessorsComponent } from './layouts/professors/professors.component';
import { ForgotPasswordComponent } from './layouts/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './layouts/reset-password/reset-password.component';
import { ClasseDetailsComponent } from './layouts/classe-details/classe-details.component';
import { DevicesComponent } from './layouts/devices/devices.component';
import { DeviceDetailsComponent } from './layouts/device-details/device-details.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login',component:LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'classes', component: ClassesComponent },
  { path: 'professors', component: ProfessorsComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'classDetails', component: ClasseDetailsComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'deviceDetails', component: DeviceDetailsComponent},
  {path:'register',component:RegisterComponent},
  {path:'**',component:NotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
