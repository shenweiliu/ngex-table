import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './ngex-table-demo/app.routes';
import { provideHttpClient } from '@angular/common/http';
//import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient()
        //importProvidersFrom([]) //No need when setting root scope in service classes.
    ]
};
