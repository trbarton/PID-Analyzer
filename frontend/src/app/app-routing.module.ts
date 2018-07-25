import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { AnalysisComponent } from './components/analysis/analysis.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
