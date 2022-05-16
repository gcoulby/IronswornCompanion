# Build Notes

Ironsworn Companion can now be built using Docker. This will make things easier for people using different platforms to contribute.

## Build Requirements

Strictly speaking, the only requirement to build is the latest [Docker Desktop](https://www.docker.com/products/docker-desktop/).

## Building

Once Docker is installed, you can use the scripts in the `scripts` directory for all tasks. Note there are both `.sh` and `.bat` files for use with Windows, Mac, or Linux.

| Script       | Function                                                                                       |
|--------------|------------------------------------------------------------------------------------------------|
| docker-setup | Installs dependencies (run this first)                                                         |
| docker-build | Creates a production build (output will be in the `build` directory)                           |
| docker-start | Runs the development server with code and css hot-reloading                                    |
| docker-clean | Resets the code-base to the initial status. **!!This will delete any changes you have made!!** |


## Setting up your own Google Drive integration

This isn't strictly necessary, but if you want to do it - here's how.

Setup your google app with an oauth client ID and API key:

![image](https://user-images.githubusercontent.com/7715262/167339610-780ba3e2-4ccf-4c90-900b-fcffa281df1b.png)

On the `OAuth consent screen` choose the `See, edit, create, and delete only the specific Google Drive files you use with this app` scope (make sure you've enabled Google Drive API prior to this).

Before building and deploying the app, make sure you have a `.env` file in the root with the API key and the Client ID (you don't need the Client Secret):

```
REACT_APP_GOOGLE_DRIVE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_GOOGLE_DRIVE_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
```

