# ChatHub

ChatHub is a MERN chat application with direct and group conversations, realtime Socket.IO messaging, friend requests, file attachments, and an admin dashboard. The repository contains both applications:

- `frontend/`: React 18, Vite, Material UI, Redux Toolkit, and Socket.IO Client
- `backend/`: Node.js, Express, MongoDB/Mongoose, Socket.IO, JWT cookies, Multer, and Cloudinary

## Requirements

- Node.js 20 or newer
- npm
- MongoDB
- A Cloudinary account for avatars and attachments

## Local setup

1. Clone the repository.
2. Create the local environment files from the safe samples.
3. Install dependencies in both applications.

```bash
cp backend/.env.sample backend/.env
cp frontend/.env.sample frontend/.env

cd backend
npm ci

cd ../frontend
npm ci
```

Fill in `backend/.env` before starting the API. Never commit either `.env` file.

### Backend environment

| Variable | Purpose |
| --- | --- |
| `PORT` | API and Socket.IO port, normally `8000` |
| `CLIENT_URL` | Allowed browser origin, normally `http://localhost:5173` |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Strong secret used to sign authentication cookies |
| `JWT_EXPIRY` | Token lifetime, for example `7d` |
| `ADMIN_SECRET_KEY` | Strong secret used for admin authentication |
| `CLOUDINARY_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

The frontend uses `VITE_SERVER` for the backend origin.

## Run the app

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`. The API and Socket.IO server use `http://localhost:8000` by default.

## Tests and checks

```bash
cd backend
npm test

cd ../frontend
npm test
npm run lint
npm run build
```

GitHub Actions runs backend tests and syntax checks, plus frontend tests, lint, and a production build for every pull request.

## Important behavior

- The server authenticates Socket.IO connections with the JWT cookie.
- The server checks chat membership and determines recipients from MongoDB. It does not trust recipient lists sent by browsers.
- Messages are stored before they are broadcast and the sender receives an acknowledgement.
- A user can stay connected from several tabs or devices without losing their other sessions.
- Message text is trimmed and limited to 2,000 characters on both client and server.

## Security note

Older repository history contained a committed backend environment file. Rotate the MongoDB, JWT, Cloudinary, and admin credentials before using ChatHub in production. Removing the current file does not erase secrets from Git history.

## Project structure

```text
ChatHub/
├── backend/
│   ├── index.js
│   ├── socketEvents.js
│   ├── src/
│   └── tests/
├── frontend/
│   ├── src/
│   └── tests/
└── .github/workflows/ci.yml
```

## License

ISC
