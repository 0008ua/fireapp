import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './components/shared/page-404/page-404.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: 'feedback',
    loadChildren: './components/feedback/feedback.module#FeedbackModule',
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    // data: { auth: 'user' },
  },
  {
    path: '',
    loadChildren: './components/home/home.module#HomeModule',
  },
  { path: 'page-404', component: Page404Component },
  { path: '', loadChildren: './components/home/home.module#HomeModule', pathMatch: 'full' },
  { path: '**', component: Page404Component }, // MAKE redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
