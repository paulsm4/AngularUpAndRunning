* JWT Client authentication

  - Tutorial: Angular 7 - JWT Authentication Example & Tutorial
    http://jasonwatmore.com/post/2018/11/16/angular-7-jwt-authentication-example-tutorial
    https://github.com/cornflourblue/angular-7-jwt-authentication-example

  - References:
    - https://blog.angular-university.io/angular-jwt/  (Part 1)
    - https://blog.angular-university.io/angular-jwt-authentication/ (Part 2)
    - https://auth0.com/resources/ebooks/jwt-handbook
    - https://auth0.com/docs/jwks
    - https://tools.ietf.org/html/rfc7519

0. JWT background:
   - JSON Web Token ("JWT", RFC 7515): a compact, URL-safe means of representing claims
       to be transferred between two parties.
   - Claim: here, basically "the data that's stored in a JWT payload".
       EXAMPLES: "UserId", "Issuer", "ExpirationTime", etc.
       NOTE: A single JWT token may contain multiple claims.
   - A JWT consists of three parts:
     - Header
     - Payload
     - Signature
   - The receiver of a JWT token may validate the payload by inspecting the "Signature"
   - The "Header" specifies {
       alg: RS256, HS256, none, ...
       type: JWT, jwk-set+json, etc (valid "MediaType")
     }
   - "URL-Safe": here, means the fields in the JWT are base64-encoded,each part separated by "."
   - Message Authentication Code (MAC): protects both message's "data integrity" and "authenticity"
     <= Hashes header + payload
   - Authentication: Although most common use case for JWT is "stateless authentication", it's applicable to any "claim"
   - The external authentication server can be completely separate from our application server;
     - There does *NOT* need to be any "shared secret key";
     - There does *NOT* need to be any direct live link between the authentication server or the application server;
     - The application server does *NOT* need to store any password digests;
     - The application server can be completely stateless, as there is no need to keep tokens in-memory between requests. 
       The authentication server can issue the token, send it back and then immediately discard it!

===================================================================================================

1. App overview:
   - jwt-auth app contains two components: Home and Login

   - The main form (app.component.html) is a BootstrapJS jumbotron that wraps <router-outlet>
     <= RouterOutlet: Acts as a placeholder that Angular dynamically fills based on the current router state.
        https://angular.io/api/router/RouterOutlet

   - Initial page LoginComponent ( url: '/login?returnUrl=%2F')

   - app.module.ts registers two HTTP interceptors: {
       JwtInterceptor,
       ErrorInterceptor }

   - JwtInterceptor, ErrorInterceptor both inject AuthenticationService in their respective constructors 

   - app-routing.module.ts registers an Angular route guard that's used to prevent unauthenticated users from accessing restricted routes
     - app-routing.module.ts:
       ----------------------
    ...
    const appRoutes: Routes = [{
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
        ...

   - AuthGuard:
     - also injects AuthenticationService (as well as "Router") in its constructor
     - Redirects to /login (LoginComponent) if user not authenticated
     - auth.guard.ts:
       --------------
...
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

   - ErrorInterceptor intercepts http responses from the api to check if there were any errors
     - It also forces this.authenticationService.logout() and location.reload(true) on HTTP 401 (Unauthorized)
 
   - FakeBackendInterceptor:
     - Alternative to "live service": defines two hard-coded users: {test/test, and Test/User}
     - Comment out "fakeBackendProvider" from providers[] section of app.module.ts to substitute a "live" directory service.

   - JwtInterceptor intercepts http requests from the application to add a JWT auth token to the 
       Authorization header if the user is logged in.
     - jwt.interceptor.ts:
       ------------------
...
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }

   - In this tutorial, FakeBackendInterceptor:
     - Determines "isLoggedIn":
       a) does "request.headers.get('Authorization');" return a valid authHeader?
       b) does authHeader start with the string "Bearer fake-jwt-token"?

     - Accomplishes "login" by creating a JSON user object with the hard-coded token value 'fake-jwt-token'

     - fake-backend.ts:
       ---------------
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ...
        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        ...
               return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: `fake-jwt-token`
                });
     <= In other words, we're *NOT* actually using "JWT"...
        Instead, we're illustrating the *MECHANICS* of how a client would use JWT...

   - EXAMPLE FLOWS:
     - LoginComponent::onSubmit() >
         AuthenticationService::login() >
           this.http.post<any>(`/users/authenticate`, { username, password })
         <= "JwtInterceptor" is invoked
            a) User is authenticated; redirect to /home
               ... or ...
            b) Authentication fails, redirect to /login

