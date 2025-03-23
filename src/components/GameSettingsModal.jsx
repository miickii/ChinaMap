import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GameSettingsModal = ({ onSettingsChange }) => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    lives: 3,
    timeLimit: 60,
    displayMode: 'English',
    mode: 'select',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSettingsChange(settings);
    navigate('/');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="modal"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Game Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Game Mode
              </label>
              <select
                value={settings.mode}
                onChange={(e) => setSettings({ ...settings, mode: e.target.value })}
                className="input"
              >
                <option value="select">Select Province</option>
                <option value="type">Type Province Name</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Language
              </label>
              <select
                value={settings.displayMode}
                onChange={(e) => setSettings({ ...settings, displayMode: e.target.value })}
                className="input"
              >
                <option value="English">English</option>
                <option value="Chinese">Chinese</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lives
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.lives}
                onChange={(e) => setSettings({ ...settings, lives: parseInt(e.target.value) })}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Limit (seconds)
              </label>
              <input
                type="number"
                min="30"
                max="300"
                step="30"
                value={settings.timeLimit}
                onChange={(e) => setSettings({ ...settings, timeLimit: parseInt(e.target.value) })}
                className="input"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="button button-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button button-primary"
              >
                Start Game
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameSettingsModal;
