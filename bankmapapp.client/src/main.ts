import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
}).catch(err => console.error(err));












//import { bootstrapApplication } from '@angular/platform-browser';
//import { AppComponent } from './app/app.component';
////import { appConfig } from './app/app.config'; // generated with CLI

//bootstrapApplication(AppComponent)
//  .catch(err => console.error(err));



//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { AppModule } from './app/app.module';

//platformBrowserDynamic().bootstrapModule(AppModule);







//import { bootstrapApplication } from '@angular/platform-browser';
//import { AppComponent } from './app/app.component';
//import { provideRouter } from '@angular/router';
//import { routes } from './app/app.routes';
//import { LoginComponent } from './app/auth/login.component';

//bootstrapApplication(AppComponent, {
//  providers: [
//    provideRouter(routes)
//  ]
//}).catch(err => console.error(err));

///////////////////////////////////////////////

////import { platformBrowser } from '@angular/platform-browser';
////import { AppModule } from './app/app.module';

////platformBrowser().bootstrapModule(AppModule, {
////  ngZoneEventCoalescing: true,
////})
////  .catch(err => console.error(err));
