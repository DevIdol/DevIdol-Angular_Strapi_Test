import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExployeeListComponent } from './components/employee/exployee-list/exployee-list.component';
import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { TaskCreateComponent } from './components/task/task-create/task-create.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';

import { DatePipe } from '@angular/common';
import { DATE_FORMAT } from './validators/validators';
import { ExployeeDetailComponent } from './components/employee/exployee-detail/exployee-detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EmployeeCreateUpdateComponent } from './pages/employee/employee-create-update/employee-create-update.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    FooterComponent,
    DashboardComponent,
    ProfileComponent,
    ExployeeListComponent,
    EmployeeCreateUpdateComponent,
    ProjectCreateComponent,
    ProjectListComponent,
    TaskCreateComponent,
    TaskListComponent,
    ExployeeDetailComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    NgbDropdownModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
