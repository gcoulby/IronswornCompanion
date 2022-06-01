#!/usr/bin/env sh
BASEDIR=$(dirname "$0")/..

cd $BASEDIR

cp ./README.md ./src/README.md
cp ./LICENSE ./src/LICENSE

case $GAME_RULES in
    "IRONFORGED")
      cp src/css/src/scss/main-IRONFORGED.scss src/css/src/scss/main.scss
      ;;

    "STARFORGED")
      cp src/css/src/scss/main-STARFORGED.scss src/css/src/scss/main.scss
      ;;
    *)
      cp src/css/src/scss/main-DATASWORN.scss src/css/src/scss/main.scss
      ;;
esac
