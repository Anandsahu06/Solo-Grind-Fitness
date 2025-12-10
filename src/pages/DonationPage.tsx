import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coffee, ArrowLeft, Heart, Zap, Shield } from 'lucide-react';
import Footer from '../components/Footer';

const DonationPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-white flex flex-col">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>
                    <div className="flex items-center gap-2">
                        <Coffee className="text-secondary" />
                        <span className="font-heading font-bold">Support Us</span>
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </div>
            </nav>

            <div className="flex-1 flex items-center justify-center p-4 pt-24 pb-12">
                <div className="max-w-md w-full space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8 border border-secondary/30 relative overflow-hidden text-center"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-secondary/20 rounded-full blur-[80px]" />

                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6 border border-secondary/30">
                                <Coffee className="text-secondary w-10 h-10" />
                            </div>

                            <h1 className="text-3xl font-heading font-bold mb-3">Buy a Coffee</h1>
                            <p className="text-gray-400 mb-8">
                                Support the development of Solo Grind and help us keep the servers running ad-free for everyone.
                            </p>

                            {/* Benefits */}
                            <div className="grid grid-cols-2 gap-4 text-left mb-8">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-2 mb-1 text-primary">
                                        <Zap size={16} />
                                        <span className="font-bold text-sm">Ad-Free</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Enjoy uninterrupted training sessions forever.</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-2 mb-1 text-primary">
                                        <Shield size={16} />
                                        <span className="font-bold text-sm">Badge</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Get a special supporter badge on your profile.</p>
                                </div>
                            </div>

                            {/* QR Section */}
                            <div className="bg-white p-4 rounded-xl mx-auto w-64 h-auto flex items-center justify-center mb-6 shadow-lg shadow-black/50">
                                <img
                                    src="/QR.jpg"
                                    alt="Payment QR Code"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                                <Heart size={12} className="text-red-500 fill-red-500" />
                                Thank you for your support
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DonationPage;
