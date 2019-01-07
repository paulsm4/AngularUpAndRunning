* Chap 12: Productizing an Angular App: Lazy Loading
  - PROBLEM: Initial load for a complex SPA can take a long time
  - SOLUTION: Instead of loading everything at once (from root app.module.ts)...
    ... move as many routes as possible out into sub-modules ("Lazy Loading")

1.Create new routing modules:
   - cd $CHAP12\stock-market
     ng generate module stock --routing =>
CREATE src/app/stock/stock-routing.module.ts (248 bytes)
CREATE src/app/stock/stock.module.ts (275 bytes)

     ng generate module user --routing =>
CREATE src/app/user/user-routing.module.ts (247 bytes)
CREATE src/app/user/user.module.ts (271 bytes)  

2. Update stock-routing.module.ts
   <= Wound up making beaucoup changes. Among other things: "*guard.ts" modules were renamed 
       "AuthGuardService" etc. and moved from "guards/" to "/services"...

3. Reviewed final three: found still *MORE* needed updates:
   - register.component.ts
   - login.component.ts
   - app.component.html

   - http://localhost:4200 => INITIAL ERROR:
ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'login'
Error: Cannot match any routes. URL Segment: 'login'
    at ApplyRedirects.push../node_modules/@angular/router/fesm5/router.js.ApplyRedirects.noMatchError (router.js:2469)
    ...
    <= Needed to update app-routes-module.ts

4. app-routes-modules.ts:
    FAILS:
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'stock', loadChildren: './stock/stock.module#StockModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '**', redirectTo: '/register' }

    GITHUB (BOOK) SOURCE: ALSO FAILS:
const appRoutes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'stock', loadChildren: 'app/stock/stock.module#StockModule' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: '**', redirectTo: 'user/register' }

    CORRECT:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'stock', loadChildren: './stock/stock.module#StockModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '**', redirectTo: './user/register' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutesModule { }


  - test: http://localhost:4200 =>
    - Initialize:
AppComponent::ngOnInit()
core.js:15702 Angular is running in the development mode. Call enableProdMode() to enable the production mode.
user.service.ts:13 UserService::constructor()
login.component.ts:19 LoginComponent::constructor()
  <= Displays OK  
  
    - [Login] (no username/password, no registeration):
