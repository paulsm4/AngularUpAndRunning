Chap9: simple http

* USAGE:
  - run1.bat (Mock server):
     "npm install" (1st time only)
     "node index.js" (run NodeExpress in DEBUG mode)

  - run2.bat (Angular app):
     "npm install" (1st time only)
     "ng serve --proxy-config proxy.conf.json" (use NodeExpress mock server as proxy)
     <= Proxy needed for JS "Same-Origin Policy"

* Test 1: Manually updated Copied
<= No-go: hung at "Loading...".
   Nothing displayed; no errors/no warnings
===================================================================================================

* Test 2:
  - Copied from "simple-http" example,
  - Fixed compile errors (e.g. "import ... 'app/xyz'" => "import ... '../../services/xyz'"
  - Added console.log() trace logging to each method:

    - node index.js (DEBUG) =>
Example app listening on port 3000!
  express:router dispatching GET /api/stock +52m
  express:router query  : /api/stock +16ms
  express:router expressInit  : /api/stock +0ms
  express:router bodyParser  : /api/stock +0ms
  express:router trim prefix (/api/stock) from url /api/stock +0ms
  express:router router /api/stock : /api/stock +0ms
  express:router dispatching GET / +0ms

    - ng serve index.js (PROXY "/api" { target: http://localhost:3000", ...})  =>
StockService::constructor()               stock.service.ts:12:4
StockListComponent::constructor()         stock-list.component.ts:15:4
CreateStockComponent::constructor()       create-stock.component.ts:17:4
AppComponent::ngonInit()                  app.component.ts:12:4
StockListComponent::ngOnInit() undefined  stock-list.component.ts:19:4
StockService::getStocks()                 stock.service.ts:16:4
Angular is running in the development mode. Call enableProdMode() to enable the production mode...
Stock::constructor()                      stock-item.component.ts:16:4
Stock::constructor()                      stock-item.component.ts:16:4
Stock::constructor()                      stock-item.component.ts:16:4
===================================================================================================

* Test3: Added Angular "observe" handlers on response, events, text and blob:
StockService::constructor()               stock.service.ts:15:4
StockListComponent::constructor()         stock-list.component.ts:15:4
CreateStockComponent::constructor()       create-stock.component.ts:17:4
AppComponent::ngonInit()                  app.component.ts:12:4
StockListComponent::ngOnInit()            stock-list.component.ts:19:4
  <= Initialize components
StockService::getStocks()                 stock.service.ts:19:4
  <= getStocks(), called by StockListComponent::ngOnInit()
StockService::getStocksAsResponse()       stock.service.ts:48:4
StockService::getStocksAsEvents()         stock.service.ts:55:4
OBSERVE "events" RESPONSE is              stock-list.component.ts:29:6
  <= Response of getStocksAsEvents()
StockService::getStocksAsString()         stock.service.ts:62:4
StockService::getStocksAsBlob()           stock.service.ts:69:4
Angular is running in the development mode. Call enableProdMode() to enable the production mode. core.js:15702
OBSERVE "response" RESPONSE is
  Object { headers: {…}, status: 200, statusText: "OK", url: "http://localhost:4200/api/stock", ok: true, type: 4, body: (3) […] }
  stock-list.component.ts:24:6
  <= Response of getStocksAsResponse()
OBSERVE "events" RESPONSE is
  Object { headers: {…}, status: 200, statusText: "OK", url: "http://localhost:4200/api/stock", ok: true, type: 4, body: (3) […] }
  stock-list.component.ts:29:6
  <= Response of getStocksAsEvents()
Response Type "text" RESPONSE is  [{"name":"Test Stock Company","code":"TSC","price":85,"previousPrice":80,"exchange":"NASDAQ","favorite":false},{"name":"Second Stock Company","code":"SSC","price":10,"previousPrice":20,"exchange":"NSE","favorite":false},{"name":"Last Stock Company","code":"LSC","price":876,"previousPrice":765,"exchange":"NYSE","favorite":false}] stock-list.component.ts:34:6
  Stock::constructor()
  Object { http: {…} }
  stock-item.component.ts:16:4
  <= Response of getStocksAsStringb()
Response Type "blob" RESPONSE is
  Blob { size: 330, type: "application/json" }
  stock-list.component.ts:39:6
  <= Response of getStocksAsBlob()

* Create new stock:
CreateStockComponent::createStock()
  Object { submitted: true, _directives: (5) […], ngSubmit: {…}, form: {…} }
  create-stock.component.ts:39:4
StockService::createStock()
  Object { name: "AAA", code: "BBB", price: 100, previousPrice: 100, exchange: "NASDAQ", favorite: false }
  stock.service.ts:35:4

​* Return values:
  - OBSERVE "events" RESPONSE is  {…}
​  type: 0
​  <prototype>: {…}
    __defineGetter__: function __defineGetter__()
​​    __defineSetter__: function __defineSetter__()
​​    __lookupGetter__: function __lookupGetter__()
    __lookupSetter__: function __lookupSetter__()
​​    constructor: function Object()
    hasOwnProperty: function hasOwnProperty()
​​    isPrototypeOf: function isPrototypeOf()
​​    propertyIsEnumerable: function propertyIsEnumerable()
​​    toLocaleString: function toLocaleString()
​​    toSource: function toSource()
​​    toString: function toString()
​​    valueOf: function valueOf()

  - OBSERVE "response" RESPONSE is  {…}
  body: (4) […]
​​    0: Object { name: "Test Stock Company", code: "TSC", price: 85, … }
​​    1: Object { name: "Second Stock Company", code: "SSC", price: 10, … }
​​    2: Object { name: "Last Stock Company", code: "LSC", price: 876, … }
​​    3: Object { name: "AAA", code: "BBB", price: 100, … }
​​    length: 4
​​    <prototype>: Array []
​  headers: Object { normalizedNames: Map(0), lazyUpdate: null, lazyInit: lazyInit() }
​  ok: true
​  status: 200
​  statusText: "OK"
​  type: 4
​  url: "http://localhost:4200/api/stock"
​  <prototype>: Object { constructor: HttpResponse(), clone: clone() }

  - OBSERVE "events" RESPONSE is {…}
​  ​ body: (4) […]
​​     0: Object { name: "Test Stock Company", code: "TSC", price: 85, … }
​​     1: Object { name: "Second Stock Company", code: "SSC", price: 10, … }
​​     2: Object { name: "Last Stock Company", code: "LSC", price: 876, … }
​​     3: Object { name: "AAA", code: "BBB", price: 100, … }
​​     length: 4
​​     <prototype>: Array []
​  headers: {…}
​​    lazyInit: function lazyInit()
​​    lazyUpdate: null
​​    normalizedNames: Map(0)
​​    <prototype>: Object { has: has(), get: get(), keys: keys(), … }
​  ok: true
​  status: 200
​  statusText: "OK"
​  type: 4
​  url: "http://localhost:4200/api/stock"
​  <prototype>: Object { constructor: HttpResponse(), clone: clone() }

  - Response Type "text" RESPONSE is  [{"name":"Test Stock Company","code":"TSC","price":85,"previousPrice":80,"exchange":"NASDAQ","favorite":false},{"name":"Second Stock Company","code":"SSC","price":10,"previousPrice":20,"exchange":"NSE","favorite":false},{"name":"Last Stock Company","code":"LSC","price":876,"previousPrice":765,"exchange":"NYSE","favorite":false},{"name":"AAA","code":"BBB","price":100,"previousPrice":100,"exchange":"NASDAQ","favorite":false}]

  - Response Type "blob" RESPONSE is
   Blob
​     size: 427
​     type: "application/json"
​     <prototype>: BlobPrototype
​​       constructor: function ()
​​       size: Getter
​​       slice: function slice()
​​       type: Getter
​​       <prototype>: Object { … }
===================================================================================================

* Test4: Interceptors
  1. Initial display:
     ---------------
StockService::constructor() HttpClient {handler: HttpInterceptingHandler}   stock.service.ts:11
AuthService::constructor()                                                  auth.service.ts:8
StockListComponent::constructor()                                           stock-list.component.ts:20
CreateStockComponent::constructor() StockService {http: HttpClient}         create-stock.component.ts:17
AppComponent::ngonInit() AppComponent {title: "Stock Market App"}           app.component.ts:12
StockListComponent::ngOnInit()                                              stock-list.component.ts:24
StockListComponent::fetchStocks()                                           stock-list.component.ts:29
StockService::getStocks()                                                   stock.service.ts:15
StockAppInterceptor::intercept                                              stock-app.interceptor.ts:36
  req: HttpRequest {
    url: "/api/stock/",
    body: null,
    reportProgress: false,
    withCredentials: false,
    responseType: "json", …}
  next: HttpXhrBackend {xhrFactory: BrowserXhr}
  authService: AuthService {authToken: ""}
StockAppInterceptor::handleResponse: /api/stock/ {type: 0}                  stock-app.interceptor.ts:58

StockAppInterceptor::handleResponse:                                        stock-app.interceptor.ts:58
  /api/stock/
  HttpResponse {
    headers: HttpHeaders,
    status: 200,
    statusText: "OK",
    url: "http://localhost:4200/api/stock/",
    ok: true, …}
Request for  /api/stock/                                                    stock-app.interceptor.ts:60
  Response Status  200
  With body  (3) [{…}, {…}, {…}]
Stock::constructor() StockService {http: HttpClient}                        stock-item.component.ts:16
Stock::constructor() StockService {http: HttpClient}                        stock-item.component.ts:16
Stock::constructor() StockService {http: HttpClient}                        stock-item.component.ts:16

  2. [Set auth token] button:
     ------------------------
  StockListComponent::setAuthToken()

  3. [Refresh Stocks] button:
    -------------------------
StockListComponent::fetchStocks()
stock.service.ts:15 StockService::getStocks()
StockAppInterceptor::intercept
   req: HttpRequest {url: "/api/stock/", body: null, reportProgress: false, withCredentials: false, responseType: "json", …}
   next: HttpXhrBackend {xhrFactory: BrowserXhr}
   authService: AuthService {authToken: "TESTING"}
Making an authorized request
   <= This clones() the request, and adds the header "Authorization: TESTING"
StockAppInterceptor::handleResponse: /api/stock/ {type: 0}
StockAppInterceptor::handleResponse: /api/stock/ HttpResponse {headers: HttpHeaders, status: 200, statusText: "OK", url: "http://localhost:4200/api/stock/", ok: true, …}
Request for  /api/stock/  Response Status  200  With body  (3) [{…}, {…}, {…}]
   <= Dev tools [Network] tab verifies that HTTP header "Authorization: TESTING" was sent with the (cloned) request
Stock::constructor() StockService {http: HttpClient}
Stock::constructor() StockService {http: HttpClient}
Stock::constructor() StockService {http: HttpClientS

  NOTE: Browser refresh sets back to original (clears authToken, etc).

  4. [Making failing call] button:
    -----------------------------
    - Google console log:
StockListComponent::makeFailingCall() TESTING
StockAppInterceptor::intercept req: HttpRequest {url: "/api/fail/", body: null, reportProgress: false, withCredentials: false, responseType: "json", …} next: HttpXhrBackend {xhrFactory: BrowserXhr} authService: AuthService {authToken: "TESTING"}
Making an authorized request
StockAppInterceptor::handleResponse: /api/fail/ {type: 0}
    <= So far, so good.  [Make failing call] button invokes "/api/fail"

    - NodeJS Express log:
express:router dispatching GET / +0ms
express:router dispatching GET /api/fail/ +7m
express:router query  : /api/fail/ +0ms
express:router expressInit  : /api/fail/ +0ms
express:router bodyParser  : /api/fail/ +0ms
    <= Also good...

    - NodeJS Express app:
app.get('/api/fail', (req, res) =>
  res.status(403).json({msg: 'You are not allowed to access this'}));
  <= OK, returns a JSON message and HTTP 403...

    - Google console log (NG EXCEPTION):
zone.js:2969 GET http://localhost:4200/api/fail/ 403 (Forbidden)
  <= Whatever "Zone" is, it got the intended result from server...
<<Much Angular/RxJS internals stuff>>
stock-list.component.ts:47 StockListComponent: Error making failing call TypeError: source.lift is not a function
  <= RxJS6-related error...

    - Breaking changes in rxjs 6.x:
 https://stackoverflow.com/questions/50209119/property-do-does-not-exist-on-type-observableiproduct
 https://stackoverflow.com/questions/48089608/angular-5-interceptor-typeerror-next-handle-do-is-not-a-function
 https://blog.angular-university.io/rxjs-error-handling/
 https://www.academind.com/learn/javascript/rxjs-6-what-changed/

  5.  Refactored stock-app.interceptor.ts for RxJS6 conformance:
...
/*
  OLD:
  import {Observable} from 'rxjs/Observable';
  import 'rxjs/add/operator/do';
 */
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
...
@Injectable()
export class StockAppInterceptor implements HttpInterceptor {
  ...
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ...
    /*
     * OLD:
     * return next.handle(req)
     *   .do(event => this.handleResponse(req, event),
     *      error => this.handleError(req, error));
     */
    return next.handle(req).pipe(
      tap(
        event => this.handleResponse(req, event),
        error => this.handleError(req, error)
      )
    );
  }
  <= All functionality OK at this point...

===================================================================================================

* Test5: Advanced Observables:
  - Split last branch into separate directory: stock-market-interceptor
    <= made backup of RxJS6-compatible lesson part

  - Copied GitHub::simple-html/* => stock-market
    <= We'll use this as the baseline for the remainder of Chap9

  - cd chap9/stock-market
    npm install --save rxjs-compat
    <= RxJS --6.x compatibility mode

    <<All the "deprecated" syntax (including stuff like "import { Stock } from 'app/model/stock'") now works...
    
