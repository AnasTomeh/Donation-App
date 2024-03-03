# Donation App

Welcome to the Donation App repository, an open-source project aimed at facilitating and streamlining the process of making donations to various causes and organizations. Built with React Native, this mobile application offers a user-friendly interface and secure donation process, ensuring a seamless experience for users looking to contribute to their favorite causes.

## Features

- **React Native Framework**: Utilizes React Native for cross-platform mobile app development, ensuring a consistent user experience across iOS and Android devices.
- **State Management with Redux**: Implements Redux for efficient state management, making the app highly responsive and fast.
- **Navigation**: Integrated with React Navigation for a smooth and intuitive navigation experience throughout the app.
- **Firebase Authentication**: Incorporates Firebase Authentication to secure user accounts and protect personal information, providing a safe platform for users to make donations.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm or Yarn
- A Firebase project for authentication and database services

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/donation-app.git
```

2. **Navigate to the project directory**

```bash
cd donation-app
```

3. **Install dependencies**

With npm:

```bash
npm install
```

With Yarn:

```bash
yarn install
```

4. **Set up Firebase**

- Create a Firebase project in the Firebase console.
- Enable Firebase Authentication in your Firebase project.
- Add your Firebase project's configuration to a `.env` file in the root of your project, following the `.env.example` template provided.

5. **Start the application**

```bash
npx react-native run-android
# or
npx react-native run-ios
```
