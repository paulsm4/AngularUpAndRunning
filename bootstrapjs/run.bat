@rem: Execute mock server
@rem EXAMPLE USAGE (from "server" sub-folder): ..\run1
if not exist node_modules (
call npm install
)
ng serve --host 0.0.0.0 --disable-host-check