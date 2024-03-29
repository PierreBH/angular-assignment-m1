import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AssignmentsComponent} from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import {MatInputModule} from "@angular/material/input";
import { MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RouterModule, Routes} from "@angular/router";
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ConnexionComponent } from './assignments/connexion/connexion.component';
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import { RegisterComponent } from './assignments/register/register.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatExpansionModule} from "@angular/material/expansion";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { MatChipsModule} from "@angular/material/chips";
import {
  FilterPipe,
  MatiereFilterPipe,
  ParametersAssignmentComponent, UserFilter
} from './parameters-assignment/parameters-assignment.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatRadioModule} from "@angular/material/radio";
import {MatSortModule} from "@angular/material/sort";

const routes : Routes = [
  {path: '', component: AssignmentsComponent},
  {path: 'home', component: AssignmentsComponent},
  {path: 'add', component: AddAssignmentComponent},
  {path: 'assignment/:id', component: AssignmentDetailComponent},
  {path: 'assignment/:id/edit', component: EditAssignmentComponent},
  {path: 'params', component: ParametersAssignmentComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: '/home'}
  ];

@NgModule({
    declarations: [
        AppComponent,
        AssignmentsComponent,
        RenduDirective,
        AssignmentDetailComponent,
        AddAssignmentComponent,
        EditAssignmentComponent,
        ConnexionComponent,
        RegisterComponent,
        ParametersAssignmentComponent,
        FilterPipe,
        MatiereFilterPipe,
        UserFilter
    ],
    imports: [
        BrowserModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatCardModule,
        MatCheckboxModule,
        RouterModule.forRoot(routes),
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatSelectModule,
        HttpClientModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatSidenavModule, MatSnackBarModule, MatTableModule, MatStepperModule, ReactiveFormsModule, MatExpansionModule, DragDropModule, MatChipsModule, MatTabsModule, MatRadioModule, MatSortModule
    ],
  providers: [{provide: MatPaginatorIntl}],
  bootstrap: [AppComponent]
})

export class AppModule { }