LoginComponent::login()
user.service.ts:17 UserService::login()  
stock-app.interceptor.ts:12 StockAppInterceptor::constructor()
stock-app.interceptor.ts:16 StockAppInterceptor::intercept(): INTERCEPTING HttpRequest {url: "/api/user/login", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
zone.js:2969 POST http://localhost:4200/api/user/login 400 (Bad Request)
login.component.ts:30 Error logging in HttpErrorResponse {headers: HttpHeaders, status: 400, statusText: "Bad Request", url: "http://localhost:4200/api/user/login", ok: false, …}
  <= Perfect!  Displays "Invalidusername or password"
      - [Network] tab:
Request URL: http://localhost:4200/api/user/login
Request Method: POST
Status Code: 400 Bad Request
Remote Address: 127.0.0.1:4200
  <= Only one call made, to "login" api      
    
    - [Register] (just click link - nothing more yet):
      - Console: RegisterComponent::constructor()
      - [Network] tab: nothing
      <= Good...

    - [Register] (just click link - nothing more yet): => NEXT ERROR:
RegisterComponent::register()
user.service.ts:28 UserService::register() AAA BBB
stock-app.interceptor.ts:16 StockAppInterceptor::intercept(): INTERCEPTING HttpRequest {url: "/api/user/register", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
register.component.ts:26 Successfully registered
  <= So far, so good.

       - Display: "Successfully created user, please login"
         <= Again, great. But then...
         
       - Console (continued):
core.js:14597 ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'login'
Error: Cannot match any routes. URL Segment: 'login'
    at ApplyRedirects.push../node_modules/@angular/router/fesm5/router.js.ApplyRedirects.noMatchError (router.js:2469)
    at CatchSubscriber.selector (router.js:2450)
    at CatchSubscriber.push../node_modules/rxjs/_esm5/internal/operators/catchError.js.CatchSubscriber.error (catchError.js:34)
    at MapSubscriber.push../node_modules/rxjs/_esm5/internal/Subscriber.js.Subscriber._error (Subscriber.js:80)
    ...

  - Search "login" =>
    - app-routes.module.ts
  5,33:   { path: '', redirectTo: 'user/login', pathMatch: 'full' },
    - app.component.html
  2,30:   <span><a routerLink="/user/login" routerLinkActive="active">Login</a></span>
    - services\auth.guard.service.ts
  24,30:       this.router.navigate(['login']);
    - services\user.service.ts
  16,3:   login(username: string, password: string): Observable<any> {
  17,31:     console.log('UserService::login()', username, password);
  18,38:     return this.http.post('/api/user/login', {
    - user\login\login.component.html
  3,21:   <form (ngSubmit)="login()">
  22,27:     <button type="submit">Login</button>
    - user\login\login.component.ts
  6,18:   selector: 'app-login',
  7,19:   templateUrl: './login.component.html',
  8,18:   styleUrls: ['./login.component.css']
  10,14: export class LoginComponent {
  19,18:     console.log('LoginComponent::constructor()');
  22,3:   login() {
  24,22:     this.userService.login(this.username, this.password)
    - user\register\register.component.ts
  28,32:         this.router.navigate(['login']);
    - user\user-routing.module.ts
  4,10: import { LoginComponent } from './login/login.component';
  8,12:   { path: 'login', component: LoginComponent },
     - user\user.module.ts
  6,10: import { LoginComponent } from './login/login.component';
  11,5:     LoginComponent,
  
5. ACTUAL PROBLEM:
   - register.component.ts:
  register() {
    this.userService.register(this.username, this.password)
      .subscribe((resp) => {
        this.message = resp.msg;
        // this.router.navigate(['login']);  // <-- WRONG!
        this.router.navigate(['user', 'login']);  // <-- CORRRECT
  
  - New test:
    - http://localhost:4200 =>
AppComponent::ngOnInit()
core.js:15702 Angular is running in the development mode. Call enableProdMode() to enable the production mode.
user.service.ts:13 UserService::constructor()
login.component.ts:19 LoginComponent::constructor()
    <= OK: Display: prompts for username/password

    - [Login]      
      <= OK: HTTP 400: no users registered

    - [Register]
RegisterComponent::constructor()
register.component.ts:23 RegisterComponent::register()
user.service.ts:28 UserService::register() ABC DEF
stock-app.interceptor.ts:12 StockAppInterceptor::constructor()
stock-app.interceptor.ts:16 StockAppInterceptor::intercept(): INTERCEPTING HttpRequest {url: "/api/user/register", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
register.component.ts:26 Successfully registered
login.component.ts:19 LoginComponent::constructor()
     <= OK: user registered, routes back to "login" (URL= http://localhost:4200/user/login)

    - [Login]      
      <= NEXT ERROR:
core.js:14597 ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'stocks/list'
Error: Cannot match any routes. URL Segment: 'stocks/list'
    at ApplyRedirects.push../node_modules/@angular/router/fesm5/router.js.ApplyRedirects.noMatchError (router.js:2469)
    at CatchSubscriber.selector (router.js:2450)
    at CatchSubscriber.push../node_modules/rxjs/_esm5/internal/operators/catchError.js.CatchSubscriber.error (catchError.js:34)
    at MapSubscriber.push../node_modules/rxjs/_esm5/internal/Subscriber.js.Subscriber._error (Subscriber.js:80)
    ...  <= Sigh...

    - [Stock List]
AuthGuardService::canActivate()
auth.guard.service.ts:18 AuthGuardService#canActivate: AUTHORIZED
stock.service.ts:14 StockService::constructor()
stock-list.component.ts:21 StockListComponent::constructor()
stock-list.component.ts:25 StockListComponent::ngOnInit: Page No. :  null
stock-list.component.ts:28 Page :  undefined
stock.service.ts:18 StockService::getStocks()
stock-app.interceptor.ts:16 StockAppInterceptor::intercept(): INTERCEPTING HttpRequest {url: "/api/stock", body: null, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
stock-app.interceptor.ts:18 INTERCEPTING, HAS TOKEN
stock-app.interceptor.ts:25 Making an authorized request
stock-item.component.ts:16 StockItemComponent::constructor()
  <= OK: prints three stocks (TSC, SSC, LSC) routes "login" (URL= http://localhost:4200/stock/list)                ; 

6. PROBLEM:
   - login.component.ts:
this.userService.login(this.username, this.password)
      .subscribe((resp) => {
        this.message = resp.msg;
        // this.router.navigate(['stock', 'list'], {queryParams: {page: 1}});       // <-- BAD
        this.router.navigate(['stock', 'list'], {queryParams: {page: 1}});  // <-- CORRECT

   - New test: http://localhost:4200 > [Login] =>
AppComponent::ngOnInit()
core.js:15702 Angular is running in the development mode. Call enableProdMode() to enable the production mode.
user.service.ts:13 UserService::constructor()
login.component.ts:19 LoginComponent::constructor()
login.component.ts:23 LoginComponent::login()
user.service.ts:17 UserService::login() AAA BBB
stock-app.interceptor.ts:12 StockAppInterceptor::constructor()
stock-app.interceptor.ts:16 StockAppInterceptor::intercept(): INTERCEPTING HttpRequest {url: "/api/user/login", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
login.component.ts:26 Successfully logged in
auth.guard.service.ts:12 AuthGuardService::constructor()
auth.guard.service.ts:16 AuthGuardService::canActivate()
auth.guard.service.ts:18 AuthGuardService#canActivate: AUTHORIZED
stock.service.ts:14 StockService::constructor()
stock-list.component.ts:21 StockListComponent::constructor()
stock-list.component.ts:25 StockListComponent::ngOnInit: Page No. :  1
stock-list.component.ts:28 Page :  1
stock.service.ts:18 StockService::getStocks()
stock-app.interceptor.ts:16 StockAppInterceptor::intercept(): INTERCEPTING HttpRequest {url: "/api/stock", body: null, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
stock-app.interceptor.ts:18 INTERCEPTING, HAS TOKEN
stock-app.interceptor.ts:25 Making an authorized request
3stock-item.component.ts:16 StockItemComponent::constructor() 
  <= Login successful, stocks displayed.  Yay!

<< Updated Git>>
===================================================================================================
* Chap12: Server-side rendering and handling SEO (Search Engine Optimization/Page rankings)
  - An SPA does the following:
    1. User sends request to the URL corresponding to the SPA's "base path" on the Server
    2. Server replies with the "index.html" (root document) for that path
    3. Browser recursively loads all initial content (.js, .css, image files, etc.) referenced by index.html
    4. The SPA will now bootstrap, parse the route, and load necessarily components
    5. The components will make whatever server calls they need to fetch data, then render
    <= Important points:
      a) Much happens before the final view is displayed to the viewer (at the end of step 5)
      b) Search engine crawlers don't render anytning, don't execute Javascript ... and won't "see" much "content"
        <= By the nature of an SPA, all of the content we'd like a search engine to index simply isn't available at load time
  - One solution: Server Side Rendering (SSR)

1. ROLL BACK "Lazy Loading" example
  <= Revert back to chap11/routing guard example
  
2. Install dependencies:
   - cd stock-market      
     npm install --save @angular/platform-server @nguniversal/module-map-ngfactory-loader ts-loader @nguniversal/express-engine =>
+ @angular/platform-server@7.1.4
+ @nguniversal/module-map-ngfactory-loader@7.0.2
+ @nguniversal/express-engine@7.0.2
+ ts-loader@5.3.3
  <= 1 high severity vulnerability

   - npm audit fix =>
npm WARN @angular/platform-server@7.1.4 requires a peer of @angular/http@7.1.4 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
up to date in 14.708s
fixed 0 of 1 vulnerability in 41112 scanned packages
  1 vulnerability required manual review and could not be updated   
  <= fsevents is irrelevant: MacOS only
     
   - Added "peer": npm install --save @angular/http =>
+ @angular/http@7.1.4
added 1 package from 1 contributor and audited 41114 packages in 16.363s
found 1 high severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details

   - npm audit fix
     <= Same: bogus warnings about unwanted "fsevents"; fixed 0 of 1 vulnerability

2. Update app.module.ts:
import { NgModule, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { isPlatformBrowser, APP_BASE_HREF } from '@angular/common';
...
@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'stock-app' }),
    ...
  providers: [
     {provide: APP_BASE_HREF, useValue: ''}
     ...
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);

3.  Update URLs in stock.service.ts:
import { Injectable, Optional, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
...
  private baseUrl: string;  // SSR-specific

  // SSR Version
  constructor(private http: HttpClient,
              private userStore: UserStoreService,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUrl = `${origin}/api/stock`; // Note "Template Literal"  (`...`)
    console.log('StockService::constructor: APP BASE HREF', this.baseUrl, origin);
  }

  getStocks(): Observable<Stock[]> {
    // return this.http.get<Stock[]>('/api/stock'); // Non-SSR version
    return this.http.get<Stock[]>(this.baseUrl);  // SSR version
  }

  getStock(code: string): Observable<Stock> {
    // return this.http.get<Stock>('/api/stock/' + code);  // Non-SSR version
    return this.http.get<Stock>(this.baseUrl + code);
  }

  createStock(stock: Stock): Observable<any> {
    // return this.http.post('/api/stock', stock);  // Non-SSR version
    return this.http.post(this.baseUrl, stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    console.log('StockService::toggleFavorite()', stock);
    // return this.http.patch<Stock>('/api/stock/' + stock.code,  // Non-SSR version
    return this.http.patch<Stock>(this.baseUrl + stock.code,
      {
        favorite: !stock.favorite
      });

4.  Update URLs in user.service.ts:
// import { Injectable } from '@angular/core';  // Non-SSR version
import { Injectable, Optional, Inject } from '@angular/core';  // SSR version
import { APP_BASE_HREF } from '@angular/common';  // SSR-specific
...
  private baseUrl: string;  // SSR-specific

  // constructor(private http: HttpClient, private userStore: UserStoreService) {  // Non-SSR version
  constructor(private http: HttpClient,
              private userStore: UserStoreService,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUrl = `${origin}/api/user/`; // Note "Template Literal"  (`...`)
    console.log('UserService::constructor: APP BASE HREF', this.baseUrl, origin);
    ...
  login(username: string, password: string): Observable<any> {
    console.log('UserService::login()', username, password);
    return this.http.post(this.baseUrl + 'login', {  // SSR-specific
    ...
  register(username: string, password: string): Observable<any> {
    console.log('UserService::register()', username, password);
    return this.http.post(this.baseUrl + 'register', {  // SSR-specific
    ...
5. Create new, parallel app.server.module.ts, main.server.ts, $PROJ_ROOT/server.ts
   <= "server.ts" is an example (simplistic, insecure!) Express web server that servers the Angular app ...
      ... after rendering it on the server side

6. Create new, parallel src/tsconfig.server.json
   <= extends tsconfig.json

7. Add $PROJ_ROOT/.angular-cli.json

8. Update $PROJ_ROOT/package.json:
  ...
 "scripts": {
    "ng": "ng",
    ...
    "build:universal": "npm run build:client-and-server-bundles && npm run webpack:server",
    "serve:universal": "node dist/server.js",
    "webpack:server": "webpack --config webpack.server.config.js --progress --colors"
  },
  ...

9. Save and build:
   - npm run build:universal =>
> stock-market-ssr@0.0.0 build:universal D:\paul\proj\AngularUpAndRunning\tutori
als\chap12\stock-market-ssr
> npm run build:client-and-server-bundles && npm run webpack:server
> stock-market-ssr@0.0.0 build:client-and-server-bundles D:\paul\proj\AngularUpAndRunning\tutorials\chap12\stock-market-ssr
> ng build --prod && ng build --prod --app 1 --output-hashing=false
 10% building modules 0/1 modules 1 active ...als\chap12\stock-market-ssr\src\ma 10% building modules 1/2 modules 1 active ...hap12\stock-market-ssr\src\polyfil   
 ...
Time: 37623ms
chunk {0} runtime.ec2944dd8b20ec099bf3.js (runtime) 1.41 kB [entry] [rendered]
chunk {1} main.ed309dd482b5c98eb2f2.js (main) 366 kB [initial] [rendered]
chunk {2} polyfills.fec146f4472ee5fb9cac.js (polyfills) 37.5 kB [initial] [rendered]
chunk {3} styles.3ff695c00d717f2d2a11.css (styles) 0 bytes [initial] [rendered]
Cannot parse arguments. See below for the reasons.
    Argument --output-hashing could not be parsed using value "false". Valid values are: "none", "all", "media", "bundles".
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! stock-market-ssr@0.0.0 build:client-and-server-bundles: `ng build --prod && ng build --prod --app 1 --output-hashing=false`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the stock-market-ssr@0.0.0 build:client-and-server-bundles script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\paulsm\AppData\Roaming\npm-cache\_logs\2019-01-07T00_40_54_622Z-debug.log
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! stock-market-ssr@0.0.0 build:universal: `npm run build:client-and-server-bundles && npm run webpack:server`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the stock-market-ssr@0.0.0 build:universal script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\paulsm\AppData\Roaming\npm-cache\_logs\2019-01-07T00_40_54_653Z-debug.log

   - %USERPROFILE%\AppData\Roaming\npm-cache\_logs:
    <= Similarly unhelpful:
...
11 silly lifecycle stock-market-ssr@0.0.0~build:universal: Returned: code: 1  signal: null
12 info lifecycle stock-market-ssr@0.0.0~build:universal: Failed to exec build:universal script
13 verbose stack Error: stock-market-ssr@0.0.0 build:universal: `npm run build:client-and-server-bundles && npm run webpack:server`
13 verbose stack Exit status 1
13 verbose stack     at EventEmitter.<anonymous> (C:\Users\paulsm\AppData\Roaming\npm\node_modules\npm\node_modules\npm-lifecycle\index.js:301:16)
... 
20 error code ELIFECYCLE
21 error errno 1
...
  <= Saved Backup (chap12.bu2), copied GitHub (book/Chap 12 example) verbatim

===================================================================================================

1. Copied server-side-rendering (original GitHub example project) verbatim
   - npm install =>
added 1258 packages from 1149 contributors and audited 9770 packages in 170.517s
found 145 vulnerabilities (52 low, 68 moderate, 25 high)
  run `npm audit fix` to fix them, or `npm audit` for details

   - npm audit fix =>
npm WARN @angular/animations@5.2.9 requires a peer of @angular/core@5.2.9 but none is installed. You must install peer dependencies yourself.
npm WARN @angular/platform-server@5.2.9 requires a peer of @angular/core@5.2.9 but none is installed. You must install peer dependencies yourself.
npm WARN @angular/platform-server@5.2.9 requires a peer of @angular/common@5.2.9 but none is installed. You must install peer dependencies yourself.
npm WARN @angular/platform-server@5.2.9 requires a peer of @angular/compiler@5.2.9 but none is installed. You must install peer dependencies yourself.
npm WARN @angular/platform-server@5.2.9 requires a peer of @angular/platform-browser@5.2.9 but none is installed. You must install peer dependencies yourself.
npm WARN @angular/platform-server@5.2.9 requires a peer of @angular/platform-browser-dynamic@5.2.9 but none is installed. You must install peer dependencies yourself.
npm WARN codelyzer@2.0.1 requires a peer of @angular/compiler@^2.3.1 || >=4.0.0-beta <5.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN codelyzer@2.0.1 requires a peer of @angular/core@^2.3.1 || >=4.0.0-beta <5.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.1.2 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
+ protractor@5.4.2   
added 164 packages from 146 contributors, removed 31 packages, updated 17 packages and moved 3 packages in 40.794s
fixed 43 of 145 vulnerabilities in 9770 scanned packages
  2 package updates for 102 vulns involved breaking changes
  (use `npm audit fix --force` to install breaking changes; or refer to `npm audit` for steps to fix these manually)

2. npm run build:universal =>
Hash: 914e3ac1899ee2eb0513
Version: webpack 3.11.0
Time: 10611ms
    Asset     Size  Chunks                    Chunk Names
server.js  7.01 MB       0  [emitted]  [big]  server
 [124] ./src lazy 160 bytes {0} [built]
 [151] (webpack)/buildin/module.js 517 bytes {0} [built]
 [226] ./server.ts 1.81 kB {0} [built]
 [295] ./src 160 bytes {0} [built]
 [471] ./dist/server/main.bundle.js 58.7 kB {0} [built]
    + 585 hidden modules
    <= Success?

3. npm run serve:universal =>
> node dist/server.js
[HPM] Proxy created: /  ->  http://localhost:3000
Node server listening on http://localhost:4000

  - Google Chrome > F12 (Dev tools) > [Network] >
      http://localhost:4000
http://localhost:4000/                                          GET  200: OK
http://localhost:4000/styles.0744b9f6769c326ccd7f.bundle.css    GET  200: OK
http://localhost:4000/inline.318b50c57b4eba3d437b.bundle.js     GET  200: OK
http://localhost:4000/polyfills.62273b8dec3fcb13eadf.bundle.js  GET  200: OK
http://localhost:4000/main.e70f4ca9d7901aa463a8.bundle.js       GET  200: OK
http://localhost:4000/favicon.ico                               GET  200: OK

    - console:
Running in the browser with appId=stock-app
main.e70f4ca9d7901aa463a8.bundle.js:1 APP BASE HREF     

4. Added additional log msgs:
   - npm run build:universal
     npm run serve:universal
     <= OK

   - Google Chrome > F12 >  http://localhost:4000 =>
     - [Network tab]
       <= Same files, different hashes

     - Google browser Console:
AppModule::constructor: Running in the browser with appId=stock-app browser stock-app
main.399b6c948b2998be6d00.bundle.js:1 AppComponent::ngOnInit()
main.399b6c948b2998be6d00.bundle.js:1 APP BASE HREF 
main.399b6c948b2998be6d00.bundle.js:1 UserService::constructor /api/user/
main.399b6c948b2998be6d00.bundle.js:1 LoginComponent::constructor()    

     - Windows cmd line:
D:\paul\proj\AngularUpAndRunning\tutorials\chap12\server-side-rendering>npm run serve:universal
> stock-market@0.0.0 serve:universal D:\paul\proj\AngularUpAndRunning\tutorials\chap12\server-side-rendering
> node dist/server.js
[HPM] Proxy created: /  ->  http://localhost:3000
Node server listening on http://localhost:4000
   <= Same as before...
AppModule::constructor: Running on the server with appId=stock-app server stock-app
AppComponent::ngOnInit()
APP BASE HREF http://localhost:4000/
UserService::constructor http://localhost:4000//api/user/
LoginComponent::constructor()     
   <= Additional server-side logging
   
5. "Failed" vs. "GitHub" projects version info:
"Failed" (current Angular CLI):                                      "Works" (book's Angular CLI):
------------------------------                                       ----------------------------
Angular CLI: 7.1.4                                                   Angular CLI: 1.7.3
Node: 8.11.1                                                         Node: 8.11.1
OS: win32 x64                                                        OS: win32 x64
Angular: 7.1.4                                                       Angular: 5.2.0
... animations, cli, common, compiler, compiler-cli, core, forms     ... common, compiler, compiler-cli, core, forms, http
... http, language-service, platform-browser                         ... platform-browser, platform-browser-dynamic, router
... platform-browser-dynamic, platform-server, router

Package                           Version   Package                          Version
-----------------------------------------   ----------------------------------------
*                                 *         @angular/animations:             5.2.9
*                                 *         @angular/cli:                    1.7.3
*                                 *         @angular/platform-server:        5.2.9
@angular-devkit/architect         0.11.4    *                                *
@angular-devkit/build-angular     0.11.4    *                                *
@angular-devkit/build-optimizer   0.11.4    @angular-devkit/build-optimizer: 0.3.2
@angular-devkit/build-webpack     0.11.4    *                                *
@angular-devkit/core              7.1.4     @angular-devkit/core:            0.3.2
@angular-devkit/schematics        7.1.4     @angular-devkit/schematics:      0.3.2
*                                 *         @ngtools/json-schema:            1.2.0
@ngtools/webpack                  7.1.4     @ngtools/webpack:                1.10.2
@schematics/angular               7.1.4     @schematics/angular:             0.3.2
@schematics/update                0.11.4    @schematics/package-update:      0.3.2
rxjs                              6.3.3     *                                *
typescript                        3.1.6     typescript:                      2.4.2
webpack                           4.23.1    webpack:                         0.11.0






