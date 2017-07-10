import { Register } from './pages/register/register.component';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {path:'',redirectTo:'dmshop',pathMatch:'full'},
  { path: 'dmadmin', redirectTo: 'pages', pathMatch: 'full' },
 /* { path: '**', redirectTo: 'pages/dashboard'  },*/
];

//export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
