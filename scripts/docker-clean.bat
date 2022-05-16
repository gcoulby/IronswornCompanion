@set STARTDIR=%CD%
@set BASEDIR=%~dp0

@cd "%BASEDIR%"
docker-compose run --rm clean
@cd "%STARTDIR%"