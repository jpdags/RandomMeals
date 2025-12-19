import { motion } from 'framer-motion';
import Background3D from '@/components/Background3D';
import Header from '@/components/Header';
import { BookOpen, Bookmark, PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cookbook() {
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
              <BookOpen className="w-10 h-10 text-primary" />
              My Cookbook
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Your personal vintage recipe book with notes, ratings, and memories
            </p>
          </motion.div>

          {/* Vintage Book Design */}
          <motion.div
            initial={{ opacity: 0, rotateX: 10 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="book-cover relative">
              {/* Book Cover Design */}
              <div className="text-center py-12 px-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-vintage">
                  <BookOpen className="w-16 h-16 text-primary-foreground" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Recipe Collection
                </h2>
                <p className="text-muted-foreground font-body italic mb-8">
                  A curated collection of culinary adventures
                </p>

                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent mx-auto mb-8" />

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">Recipes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-accent">0</div>
                    <div className="text-sm text-muted-foreground">Notes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-secondary">0</div>
                    <div className="text-sm text-muted-foreground">Ratings</div>
                  </div>
                </div>

                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent mx-auto mb-8" />

                {/* Empty State */}
                <div className="bg-paper-aged/30 rounded-xl p-6 mb-6">
                  <PenLine className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground font-body">
                    Your cookbook is waiting to be filled with delicious discoveries. 
                    Start by exploring recipes and saving your favorites!
                  </p>
                </div>

                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-vintage-gold inline-flex items-center gap-2"
                  >
                    <Bookmark className="w-4 h-4" />
                    Start Your Collection
                  </motion.button>
                </Link>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/50 rounded-br-lg" />
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mt-8 text-center"
          >
            <div className="glass rounded-xl p-6 border border-border/50">
              <h3 className="font-display font-bold text-foreground mb-2">
                🔒 Want to save your cookbook permanently?
              </h3>
              <p className="text-muted-foreground text-sm font-body">
                Connect to Lovable Cloud to store your recipes, notes, and ratings securely. 
                Your personal cookbook will sync across all your devices!
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
