@rem Execute Angular app
@rem EXAMPLE USAGE (from "stock-market" root folder): ..\run2
if not exist node_modules (
call npm install
)
call ng serve --proxy-config proxy.conf.json