===================================================================================================

2. Create Angular project:
   - cd $PROJ/jwtauth
     ng new jwt-auth
       Routing= Y, styles= CSS
Angular CLI: 7.2.1
Node: 8.11.1
OS: win32 x64
Angular: 7.2.0
Package                           Version
-------------------------------------------------
@angular-devkit/architect         0.12.1
@angular-devkit/build-angular     0.12.1
@angular-devkit/build-optimizer   0.12.1
@angular-devkit/build-webpack     0.12.1
@angular-devkit/core              7.2.1
@angular-devkit/schematics        7.2.1
@angular/cli                      7.2.1
@ngtools/webpack                  7.2.1
@schematics/angular               7.2.1
@schematics/update                0.12.1
rxjs                              6.3.3
typescript                        3.2.2
webpack                           4.23.1

   - cd jwt-auth
     npm install bootstrap => bootstrap@4.2.1

     ng g guard _guards/auth --module app.module

     ng g class _helpers/error.interceptor 
     ng g class _helpers/fake-backend
     ng g class _helpers/jwt.interceptor

     ng g class _models/user

     ng g service _services/authentication
     ng g service _services/user

     ng g component home --module app.module
     ng g component login --module app.module

   - Project structure:
src\app:
   + app.component.ts
   + app.module.ts
   \ app.routing.ts
   +---home
      + home.component.ts
      \ index.ts
   +---login
      + index.ts
      \ login.component.ts
   +---_guards
      + auth.guard.ts
      \ index.ts
   +---_helpers
      + error.interceptor.ts
      + fake-backend.ts
      + index.ts
      \ jwt.interceptor.ts
   +---_models
      + index.ts
      \ user.ts
   \---_services
      + authentication.service.ts
      + index.ts
      \ user.service.ts

   - Create "src/typings.d.ts" so our modules can access ${config.apiUrl}
// so the typescript compiler doesn't complain about the global config object
declare var config: any;
     
   - */index.ts:
     - Tutorial uses "Barrel files" (*/index.ts): 
         Groups the exported modules from a folder together so they can be imported 
         using the folder path instead of the full module path.

     - EXAMPLE: $PROJ/src/app/_helpers/index.ts:
export * from './error.interceptor';
export * from './jwt.interceptor';
export * from './fake-backend';

     - EXAMPLE USAGE: $PROJ/src/app/app.module.ts:
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

===================================================================================================

3. Implement code:
   a) Start VS Code:
      - cd $PROJ/jwtauth/jwt-auth
        code .

   b) app.module.ts:
@NgModule({
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
      fakeBackendProvider
  ],
  bootstrap: [AppComponent]

   c) home/home.component.*:

   d) login/login.component.*:

   e) _helpers/error.interceptor.ts:

   f) _helpers/fake-backend.ts:

   g) _helpers/jwt.interceptor.ts:

   h) _models/user.ts:

   i) _services/authentication.service.ts:

   j) _services/user.service.ts:

   k) app-routing.module.ts:
...
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }) // <-- for debug only: displays routes in console window
  ],
  exports: [RouterModule]
})
...

   l) app.component.*:

   m) ..\run.bat
      <= invokes Angular with "ng serve --host 0.0.0.0 --disable-host-check", to allow access from any host on the LAN

