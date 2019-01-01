@rem: Execute mock server
@rem EXAMPLE USAGE (from "server" sub-folder): ..\run1
if not exist node_modules (
call npm install
)
set DEBUG=express:* & call node index.js