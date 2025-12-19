import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background3D from '@/components/Background3D';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import RecipeButton from '@/components/RecipeButton';
import { useRandomMeal } from '@/hooks/useRandomMeal';
import { Loader2, RefreshCw } from 'lucide-react';

const Index = () => {
  const { meal, loading, error, fetchRandomMeal } = useRandomMeal();

  return (
    <div className="min-h-screen relative flex flex-col">
      <Background3D />
      <Header />
      
      <main className="relative z-10 py-8 md:py-12 flex-1">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-14"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 leading-tight">
              Discover Your Next
              <span className="block text-gradient">Delicious Meal</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
              Press the button below to discover a random recipe from around the world. 
              Save your favorites and build your personal cookbook!
            </p>
          </motion.div>

          {/* Recipe Button - Show when no meal */}
          {!meal && !loading && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-center mb-12"
            >
              <RecipeButton onClick={fetchRandomMeal} disabled={loading} />
            </motion.div>
          )}

          {/* Loading State */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/20 animate-ping" />
                </div>
                <p className="mt-6 text-muted-foreground font-display text-xl">
                  Finding a delicious recipe...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-8"
              >
                <div className="bg-destructive/10 text-destructive px-6 py-4 rounded-xl inline-block mb-4 border border-destructive/20">
                  <p className="font-medium">{error}</p>
                </div>
                <br />
                <motion.button
                  onClick={fetchRandomMeal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-vintage inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recipe Card */}
          <AnimatePresence>
            {meal && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <RecipeCard 
                  meal={meal} 
                  onNextRecipe={fetchRandomMeal}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer CTA when recipe is shown */}
          {meal && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-10"
            >
              <p className="text-muted-foreground text-sm font-body">
                Not what you're looking for? Click "Next Recipe" to discover more!
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Decorative Footer */}
      <footer className="relative z-10 py-6 text-center border-t border-border/30 glass mt-auto">
        <p className="text-muted-foreground text-sm font-body">
          Made with ❤️ for food lovers everywhere
        </p>
      </footer>
    </div>
  );
};

export default Index;
