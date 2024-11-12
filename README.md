# Movies Recommendation App

This project is a Movies Recommendation App built with React, TypeScript, and Vite.
For testing it uses Jest and React Testing Library.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js and Yarn. You can download Node.js from [nodejs.org](https://nodejs.org/) and Yarn from [yarnpkg.com](https://yarnpkg.com/).

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo:
    ```sh
    git clone https://github.com/RicardoAlustiza/movies-recommendation-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd movies-recommendation-app
    ```
3. Install the dependencies:
    ```sh
    yarn install
    ```

### Running the Project

1. Start the development server:
    ```sh
    yarn dev
    ```
2. Open your browser and navigate to `http://localhost:5173`. You should see the app running.

### Running the Tests

1. To run the tests, run:
    ```sh
    yarn test
    ```

### Building the Project

1. To create a production build, run:
    ```sh
    yarn build
    ```

## Configuration

If you want to start the app with an object of movies instead of none, you can do so by adding to the `moviesData` object in the `data/MoviesData.ts` file with this structure:

```ts
  {
    id: 1,
    title: 'The Shawshank Redemption',
    releaseDate: 1994,
    genres: ['Drama'],
    rating: 8,
    movieCoverURL: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
    shortDescription: 'Two imprisoned...',
  },
  {
    id: 2,
    title: 'The Godfather',
    releaseDate: 1972,
    genres: ['Crime'],
    rating: 10,
    movieCoverURL: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
    shortDescription: 'The aging patriarch...',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    releaseDate: 2008,
    genres: ['Action'],
    rating: 9,
    movieCoverURL: '',
    shortDescription: 'When the menace...',
  }
```