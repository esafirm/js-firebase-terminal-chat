## js-firebase-terminal-chat

My attempt to make a CLI based chat client using Firebase and Typescript. 

## Prerequisite 

We need to setup our Firebase first, the easiest is to download service account's credential, rename it to `firebase.json` and copy it to our project.
Otherwise, you can find the official documentation here https://firebase.google.com/docs/server/setup#add_firebase_to_your_app

Once again, if you choose to not using the service account's credential file, you have to change this piece line of code here
```javascript
// Firebase
firebase.initializeApp({
  serviceAccount: "./firebase.json",
  databaseURL: "https://fireterminal.firebaseio.com/"
});
```

### Typescript

```
$ npm install -g typescript
$ tsc -w
```
you can read more references and the documentation of typescript in here https://www.typescriptlang.org/

## Usage

```
$ npm install -g
$ fterminal
```

