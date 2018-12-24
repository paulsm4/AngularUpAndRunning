Chap9: simple http

* Test 1: Manually updated Copied
<= No-go: hung at "Loading...".  
   Nothing displayed; no errors/no warnings

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

