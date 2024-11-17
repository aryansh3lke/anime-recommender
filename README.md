# Anime Recommender

A machine learning recommender systems app to recommend the best animes to anime fans. Receive your recommendations here: [animerecom.com](animerecom.com)

## Table of Contents

1. [Introduction](#introduction)
2. [Usage](#usage)
3. [Installation](#installation)

## Introduction

In this machine learning project, there are 2 different collaborative filtering models that are trained to create recommendation systems for recommending animes to users similar to a streaming service.

## Usage

#### 1. Search an anime

Type your favorite anime into the search bar and select one of the animes in the dropdown (NOTE: One of the animes from the dropdown must be selected for the recommend button to be enabled)

![searchbar](https://github.com/user-attachments/assets/b724ef16-8fd9-4afd-9310-0546a75c7776)

#### 2. Select a recommendation

Scroll through the recommendations that show up and click on one to go to [myanimelist.com](myanimelist.com) for even more information about that particular anime.

![recommendations](https://github.com/user-attachments/assets/d17bccd5-3a16-470b-9afd-8897dc9c1775)

#### 3. Sort the recommendations

For some animes, there are many recommendations, so sorting by a certain category may assist you in finding the best recommendations faster.

![sortsetting](https://github.com/user-attachments/assets/a5c11267-a7df-4b93-b8e4-1862dda6a088)

## Installation

Follow these steps to set up AnimeRecsAI locally:

#### 1. Clone the repository

`git clone https://github.com/asshelke/anime-recommender.git`

#### 2. Navigate to the client directory (frontend)

`cd client`

#### 3. Install all necessary Node dependencies

`pnpm install`

#### 4. Start the React frontend server

`pnpm run dev`

#### 5. Navigate to the server directory (backend)

`cd server`

#### 6. Install all necessary Python dependencies

`pip install -r requirements.txt`

#### 7. Start the Flask backend server

`python app.py`

#### 8. View the website locally

http://localhost:3000
