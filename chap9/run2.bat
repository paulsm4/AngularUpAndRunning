@rem Execute Angular app
@rem NOTE: Run from "stock-market" root folder
@cd stock-market
if not exist node_modules (
call npm install
)
call ng serve --proxy-config proxy.conf.json