# Firebase Buy & Sell Web App

A full-featured, client-side marketplace application built with vanilla JavaScript and Firebase. It allows users to register, log in, create profiles, list items for sale, browse items, and chat with other users to coordinate purchases.

## Features

*   **🔒 Authentication:** Secure user sign-up, login, and password reset using Firebase Authentication (Email/Password and Google Provider).
*   **👤 User Profiles:** Users can create and update their profiles with a username, photo, contact details, location, and more.
*   **🗺️ Interactive Maps:** Uses Leaflet.js for picking a location on the profile page.
*   **🛍️ Marketplace:** Browse a grid of all available items for sale, sorted by the newest first.
*   **💰 Sell Items:** A simple form to list new products with a title, description, price, and image upload to Firebase Storage.
*   **📦 My Listings & Purchases:**
    *   Sellers can manage their listed items, see their status (Active, In Negotiation, Sold), and delete or relist them.
    *   Buyers can see their purchase history.
*   **🤝 Purchase Flow:** Buyers can initiate a purchase, which puts the item into a "pending" state and notifies the seller. A "Confirm Receipt" feature allows the buyer to mark the transaction as complete.
*   **💬 Real-time Chat:** Once a purchase is initiated, a chat is enabled between the buyer and seller to arrange payment and delivery.
*   **🔔 Notifications:** Unread message counts appear on the navigation bar and in the chat list, alerting users to new messages.

## Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
*   **Backend (BaaS):** Firebase
    *   **Firebase Authentication:** For user management.
    *   **Firestore:** As the real-time NoSQL database for user profiles, items, and chats.
    *   **Cloud Storage for Firebase:** For hosting user-uploaded images (profiles and products).
*   **Maps:** [Leaflet.js](https://leafletjs.com/) with [OpenStreetMap](https://www.openstreetmap.org/) for location picking.

## Project Structure

```
fireproject/
├── index.html          # Login, Registration, and Password Reset page
├── main.html           # Main application dashboard (Browse, Sell, Chats, Profile)
├── firebaseauth.js     # Firebase configuration and shared helper functions
├── deco.css            # Main stylesheet (not included in context)
└── README.md           # This file
```

## Setup and Installation

To run this project locally, you will need to set up your own Firebase project.

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd fireproject
    ```

2.  **Create a Firebase Project:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    *   Add a new "Web" app to your project.

3.  **Enable Firebase Services:**
    *   In the Firebase console, navigate to the **Authentication** section and enable the **Email/Password** and **Google** sign-in methods.
    *   Navigate to the **Firestore Database** section and create a new database in **Test mode** (for easy setup).
    *   Navigate to the **Storage** section and get it started.

4.  **Configure Firebase in the App:**
    *   In your Firebase project settings, find your web app's configuration object. It will look like this:
      ```javascript
      const firebaseConfig = {
          apiKey: "...",
          authDomain: "...",
          projectId: "...",
          storageBucket: "...",
          messagingSenderId: "...",
          appId: "..."
      };
      ```
    *   Open the `firebaseauth.js` file in your code editor.
    *   Replace the existing `firebaseConfig` constant with your project's configuration object.

5.  **Run the Application:**
    *   Since this project uses ES Modules, it needs to be served by a web server.
    *   The easiest way is to use a VS Code extension like Live Server.
    *   Right-click on `index.html` and select "Open with Live Server".

## Development Methodology

This project was developed using an **Iterative and Incremental** model.

Core features like authentication were likely developed first, followed by incremental additions of other modules such as user profiles, item listings, and the chat system. This approach allows for the rapid development of a functional core and flexible addition of new features over time. The presence of a `localStorage`-based "demo mode" in the code also points to a prototyping approach, where a simplified model was used to build and test the UI/UX before integrating the full Firebase backend.