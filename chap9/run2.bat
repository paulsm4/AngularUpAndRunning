@rem: Execute Angular app
@cd stock-market
if not exist node_modules (
call npm install
)
call ng serve --proxy-config proxy.conf.json