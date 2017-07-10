import { DmshopComponent } from './dmshop.component';

import { AuthGuard } from './../auth.guard';
import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
 
  {
    path: 'dmshop',
    component: DmshopComponent,
    children: [
      { path: '', redirectTo: 'shops', pathMatch: 'full' },
      { path: 'shops', loadChildren: './shop/shop.module#ShopModule' },
      { path: 'shops/products/:id', loadChildren: './products/products.module#ProductsModule' },
      /*{ path: 'editors', loadChildren: './editors/editors.module#EditorsModule',canActivate:[AuthGuard] },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule',canActivate:[AuthGuard] },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' ,canActivate:[AuthGuard]},
      { path: 'ui', loadChildren: './ui/ui.module#UiModule' ,canActivate:[AuthGuard]},
      { path: 'forms', loadChildren: './forms/forms.module#FormsModule' ,canActivate:[AuthGuard]},
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' ,canActivate:[AuthGuard]},
      { path: 'maps', loadChildren: './maps/maps.module#MapsModule' ,canActivate:[AuthGuard]}*/
    ]
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
