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
     
