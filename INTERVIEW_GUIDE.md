# Interview Guide - Random Meals Project

## Backend Architecture

### Routes Structure
**Web Routes** (`routes/web.php`):
- **Public Routes**: `/` (home), `/api/meals/random`, `/api/meals/{id}` 
- **Auth Routes**: Login, Register, Google OAuth, Password Reset
- **Protected Routes** (require authentication): Favorites, Ratings, Notes management

**API Routes** (`routes/api.php`):
- Uses Laravel Sanctum middleware for token-based authentication
- `EnsureFrontendRequestsAreStateful` prevents CSRF attacks
- Protected endpoints for favorites, ratings, and notes

**How to Answer**: 
> "We have a REST API with public endpoints for fetching meals, and protected endpoints using Laravel Sanctum for user-specific content. We separate web routes from API routes - the web routes handle page rendering via Inertia.js, while API routes handle data."

---

## Error Handling

### Backend Error Handling

**Controller Level** (`MealController.php`):
```php
if (!$meal) {
    return response()->json(['error' => 'Failed to fetch meal'], 500);
}
// or
return response()->json(['error' => 'Meal not found'], 404);
```

**Service Level** (`MealDBService.php`):
```php
try {
    $response = Http::get(self::BASE_URL . '/random.php');
    // handle response
} catch (\Exception $e) {
    Log::error('TheMealDB API Error: ' . $e->getMessage());
    return null;
}
```

**How to Answer**:
> "We handle errors at multiple levels:
> 1. **Service Layer**: Catches API call exceptions and logs them using Laravel's Log facade
> 2. **Controller Layer**: Validates responses and returns appropriate HTTP status codes (404 for not found, 500 for server errors)
> 3. **Logging**: All errors are logged for debugging purposes
> 4. **User Feedback**: Return JSON errors to the frontend with meaningful messages"

---

### Frontend Error Handling

**Location**: `resources/js/Components/`

**Typical Patterns**:
- Try-catch blocks around API calls
- Error state management in React components
- Display error messages to users
- Graceful fallbacks when data fails to load

**How to Answer**:
> "On the frontend, we use React error boundaries and try-catch blocks. When API calls fail, we:
> 1. Catch the error and set error state
> 2. Display user-friendly error messages
> 3. Provide retry options or fallback UI
> 4. Log errors to the console for development"

---

## Caching Strategy

### Caching Implementation

**Service Layer** (`MealDBService.php`):
```php
public function getMealById(string $mealId): ?array
{
    $cacheKey = 'meal_' . $mealId;
    
    return Cache::remember($cacheKey, 86400, function () use ($mealId) {
        // API call here
        // 86400 = 24 hours cache duration
    });
}
```

**What's Cached**:
- ✅ **Meal Details**: Cached for 24 hours (86400 seconds) - reduces API calls
- ❌ **Random Meals**: NOT cached - gives fresh results each time
- ❌ **User Data**: Not cached - always fetch fresh (favorites, ratings, notes)

**Cache Driver**:
- Currently using DATABASE cache (as per `.env` `CACHE_STORE=database`)
- Can be upgraded to Redis/Memcached for production

**How to Answer**:
> "Yes, we implement caching strategically:
> - **Meal Details (by ID)** are cached for 24 hours since they change infrequently
> - **Random Meals are NOT cached** because users expect fresh results
> - **User-specific data** (favorites, ratings, notes) is never cached - always fresh from database
> 
> This balances performance with data freshness. We use Laravel's Cache facade with Cache::remember() which automatically handles cache hits and misses. We could scale to Redis for production, but currently use database cache."

---

## Database

### Tables
- `users` - User accounts
- `favorites` - Saved meals
- `recipe_ratings` - User ratings (1-5 stars)
- `recipe_notes` - User notes/experiences
- `cache` - Cache storage (for caching strategy)

---

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| **Backend** | Laravel 12, PHP 8.2+ |
| **Frontend** | React 18, Inertia.js, Tailwind CSS |
| **Database** | SQLite (dev), MySQL (production ready) |
| **Authentication** | Laravel Sanctum + Google OAuth (Socialite) |
| **External API** | TheMealDB API |
| **Caching** | Laravel Cache (Database/Redis) |

---

## Interview Tips

1. **When asked about routing**: Mention separation of concerns (web vs API routes)
2. **When asked about error handling**: Explain the try-catch at service level + validation at controller level
3. **When asked about caching**: Be specific - explain WHAT is cached, HOW LONG, and WHY
4. **When asked about scalability**: Mention Redis caching, database optimization, API rate limiting
5. **Always mention**: Why you made each decision (performance, data freshness, user experience)

---

## Example Interview Answers

### "How do you handle API calls in your backend?"
> "We create a dedicated Service layer (MealDBService) that encapsulates all external API calls. This separates business logic from controllers. The service uses Laravel's Http facade for requests, wraps them in try-catch blocks for error handling, and implements caching where appropriate. Controllers call the service and validate responses before returning JSON to the frontend."

### "What's your caching strategy?"
> "We use Laravel's Cache facade with database storage. Meal details by ID are cached for 24 hours because they're static data from TheMealDB. Random meals aren't cached because users expect new results. User data (favorites, ratings, notes) is never cached to ensure data accuracy. For production, we'd upgrade to Redis for better performance."

### "How do you handle errors?"
> "Errors are handled at three levels: (1) Service layer catches API exceptions and logs them, (2) Controller validates responses and returns appropriate HTTP status codes, (3) Frontend catches response errors and displays user-friendly messages. All errors are logged for debugging."

### "Why separate web and API routes?"
> "Web routes render pages via Inertia.js (server-side rendering with React), while API routes provide data endpoints. This separation lets us serve the SPA efficiently and makes the API reusable for other clients (mobile apps, etc.)."
