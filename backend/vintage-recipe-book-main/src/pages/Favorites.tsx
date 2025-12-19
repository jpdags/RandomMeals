import { motion } from 'framer-motion';
import Background3D from '@/components/Background3D';
import Header from '@/components/Header';
import { Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  // Placeholder - favorites would be stored in database with Lovable Cloud
  const favorites: any[] = [];

  return (
    <div className="min-h-screen relative">
      <Background3D />
      <Header />
      
      <main className="relative z-10 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Heart className="w-10 h-10 text-destructive fill-destructive" />
              Your Favorites
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Save your favorite recipes to build your personal cookbook collection
            </p>
          </motion.div>

          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="book-cover p-8 mb-6">
                <BookOpen className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  No favorites yet
                </h3>
                <p className="text-muted-foreground font-body mb-6">
                  Start exploring recipes and tap the heart icon to save your favorites here!
                </p>
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-vintage-gold"
                  >
                    Discover Recipes
                  </motion.button>
                </Link>
              </div>
              
              <p className="text-sm text-muted-foreground">
                💡 Tip: Connect to Lovable Cloud to save your favorites permanently
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Favorite cards would render here */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
