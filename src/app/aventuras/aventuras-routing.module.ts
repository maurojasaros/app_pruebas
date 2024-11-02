import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AventurasPage } from './aventuras.page';

const routes: Routes = [
  {
    path: '',
    component: AventurasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AventurasPageRoutingModule {}
