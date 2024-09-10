# server-side-challange

![ReactReporter Screenshot](/public/assets/desktop-siteshot.png)

Welcome to ReactReporter, a news aggregator app. This news application is built with React and the news data on this app is fetched from [newsapi.org](https://newsapi.org/).

## Table of Contents

- [About](#about)
- [Features](#features)
- [Project Structure](#project-structure)

## About

ReactReporter helps you find curated news article fetched from [newsapi.org](https://newsapi.org/) and bookmark the articles to read them at your convenience.

## Features

- **Categories**: Discover a range of news articles on different topics, from health & sports to entertainment.

- **Redux**: This project efficiently utilizes @reduxjs/toolkit and react-redux for state management and fetch api data using axios.

- **Context API**: This project efficiently utilizes context api for state management of authentication states and news articles.

- **User-Friendly Navigation**: Easily navigate through the app with ease.

- **News Page**: Browse a curated news articles from different categories at `/news`.

- **User Authentication**: Securely log in or register for an account.
  - **Login Page**: Log in with your email and password.
  - **Registration**: Create a new account with email and password.
  - **Switch Between Login and Register**: Conveniently switch between login and registration from the same page.

- **Bookmark Functionality**: Add articles to your bookmarks, view them on the `/account/bookmarks` route. This page displays saved articles.

## Project Structure

The project is structured as follows:

- `/public`: Contains static assets, including images.
- `/src`: Contains the React application source code.
  - `/app`: Store for redux.
  - `/components`: React components for various parts of the app.
  - `/features`: Reducers for the redux provider.
  - `/context`: For state management within the app.
  - `/lib`: Firebase configuration and initialization and utility functions.
  - `/pages`: Pages for the app.
  - `/routes`: Routes for the app.
  - `/style`: CSS styles for the app.
 
  


