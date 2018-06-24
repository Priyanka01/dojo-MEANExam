import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllpetsComponent } from './allpets/allpets.component';
import { AddpetComponent } from './addpet/addpet.component';
import { DetailsComponent } from './details/details.component';
import { EditpetComponent } from './editpet/editpet.component';

const routes: Routes = [
  { path: 'pets', component: AllpetsComponent },
  {path: 'pets/new',component:AddpetComponent },
  {path: 'pets/:id',component:DetailsComponent },
  {path: 'pets/edit/:id',component:EditpetComponent },
  // { path: '**', redirectTo:"/pets"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
