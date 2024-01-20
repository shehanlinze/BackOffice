import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeadComponent } from './shared/head/head.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SiedbarComponent } from './shared/siedbar/siedbar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClassesComponent } from './layouts/classes/classes.component';
import { DataTablesModule } from 'angular-datatables';
import { CreateClasseComponent } from './layouts/create-classe/create-classe.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfessorsComponent } from './layouts/professors/professors.component';
import { ForgotPasswordComponent } from './layouts/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './layouts/reset-password/reset-password.component';
import { ClasseDetailsComponent } from './layouts/classe-details/classe-details.component';
import { UpdateClasseComponent } from './layouts/update-classe/update-classe.component';
import { DevicesComponent } from './layouts/devices/devices.component';
import { DeviceDetailsComponent } from './layouts/device-details/device-details.component';
import { CreateDeviceComponent } from './layouts/create-device/create-device.component';
import { DeviceUpdateComponent } from './layouts/device-update/device-update.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeadComponent,
    FooterComponent,
    SiedbarComponent,
    ClassesComponent,
    CreateClasseComponent,
    ProfessorsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ClasseDetailsComponent,
    UpdateClasseComponent,
    DevicesComponent,
    DeviceDetailsComponent,
    CreateDeviceComponent,
    DeviceUpdateComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
