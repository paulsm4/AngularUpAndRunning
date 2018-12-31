* Chap11: Unit Testing Services

1. Source baseline: "clean slate":
   - Git bash:
     mkdir $PROJ/chap11;cd chap11
     ng new stock-market
       Routing= N, Style= CSS
       <= Creates stock-market/*, including:
            src/app/*, node_modules, angular.json, package.json, tsconfig.json, tslint.json; README.md
     cd $PROJ/chap11/stock-market

     ng generate component stock/stock-item =>
CREATE src/app/stock/stock-item/stock-item.component.html (29 bytes)
CREATE src/app/stock/stock-item/stock-item.component.spec.ts (650 bytes)
CREATE src/app/stock/stock-item/stock-item.component.ts (284 bytes)
CREATE src/app/stock/stock-item/stock-item.component.css (0 bytes)
UPDATE src/app/app.module.ts (416 bytes)

     ng generate class model/stock =>
CREATE src/app/model/stock.ts (23 bytes)

     ng generate component stock/stock-list
CREATE src/app/stock/stock-list/stock-list.component.html (29 bytes)
CREATE src/app/stock/stock-list/stock-list.component.spec.ts (650 bytes)
CREATE src/app/stock/stock-list/stock-list.component.ts (284 bytes)
CREATE src/app/stock/stock-list/stock-list.component.css (0 bytes)
UPDATE src/app/app.module.ts (518 bytes)

     ng generate component stock/create-stock
CREATE src/app/stock/create-stock/create-stock.component.html (31 bytes)
CREATE src/app/stock/create-stock/create-stock.component.spec.ts (664 bytes)
CREATE src/app/stock/create-stock/create-stock.component.ts (292 bytes)
CREATE src/app/stock/create-stock/create-stock.component.css (0 bytes)
UPDATE src/app/app.module.ts (628 bytes)


     ng generate service services/stock
CREATE src/app/services/stock.service.spec.ts (328 bytes)
CREATE src/app/services/stock.service.ts (134 bytes)
     <= All auto-generated code to this point...
     
2. Add application (custom) code
   - ng test
     <= Verify OK: Karma v3.1.4 - connected, 7 specs, 0 failures

     NOTE: 
     Auto-generated karma.conf.js resides in "stock-market/src" 
     <= *NOT* necessarily in "stock-market/" project root, as in GitHub examples...

   - code .
     <= Start VSCode

   - app.module.ts
     <= Updated imports, @NgModule imports[] and providers[]
 
     ERROR: import { HttpModule } from '@angular/http';
     <= Can't find module '@angular/http'
     - npm install @angular/http --save =>
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
+ @angular/http@7.1.4
added 1 package from 1 contributor and audited 40180 packages in 18.574s
     <= Perfect (ignore warning about irrelevant MacOS dependency...)

   - app.component.ts, .html
     <= Added OnInit, HTML markup for <app-stock-list>, <app-create-stock>

   - model/stock.ts
     <= Implemented class

     NOTES:
     - We're back to "class" (vs. "interface"): Yay!
     - *NO* .spec unit test for this guy...

   - stock/stock-item/stock-item.component.ts, .html, .css

   - stock/stock-list/stock-list.component.ts, .html, .css

   - stock/create-stock/create-stock.component.ts, .html, .css

   - services/stock.service.ts

3. ng test => FAIL:
   7 specs, 7 failures

    1) AppComponent should create the app:
    2) AppComponent should have as title 'stock-market'
    3) AppComponent should render title in a h1 tag
    <= All exactly the same error:
Failed: Template parse errors:
'app-stock-list' is not a known element:
1. If 'app-stock-list' is an Angular component, then verify that it is part of this module.
2. If 'app-stock-list' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("
  {{title}}
</h1>
[ERROR ->]<app-stock-list></app-stock-list>
<app-create-stock></app-create-stock>
"): ng:///DynamicTestModule/AppComponent.html@3:0
'app-create-stock' is not a known element:
1. If 'app-create-stock' is an Angular component, then verify that it is part of this module.
2. If 'app-create-stock' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("
</h1>
<app-stock-list></app-stock-list>
[ERROR ->]<app-create-stock></app-create-stock>
"): ng:///DynamicTestModule/AppComponent.html@4:0 

    4) StockService should be created
    5) CreateStockComponent should create
    <= Both the same error
Error: StaticInjectorError[StockService]: 
  NullInjectorError: No provider for StockService!
    at NullInjector.push../node_modules/@angular/core/fesm5/core.js.NullInjector.get (http://localhost:9876/node_modules/@angular/core/fesm5/core.js?:3228:1)
    at resolveToken (http://localhost:9876/node_modules/@angular/core/fesm5/core.js?:3473:1)
    ...

    6) StockItemComponent should create
TypeError: Cannot read property 'favorite' of undefined
    at Object.eval [as updateDirectives] (ng:///DynamicTestModule/StockItemComponent.ngfactory.js:45:32)
    at Object.debugUpdateDirectives [as updateDirectives] (http://localhost:9876/node_modules/@angular/core/fesm5/core.js?:22477:1)
    ...

    7) StockListComponent should create
Failed: Template parse errors:
Can't bind to 'stock' since it isn't a known property of 'app-stock-item'.
1. If 'app-stock-item' is an Angular component and it has 'stock' input, then verify that it is part of this module.
2. If 'app-stock-item' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("<app-stock-item *ngFor="let stock of stocks" [ERROR ->][stock]="stock"
                (toggleFavorite)="onToggleFavorite($event)">
</app-stock-item>
"): ng:///DynamicTestModule/StockListComponent.html@0:45

   - app.module.ts =>
NgModule({
  declarations: [
    AppComponent,
    CreateStockComponent,
    StockItemComponent,
    StockListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    StockService
  ],
  bootstrap: [AppComponent]
})
  <= Appears 100% OK: no changes needed...
     
   - create-stock.component.html
     <= Whoops!  Failed to update HTML!

     - FIRST PROBLEM:
    <div *ngIf="stockName.errors && stockName.errors.required">Stock Name is Mandatory</div>
ERROR: Identifier 'required' is not defined. '__type' does not contain such a member

      - Links:
https://stackoverflow.com/questions/47466324/identifier-required-is-not-defined-type-does-not-contain-such-a-member
          OPTIONS:
          - try to add "?" after "price".
          - <div *ngIf="price.errors['required']">
          - <div *ngIf="!!price.errors.required">Price is required.</div>

     - SOLUTION:
      <div *ngIf="stockCode.dirty && stockCode.invalid">
      <div *ngIf="stockCode.errors['required']">Stock Code is Mandatory</div>
      <div *ngIf="stockCode.errors['minlength']">Stock Code must be atleast of length 2</div>
        <= This is better than "!!" (which is how we resolved it the last time...)

   - ng test => STILL FAILS, STILL 7 specs, 7 failures...

   - karma.conf.js
     <= OK

   - test.ts
     <= Also OK

   - app.component.spec.ts:
/* Added these imports */
...
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { Stock } from './model/stock';
...
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        /* Added these declarations */
        CreateStockComponent,
        StockItemComponent,
        StockListComponent
      ],
    }).compileComponents();
   <= IMPROVEMENT.
      STILL "7 specs, 7 failures"...
      ... BUT NEW MSG:
