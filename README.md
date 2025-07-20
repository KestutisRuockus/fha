# INFINITE-SCROLL APP

## Description

#### A simple **infinite-scroll** web application that allows users to browse and favourite images. This app uses the [Pexels](https://www.pexels.com/) to fetch images, offering a seamless and responsive user experience. Users can browse for images, favourite them, and have their favourites persist across page reloads using **LocalStorage**. The app supports infinite scrolling, where new items are fetched automatically when the user scrolls to the bottom of the page.

## Key Features

- **Image Browsing**: The app allows users to browse for images fetched from the [Pexels](https://www.pexels.com/).
- **Infinite Scroll**: The app fetches more data only when the user reaches the bottom of the page.
- **Favourites**: Users can mark items as favourite, and these favourites are saved in the browser's LocalStorage so they persist on page reload.
- **Lazy Loading**: Images are lazily loaded to save bandwidth, with different image resolutions loaded based on screen size and user interactions.
- **Responsive Design**: The app is mobile-first designed and has fully responsive and works across desktop, tablet, and phone breakpoints.
- **Search**: Users can search for specific images by keyword, and the results are filtered dynamically based on the search term.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static typing and better developer experience.
- **Vite**: A fast build tool and development server for modern web projects.
- **Vitest**: A fast, Vite-native unit testing framework for modern JavaScript and TypeScript projects.
- **CSS**: Custom styles for the application (no CSS frameworks).
- **Pexels API**: To fetch images.
- **LocalStorage API**: For storing favourites persistently.

## Installation

#### 1: Clone the repository to your local machine:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;">
  <span style="color: #f4f4f4; font-weight: bold;">bash</span><br>
  <br>
  <span style="color: #66d9ef;">$</span> git clone https://github.com/KestutisRuockus/fha.git<br>
</div>

#### 2: Navigate to the project folder:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;">
  <span style="color: #f4f4f4; font-weight: bold;">bash</span><br>
  <br>
  <span style="color: #66d9ef;">$</span> cd fha<br>
</div>

#### 3: Install dependencies:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;">
  <span style="color: #f4f4f4; font-weight: bold;">bash</span><br>
  <br>
  <span style="color: #66d9ef;">$</span> npm install<br>
</div>

## Configuration

#### 1: Sign up for a [Pexels API](https://www.pexels.com/api/) API key.

#### 2: In root folder create '.env' file.

#### 3: Create API KEY variable:

#### In the '.env' file declare two variables:

1. Variable for your api key: 'VITE_PEXELS_API_KEY=your_api'.
2. Variable for your base url: 'VITE_PEXELS_BASE_URL=https://api.pexels.com/v1/`.

## Run the development server:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;"> <span style="color: #f4f4f4; font-weight: bold;">bash</span><br> <br> <span style="color: #66d9ef;">$</span> npm run dev<br> </div>

#### Your app should now be live at [http://localhost:5173](http://localhost:5173).

## Ideas for Expansion

- **Loading Skeletons:** Show placeholders or skeleton components while images are loading to improve user experience.
- **Error Handling:** Display user-friendly messages and retry options on API failures.
- **Image Modal:** Add a modal window to display images in an expanded view with full details.
- **Videos Integration:** Fetch and display popular videos from the Pexels API on a separate VideosContainer component.
- **VideoCard Component:** Create video thumbnails that autoplay on hover for dynamic previews.
- **Video Modal:** Implement a modal window to watch videos in fullscreen mode.
- **Favourite Videos:** Enable users to mark videos as favourites with persistence across sessions, similar to images.
- **Video Search:** Support searching videos by keywords alongside image search.
- **Dark Mode:** Provide a toggle for dark/light themes.
