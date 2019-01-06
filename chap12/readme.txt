* Chap 12: Productizing an Angular App: Lazy Loading

* Instead of loading everything at once (from root app.module.ts), move as many routes as possible out into sub-modules

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
    
