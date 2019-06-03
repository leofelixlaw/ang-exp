import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  // Layout componet and other pages
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/user', pathMatch: 'full' },
      { path: 'user', component: UserListComponent }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
