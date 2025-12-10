import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Listen for the beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);

            // Check if user has dismissed the prompt before
            const dismissed = localStorage.getItem('pwa-install-dismissed');
            if (!dismissed && window.innerWidth <= 768) {
                // Show prompt after 3 seconds on mobile
                setTimeout(() => {
                    setShowPrompt(true);
                }, 3000);
            }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // Clear the deferredPrompt
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        // Remember that user dismissed (expires in 7 days)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        localStorage.setItem('pwa-install-dismissed', expiryDate.toISOString());
    };

    // Don't show if not mobile or already installed
    if (!isMobile) return null;

    return (
        <AnimatePresence>
            {showPrompt && deferredPrompt && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        onClick={handleDismiss}
                    />

                    {/* Prompt Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md"
                    >
                        <div className="glass-card p-6 border border-primary/30 relative">
                            {/* Close Button */}
                            <button
                                onClick={handleDismiss}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Logo */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src="/sologrind.png"
                                    alt="Solo Grind"
                                    className="h-16 w-auto object-contain"
                                />
                            </div>

                            {/* Content */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-heading font-bold mb-2">
                                    Install Solo Grind Fitness
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    Get the full app experience! Install now for:
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary">⚡</span>
                                    </div>
                                    <span className="text-gray-300">Faster loading & offline access</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary">🔔</span>
                                    </div>
                                    <span className="text-gray-300">Push notifications for streaks</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary">📱</span>
                                    </div>
                                    <span className="text-gray-300">Native app-like experience</span>
                                </div>
                            </div>

                            {/* Install Button */}
                            <button
                                onClick={handleInstallClick}
                                className="w-full bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                            >
                                <Download size={20} />
                                Install App Now
                            </button>

                            {/* Later Button */}
                            <button
                                onClick={handleDismiss}
                                className="w-full mt-3 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Maybe Later
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default InstallPrompt;
