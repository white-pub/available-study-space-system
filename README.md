# FindMySpace

FindMySpace is a web application that helps students find their favorite study spaces on a busy campus.  
It is very common for students to have their favorite place to study, but it is very disappointing when  
this place is occupied, and you have to settle for a suboptimal space.

## Overview

With FindMySpace, all details of study rooms will be viewable. This includes:
- **Room Number**
- **Building Name**
- **Available Materials** (TV, Whiteboard, etc.)
- **Capacity** (How many people it can fit)

All of these preferences can be filtered through to check if your favorite study space is available, and  
if not, to find your next best spot. _(All of these currently have mock data.)_

Each study space will also be accompanied by:
- A **campus map** pinpointing its location
- A **picture of the building**
- A **picture of the space itself**  

_(All images are mock pictures for now. In the future, an interactive map may be added.)_

## Features
- Drop-down details for each study space
- equipment, occupancy, and location data provided  
  - Includes campus and building maps with space pictures
- Interactive filter to help choose a space
- Live updates regarding occupancy  
  - Initially, a room sensor was planned to send real-time requests to the database  
    for updates, but for now, **ThunderClient** is used in its place.

## Usage
- **Filtering:** Check the boxes for desired preferences, and the application will  
  generate a list of suitable study spaces.
- **Map Buttons:** Within each study space dropdown, press the map buttons to view  
  location details regarding the campus _(mock data for now)_.
- **User Interaction:** This application is mainly for viewing. Not much interaction  
  is needed, as FindMySpace is designed to help easily find available study spaces!

## How To Start the Project
1. **Clone the repository**
2. **Install dependencies:**  
   Run `npm install` inside both the `backend` and `frontend` folders.
3. **Start the servers:**  
   Inside both folders, run `npm run dev` and keep both running simultaneously.  
   - Since this is a decoupled application, both the backend and frontend servers  
     must be running for the app to function properly.
4. **Access the frontend:**  
   Navigate to: [http://localhost:5173/home](http://localhost:5173/home)  
   to use the application.

## Contact Information
If you need assistance, feel free to reach out:

- **Anna Chen** - [a.chen1140110@gmail.com](mailto:a.chen1140110@gmail.com)
- **Abe Gomez** - [abraham.gomez@student.cune.edu](mailto:abraham.gomez@student.cune.edu)
- **Caden Korell** - [caden.korell@student.cune.edu](mailto:caden.korell@student.cune.edu)

## Work Division

- **Anna Chen**  
  - Database Design, implementation, mock data creation, seeding script, docker setup
  - Data fetching and SSE for real-time occupancy update
  - Filter logic Creation and Implementation 
  - Hooks
  - Some Styling

- **Abe Gomez**  
  - API/routing (backend and frontend)  
  - CRUD functions  
  - Styling with Mantine  
  - Applied Filter to Drop-downs  
  - Helped with Database Tables  

- **Caden Korell**  
  - Backend Tests  
  - Some Styling  