===================================================================================================

4. Issues:
  - app.module.ts etc:
      import { JwtInterceptor, ErrorInterceptor } from './_helpers'; => "Not Found"
    - SOLUTION:
       Create "index.ts" file in _helpers/, e.g.
export * from './error.interceptor';
export * from './jwt.interceptor';
export * from './fake-backend';      

  - home.component.ts:
      WARNING: Implement lifecycle hook interface OnInit for method ngOnInit
    - SOLUTION: 
       1) import {Component, OnInit} fomr '@angular/core';
       2) export class HomeComponent implements OnInit {...}

  - login.component.html =>
      <div *ngIf="submitted && f.username.errors" class="invalid-feedback">
          <div *ngIf="f.username.errors.required">Username is required</div>
      </div>
    - SOLUTION:
      1) Change "f.username.errors.required" => "f.username.errors['required']"
      <= Partial fix...
         Still getting:
           Identifier f.username is not defined.  __type does not contain such a member.
      2) Complete fix:
      <div *ngIf="submitted && !!f.username.errors" class="invalid-feedback">
          <div *ngIf="!!f.username.errors['required']">Username is required</div>
      </div>
    - SEE ALSO:
      https://github.com/angular/vscode-ng-language-service/issues/126
      <= form.controls['birthday']
         form.controls.birthday
         "These both work in TS for me but dot notation complains within the language service..."
         "It appears that plugin only recognizes variables declared directly in the class but not the ones nested under formGroup or formBuilder...."
         "When negated, it does not throw the error (meaning that only buyForm.controls.amount.dirty is underlined, not the !buyForm.controls.amount.valid part).
          That is why the solution given above (with double negation) works."

  - app.component.ts =>
      @Component({ selector: 'app', templateUrl: 'app.component.html' })
      WARNING: App should have "kebob name"
    - SOLUTION:
        Changed to "app-root"

  - ng serve
    <= Displays OK ... but [Login] hangs...
    - CAUSE:
https://stackoverflow.com/questions/51199855/error-referenceerror-config-is-not-defined
    <= "I see that he initialized config in the webpack...."
    - WORKAROUND: Delete references to the stupid "config" variable!

===================================================================================================

5. Implementation details:
   a)

===================================================================================================

6. Trace logging:
   a) Initial display:
