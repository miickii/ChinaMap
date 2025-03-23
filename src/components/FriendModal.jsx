import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FriendModal = ({ friend }) => {
  const navigate = useNavigate();

  if (!friend) return null;

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
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Friend Details</h2>
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-2xl text-primary-600 font-medium">
                  {friend.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{friend.name}</h3>
                <p className="text-gray-500">{friend.city}, {friend.province}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Occupation</p>
                <p className="text-lg font-medium text-gray-900">{friend.occupation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Years in China</p>
                <p className="text-lg font-medium text-gray-900">{friend.yearsInChina}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Languages</p>
                <p className="text-lg font-medium text-gray-900">{friend.languages.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interests</p>
                <p className="text-lg font-medium text-gray-900">{friend.interests.join(', ')}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Bio</p>
              <p className="text-gray-700 leading-relaxed">{friend.bio}</p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => navigate('/')}
                className="button button-primary"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FriendModal;
