# Chat application using react, redux, rtk-query, nodejs, socket and mysql

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## React app setup
1. Clone the repository
### `git clone git@github.com:maamun7/react-redux-chat-app.git`
2. Enter to the application `cd react-redux-chat-app`
3. Run following command to install node modules
### `yarn install` OR `npm install`
4. Run following command to start react app
### `yarn start` OR `npm start`
5. Your application is supposed open to your default browser, If not, `http://localhost:3000` write this url to your browser's address bar and hit the enter key, application will be appeared in front of you.
6. To set up the server application please follow the below instructions.

## Server Setup

After cloning the repository to your computer you will find a directory with the name server. 
1. Go to the server directory by folloing command `cd server/`
2. Run following command to install node modules
### `yarn install` OR `npm install`
3. Rename '.env.example' file to .env
4. Enter your database credential to this renamed .env file (Please confirm that database is exist which name you entered)
5. Run below command to migrate database (This application has been developed by using MySQL)
### `node ace migration:run`
6. If everything is all right, run backend app by below command
### `npm run dev` OR `yarn run dev`
7. Enjoy by registering and login.

## Features 
1. Login
2. Register
3. Add friend
4. Profile Setup
5. Real time (instant) chat
