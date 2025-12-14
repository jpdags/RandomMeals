import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RecipeNotes({ notes, onSave, disabled = false }) {
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
        <div className="mt-6 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Your Notes & Experience</h3>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        disabled={disabled}
                        className="text-red-400 hover:text-red-300 font-semibold text-sm"
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
                        className="w-full h-40 p-4 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none disabled:opacity-50 text-white placeholder-white/50"
                    />
                    <div className="flex gap-2 mt-4">
                        <motion.button
                            onClick={handleSave}
                            disabled={disabled}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold disabled:opacity-50"
                        >
                            Save
                        </motion.button>
                        <motion.button
                            onClick={handleCancel}
                            disabled={disabled}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 font-semibold disabled:opacity-50 border border-white/20"
                        >
                            Cancel
                        </motion.button>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/90 whitespace-pre-wrap"
                >
                    {notes || (
                        <span className="text-white/50 italic">
                            No notes yet. Click Edit to add your thoughts!
                        </span>
                    )}
                </motion.div>
            )}
        </div>
    );
}