AppComponent should create the app
Failed: Template parse errors:
There is no directive with "exportAs" set to "ngForm" ("If="message">{{message}}</div>
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

   - app.component.spec.ts (again...)
import { FormsModule } from '@angular/forms';
...
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      /* Added this import */
      imports: [ FormsModule ],
      declarations: [
      ...
      <= STILL "7 specs, 7 failures", BUT NEW MSG:
AppComponent should create the app
Error: StaticInjectorError(DynamicTestModule)[CreateStockComponent -> StockService]: 
  StaticInjectorError(Platform: core)[CreateStockComponent -> StockService]: 
    NullInjectorError: No provider for StockService!

     - app.module.ts
       <= "StockService" definitely listed in "providers: []" stanza: OK

     - create-stock.component.ts:
       <= constructor(private stockService: StockService) {...}: OK - we're definitely declaring the injectable in the constructor...

     - Links:
https://angular.io/guide/testing
https://angular.io/guide/testing#service-tests
       <= Current problem related to testing with "StockService"
          Since Chap10 is about "unit testing services" anyway, let's just bail for now

4. ng serve => OK
   <= Verified the app itself works just fine.
      Took screenshot: ss_initial_screen.png

5. Still encountering problems; "old" vs. "new" syntax:

   - EXAMPLE:
Error: StaticInjectorError(DynamicTestModule)[CreateStockComponent -> StockService]: 
  StaticInjectorError(Platform: core)[CreateStockComponent -> StockService]: 
    NullInjectorError: No provider for StockService!

   - ENVIRONMENTS:
OS: win32 x64                                           OS: win32 x64
Angular: 5.2.0                                          Angular: 7.1.4                                                 
Node: 8.11.1                                            Node: 8.11.1
... common, compiler, compiler-cli, core, forms, http   ... animations, cli, common, compiler, compiler-cli, core, forms    
... platform-browser, platform-browser-dynamic, router  ... http, language-service, platform-browser
                                                        ... platform-browser-dynamic, router
@angular/animations: 5.2.9                              @angular-devkit/architect         0.11.4 
@angular/cli: 1.7.4                                     @angular-devkit/build-angular     0.11.4
@angular/language-service: 5.2.9                        @angular-devkit/build-optimizer   0.11.4
@angular-devkit/build-optimizer: 0.3.2                  @angular-devkit/build-webpack     0.11.4
@angular-devkit/core: 0.3.2                             @angular-devkit/core              7.1.4
@angular-devkit/schematics: 0.3.2                       @angular-devkit/schematics        7.1.4
@ngtools/json-schema: 1.2.0                             @ngtools/webpack                  7.1.4
@ngtools/webpack: 1.10.2                                @schematics/angular               7.1.4
@schematics/angular: 0.3.2                              @schematics/update                0.11.4
@schematics/package-update: 0.3.2                       rxjs                              6.3.3
typescript: 2.5.3                                       typescript                        3.1.6
webpack: 3.11.0                                         webpack                           4.23.1
   <= Shshadri/Github examples                            <= Current Angular 7.x

   - WORKAROUND:
     - *DELETED* Chap10/stock-market/src/app*.*
     - *REPLACED* with GitHub Chapter10/simple-servie/src/app/*.*
     - Edited import paths
       <= EXAMPLE: "app/model/stock" => "../../model/stock"
     - Disable tslint warnings as needed:
        /* tslint:disable prefer-const */
        /* tslint:disable no-var-keyword */
     - ng test => OK
         7 specs, 0 failures
     - ng serve => OK
===================================================================================================

* Chap10 Create stock/async test
  - ng test => ERROR:
CreateStockComponent should create stock through service
Expected 'Successfully created stock with stock code: MNTS' to equal 'Stock with code MNTS successfully created'.
Error: Expected 'Successfully created stock with stock code: MNTS' to equal 'Stock with code MNTS successfully created'.
    at stack (http://localhost:9876/absoluteD:/paul/proj/AngularUpAndRunning/tutorials/chap10/stock-market/node_modules/jasmine-core/lib/jasmine-core/jasmine.js?0b1eaf7a13cae32191eadea482cfc96ae41fc22b:2455:17)
    at buildExpectationResult (http://localhost:9876/absoluteD:/paul/proj/AngularUpAndRunning/tutorials/chap10/stock-market/node_modules/jasmine-core/lib/jasmine-core/jasmine.js?0b1eaf7a13cae32191eadea482cfc96ae41fc22b:2425:14)
    at Spec.expectationResultFactory (http://localhost:9876/absoluteD:/paul/proj/AngularUpAndRunning/tutorials/chap10/stock-market/node_modules/jasmine-core/lib/jasmine-core/jasmine.j
    ...
Failed: Uncaught (in promise): TypeError: Cannot read property 'nativeElement' of null
TypeError: Cannot read property 'nativeElement' of null
    at http://localhost:9876/src/app/stock/create-stock/create-stock.component.spec.ts?:39:30
    at ZoneDelegate../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke (http://localhost:9876/node_modules/zone.js/dist/zone.js?:388:1)

  - create-stock.component.spec.ts:
      it('should create stock through service', async(() => {
         ...
         fixture.whenStable().then(() => {
           fixture.detectChanges();
           expect(component.message)
               .toEqual('Stock with code MNTS successfully created');
           const messageEl = fixture.debugElement.query(
               By.css('.message')).nativeElement;
               <= It doesn't like "By.css('.message')).nativeElemnt
    - Links:
https://stackoverflow.com/questions/41399076/angular2-testing-get-element-by-id
https://angular.io/guide/testing
      - EXAMPLE:
          const bannerDe: DebugElement = fixture.debugElement;
          const paragraphDe = bannerDe.query(By.css('p'));
          const p: HTMLElement = paragraphDe.nativeElement;
          expect(p.textContent).toEqual('banner works!');
      - By.css() static method selects DebugElement nodes with a standard CSS selector.
      - The query returns a DebugElement for the paragraph.
      - You must unwrap that result to get the paragraph element.

    - Final code:
      - create-stock.component.html:
   <div *ngIf="stockCode.dirty && stockCode.invalid">
      <div *ngIf="stockCode.errors['required']">Stock Code is Mandatory</div>
      <div *ngIf="stockCode.errors['minlength']">Stock Code must be atleast of length 2</div>
      <= "stockCode.errors.minlength" syntax does *NOT* work!!!

      - create-stock.component.ts:
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
...
describe('CreateStockComponent', () => {
  let component: CreateStockComponent;
  let fixture: ComponentFixture<CreateStockComponent>;

  beforeEach(async(() => {
      // <= Define as "async()" lambda
    TestBed.configureTestingModule({
      declarations: [ CreateStockComponent ],
      providers: [ StockService ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      // <= Define synchronously (do *BOTH* for each test)
    fixture = TestBed.createComponent(CreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  ...
  fixture.whenStable().then(() => {
      const expectedMsg = 'Successfully created stock with stock code: MNTS';
      // Don't do any of this until fixture Promise completes
      fixture.detectChanges();
      expect(component.message)
          // .toEqual('Stock with code MNTS successfully created');  // WRONG MESSAGE!!!
          .toEqual(expectedMsg);
      const messageDe: DebugElement = fixture.debugElement;
      expect(messageDe).toBeTruthy();
      const paragraphDe = messageDe.query(By.css('.message'));
      console.log('CreateStockComponent test: messageDe', messageDe, 'paragraphDe', paragraphDe);
      expect(paragraphDe).toBeTruthy();
      const p: HTMLElement = paragraphDe.nativeElement;
      expect(p).toBeTruthy();
      console.log('CreateStockComponent test: messageDe', messageDe, 'paragraphDe', paragraphDe, 'p', p);
      expect(p.textContent).toBe(expectedMsg);
    });
  }));

  - ng test => SUCCESS    
      8 specs, 0 failures

  - Chrome dev console:
CreateStockComponent test: messageDe DebugElement, paragraphDe DebugElement
CreateStockComponent test: messageDe DebugElement, paragraphDe DebugElement, p

    - Dev console: object details:
CreateStockComponent test: 
  messageDe DebugElementattributes: {ng-version: "7.1.4"}childNodes: (5) [DebugElement, DebugElement, DebugElement, DebugElement, DebugElement]children: (...)classes: {}componentInstance: (...)context: (...)injector: (...)listeners: []nativeElement: div#root0nativeNode: div#root0parent: nullproperties: {}providerTokens: (...)references: (...)styles: {}_debugContext: DebugContext_ {view: {…}, nodeIndex: 0, nodeDef: {…}, elDef: {…}, elView: {…}}__proto__: DebugNode paragraphDe DebugElementattributes: {class: "message"}childNodes: [DebugNode]children: (...)classes: {}componentInstance: (...)context: (...)injector: (...)listeners: []name: "div"nativeElement: div.messagenativeNode: div.messageparent: DebugElement {nativeNode: div#root0, _debugContext: DebugContext_, listeners: Array(0), parent: null, properties: {…}, …}properties: {}providerTokens: (...)references: (...)styles: {}_debugContext: DebugContext_ {view: {…}, nodeIndex: 2, nodeDef: {…}, elDef: {…}, elView: {…}}__proto__: DebugNode

CreateStockComponent test: 
  messageDe 
    DebugElement 
      attributes: {ng-version: "7.1.4"}
      childNodes: (5) [DebugElement, DebugElement, DebugElement, DebugElement, DebugElement]
      children: (...)
      classes: {}componentInstance: (...)
      context: (...)
      injector: (...)
      listeners: []
      nativeElement: div#root0
      nativeNode: div#root0
      parent: null
      properties: {}
      providerTokens: (...)
      references: (...)
      styles: {}
      _debugContext: DebugContext_ {view: {…}, nodeIndex: 0, nodeDef: {…}, elDef: {…}, elView: {…}}
      __proto__: DebugNode
  paragraphDe 
    DebugElement
      attributes: {class: "message"}
      childNodes: [DebugNode]
      children: (...)
      classes: {}
      componentInstance: (...)
      context: (...)injector: (...)listeners: []name: "div"
      nativeElement: div.message
      nativeNode: div.message
      parent: DebugElement {nativeNode: div#root0, _debugContext: DebugContext_, listeners: Array(0), parent: null, properties: {…}, …}
      properties: {}
      providerTokens: (...)
      references: (...)
      styles: {}
      _debugContext: DebugContext_ {view: {…}, nodeIndex: 2, nodeDef: {…}, elDef: {…}, elView: {…}}
      __proto__: DebugNode
  paragraphDe
    DebugElement
      attributes: {class: "message"}
      childNodes: [DebugNode]
      children: (...)
      classes: {}
      componentInstance: (...)
      context: (...)
      injector: (...)
      listeners: []
      name: "div"
      nativeElement: div.message
      nativeNode: div.message
      parent: DebugElement {nativeNode: div#root0, _debugContext: DebugContext_, listeners: Array(0), parent: null, properties: {…}, …}
      properties: {}
      providerTokens: (...)
      references: (...)
      styles: {}
      _debugContext: DebugContext_ {view: {…}, nodeIndex: 2, nodeDef: {…}, elDef: {…}, elView: {…}}
      __proto__: DebugNode 
  p 
    <div _ngcontent-c0 class=​"message">​Successfully created stock with stock code: MNTS​</div>​

===================================================================================================
* Chap10: HTTP Unit tests

1. Rebuild Chap10/final section from Github/chapter9/simple-http:
   - git reset --hard
     <= Nuke all current changes
   - npm install
     <= Re-read Node modules
   - del chap10/stock-market/app/src/*.*; restore app/src from Github/chapter9/simple-http
   - code .
     <= Touch *ALL* .ts, .html modules to clean up NG/Typescript/RxJS vesion changes
        relative paths, import "rxjs/Observable" vs. "rxjs", *ngIf="stockCode.errors.required" vs "stockCode.errors['required']", etc. etc.
     <= At this point, there are NO *.spec.ts tests, besides an empty "app.component.spec.ts"

2. stock-list-component.spec.ts
   - Initial error, auto-generated test:
StockListComponent should create
Failed: Template parse errors:
Can't bind to 'stock' since it isn't a known property of 'app-stock-item'.
1. If 'app-stock-item' is an Angular component and it has 'stock' input, then verify that it is part of this module.
2. If 'app-stock-item' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("<app-stock-item *ngFor="let stock of stocks$ | async"
                [ERROR ->][stock]="stock">
</app-stock-item>
"): ng:///DynamicTestModule/StockListComponent.html@1:16
    <= Template refers to "new stuff" the .spec.ts doesn't know about...
    
    - NOTE:
      It's currently not possible to auto-generate a new test for an existing component
         https://github.com/angular/angular-cli/issues/7727
           Generate .spec files for already existing components / services #7727


