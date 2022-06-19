import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { EegViewerComponent } from './eeg-viewer/eeg-viewer.component';
import { AdminDoctorComponent } from './admin-doctor/admin-doctor.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent ,canActivate: [AuthGuard]},
  { path: 'admin-doctor', component: AdminDoctorComponent ,canActivate: [AuthGuard]},
  { path: 'eeg-viewer', component: EegViewerComponent ,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
