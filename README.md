# Myforce Manager IOS

The Myforce Manager IOS Application is Created Using React Native & Redux

---
## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Explanation each Folder](#explanation-each-folder)
    - [Actions](#actions)
    - [Assets](#assets)
    - [Components](#components)
    - [Constants](#constants)
    - [Lib](#lib)
    - [Reducers](#reducers)
    - [Screens](#screens)
- [Tips and Trick](#tips-and-trick)
- [Available Scripts](#available-scripts)
- [Build With](#build-with)
- [Authors](#authors)

## Getting Started

- Go To myforce-manager-ios and run `npm install` and then `react-native run-ios` for starting development
- Open your xcode, and open project, Then go to `myforce-manager-ios/ios/myForceManager.xcodeproj`

### Prerequisites

* Have knowledge about [React Native](https://facebook.github.io/react-native/)
* Things you need to install
    * [Node](https://nodejs.org/en/)
    * [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
    * [xcode](https://developer.apple.com/xcode/)

## Folder Structure

The Project folder structure should look like this:

```
myforce-manager-ios/
  __test__/
  app/
  |-actions/
  |-assets/
    |-images/
  |-components/
  |-constants/
    |-index.js
  |-lib/
    |-server.js
  |-reducers/
  |-screens/
  ios/
  index.js
  package.json
  ReactotronConfig.js
  README.md
```

## Explanation each Folder

Explanation About the project folder inside `app/` folder

### Actions

Folder For Storing Action Redux.

### Assets

Folder For Keeping Assets Like Image.

### Components

Folder For store particle inside view like Bar, Card, Pipeline, etc.

### Constants

Folder For store constant For Redux Thunk.

### Lib

Folder For Setting environment like server.

### Reducers

Folder For Storing Reducer Redux

### Screens

Folder For Store Any Project Screen like login, Register, Home, etc.

## Tips and Trick

here's some tips & trick:

- To config or editing function you can go to `app/`
- if you add page, dont forget to register it at index.js

## Available Scripts

In the project directory, you can run:

### `react-native run-ios`

Run the project and automatically open xcode iPad Emulator

### `npm start`

if you already run project using `react-native run-ios`, you can use `npm start` for starting server development


See the references about [deployment](http://www.ileafsolutions.com/blog/deploying-react-native-app-ios-android-windows/) for more information.

## Build With

* [React Native](https://facebook.github.io/react-native/) - The framework used
* [Nativebase](https://nativebase.io/) - React Native UI Framework
* [Redux Thunk](https://github.com/reduxjs/redux-thunk) - State Management React Native

For More, you can see the package.json 

## Authors

[PT Tele Digital Kreatif](https://www.telecreativenow.com/)