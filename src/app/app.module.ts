import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AuditComponent } from './audit/audit.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommissionComponent } from './commission/commission.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [ NavbarComponent, routingComponents, CommissionComponent, AuditComponent],
  imports: [BrowserModule,NgScrollbarModule,MatExpansionModule,CdkAccordionModule,MatFormFieldModule,ScrollingModule,MatProgressSpinnerModule,MatSelectModule,MatButtonModule, MatSliderModule,MatDatepickerModule, MatCardModule, AppRoutingModule, NgbModule, HttpClientModule,NgSelectModule, FormsModule, BrowserAnimationsModule,MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
