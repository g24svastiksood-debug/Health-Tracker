# Health Tracker & Diet Planner

A BMI calculator and personalised diet planner.

- **Frontend:** Plain HTML/CSS/JS (`frontend/index.html`)
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)

## Project structure

```
health-tracker/
├── backend/
│   ├── models/          # Mongoose schemas (User, BmiRecord, ContactMessage)
│   ├── routes/          # auth, profile, bmi, contact
│   ├── middleware/auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   └── index.html       # open this in a browser / serve with any static server
└── README.md
```

## 1. Run the backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — your MongoDB connection string. For local MongoDB: `mongodb://127.0.0.1:27017/health_tracker`. For MongoDB Atlas (free cloud tier), use the connection string from your Atlas cluster.
- `JWT_SECRET` — any long random string.

Start MongoDB locally (if not using Atlas), then run:

```bash
npm start
```

You should see `Connected to MongoDB` and `Server running on http://localhost:5000`.

### API endpoints

| Method | Route              | Auth required | Description               |
|--------|---------------------|:---:|----------------------------|
| POST   | `/api/auth/register` |  | Create account |
| POST   | `/api/auth/login`    |  | Log in, returns JWT |
| GET    | `/api/auth/me`       | ✓ | Current user info |
| PUT    | `/api/profile`       | ✓ | Update name/age/diet preference |
| POST   | `/api/bmi`           | ✓ | Save a BMI record |
| GET    | `/api/bmi`           | ✓ | Get BMI history (most recent 20) |
| POST   | `/api/contact`       |  | Save a contact message |

## 2. Run the frontend

The frontend is a static HTML file. Easiest options:
- Open `frontend/index.html` directly in a browser, **or**
- Serve it (recommended, avoids CORS quirks): `cd frontend && npx serve` or use the VS Code "Live Server" extension.

It's already configured to call the backend at `http://localhost:5000/api` (see the `API_BASE` constant near the top of the `<script>` block in `index.html`) — update that if you deploy the backend elsewhere.

## 3. Upload to GitHub

From the `health-tracker` folder:

```bash
git init
git add .
git commit -m "Health Tracker & Diet Planner - frontend + Node/Express/MongoDB backend"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

Notes:
- Create the empty repo on GitHub first (github.com → New repository), then use its URL in the `git remote add` command above.
- `.env` is already git-ignored so your database credentials won't be pushed.
- If prompted for a password, GitHub requires a Personal Access Token instead of your account password — generate one under GitHub → Settings → Developer settings → Personal access tokens.

## Project info
Svastik Sood, Roll No. 506 — Guru Nanak Khalsa College, Mumbai
