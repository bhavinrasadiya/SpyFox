import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'face',
        children: [
          {
            path: '',
            loadChildren: '../face/face.module#FacePageModule'
          }
        ]
      },
      {
        path: 'web',
        children: [
          {
            path: '',
            loadChildren: '../web/web.module#WebPageModule'
          }
        ]
      },
      {
        path: 'label',
        children: [
          {
            path: '',
            loadChildren: '../label/label.module#LabelPageModule'
          }
        ]
      },
      {
        path: 'text',
        children: [
          {
            path: '',
            loadChildren: '../text/text.module#TextPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/face',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/face',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
