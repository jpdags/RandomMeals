# Integration Plan for Vintage Recipe Book Frontend

## Information Gathered
- Laravel backend with Inertia.js and React already set up.
- Existing pages: Home.jsx, Favorites.jsx, Profile.jsx, Auth pages.
- Vintage frontend has pages: Index.tsx (home), Favorites.tsx, Cookbook.tsx, NotFound.tsx.
- Components: Header, Background3D, RecipeCard, RecipeNotes, StarRating, NavLink, RecipeButton.
- UI components: extensive shadcn/ui components.
- CSS: vintage theme with custom styles, fonts, colors.
- Backend has controllers for meals, favorites, notes, ratings.
- API service for fetching meals from TheMealDB.

## Plan
- [ ] Copy and integrate CSS from vintage-recipe-book-main/src/index.css into resources/css/app.css
- [ ] Copy UI components from vintage-recipe-book-main/src/components/ui/ to resources/js/Components/ui/
- [ ] Copy main components (Header, Background3D, RecipeCard, etc.) to resources/js/Components/
- [ ] Update Home.jsx to use vintage design from Index.tsx, replace with Inertia Link, integrate API data
- [ ] Update Favorites.jsx to use vintage design from Favorites.tsx, integrate with backend favorites
- [ ] Create new Cookbook.jsx based on Cookbook.tsx, integrate with backend notes/ratings
- [ ] Create NotFound.jsx based on NotFound.tsx
- [ ] Update Layout.jsx to use vintage Header and Background3D
- [ ] Update app.blade.php to reference new assets if needed
- [ ] Ensure all components use Inertia.js routing instead of react-router
- [ ] Preserve authentication and CRUD functionality
- [ ] Protect routes with Laravel auth
- [ ] Test API integration and data display

## Dependent Files to Edit
- resources/css/app.css
- resources/js/Components/ (multiple files)
- resources/js/Pages/Home.jsx
- resources/js/Pages/Favorites.jsx
- resources/js/Pages/Cookbook.jsx (new)
- resources/js/Pages/NotFound.jsx (new)
- resources/js/Components/Layout.jsx
- resources/views/app.blade.php

## Followup Steps
- [ ] Install any missing npm packages (framer-motion, lucide-react, etc.)
- [ ] Run npm install and npm run build
- [ ] Test all pages and functionality
- [ ] Ensure mobile responsiveness
- [ ] Verify auth-protected routes work
