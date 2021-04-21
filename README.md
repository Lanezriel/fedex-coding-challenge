# FedexCodingChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.9.

## Installing Node.js and NPM

If you don't have `Node.js` installed, please go to `https://nodejs.org/en/download/`, download and install the LTS version correponding to your system.

## Update NPM

If you feel the need to update `npm`, run to following command to install it:

```
> npm install -g npm@latest
```

## Install Angular CLI

If you don't have `Angular CLI` yet (but you have Node.js and NPM), run the following command:

```
> npm install -g @angular/cli
```

## Installing dependecies

Once the project retrieved from GitHub, you have to install the dependencies.

For this purpose, open a terminal a change directory to the root of the project, then run the following command:
```
> npm install
```

## Development server

Run `ng serve` for a dev server, then navigate to `http://localhost:4200/`.

## Build

If you want to test the production build, you'll first have to build it.

```
> ng build --prod
```

The build will be stored in `dist/`.

## Production server

I created a simple `Express.js` server to serve the production build.
To use it, simply run the following command:

```
> node server.js
```

It will get the production build in `dist/fedex-coding-challenge` by itself and serve it to you at `http://localhost:5000`.

## Running unit tests

Run `ng test` to execute the unit tests.

## About the coding challenge

### Tests

I chose to use only unit tests for this small project.

You will have a total of 60 unit tests that, I hope, cover what is needed for this project.

### Library

I chose to install only `Angular Material` and `express`.

`Angular Material` is used for:
* the form fields (and error messages underneath each of them)
* the spinner that shows in the submit button when the request is pending
* the snackbar that shows once the request is successful

`express` is used to serve the production build in an easy way.

### Other

* I had trouble splitting it into smaller components because of the `FormGroup` I used. It always had an `AbstractControler error` or a `Lack of fuction in the passed FormControl` when trying to pass the related `FormControl`, so I didn't split it.
* As I used a `FormGroup`, I used `formControlName` instead of `formControl` in the template as I had trouble correctly getting and checking the errors with `formControl`.