# Description
A simple chat app that is implemented with React Native in Typescript. The project utilizes Firebase as a backend.

![Screenshots](https://i.imgur.com/FXlSRSg.png)

# Project Overview

```
├── app -- Contains the react native project
│   ├── assets  -- Contains media files such as icons and fonts that is used by 
|   |              the app.
│   └── src     -- Contains the source code of the app.
│       ├── config      -- Contains configuration files such as limits on specific 
│       |                  queries.
│       ├── context     -- Contains react context files.
│       ├── errors      -- Files related to error handling.
│       ├── models      -- Contains files used for handling database records.
│       ├── navigation  -- React Navigation related files.
│       ├── screens
│       │   ├── chat-rooms
│       │   │   └── ChatRooms.tsx -- Container component for the chat rooms screen.
│       │   ├── login
│       │   │   └── Login.tsx -- Container component for the login screen.
│       │   └── room
│       │       └── Room.tsx -- Container component for a single chat room.
│       ├── services    -- Files that handles access to external APIs
│       ├── styles      -- Styling related files
└── cloud-functions -- A firebase cloud functions project
    └── functions
        └── src
            └── index.ts -- Contains a single firestore trigger function that is run 
                            whenever a new message has been created within the 
                            `messages` firestore collection.
```

# Getting Started

## Prerequisites
Please setup your development environment by following:
- [Setting up the development environment](https://reactnative.dev/docs/environment-setup)

## Running
Open a terminal and locate the React Native project folder `app`. Start Metro bundler by executing the following command:
```
npx react-native start
```

### Android
In order to run the app inside an android emulator open a new terminal inside the React Native project folder and execute the following command:
```
npx react-native run-android
```

### iOS
If you are running for the first time then execute the following within the `app/ios` folder:
```
pod install
```

Then go back to the `app` folder and execute the following command:
```
npx react-native run-ios
```