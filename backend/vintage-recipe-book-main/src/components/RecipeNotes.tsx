import { useState } from 'react';
import { motion } from 'framer-motion';

interface RecipeNotesProps {
  notes: string;
  onSave?: (notes: string) => void;
  disabled?: boolean;
}

export default function RecipeNotes({ notes, onSave, disabled = false }: RecipeNotesProps) {
  const [localNotes, setLocalNotes] = useState(notes || '');
  const [isEditing, setIsEditing] = useState(!notes);

  const handleSave = () => {
    if (onSave) {
      onSave(localNotes);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setLocalNotes(notes || '');
    setIsEditing(false);
  };

  return (
    <div className="mt-6 p-6 bg-paper-aged/30 rounded-xl border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-display font-bold text-foreground">Your Notes & Experience</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            disabled={disabled}
            className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={localNotes}
            onChange={(e) => setLocalNotes(e.target.value)}
            disabled={disabled}
            placeholder="Share your cooking experience, modifications, or tips..."
            className="w-full h-40 p-4 bg-paper border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none disabled:opacity-50 text-foreground placeholder-muted-foreground font-body"
          />
          <div className="flex gap-2 mt-4">
            <motion.button
              onClick={handleSave}
              disabled={disabled}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-vintage disabled:opacity-50"
            >
              Save
            </motion.button>
            <motion.button
              onClick={handleCancel}
              disabled={disabled}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-vintage-secondary disabled:opacity-50"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="text-foreground whitespace-pre-wrap font-body">
          {notes || <span className="text-muted-foreground italic">No notes yet...</span>}
        </div>
      )}
    </div>
  );
}
