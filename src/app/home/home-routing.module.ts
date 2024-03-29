import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
// import { LockGuard } from '../guard/lock.guard';
 


const routes: Routes = [

  {
    path: '',
    component: HomePage,
    // canActivate: [LockGuard],
   
    children: [
      {
        path: 'notes',
        loadChildren: () => import('../pages/notes/notes.module').then( m => m.NotesPageModule)
      },
      
        {
        path: 'home/settings/trash',
        loadChildren: () => import('../pages/trash/trash.module').then( m => m.TrashPageModule)
      },
 
      {
        path: 'home/settings/licence',
        loadChildren: () => import('../pages/licence/licence.module').then( m => m.LicencePageModule)
      },
     /* {
        path: 'trash',
        loadChildren: () => import('../pages/trash/trash.module').then( m => m.TrashPageModule)
     
      },*/
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'settings/lock',
        loadChildren: () => import('../pages/lock/lock.module').then( m => m.LockPageModule)
      },
      {
        path: 'settings/analize',
        loadChildren: () => import('../pages/analize/analize.module').then( m => m.AnalizePageModule)
      },
 
      {
        path: 'settings/report',
        loadChildren: () => import('../pages/report/report.module').then( m => m.ReportPageModule)
      },
      {
        path: 'settings/phone',
        loadChildren: () => import('../pages/phone/phone.module').then( m => m.PhonePageModule)
      },
            {
        path: 'settings/help',
        loadChildren: () => import('../pages/help/help.module').then( m => m.HelpPageModule)
      },
      {
        path: 'complete',
        loadChildren: () => import('../pages/complete/complete.module').then( m => m.CompletePageModule)
      }
    ] 
  }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
