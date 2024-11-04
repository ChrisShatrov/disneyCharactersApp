Disney Character App
Author: Chris Shatrov
Date: November 3, 2024

## Overview

The Disney Character App is a React-based web application that allows users to explore various Disney characters. Users can search characters by name, view detailed profiles, and access a list of featured characters. Built with Material UI, TypeScript, and React Router, this app provides a responsive and user-friendly experience for Disney fans.

## Prerequisites

Node.js (v14 or higher)
npm (v6 or higher)

## Running the app

npm install
npm start

## Structure

The app is structured to promote scalability, with organized folders for components, pages, and services.

disneyCharacterApp/
├── public/ # Public assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components for routing
│ ├── services/ # API service files
│ ├── App.tsx # Root component
│ ├── AppRoutes.tsx # Defines app routes
│ └── index.tsx # Entry point
└── README.md # Project documentation

## Future Improvements

Pagination: Add pagination support to navigate through larger sets of characters.
User Authentication: Implement user accounts to save favorite characters.
Enhanced Search: Expand search options to include filters (e.g., by film, TV show).
Testing: Add unit and integration tests to ensure app reliability.
