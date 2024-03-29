import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { CommissionComponent } from './commission/commission.component';
import { AuditComponent } from './audit/audit.component';
const routes: Routes = [
  {path:"", component:CommissionComponent,pathMatch: "full"},
  {path:'terminal', component:AppComponent},
  {path:'teams', component:TeamsComponent},
  {path:'commission',component:CommissionComponent},
  {path:'audit', component:AuditComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[AppComponent,TeamsComponent,CommissionComponent,AuditComponent]
