# ChatHub

ChatHub is a full stack chat application built with the MERN stack. It supports private conversations, group chats, realtime messages, friend requests, image sharing, typing indicators, online status, and an admin dashboard.

The project is organized as one repository with two connected applications:

- `frontend` contains the React user interface.
- `backend` contains the REST API, Socket.IO server, authentication, and database logic.

## Table of contents

- [Project overview](#project-overview)
- [Main features](#main-features)
- [How ChatHub works](#how-chathub-works)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Requirements](#requirements)
- [Local setup](#local-setup)
- [Environment variables](#environment-variables)
- [Run the application](#run-the-application)
- [Available commands](#available-commands)
- [API overview](#api-overview)
- [Realtime messaging](#realtime-messaging)
- [Testing and code quality](#testing-and-code-quality)
- [Security notes](#security-notes)
- [Common setup problems](#common-setup-problems)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Project overview

ChatHub allows registered users to find other people, send friend requests, and start conversations after connecting. Messages are delivered through Socket.IO and stored in MongoDB, so users can open an earlier conversation and load its message history.

Users can also create groups, manage members, rename groups, share images, and see when another member is typing. The responsive interface adjusts the chat list, message area, forms, dialogs, and management tables for mobile, tablet, and desktop screens.

The separate admin area provides application statistics and records for users, chats, and messages.

## Main features

### User accounts

- Create an account with a name, username, email address, password, bio, and profile image.
- Sign in with a username or email address.
- Keep the user session in an HTTP only JWT cookie.
- Sign out safely from the current session.
- Validate account information on both the frontend and backend.
- Hash passwords with bcrypt before saving them.

### Friends and conversations

- Search for registered users by name.
- Send, accept, or reject friend requests.
- View pending friend request notifications.
- Open private conversations with connected users.
- View the current chat list and unread message notifications.

### Realtime messaging

- Send and receive text messages without refreshing the page.
- Show typing and stop typing indicators.
- Show online and offline presence.
- Store every accepted message before sending it to connected users.
- Load older messages with pagination.
- Display message timestamps from the stored database record.
- Keep a user connected across several browser tabs or devices.
- Limit text messages to 2,000 characters.

### Images

- Upload a profile image during registration.
- Share image attachments inside conversations.
- Store uploaded images through Cloudinary.
- Accept `jpg`, `jpeg`, and `png` files up to 5 MB each.
- Send up to 10 images in one attachment request.

### Group management

- Create a group with selected friends.
- Rename a group.
- Add or remove group members.
- Allow a member to leave a group.
- Allow the group creator to delete the group.
- Restrict group management actions to authorized members or the group creator.

### Admin dashboard

- Use a separate admin login.
- View totals for users, chats, groups, and messages.
- View message activity for the previous seven days.
- Compare private and group chat statistics.
- Browse users, chats, and messages in management tables.

### User experience

- Responsive layouts for phones, tablets, and desktop screens.
- Loading, empty, and error states for important application views.
- Toast messages for successful and failed actions.
- Accessible labels for important interactive controls.
- Lazy loaded routes to reduce the initial frontend load.

## How ChatHub works

1. A user registers or signs in through the React frontend.
2. The Express API validates the request and returns a signed authentication cookie.
3. The frontend uses that cookie for REST API requests and the Socket.IO connection.
4. MongoDB stores users, friend requests, chats, and messages.
5. Cloudinary stores profile images and message attachments.
6. Socket.IO delivers new messages, notifications, presence changes, and typing events in realtime.

## Technology stack

| Area | Technologies | Purpose |
| --- | --- | --- |
| Frontend | React 18 and Vite | Application interface and development build system |
| Interface | Material UI and Emotion | Responsive components and styling |
| State | Redux Toolkit and RTK Query | User state, chat state, API requests, and caching |
| Routing | React Router | User, chat, group, and admin pages |
| Realtime client | Socket.IO Client | Live messages, typing events, and presence updates |
| HTTP client | Axios and Fetch | REST API communication |
| Charts | Chart.js | Admin dashboard statistics |
| Backend | Node.js and Express | REST API and server logic |
| Realtime server | Socket.IO | Live communication and connected user tracking |
| Database | MongoDB and Mongoose | Users, requests, chats, and messages |
| Authentication | JWT and bcrypt | Signed sessions and password hashing |
| Validation | Express Validator | Request validation and clear input errors |
| Images | Multer and Cloudinary | Image validation, upload, and storage |
| Logging | Winston | Server error logging |
| Automation | GitHub Actions | Tests, lint checks, syntax checks, and production builds |

## Project structure

```text
ChatHub/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Continuous integration checks
├── backend/
│   ├── index.js                   # HTTP and Socket.IO server entry point
│   ├── socketEvents.js            # Realtime event handlers
│   ├── src/
│   │   ├── controllers/           # Authentication, chat, and admin logic
│   │   ├── db/                    # MongoDB connection
│   │   ├── errors/                # Application error classes
│   │   ├── lib/                   # Validators and shared helpers
│   │   ├── middlewares/           # Authentication and error middleware
│   │   ├── models/                # Mongoose data models
│   │   ├── routes/                # REST API routes
│   │   ├── services/              # Message and socket services
│   │   └── utils/                 # Tokens, uploads, limits, and utilities
│   ├── tests/                     # Backend regression tests
│   ├── .env.sample                # Safe backend environment example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/            # Layouts, dialogs, and shared components
│   │   ├── constants/             # Client configuration and event names
│   │   ├── hooks/                 # Shared React hooks
│   │   ├── lib/                   # Error and chat state helpers
│   │   ├── pages/                 # User, chat, group, and admin pages
│   │   ├── redux-toolkit/         # Store, reducers, API, and async actions
│   │   ├── App.jsx                # Application routes
│   │   └── Socket.jsx             # Socket.IO provider
│   ├── tests/                     # Frontend regression tests
│   ├── .env.sample                # Safe frontend environment example
│   └── package.json
├── .gitignore
└── README.MD
```

## Requirements

Install or create the following before starting:

- Node.js 20 or newer
- npm
- MongoDB locally or a MongoDB Atlas database
- A Cloudinary account for profile images and chat attachments

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/Talhaayubkhan/ChatHub.git
cd ChatHub
```

### 2. Create local environment files

On macOS or Linux:

```bash
cp backend/.env.sample backend/.env
cp frontend/.env.sample frontend/.env
```

On Windows PowerShell:

```powershell
Copy-Item backend/.env.sample backend/.env
Copy-Item frontend/.env.sample frontend/.env
```

Add your real configuration values to the new `.env` files. Never commit these files.

### 3. Install backend dependencies

```bash
cd backend
npm ci
```

### 4. Install frontend dependencies

From the project root:

```bash
cd frontend
npm ci
```

If your terminal is still inside `backend`, use `cd ../frontend` instead.

## Environment variables

### Backend

Create `backend/.env` from `backend/.env.sample`.

| Variable | Description | Local example |
| --- | --- | --- |
| `PORT` | Port used by the API and Socket.IO server | `8000` |
| `CLIENT_URL` | Frontend origin allowed by CORS | `http://localhost:5173` |
| `MONGO_URI` | MongoDB connection string | Your local or Atlas connection string |
| `JWT_SECRET` | Strong secret used to sign user sessions | A long random value |
| `JWT_EXPIRY` | User session lifetime | `7d` |
| `ADMIN_SECRET_KEY` | Secret used for admin authentication | A different long random value |
| `CLOUDINARY_NAME` | Cloudinary cloud name | Your Cloudinary value |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Your Cloudinary value |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Your Cloudinary value |

Example structure:

```dotenv
PORT=8000
CLIENT_URL=http://localhost:5173
MONGO_URI=
JWT_SECRET=
JWT_EXPIRY=7d
ADMIN_SECRET_KEY=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Frontend

Create `frontend/.env` from `frontend/.env.sample`.

| Variable | Description | Local example |
| --- | --- | --- |
| `VITE_SERVER` | Full origin of the backend API and Socket.IO server | `http://localhost:8000` |

```dotenv
VITE_SERVER=http://localhost:8000
```

Restart the frontend development server after changing `VITE_SERVER`.

## Run the application

The frontend and backend must run at the same time.

### Start the backend

```bash
cd backend
npm run dev
```

The backend uses `http://localhost:8000` by default.

### Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

## Available commands

### Backend commands

Run these commands inside `backend`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the server with Nodemon and restart after code changes |
| `npm start` | Start the server with Node.js |
| `npm test` | Run the backend regression tests |

### Frontend commands

Run these commands inside `frontend`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production frontend build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on frontend JavaScript and JSX files |
| `npm test` | Run the frontend regression tests |

## API overview

All API routes start with `/api/v1`.

| Route group | Base path | Main responsibilities |
| --- | --- | --- |
| Authentication | `/api/v1/auth` | Registration, login, logout, profile, user search, friends, and requests |
| Chats | `/api/v1/chat` | Chat lists, groups, members, message history, and attachments |
| Admin | `/api/v1/admin` | Admin login, statistics, users, chats, and messages |

Most authentication and chat routes require the signed `token` cookie. Protected admin routes require the separate `admin-token` cookie.

### Main authentication routes

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/auth/register` | Create a user account |
| `POST` | `/auth/login` | Sign in with username or email |
| `POST` | `/auth/logout` | End the current user session |
| `GET` | `/auth/user` | Get the signed in user profile |
| `GET` | `/auth/search` | Search for another user |
| `POST` | `/auth/send-request` | Send a friend request |
| `POST` | `/auth/accept-request` | Accept or reject a friend request |
| `GET` | `/auth/notifications` | Get pending friend requests |
| `GET` | `/auth/friends` | Get available friends |

### Main chat routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/chat/mychats` | Get the current user chat list |
| `POST` | `/chat/groupchat` | Create a group chat |
| `GET` | `/chat/mychats/mygroups` | Get groups created by the current user |
| `PUT` | `/chat/addmembers` | Add members to a group |
| `DELETE` | `/chat/removemember` | Remove a member from a group |
| `DELETE` | `/chat/leave/:chatId` | Leave a group |
| `POST` | `/chat/message` | Upload message attachments |
| `GET` | `/chat/message/:chatId` | Get paginated message history |
| `GET` | `/chat/:chatId` | Get chat details |
| `PATCH` | `/chat/:chatId` | Rename a group |
| `DELETE` | `/chat/:chatId` | Delete a group chat |

## Realtime messaging

The REST API handles stored data while Socket.IO handles live updates.

- The server authenticates each socket connection with the user JWT cookie.
- The server reads chat membership from MongoDB instead of trusting a recipient list from the browser.
- A new message is validated and stored before it is broadcast.
- The sender receives a success or failure acknowledgement.
- Each user can have several active socket connections for multiple tabs or devices.
- Disconnected socket IDs are removed so online status stays accurate.
- Typing events are sent only to the other members of the selected chat.

## Testing and code quality

### Run backend tests

```bash
cd backend
npm test
```

The backend tests cover request validation, structured error responses, socket tracking, authenticated chat membership, message storage, acknowledgements, and disconnect behavior.

### Run frontend checks

```bash
cd frontend
npm test
npm run lint
npm run build
```

The frontend tests cover chat state updates, API error handling, notification state, message timestamps, responsive layout rules, and important UI regressions.

GitHub Actions runs the backend tests and syntax checks, followed by the frontend tests, lint check, and production build. The workflow runs for pull requests and pushes to `main`.

## Security notes

- Passwords are hashed with bcrypt and are never stored as plain text.
- Authentication tokens are stored in HTTP only cookies.
- Login and registration routes use request rate limits.
- API inputs are validated before controller logic runs.
- Socket connections require authentication.
- Message recipients are resolved from stored chat membership.
- Local `.env` files, logs, dependencies, and build output are excluded from Git.

### Important credential warning

An older version of this repository contained a committed backend `.env` file. Removing the current file does not remove its values from Git history. Rotate the following credentials before using the project in production:

- MongoDB credentials
- JWT secret
- Cloudinary API credentials
- Admin secret

The current cookie configuration is intended for local development. Before a production deployment, enable secure cookies, review the `SameSite` setting for your frontend and backend domains, use HTTPS, and allow only the real frontend origin in `CLIENT_URL`.

## Common setup problems

### The frontend cannot reach the backend

- Confirm that the backend is running on port `8000`.
- Confirm that `frontend/.env` contains the correct `VITE_SERVER` value.
- Restart Vite after changing the frontend environment file.

### Login works in the API but not in the browser

- Confirm that `CLIENT_URL` exactly matches the frontend origin.
- Keep `credentials: true` enabled in browser requests and Socket.IO configuration.
- Do not mix `localhost` and `127.0.0.1` between the frontend and backend URLs.

### MongoDB does not connect

- Check the `MONGO_URI` value.
- If you use MongoDB Atlas, allow your current IP address and confirm the database username and password.
- Check whether special characters in the password need URL encoding.

### Images do not upload

- Confirm all three Cloudinary values are correct.
- Use a `jpg`, `jpeg`, or `png` image smaller than 5 MB.
- Confirm that the request uses the expected `avatar` or `files` form field.

## Contributing

1. Create a new branch from `main`.
2. Make a focused change.
3. Add or update tests when application behavior changes.
4. Run the relevant tests, lint check, and production build.
5. Open a pull request with a clear explanation of the change.

Do not commit `.env` files, logs, generated builds, or `node_modules`.

## License

The project package metadata uses the ISC license.

## Author

Created by [Talha Ayub](https://github.com/Talhaayubkhan).
