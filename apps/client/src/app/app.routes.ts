import {LandingPage} from './pages/landing/landing';
import type {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LandingPage,
  },
];
