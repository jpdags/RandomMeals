# Random Meals - Full-Stack Web Application

A dynamic Single-Page Application (SPA) that fetches random recipes from TheMealDB API, allowing users to discover, save, rate, and add notes to their favorite meals.

## Features

- **Random Meal Discovery** - Fetch random recipes with one click
- **Authentication System** - Login, Register, and Password Reset
- **Google OAuth** - Sign in with Google
- **User Ratings** - Rate recipes from 1-5 stars
- **Personal Notes** - Save cooking experiences and tips
- **Favorites** - Save your favorite meals
- **Responsive Design** - Works on desktop and mobile
- **Modern UI/UX** - Built with TailwindCSS and Framer Motion
- **Flipbook Display** - Beautiful recipe card with expandable view

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 18 + Inertia.js
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Database**: MySQL/SQLite
- **Authentication**: Laravel Sanctum + Google OAuth (Socialite)

## Installation

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and npm
- MySQL or SQLite

### Setup Steps

1. **Clone the repository and install dependencies**

```bash
composer install
npm install
```

2. **Configure environment**

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
php artisan key:generate
```

3. **Configure database**

Update your `.env` file with database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=random_meals
DB_USERNAME=root
DB_PASSWORD=
```

Or use SQLite:

```env
DB_CONNECTION=sqlite
DB_DATABASE=absolute/path/to/database/database.sqlite
```

4. **Configure Mail Settings**

Add SMTP configuration to `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

5. **Configure Google OAuth**

Add Google OAuth credentials to `.env`:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

**To get Google OAuth credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Set authorized redirect URI to: `http://localhost:8000/auth/google/callback`

6. **Run migrations**

```bash
php artisan migrate
```

7. **Build assets**

```bash
npm run build
```

For development (with hot reload):

```bash
npm run dev
```

8. **Start the server**

```bash
php artisan serve
```

Visit `http://localhost:8000` in your browser.

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   └── AuthController.php
│   │   │   ├── MealController.php
│   │   │   ├── FavoriteController.php
│   │   │   ├── RecipeRatingController.php
│   │   │   └── RecipeNoteController.php
│   │   └── Middleware/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Favorite.php
│   │   ├── RecipeRating.php
│   │   └── RecipeNote.php
│   └── Services/
│       └── MealDBService.php
├── database/
│   └── migrations/
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   │   ├── Home.jsx
│   │   │   └── Auth/
│   │   └── Components/
│   │       ├── Layout.jsx
│   │       ├── RecipeCard.jsx
│   │       ├── StarRating.jsx
│   │       └── RecipeNotes.jsx
│   └── views/
│       └── app.blade.php
└── routes/
    └── web.php
```

## API Endpoints

### Public Endpoints

- `GET /` - Landing page
- `GET /api/meals/random` - Get random meal
- `GET /api/meals/{mealId}` - Get meal by ID

### Authentication Endpoints

- `GET /login` - Login page
- `POST /login` - Login
- `GET /register` - Register page
- `POST /register` - Register
- `POST /logout` - Logout
- `GET /auth/google` - Google OAuth redirect
- `GET /auth/google/callback` - Google OAuth callback
- `GET /forgot-password` - Forgot password page
- `POST /forgot-password` - Send password reset link
- `GET /reset-password/{token}` - Reset password page
- `POST /reset-password` - Reset password

### Protected Endpoints (Require Authentication)

- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/{mealId}` - Remove from favorites
- `POST /api/ratings` - Create/Update rating
- `PUT /api/ratings/{mealId}` - Update rating
- `DELETE /api/ratings/{mealId}` - Delete rating
- `POST /api/notes` - Create/Update notes
- `PUT /api/notes/{mealId}` - Update notes
- `DELETE /api/notes/{mealId}` - Delete notes

## Usage

1. **Discover Random Meals**
   - Click the "RANDOM MEALS" button on the landing page
   - View recipe details including ingredients and instructions

2. **Create an Account**
   - Click "Register" to create an account
   - Or use "Login with Google" for quick sign-up

3. **Save Favorites**
   - Click the heart icon on any recipe to save it

4. **Rate Recipes**
   - Expand the recipe card by clicking "View Recipe"
   - Click stars on the left side to rate (1-5 stars)
   - Confirm when updating existing ratings

5. **Add Notes**
   - Expand the recipe card
   - Scroll to the "Your Notes & Experience" section
   - Add your cooking tips, modifications, or experiences

## Development

### Running in Development Mode

Start Laravel server and Vite dev server:

```bash
php artisan serve
npm run dev
```

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
php artisan test
```

## Security Features

- Password hashing with bcrypt
- CSRF protection
- SQL injection protection (Eloquent ORM)
- XSS protection
- Secure session management
- Protected routes with authentication middleware

## License

MIT

## Credits

- TheMealDB API - [https://www.themealdb.com/](https://www.themealdb.com/)
- Laravel - [https://laravel.com/](https://laravel.com/)
- React - [https://react.dev/](https://react.dev/)
- Inertia.js - [https://inertiajs.com/](https://inertiajs.com/)
- Spline - 
