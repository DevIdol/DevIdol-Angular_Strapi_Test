import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExployeeListComponent } from './components/employee/exployee-list/exployee-list.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { AuthGuard } from './guard/auth.guard';
import { ExployeeCreateComponent } from './components/employee/exployee-create/exployee-create.component';
import { ExployeeDetailComponent } from './components/employee/exployee-detail/exployee-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'employees', component: ExployeeListComponent, canActivate: [AuthGuard] },
    { path: 'employee-create', component: ExployeeCreateComponent, canActivate: [AuthGuard] },
    { path: 'employee-edit/:id', component: ExployeeCreateComponent, canActivate: [AuthGuard] },
    { path: 'employees/:id', component: ExployeeDetailComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard] },
    { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: "/login" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }
