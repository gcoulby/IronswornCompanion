# Building

## Building on OSX / Mac using NodeJS 18

These are notes on getting the original author's verion built on OSX using NodeJS 18.

1. Remove `packaqe-lock.json` and `yarn.lock`
1. Remove `babel-loader`, `webpack`, `webpack-cli`, and `webpack-dev-server` from package.json
1. Update deps with `npm update --legacy-peer-deps`
1. Build with `./node_modules/react-scripts/bin/react-scripts.js build`

### Notes

* Be sure to use the react-scripts version in node-modules (not your global if you have one)
