@rem: Execute mock server
@cd server
if not exist node_modules (
call npm install
)
set DEBUG=express:* & call node index.js