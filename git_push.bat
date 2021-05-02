@echo off 

set "message=%1"

call git add .

call git commit -m %message%

call git push

call npm run start

@echo on