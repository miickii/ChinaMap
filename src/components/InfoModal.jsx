import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../utils/helpers';

const InfoModal = ({ province, provinceFriends }) => {
  const navigate = useNavigate();

  if (!province) return null;

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
            <h2 className="text-2xl font-bold text-gray-900">{province.name}</h2>
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
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Province Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Population</p>
                  <p className="text-lg font-medium text-gray-900">{formatNumber(province.population)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Capital</p>
                  <p className="text-lg font-medium text-gray-900">{province.capital}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="text-lg font-medium text-gray-900">{formatNumber(province.area)} km²</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">GDP</p>
                  <p className="text-lg font-medium text-gray-900">¥{formatNumber(province.gdp)}</p>
                </div>
              </div>
            </div>

            {provinceFriends && provinceFriends.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Friends in this Province</h3>
                <div className="space-y-2">
                  {provinceFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => navigate(`/friends/${friend.id}`)}
                    >
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {friend.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{friend.name}</p>
                        <p className="text-sm text-gray-500">{friend.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfoModal;
