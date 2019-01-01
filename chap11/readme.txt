* Chap 11: Angular Routing, deep-links and AuthGuard

* Initialize source:
1. mkdir $PROJ/chap11

2. Copy $GITHUB/chapter11/service => $PROJ/chap11
   <= Use example HTTP/REST server verbatim

3. cd $PROJ/chap11
     ng new stock-market
       Would you like to add Angular routing? Yes
       Which stylesheet format would you like to use? CSS
     <= Initialize baseline with current latest/greatest Angular libraries/depdencies
     ng generate component stock/create-stock --module=app
     ng generate component stock/stock-item --module=app
     ng generate component stock/stock-list --module=app
     ng generate service services/stock --module=app
     ng generate class model/stock --module=app
     <= Auto-generate module skeletons
     ng test
     <= Verify OK:
        8 specs, 0 failures

   << Saved Git backup >>
===================================================================================================
* Added new, Chap11-specific modules, updated to complete baseline source:
  1. Auto-generate
     ng generate component user/login --module=app
     ng generate component user/register --module=app
       <= Will automatically created subfolders "user/login/*" and "user/register/*"
     ng generate class services/stock-app.interceptor --module=app
     ng generate service services/user --module=app
     ng generate service services/user-store --module=app

  2. Add <base href="/"> to index.html 
     <= For routing...
        OK as-is in auto-generated code

  3. app-routes.module.ts: 
     <= Add custom components to imports, define custom routes in appRoutes[] member

  4. app-module.ts:
     <= Manually added FormsModule, HttpClientModule, [StockService] provider

  5. Updated all custom code from baseline
     <= Stock interface; CreateStock, StockItem, StockList components, etc.
        Did *NOT* add any of the new, Chap11 stuff (eg, "Login" or "Register")

  6. ng test =>
ERROR in src/app/app.component.spec.ts(4,36): error TS2307: Cannot find module 'app/stock/stock-item/stock-item.component'.
src/app/app.component.spec.ts(5,23): error TS2307: Cannot find module 'app/model/stock'.  
     <= Angular7/Typescript3 "relative path" problem again

    - Substituted "import ... './stock/stock-item/stock-item.component'; etc for "'app/stock/stock-item/stock-item.component'"
      NEXT PROBLEM(S)
      ng test =>
      9 specs, 4 failures
      1) StockService should be created
Error: StaticInjectorError[StockService]: 
  NullInjectorError: No provider for StockService!
  ...
      2) CreateStockComponent should create
Failed: Template parse errors:
There is no directive with "exportAs" set to "ngForm" ("="message">{{message}}</div>
<div class="form-group">
  <form (ngSubmit)="createStock(stockForm)" [ERROR ->]#stockForm="ngForm">
    <div class="stock-name">
      <input type="text"
"): ng:///DynamicTestModule/CreateStockComponent.html@4:44
There is no directive with "exportAs" set to "ngModel" ("
             required
             name="stockName"
             [ERROR ->]#stockName="ngModel"
             [(ngModel)]="stock.name">
    </div>
"): ng:///DynamicTestModule/CreateStockComponent.html@10:13
...
      3) StockItemComponent should create
Error: StaticInjectorError(DynamicTestModule)[StockItemComponent -> StockService]: 
  StaticInjectorError(Platform: core)[StockItemComponent -> StockService]: 
    NullInjectorError: No provider for StockService!
    ...
      4) StockListComponent should create
