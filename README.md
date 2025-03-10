# Meeting Scheduler App

## 🚀 Overview
This is a **Meeting Scheduling App** built using Next.js, Tailwind CSS, Firebase, and Plunk. The app allows users to **schedule meetings seamlessly** and receive **confirmation emails** via Plunk. It was developed as part of a **club interview project**.

## 🛠️ Tech Stack
- **Next.js** – For server-side rendering and a fast React-based frontend.
- **Tailwind CSS** – For styling the UI efficiently.
- **Firebase** – Used for both **remote database storage** and **authentication**.
- **Plunk** – Handles email notifications for meeting confirmations.

## 🔑 Features
### 1️⃣ **Authentication & Authorization**
- Users must log in via **Firebase Authentication**.
- Unauthorized users are redirected to the **login page**.

### 2️⃣ **Dashboard**
- Once authenticated, users are redirected to the **dashboard**.
- They can **schedule new meetings** from the dashboard.
- Meeting details are stored in **Firebase Firestore**.

### 3️⃣ **Email Confirmation**
- Upon scheduling a meeting, a **confirmation email** is sent to the user.
- Uses **Plunk** for email service integration.

## 📂 Folder Structure
```
📦 meeting-scheduler-app
├── 📂 components         # Reusable React components
├── 📂 pages              # Next.js pages (auth, dashboard, etc.)
├── 📂 styles             # Tailwind CSS styles
├── 📂 utils              # Helper functions and Firebase setup
├── 📜 README.md          # Project documentation
└── 📜 package.json       # Dependencies and scripts
```

## 📌 Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/meeting-scheduler-app.git
   cd meeting-scheduler-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file and add the required Firebase and Plunk credentials.
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   PLUNK_API_KEY=your_plunk_api_key
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 🎯 Future Enhancements
- Add **Google Calendar Integration**.
- Implement **meeting reminders**.
- Improve **UI animations** and responsiveness.


---

## Contact
If you have any questions or suggestions, feel free to reach out!

**Author**: Ajay Anand 
**Github**:(https://github.com/AJrelapse)
**LinkedIn**:(https://www.linkedin.com/in/ajay-anand-s-m-3098792b5/)