AuthenticationService::constructor()
app.component.ts:19 AppComponent::constructor()
core.js:16819 Angular is running in the development mode. Call enableProdMode() to enable the production mode.
platform-browser.js:216 Router Event: RoutesRecognized
platform-browser.js:211 RoutesRecognized(id: 1, url: '/', urlAfterRedirects: '/', state: Route(url:'', path:'') { Route(url:'', path:'') } )
platform-browser.js:211 RoutesRecognized {id: 1, url: "/", urlAfterRedirects: "/", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: GuardsCheckStart
platform-browser.js:211 GuardsCheckStart(id: 1, url: '/', urlAfterRedirects: '/', state: Route(url:'', path:'') { Route(url:'', path:'') } )
platform-browser.js:211 GuardsCheckStart {id: 1, url: "/", urlAfterRedirects: "/", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: ChildActivationStart
platform-browser.js:211 ChildActivationStart(path: '')
platform-browser.js:211 ChildActivationStart {snapshot: ActivatedRouteSnapshot}
platform-browser.js:216 Router Event: ActivationStart
platform-browser.js:211 ActivationStart(path: '')
platform-browser.js:211 ActivationStart {snapshot: ActivatedRouteSnapshot}
authentication.service.ts:20 AuthenticationService::currentUserValue() BehaviorSubject {_isScalar: false, observers: Array(1), closed: false, isStopped: false, hasError: false, …}
platform-browser.js:216 Router Event: NavigationCancel
platform-browser.js:211 NavigationCancel(id: 1, url: '/')
platform-browser.js:211 NavigationCancel {id: 1, url: "/", reason: "Navigation ID 1 is not equal to the current navigation id 2"}
platform-browser.js:216 Router Event: NavigationStart
platform-browser.js:211 NavigationStart(id: 2, url: '/login?returnUrl=%2F')
platform-browser.js:211 NavigationStart {id: 2, url: "/login?returnUrl=%2F", navigationTrigger: "imperative", restoredState: null}
platform-browser.js:216 Router Event: RoutesRecognized
platform-browser.js:211 RoutesRecognized(id: 2, url: '/login?returnUrl=%2F', urlAfterRedirects: '/login?returnUrl=%2F', state: Route(url:'', path:'') { Route(url:'login', path:'login') } )
platform-browser.js:211 RoutesRecognized {id: 2, url: "/login?returnUrl=%2F", urlAfterRedirects: "/login?returnUrl=%2F", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: GuardsCheckStart
platform-browser.js:211 GuardsCheckStart(id: 2, url: '/login?returnUrl=%2F', urlAfterRedirects: '/login?returnUrl=%2F', state: Route(url:'', path:'') { Route(url:'login', path:'login') } )
platform-browser.js:211 GuardsCheckStart {id: 2, url: "/login?returnUrl=%2F", urlAfterRedirects: "/login?returnUrl=%2F", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: ChildActivationStart
platform-browser.js:211 ChildActivationStart(path: '')
platform-browser.js:211 ChildActivationStart {snapshot: ActivatedRouteSnapshot}
platform-browser.js:216 Router Event: ActivationStart
platform-browser.js:211 ActivationStart(path: 'login')
platform-browser.js:211 ActivationStart {snapshot: ActivatedRouteSnapshot}
platform-browser.js:216 Router Event: GuardsCheckEnd
platform-browser.js:211 GuardsCheckEnd(id: 2, url: '/login?returnUrl=%2F', urlAfterRedirects: '/login?returnUrl=%2F', state: Route(url:'', path:'') { Route(url:'login', path:'login') } , shouldActivate: true)
platform-browser.js:211 GuardsCheckEnd {id: 2, url: "/login?returnUrl=%2F", urlAfterRedirects: "/login?returnUrl=%2F", state: RouterStateSnapshot, shouldActivate: true}
platform-browser.js:216 Router Event: ResolveStart
platform-browser.js:211 ResolveStart(id: 2, url: '/login?returnUrl=%2F', urlAfterRedirects: '/login?returnUrl=%2F', state: Route(url:'', path:'') { Route(url:'login', path:'login') } )
platform-browser.js:211 ResolveStart {id: 2, url: "/login?returnUrl=%2F", urlAfterRedirects: "/login?returnUrl=%2F", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: ResolveEnd
platform-browser.js:211 ResolveEnd(id: 2, url: '/login?returnUrl=%2F', urlAfterRedirects: '/login?returnUrl=%2F', state: Route(url:'', path:'') { Route(url:'login', path:'login') } )
platform-browser.js:211 ResolveEnd {id: 2, url: "/login?returnUrl=%2F", urlAfterRedirects: "/login?returnUrl=%2F", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: ActivationEnd
platform-browser.js:211 ActivationEnd(path: 'login')
platform-browser.js:211 ActivationEnd {snapshot: ActivatedRouteSnapshot}
platform-browser.js:216 Router Event: ChildActivationEnd
platform-browser.js:211 ChildActivationEnd(path: '')
platform-browser.js:211 ChildActivationEnd {snapshot: ActivatedRouteSnapshot}
platform-browser.js:216 Router Event: NavigationEnd
platform-browser.js:211 NavigationEnd(id: 2, url: '/login?returnUrl=%2F', urlAfterRedirects: '/login?returnUrl=%2F')
platform-browser.js:211 NavigationEnd {id: 2, url: "/login?returnUrl=%2F", urlAfterRedirects: "/login?returnUrl=%2F"}
platform-browser.js:216 Router Event: Scroll
platform-browser.js:211 Scroll(anchor: 'null', position: 'null')
platform-browser.js:211 Scroll {routerEvent: NavigationEnd, position: null, anchor: null}
login.component.ts:26 LoginComponent::constructor()
authentication.service.ts:41 AuthenticationService::logout() ƒ (value) {_super.prototype.next.call(this, this._value = value);}

  b) Failed login:
login.component.ts:43 LoginComponent::onSubmit() FormGroup {validator: null, asyncValidator: null, _onCollectionChange: ƒ, pristine: false, touched: true, …}
authentication.service.ts:25 AuthenticationService::login() aaa aaa
authentication.service.ts:20 AuthenticationService::currentUserValue() BehaviorSubject {_isScalar: false, observers: Array(1), closed: false, isStopped: false, hasError: false, …}
jwt.interceptor.ts:14 JwtInterceptor::interceptor null HttpRequest {url: "/users/authenticate", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpInterceptorHandler {next: HttpInterceptorHandler, interceptor: ErrorInterceptor}
error.interceptor.ts:13 ErrorInterceptor::intercept HttpRequest {url: "/users/authenticate", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpInterceptorHandler {next: HttpXhrBackend, interceptor: FakeBackendInterceptor}
fake-backend.ts:19 FakeBackendInterceptor::intercept null null [{…}]
fake-backend.ts:67 FakeBackendInterceptor::error Username or password is incorrect
error.interceptor.ts:15 ErrorInterceptor::intercept@catchError {status: 400, error: {…}}
    <= [Network] tab: *NO* traffic with back-end host

  c) Successful login:
login.component.ts:43 LoginComponent::onSubmit() FormGroup {validator: null, asyncValidator: null, _onCollectionChange: ƒ, pristine: false, touched: true, …}
authentication.service.ts:25 AuthenticationService::login() test test
authentication.service.ts:20 AuthenticationService::currentUserValue() BehaviorSubject {_isScalar: false, observers: Array(1), closed: false, isStopped: false, hasError: false, …}
jwt.interceptor.ts:14 JwtInterceptor::interceptor null HttpRequest {url: "/users/authenticate", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpInterceptorHandler {next: HttpInterceptorHandler, interceptor: ErrorInterceptor}
error.interceptor.ts:13 ErrorInterceptor::intercept HttpRequest {url: "/users/authenticate", body: {…}, reportProgress: false, withCredentials: false, responseType: "json", …} HttpInterceptorHandler {next: HttpXhrBackend, interceptor: FakeBackendInterceptor}
fake-backend.ts:19 FakeBackendInterceptor::intercept null null [{…}]
fake-backend.ts:57 FakeBackendInterceptor::ok {id: 1, username: "test", firstName: "Test", lastName: "User", token: "fake-jwt-token"}
authentication.service.ts:29 AuthenticationService::login()@save token {id: 1, username: "test", firstName: "Test", lastName: "User", token: "fake-jwt-token"}
platform-browser.js:216 Router Event: NavigationStart
platform-browser.js:211 NavigationStart(id: 3, url: '/')
platform-browser.js:211 NavigationStart {id: 3, url: "/", navigationTrigger: "imperative", restoredState: null}
platform-browser.js:216 Router Event: RoutesRecognized
platform-browser.js:211 RoutesRecognized(id: 3, url: '/', urlAfterRedirects: '/', state: Route(url:'', path:'') { Route(url:'', path:'') } )
platform-browser.js:211 RoutesRecognized {id: 3, url: "/", urlAfterRedirects: "/", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: GuardsCheckStart
platform-browser.js:211 GuardsCheckStart(id: 3, url: '/', urlAfterRedirects: '/', state: Route(url:'', path:'') { Route(url:'', path:'') } )
platform-browser.js:211 GuardsCheckStart {id: 3, url: "/", urlAfterRedirects: "/", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: ChildActivationStart
platform-browser.js:211 ChildActivationStart(path: '')
platform-browser.js:211 ChildActivationStart {snapshot: ActivatedRouteSnapshot}
platform-browser.js:216 Router Event: ActivationStart
platform-browser.js:211 ActivationStart(path: '')
platform-browser.js:211 ActivationStart {snapshot: ActivatedRouteSnapshot}
authentication.service.ts:20 AuthenticationService::currentUserValue() BehaviorSubject {_isScalar: false, observers: Array(1), closed: false, isStopped: false, hasError: false, …}
platform-browser.js:216 Router Event: GuardsCheckEnd
platform-browser.js:211 GuardsCheckEnd(id: 3, url: '/', urlAfterRedirects: '/', state: Route(url:'', path:'') { Route(url:'', path:'') } , shouldActivate: true)
platform-browser.js:211 GuardsCheckEnd {id: 3, url: "/", urlAfterRedirects: "/", state: RouterStateSnapshot, shouldActivate: true}
platform-browser.js:216 Router Event: ResolveStart
platform-browser.js:211 ResolveStart(id: 3, url: '/', urlAfterRedirects: '/', state: Route(url:'', path:'') { Route(url:'', path:'') } )
platform-browser.js:211 ResolveStart {id: 3, url: "/", urlAfterRedirects: "/", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: ResolveEnd
platform-browser.js:211 ResolveEnd(id: 3, url: '/', urlAfterRedirects: '/', state: Route(url:'', path:'') { Route(url:'', path:'') } )
platform-browser.js:211 ResolveEnd {id: 3, url: "/", urlAfterRedirects: "/", state: RouterStateSnapshot}
platform-browser.js:216 Router Event: ActivationEnd
platform-browser.js:211 ActivationEnd(path: '')
platform-browser.js:211 ActivationEnd {snapshot: ActivatedRouteSnapshot}
platform-browser.js:216 Router Event: ChildActivationEnd
platform-browser.js:211 ChildActivationEnd(path: '')
platform-browser.js:211 ChildActivationEnd {snapshot: ActivatedRouteSnapshot}
platform-browser.js:216 Router Event: NavigationEnd
platform-browser.js:211 NavigationEnd(id: 3, url: '/', urlAfterRedirects: '/')
platform-browser.js:211 NavigationEnd {id: 3, url: "/", urlAfterRedirects: "/"}
platform-browser.js:216 Router Event: Scroll
platform-browser.js:211 Scroll(anchor: 'null', position: 'null')
platform-browser.js:211 Scroll {routerEvent: NavigationEnd, position: null, anchor: null}
home.component.ts:18 HomeComponent::ngOnInit()
user.service.ts:12 UserService::getAll()
authentication.service.ts:20 AuthenticationService::currentUserValue() BehaviorSubject {_isScalar: false, observers: Array(1), closed: false, isStopped: false, hasError: false, …}
jwt.interceptor.ts:14 JwtInterceptor::interceptor {id: 1, username: "test", firstName: "Test", lastName: "User", token: "fake-jwt-token"} HttpRequest {url: "/users", body: null, reportProgress: false, withCredentials: false, responseType: "json", …} HttpInterceptorHandler {next: HttpInterceptorHandler, interceptor: ErrorInterceptor}
error.interceptor.ts:13 ErrorInterceptor::intercept HttpRequest {url: "/users", body: null, reportProgress: false, withCredentials: false, responseType: "json", …} HttpInterceptorHandler {next: HttpXhrBackend, interceptor: FakeBackendInterceptor}
fake-backend.ts:19 FakeBackendInterceptor::intercept Bearer fake-jwt-token true [{…}]
fake-backend.ts:57 FakeBackendInterceptor::ok [{…}]
    <= [Network] tab: Again- *NO* traffic with back-end host
