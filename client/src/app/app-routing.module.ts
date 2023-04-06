import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExployeeListComponent } from './components/employee/exployee-list/exployee-list.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { AuthGuard } from './guard/auth.guard';
import { ExployeeDetailComponent } from './components/employee/exployee-detail/exployee-detail.component';
import { EmployeeCreateUpdateComponent } from './pages/employee/employee-create-update/employee-create-update.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'employees', component: ExployeeListComponent, canActivate: [AuthGuard] },
    { path: 'employee-create', component: EmployeeCreateUpdateComponent, canActivate: [AuthGuard] },
    { path: 'employee-edit/:id', component: EmployeeCreateUpdateComponent, canActivate: [AuthGuard] },
    { path: 'employees/:id', component: ExployeeDetailComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard] },
    { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: 'profile/:id', component: ExployeeDetailComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: "/login" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }
