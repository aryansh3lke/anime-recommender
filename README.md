# AnimeRecsAI

An AI-based anime recommendation app to recommend the best animes to anime fans. Receive your recommendations here: [animerecom.com](animerecom.com)

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Usage](#usage)
4. [Installation](#installation)

## Introduction

This full stack Next.js-Flask web application is designed to give anime fans recommendations based on their favorite animes. The website [myanimelist.net](https://myanimelist.net) is populated with many recommendations from its users. Currently a Kaggle dataset is utilized to obtain these recommendations. AnimeRecsAI also has its own recommender systems built off the KNN (K-Nearest Neighbors) and SVD (Singular Value Decomposition) machine learning models. They have not been directly implemented on the frontend for the users yet, but will soon be available. Currently, there are endpoints created on the Flask backend to receive the recommendation list from these models, but they are not fully ready to return the full structure of Anime objects necessary to display the recommendations in this project.

Users can build their own personal watchlist by adding the recommendations after making an account with OAuth. This app specifically uses NextAuth (Auth.js) to authenticate users and Neon Postgres to store their data. Next.js in this project is used for both the frontend and backend as there are API endpoints created for fetching and updating the user's watchlist with Prisma ORM.

## Tech Stack

### Frontend

<b>Framework:</b> [Next.js (TypeScript)](https://nextjs.org)\
<b>Styling:</b> [Tailwind CSS](https://tailwindcss.com), [Hero UI](https://www.heroui.com), [Heroicons](https://heroicons.com)\
<b>Authentication:</b> [NextAuth.js (Auth.js)](https://authjs.dev)

### Backend

<b>Framework:</b> [Flask (Python)](https://flask.palletsprojects.com/en/stable)
<b>ORM:</b> [Prisma](https://www.prisma.io)
<b>Database:</b> [Neon Postgres](https://neon.tech)

### DevOps

<b>Frontend Deployment:</b> [Vercel](https://vercel.com)\
<b>Backend Deployment:</b> [Railway](https://railway.com)\
<b>DNS Provider:</b> [Porkbun](https://porkbun.com)

### Libraries/APIs

<b>Anime Data:</b> [MyAnimeList](https://myanimelist.net)

## Usage

#### 1. Search for an anime

Type your favorite anime into the search bar and select one of the animes in the dropdown (NOTE: One of the animes from the dropdown must be selected for the recommend button to be enabled).

![searchbar](https://github.com/user-attachments/assets/44f23ee2-8e63-412e-b604-9285dd7d0ec7)

#### 2. Select a recommendation

Scroll through the recommendations that show up and click on one to go to [myanimelist.com](myanimelist.com) for even more information about that particular anime.

![recommendations](https://github.com/user-attachments/assets/d17bccd5-3a16-470b-9afd-8897dc9c1775)

#### 3. Sort the recommendations

For some animes, there are many recommendations, so sorting by a certain category may assist you in finding the best recommendations faster.

![sortsetting](https://github.com/user-attachments/assets/a5c11267-a7df-4b93-b8e4-1862dda6a088)

#### 4. Create an account to add animes to your watchlist

Make a new account for AnimeRecsAI with OAuth by selecting one of the available providers. (NOTE: You can attach your email to only one provider and will need to use that provider every time moving forward).

![signin](https://github.com/user-attachments/assets/8298daae-13f0-43ff-b2c7-8e57ae53f090)

#### 5. Access your full watchlist

Click on your user avatar in the navigation bar to open up a dropdown menu and view your watchlist.

![watchlist](https://github.com/user-attachments/assets/3ea75df7-cdcd-4828-867c-48637df4f18a)

## Installation

Follow these steps to set up AnimeRecsAI locally:

#### 1. Clone the repository

`git clone https://github.com/aryansh3lke/anime-recommender.git`

#### 2. Navigate to the client directory (frontend)

`cd client`

#### 3. Add the following environment variables into a new .env file

```
# NextAuth (Auth.js) Authentication
AUTH_SECRET=<your-auth-secret>

AUTH_GOOGLE_ID=<your-google-id>
AUTH_GOOGLE_SECRET=<your-google-secret>

AUTH_GITHUB_ID=<your-github-id>
AUTH_GITHUB_SECRET=<your-github-secret>

AUTH_TWITTER_ID=<your-twitter-id>
AUTH_TWITTER_SECRET=<your-twitter-secret>

# Vercel Postgres + Prism ORM
DATABASE_URL=<your-database-url>
POSTGRES_URL=<your-postgres-url>
POSTGRES_PRISMA_URL=<your-postgres-prisma-url>
POSTGRES_URL_NO_SSL=<your-postgres-url-no-ssl>
POSTGRES_URL_NON_POOLING=<your-postgres-url-non-pooling>
POSTGRES_USER=<your-postgres-user>
POSTGRES_HOST=<your-postgres-host>
POSTGRES_PASSWORD=<your-postgres-password>
POSTGRES_DATABASE=<your-postgres-database>

# PROXIES
NEXT_PUBLIC_DOMAIN=<your-domain-url>
FLASK_BACKEND_PROXY=<your-flask-backend-proxy-url>
```

> IMPORTANT: Obtain your secrets for each OAuth provider individually and get your main secret for Auth.js with `pnpm exec auth secret`. The Postgres database in this project is directly integrated into Vercel so you will need to create a Vercel account and a new Postgres database (or use an existing one that is shared) for this project. In production, make sure to update the `NEXT_PUBLIC_DOMAIN` and `FLASK_BACKEND_PROXY` with the actual domains of your respective deployments.

#### 4. Install all necessary Node and Python dependencies

`pnpm run init`

#### 5. Run the Next.js and FastAPI servers concurrently

`pnpm run stack`

#### 6. View the website locally

http://localhost:3000
