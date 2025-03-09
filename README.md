# Unity Hand - Social Volunteering Web Application

## Overview
Unity Hand is a social volunteering web application designed to connect users with various volunteering events. The platform allows users and organizations to create, join, and manage events with ease.

## Technologies Used
- **Frontend:** React.js, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase
- **Deployment:**
  - Client-side: [Netlify](https://unity-hands.netlify.app/)
  - Server-side: [Vercel](https://vercel.com/)
- **Source Code:**
  - Client: [GitHub Repository](https://github.com/ShafayetHossain/unity-hands-client)
  - Server: [GitHub Repository](https://github.com/ShafayetHossain/unity-hand-server)

## Features & Functionality

### Navigation Bar
- Displays a logo and navigation links.
- If a user is logged in:
  - Displays the user's name, profile picture, and options like **Home**, **My Events**, **Post Event**, and **Applied Events**.
  - A **Sign-Out** button appears.
  - Clicking the profile picture reveals a dropdown with **Profile** and **Logout** options.
- If a user is not logged in:
  - **Sign-In** and **Sign-Up** buttons are visible.

### Home Page
- Contains a **Hero Section** with a **Get Started** button.
- Clicking **Get Started** redirects to the Events Section.
- **Events Section** displays event cards posted by users or organizations.
  - Each card includes:
    - Event Title
    - Event Description
    - Event Start Time & Date
    - Event Category
    - Event Location
    - A **Join Event** button (registers the user for the event and shows a congratulation alert).
    - If the event is created by the logged-in user, it shows **Your Event** instead of **Join Event**.
  - Events are sorted by date (closest upcoming event appears first).
  - A **Search Bar** allows users to search for events easily.

### My Events Section
- Displays events created by the logged-in user or organization.
- Each event includes:
  - Event details (Title, Description, Date, Time, Category, Location)
  - **Edit Button** (to modify event details)
  - **Delete Button** (to cancel the event)
  - **Participants Button** (to view registered participants)
  - **Inform Participant Button** (automatically sends an email to registered participants)
  - **Remove Participant Button** (to remove a participant from the event)

### Post Event Section
- Allows users to create a new event by providing:
  - Event Title
  - Event Description
  - Event Start Time & Date
  - Event Category
  - Event Location
- On successful event creation, the user is redirected to **My Events** with a congratulation message.

### Applied Events Section
- Displays events the user has joined.
- Includes a **Remove Event** button to unregister from an event.

## Live Website
[Unity Hand Live](https://unity-hands.netlify.app/)

## Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request!

---

Enjoy using **Unity Hand** and make a difference by volunteering!

