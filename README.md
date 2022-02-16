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