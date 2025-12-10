import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';

const ReloadPrompt: React.FC = () => {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <AnimatePresence>
            {(offlineReady || needRefresh) && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-20 md:bottom-6 right-6 z-50 glass-card border border-primary/30 p-4 max-w-sm shadow-lg shadow-primary/20"
                >
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                            {offlineReady ? (
                                <div>
                                    <p className="font-bold text-sm mb-1">App ready to work offline</p>
                                    <p className="text-xs text-gray-400">You can now use Solo Grind without internet!</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="font-bold text-sm mb-1">New version available</p>
                                    <p className="text-xs text-gray-400">Click reload to update to the latest version.</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={close}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex gap-2 mt-3">
                        {needRefresh && (
                            <button
                                onClick={() => updateServiceWorker(true)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-black rounded-lg font-bold text-xs hover:bg-primary/90 transition-colors"
                            >
                                <RefreshCw size={14} />
                                Reload
                            </button>
                        )}
                        <button
                            onClick={close}
                            className="px-3 py-1.5 bg-white/10 text-white rounded-lg font-bold text-xs hover:bg-white/20 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReloadPrompt;
