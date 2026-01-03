# TubeFair 🚂
TubeFair is a web application that helps groups find the fairest meeting point on the London Underground network. Users can select multiple starting stations, and the app calculates the optimal meeting station that minimizes travel time for all users, displaying detailed routes and estimated travel times.

Deployed on [vercel](https://groundhog.vercel.app/).

## Features

- Select up to 5 starting stations
- Calculate optimal meeting point using shortest path algorithms
- View detailed travel routes with London Underground line colors
- See travel times and route information for each user

## Setup

This repository contains the **frontend only**.

The backend containing the secret sauce (i.e. routing and fairness algorithm) is not public.  
If you’d like to run the project end-to-end, feel free to get in touch and I can share access to the backend code.

To run the frontend locally:
```bash
npm install
npm run dev
```

## Future enhancements

- **Estimate travel time from home to station**  
  Estimate travel time from a user’s home address to their departing station. This would probably involve a paid Google API.

- **More transport options**  
  Add additional forms of transport, such as buses, non-TfL rail services, and a “travel by bicycle” mode.

- **Address-based routing (UX considerations)**  
  Allow users to enter their addresses and calculate the best route from there. I’ve already written the backend code to find the three closest stations, but there are some design and UX decisions to think through (for example, how many options to show per user, and how to present multiple departure stations without making things confusing).

- **Things to do at the meeting point (paid feature)**  
  Suggestions for what to do once you’ve arrived at your fairest tube station. Users could choose between pubs, restaurants, parks, activities, or events (all doable with the Google Places API). I accidentally spent £40 testing this feature, so it’ll have to wait until I have VC funding and a deal with Google.