Failed: Template parse errors:
Can't bind to 'stock' since it isn't a known property of 'app-stock-item'.
1. If 'app-stock-item' is an Angular component and it has 'stock' input, then verify that it is part of this module.
2. If 'app-stock-item' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("<app-stock-item *ngFor="let stock of stocks$ | async"
                [ERROR ->][stock]="stock">
</app-stock-item>
"): ng:///DynamicTestModule/StockListComponent.html@1:16
'app-stock-item' is not a known element:
1. If 'app-stock-item' is an Angular component, then verify that it is part of this module.
2. If 'app-stock-item' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("[ERROR ->]<app-stock-item *ngFor="let stock of stocks$ | async"
                [stock]="stock">
</app-stock-"): ng:///DynamicTestModule/StockListComponent.html@0:0
  <= We'll bail on these, for the time being...

  7. Configure NodeJS mock server, Angular proxy:
     $PROJ/Chap11/stock-market/proxy.conf.json:
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}

     - $PROJ/Chap11\run1. bat:
@rem: Execute mock server
@rem EXAMPLE USAGE (from "server" sub-folder): ..\run1
if not exist node_modules (
call npm install
)
set DEBUG=express:* & call node index.js

     - $PROJ/Chap11\run2.bat:
@rem Execute Angular app
@rem EXAMPLE USAGE (from "stock-market" root folder): ..\run2
if not exist node_modules (
call npm install
)
call ng serve --proxy-config proxy.conf.json

  8. Test app:
     - cd $CHAP11/server
       npm install
       <= Load NodeJS/mock server dependencies
       node index.NodeJS
       <= Listening on port 3000

     - cd $CHAP11/stock-market
       ng serve --proxy-config proxy.conf.json
       <= COMPILE ERROR:
ERROR in src/app/services/stock-app.interceptor.ts(10,14): error TS2420: Class '
StockAppInterceptor' incorrectly implements interface 'HttpInterceptor'.
  Property 'intercept' is missing in type 'StockAppInterceptor'.

     - Created dummy implementation for stock-app-interceptor.ts
       <= NEXT PROBLEM:
ERROR 
Object { headers: {…}, status: 403, statusText: "Forbidden", url: "http://localhost:4200/api/stock", ok: false, name: "HttpErrorResponse", message: "Http failure response for http://localhost:4200/api/stock: 403 Forbidden", error: {…} }

     - $CHAP11/server/index.js:
       ...
       app.get('/api/fail', (req, res) => res.status(403).json({msg: 'You are not allowed to access this'}));
       <= App routing is hitting "fail"; the mock server is giving "HTTP 403"...

     - app-routing.module.ts (mysteriously named "AppRoutesModule" in the book ?!?)
       <= Eliminated the "rediret" from the book source:
       - No-go: still HTTP 403/Forbidden...

  8. Do what the book says: modify app.component.html to substitute links to the APIs (vs. load the Angular components):
<!-- HTML link to APIs, instead of Angular loading the components -->
<div class="links">
  <span><a routerLink="/login" routerLinkActive="active">Login</a></span>
  <span><a routerLink="/register" routerLinkActive="active">Register</a></span>
  <span><a routerLink="/stocks/list" routerLinkActive="active">Stock List</a></span>
  <span><a routerLink="/stocks/create" routerLinkActive="active">Create Stock</a></span>
</div>
<router-outlet></router-outlet>

   - Next "ng serve" test:
     - Login => OK (says "login works!", from auto-generated code)
     - Register => OK (says "register works!", from auto-generated code)
     - Stock List => FAILS: Object { headers: {…}, status: 403, statusText: "Forbidden", url: "http://localhost:4200/api/stock"
     - Create Stock => Form displays OK, [Create] button fails HTTP 403

  9. Do what the book says Part II: Add "real" implementations for: { 
       UserStoreService, UserService, LoginComponent, RegisterComponent, StockAppInterceptor
     }\gd

     - user.service.ts:
       <= Substitute "import { Observable } from 'rxjs';" for(obsolete, RxJS6) "rxjs/Observable"

     - login.component.html:
       <= Substitute  "<div *ngIf="usernameField.errors && usernameField.errors['required']">Username is Mandatory</div>"
            for (illegal) "usernameField.errors.required"

     - login.component.ts:
  /* tslint:disable no-inferrable-types */
  public username: string = '';
  public password: string = '';
  public message: string = '';
       <= Turn off TSLint for this syntax

     - register.component.html:
      ...
      <div *ngIf="usernameField.errors && usernameField.errors['required']">Username is Mandatory</div>
      ...
      <div *ngIf="passwordField.errors && passwordField.errors['required']">Password is Mandatory</div>

     - register.component.html:
  /* tslint:disable no-inferrable-types */
  public username: string = '';
  public password: string = '';
  public message: string = '';

     - Added "console.log()" trace messages to all...
       EXAMPLE: console.log('LoginComponent::constructor()');
   
10. Test app (again):
    - Console log, Initial display:
CreateStockComponent::constructor()
CreateStockComponent::initializeStock()
  <= Display OK, console log OK: Perfect!    

    - [Create Stock] button:
CreateStockComponent::createStock() {…}
​  _directives: (5) […]
​​    0: Object { name: "stockName", _registered: true, model: "AAA", … }
​​    1: Object { name: "stockCode", _registered: true, model: "BBB", … }
​​    2: Object { name: "stockPrice", _registered: true, model: 10, … }
​​    3: Object { name: "stockExchange", _registered: true, model: "NASDAQ", … }
​​    4: Object { name: "stockConfirm", _registered: true, model: false, … }
​​    length: 5
​​    <prototype>: Array []
​  form: Object { pristine: false, touched: true, status: "INVALID", … }
​  ngSubmit: Object { _isScalar: false, closed: false, isStopped: false, … }
​  submitted: true
​  <prototype>: Object { constructor: NgForm(), ngAfterViewInit: ngAfterViewInit(), formDirective: Getter, … }
Stock form is in an invalid state
<= This is *CORRECT* - left "I confirm" unchecked, so service (legitimately) rejected it

    - [Create Stock] button; "I confirm" checked, no login yet:
CreateStockComponent::createStock() {…}
  _directives: (5) […]
​​    0: Object { name: "stockName", _registered: true, model: "AAA", … }
​​    1: Object { name: "stockCode", _registered: true, model: "BBB", … }
​​    2: Object { name: "stockPrice", _registered: true, model: 10, … }
​​    3: Object { name: "stockExchange", _registered: true, model: "NASDAQ", … }
​​    4: Object { name: "stockConfirm", _registered: true, model: true, … }
​​    length: 5
​​    <prototype>: Array []
​  form: Object { pristine: false, touched: true, status: "VALID", … }
​  ngSubmit: Object { _isScalar: false, closed: false, isStopped: false, … }
​  submitted: true
​  <prototype>: Object { constructor: NgForm(), ngAfterViewInit: ngAfterViewInit(), formDirective: Getter, … }
  <= This time, the service accepted it...
CreateStockComponent::createStock@error callback 
Object { headers: {…}, status: 403, statusText: "Forbidden", url: "http://localhost:4200/api/stock", ok: false, name: "HttpErrorResponse", message: "Http failure response for http://localhost:4200/api/stock: 403 Forbidden", error: {…} }
  <= This time, the service accepted it...
     .. but the mock server returned 403/Forbidden, {"msg":"Please login to access this information"}

    - [Register], Console log:
ERROR Error: "[object Object]"
	resolvePromise http://localhost:4200/polyfills.js:3159:31
	resolvePromise http://localhost:4200/polyfills.js:3116:17
	scheduleResolveOrReject http://localhost:4200/polyfills.js:3218:17
	invokeTask http://localhost:4200/polyfills.js:2766:17
	onInvokeTask http://localhost:4200/vendor.js:51519:24
	invokeTask http://localhost:4200/polyfills.js:2765:17
	runTask http://localhost:4200/polyfills.js:2533:28
	drainMicroTaskQueue http://localhost:4200/polyfills.js:2940:25
	invokeTask http://localhost:4200/polyfills.js:2845:21
	invokeTask http://localhost:4200/polyfills.js:3885:9
	globalZoneAwareCallback http://localhost:4200/polyfills.js:3911:17
     <= Nothing displayed, nothing shown in "ng serve" DOS prompt...
        ... the only error is shown in the console log...

12. Missed updating app.module.ts:
OLD:
@NgModule({
  ...
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
  ...
UPDATED:
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { StockAppInterceptor } from './services/stock-app.interceptor';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/user-store.service';
...
@NgModule({
  ...
    providers: [
    StockService,
    UserService,
    UserStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StockAppInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
  ...

  - New test:
    - Initial display (Console log):
Angular is running in the development mode. Call enableProdMode() to enable the production mode. core.js:15702
UserStoreService::constructor() user-store.service.ts:8:4
UserService::constructor() user.service.ts:12:4
RegisterComponent::constructor()
  <= Perfect ...
     Everything displays as expected

    - Register:
      - Console log:
        <= Nothing (OK)
      - Username/password form displays
        <= Enter AAA, BBB, [Register]
      - Console log:
RegisterComponent::register() register.component.ts:21:4
UserService::register() AAA BBB user.service.ts:27:4
Successfully registered
      <= Perfect

    - Login:
      - Console log:
        <= Nothing (OK)
      - Username/password form displays
        <= Enter AAA, BBB, [Login]
LoginComponent::constructor() login.component.ts:17:4
LoginComponent::login() login.component.ts:21:4
UserService::login() AAA BBB user.service.ts:16:4
UserStoreService::set token() eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQUFBIiwiaWF0IjoxNTQ2MzIyNzk5fQ.A8eEt8PtZHPSkXh-MydRR9Tb0AxTp3SNiTvCmu4_URI user-store.service.ts:12:4
Successfully logged in login.component.ts:24:8
      <= Again: Perfect!

    - Stock List:
StockListComponent::constructor() stock-list.component.ts:15:4
StockListComponent::ngOnInit() stock-list.component.ts:19:4
ERROR 
Object { headers: {…}, status: 403, statusText: "Forbidden", url: "http://localhost:4200/api/stock", ok: false, name: "HttpErrorResponse", message: "Http failure response for http://localhost:4200/api/stock: 403 Forbidden", error: {…} }
      <= Oh well...

    - Create stock:
CreateStockComponent::constructor() create-stock.component.ts:18:4
CreateStockComponent::initializeStock() create-stock.component.ts:23:4
CreateStockComponent::setStockPrice() 1 create-stock.component.ts:35:4
    <= Form displays OK
CreateStockComponent::setStockPrice() 10 create-stock.component.ts:35:4
CreateStockComponent::setStockPrice() 100
    <= Change price to "100": OK
create-stock.component.ts:35:4
CreateStockComponent::createStock() 
Object { submitted: true, _directives: (5) […], ngSubmit: {…}, form: {…} }
create-stock.component.ts:41:4
CreateStockComponent::createStock@error callback 
Object { headers: {…}, status: 403, statusText: "Forbidden", url: "http://localhost:4200/api/stock", ok: false, name: "HttpErrorResponse", message: "Http failure response for http://localhost:4200/api/stock: 403 Forbidden", error: {…} }
    <= Fails: FORBIDDEN...

13. Completed example (default and catch-all routes,app.component .css, etc)
    Re-tested (with Chrome/Dev tools + Fiddler)

  * Startup:
    - Display:
      <= See Login|Register|Stock List|Create Stock links at top; username/password [Login] form
        Routed URL= http://localhost:4200/login
    - Fiddler:
      <= Much traffic, all to localhost:4200: /runtime.js, /polyfills.js, vendor.js, main.js, runtime.js, ...
    - Console:      
Angular is running in the development mode. Call enableProdMode() to enable the production mode.
user-store.service.ts:8 UserStoreService::constructor()
user.service.ts:12 UserService::constructor()
login.component.ts:17 LoginComponent::constructor()​
      <= Perfect so far...

  * [Login]
    - Display => Invalid username or password
    - Fiddler: => one call: localhost:4200 POST /api/user/login, HTTP 400: Bad Request
      <= No calls to NodeJS at all shown in Fiddler...
    - NodeJS command prompt Window:
  express:router dispatching POST /api/user/login +24m
  express:router query  : /api/user/login +0ms
  express:router expressInit  : /api/user/login +15ms
  express:router bodyParser  : /api/user/login +0ms
  express:router trim prefix (/api/user) from url /api/
  express:router router /api/user : /api/user/login +0m
  express:router dispatching POST /login +0ms    
     <= OK: So Fiddler isn't going to help us debug Angular::NodeJS traffic...
    - Console:
LoginComponent::login()
UserService::login() AAA BBB
StockAppInterceptor::constructor()
StockAppInterceptor::intercept() HttpRequest {url: "/api/user/login", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
UserStoreService::get token() null
POST http://localhost:4200/api/user/login 400 (Bad Request)
Error logging in HttpErrorResponse {headers: HttpHeaders, status: 400, statusText: "Bad Request", url: "http://localhost:4200/api/user/login", ok: false, …}

  * [Register]
    - Console log:
register.component.ts:17 RegisterComponent::constructor()
      <= Username/password form appears;enter AAA/BBB
register.component.ts:21 RegisterComponent::register()
user.service.ts:27 UserService::register() AAA BBB
stock-app.interceptor.ts:17 StockAppInterceptor::intercept() HttpRequest {url: "/api/user/register", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
user-store.service.ts:17 UserStoreService::get token() null
register.component.ts:24 Successfully registered         
      <= See this after clicking [Register]
    - Display => Successfully created user, please login
      <= 100% Perfect!

  * [Login]
    - Console log:
LoginComponent::constructor()    
      <= Username/password form appears; enter AAA/BBB
LoginComponent::login()
user.service.ts:16 UserService::login() AAA BBB
stock-app.interceptor.ts:17 StockAppInterceptor::intercept() HttpRequest {url: "/api/user/login", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
user-store.service.ts:17 UserStoreService::get token() null
user-store.service.ts:12 UserStoreService::set token() eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQUFBIiwiaWF0IjoxNTQ2MzgxNDc1fQ.0-miWqT0m0uumVXHpZMseyAb2SOpIVmj5ovAyYka8hs
login.component.ts:24 Successfully logged in
    - Display => Successfully logged in
      <= Again: 100% Perfect!

  * [Stock List]
    - Console log:
stock-list.component.ts:15 StockListComponent::constructor()
stock-list.component.ts:19 StockListComponent::ngOnInit()
stock-app.interceptor.ts:17 StockAppInterceptor::intercept() HttpRequest {url: "/api/stock", body: null, reportProgress: false, withCredentials: false, responseType: "json", …} HttpXhrBackend {xhrFactory: BrowserXhr}
user-store.service.ts:17 UserStoreService::get token() eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQUFBIiwiaWF0IjoxNTQ2MzgxNDc1fQ.0-miWqT0m0uumVXHpZMseyAb2SOpIVmj5ovAyYka8hs
user-store.service.ts:17 UserStoreService::get token() eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQUFBIiwiaWF0IjoxNTQ2MzgxNDc1fQ.0-miWqT0m0uumVXHpZMseyAb2SOpIVmj5ovAyYka8hs
stock-app.interceptor.ts:19 INTERCEPTING, HAS TOKEN eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQUFBIiwiaWF0IjoxNTQ2MzgxNDc1fQ.0-miWqT0m0uumVXHpZMseyAb2SOpIVmj5ovAyYka8hs
user-store.service.ts:17 UserStoreService::get token() eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQUFBIiwiaWF0IjoxNTQ2MzgxNDc1fQ.0-miWqT0m0uumVXHpZMseyAb2SOpIVmj5ovAyYka8hs
stock-app.interceptor.ts:26 Making an authorized request
stock-item.component.ts:16 StockItemComponent::constructor() StockService {http: HttpClient}
stock-item.component.ts:16 StockItemComponent::constructor() StockService {http: HttpClient}
stock-item.component.ts:16 StockItemComponent::constructor() StockService {http: HttpClient}
  <= All stocks correctly displayed

    - NodeJS:
  express:router dispatching POST /api/user/login +24m
  express:router query  : /api/user/login +0ms
  express:router expressInit  : /api/user/login +15ms
  express:router bodyParser  : /api/user/login +0ms
  express:router trim prefix (/api/user) from url /api/user/login +391ms
  express:router router /api/user : /api/user/login +0ms
  express:router dispatching POST /login +0ms
      <= Failed login...
  express:router dispatching POST /api/user/register +11m
  express:router query  : /api/user/register +3ms
  express:router expressInit  : /api/user/register +3ms
  express:router bodyParser  : /api/user/register +3ms
  express:router trim prefix (/api/user) from url /api/user/register +4ms
  express:router router /api/user : /api/user/register +2ms
  express:router dispatching POST /register +2ms
      <= Successful register...
  express:router dispatching POST /api/user/login +2m
  express:router query  : /api/user/login +2ms
  express:router expressInit  : /api/user/login +2ms
  express:router bodyParser  : /api/user/login +3ms
  express:router trim prefix (/api/user) from url /api/user/login +2ms
  express:router router /api/user : /api/user/login +1ms
  express:router dispatching POST /login +3ms
      <= Successful login...
  express:router dispatching GET /api/stock +51s
  express:router query  : /api/stock +2ms
  express:router expressInit  : /api/stock +3ms
  express:router bodyParser  : /api/stock +3ms
  express:router trim prefix (/api/stock) from url /api/stock +2ms
  express:router <anonymous> /api/stock : /api/stock +3ms
  express:router trim prefix (/api/stock) from url /api/stock +5ms
  express:router router /api/stock : /api/stock +1ms
  express:router dispatching GET / +3ms
      <= Successful query stocks...
      
  << Updated Git >>      

===================================================================================================








