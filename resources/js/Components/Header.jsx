import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { BookHeart, Home, Heart } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card/90 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-vintage"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          href="/"
          className="flex items-center gap-2 text-2xl font-display font-bold text-foreground hover:text-primary transition-colors"
        >
          <motion.span
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            🍽️
          </motion.span>
          <span className="hidden sm:inline">Random Recipes</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" />
          <NavLink to="/favorites" icon={<Heart className="w-4 h-4" />} label="Favorites" />
          <NavLink to="/cookbook" icon={<BookHeart className="w-4 h-4" />} label="Cookbook" />
        </div>
      </nav>
    </motion.header>
  );
}

function NavLink({ to, icon, label }) {
  return (
    <Link
      href={to}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all font-medium text-sm"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
