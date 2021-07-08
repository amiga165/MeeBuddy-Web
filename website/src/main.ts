/*!

 =========================================================
 * Argon Desing System PRO Angular - v2.0.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/argon-design-system-pro-angular
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

//import {MatNativeDateModule} from '@angular/material/core';
//import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

if (environment.production) {
  enableProdMode();
}
document.addEventListener('DOMContentLoaded', () => {
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
