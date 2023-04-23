[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Crypto Sentiment Dashboard

## Project Description

This project is a web application built with TypeScript, NextJS, NextUI, Redux, and [deployed](https://cryptosentiment.vercel.app/) on Vercel. The application fetches sentiment data for cryptocurrencies from Firestore and displays it in a table on the dashboard. Users can find out more details about a cryptocurrency by clicking on it or searching for it. Users can also create an account or login to an existing account using Firebase Authentication. Logged-in users can add cryptocurrencies to their watchlist, and their favorite cryptocurrencies are stored using the Firestore database.

## Technology Stack

-   TypeScript
-   NextJS
-   NextUI
-   Redux
-   Vercel
-   Firebase Cloud Firestore
-   Firebase Authentication

## Setup Instructions

1. Clone this repository to your local machine.
2. Install the dependencies using npm install.
3. Create a Firebase project
4. Add Firebase Cloud Firestore to the project
5. Add Firebase Authentication to the project
6. Add Firebase to Web App
7. Obtain the necessary Firebase credentials
8. Create a file named .env in the root directory of the project.
    - Optionally, create 3 distinct .env files
        - .env.development
        - .env.production
        - .env.test
    - In the .env file, set the necessary environment variables:
    ```py
    NEXT_PUBLIC_API_KEY = ""
    NEXT_PUBLIC_AUTH_DOMAIN = ""
    NEXT_PUBLIC_PROJECT_ID = ""
    NEXT_PUBLIC_STORAGE_BUCKET = ""
    NEXT_PUBLIC_MESSAGING_SENDER_ID = ""
    NEXT_PUBLIC_APP_ID = ""
    ```

## Usage

-   For instructions to run project locally, [click here](web-app/).
-   To access deployed application, navigate to the https://cryptosentiment.vercel.app/

## Dependency Documentation

-   [NextJS](https://nextjs.org/docs/)
-   [NextUI](https://nextui.org/)
-   [Firebase Authentication](https://firebase.google.com/docs/auth)
-   [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore/)
-   [Redux](https://redux-toolkit.js.org/)

## License

This project is released under the [MIT License](LICENSE.md). Please see the license file for more information
