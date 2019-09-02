# Easy Todo app with React Redux, and Firebase
A simple easy todo app example built with [React Redux](https://github.com/reactjs/react-redux), and [Firebase](https://firebase.google.com/).

Demo link is here https://easy-todo-app-2fc3d.firebaseapp.com


## Features
- add edit and remove tasks
- view all, active, completed tasks
- google sign-in
- save user data in firebase

## Following tech stack is used

- Create React App
- React
- Redux, Redux Thunk
- Redux Devtools Extension for Chrome
- Firebase SDK with OAuth authentication
- little bit of SASS

###### Note:
I liked the repo https://github.com/r-park/todo-react-redux and I have tried to kind of recreate it. The code structure and logic is totally different from original repo.

Quick Start
-----------

```shell
$ git clone https://github.com/GuruHadadi/easy-to-do-app.git
$ cd easy-to-do-app
$ npm install
$ npm start
```

## Deploying to Firebase
#### Prerequisites:
- Create a free Firebase account at https://firebase.google.com
- Create a project from your [Firebase account console](https://console.firebase.google.com)
- Configure the authentication providers for your Firebase project from your Firebase account console

#### Configure this app with your project-specific details:
```json
// .firebaserc

{
  "projects": {
    "default": "your-project-id"
  }
}
```

```javascript
// src/firebase/config.js

export const firebaseConfig = {
  apiKey: 'your api key',
  authDomain: 'your-project-id.firebaseapp.com',
  databaseURL: 'https://your-project-id.firebaseio.com',
  storageBucket: 'your-project-id.appspot.com'
};
```

#### Install firebase-tools:
```shell
$ npm install -g firebase-tools
```

#### Build and deploy the app:
```shell
$ npm run build
$ firebase login
$ firebase use default
$ firebase deploy
```


## NPM Commands

|Script|Description|
|---|---|
|`npm start`|Start webpack development server @ `localhost:3000`|
|`npm run build`|Build the application to `./build` directory|
|`npm test`|Test the application; watch for changes and retest|
