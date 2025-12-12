import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coffee } from 'lucide-react';

const SupportFab: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 group">
            {/* Tooltip - Above on mobile, Left on desktop */}

            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/donate')}
                className="bg-secondary text-black p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(188,19,254,0.4)] hover:shadow-[0_0_30px_rgba(188,19,254,0.6)] transition-shadow"
                title="Support the Developer"
            >
                <Coffee size={24} className="group-hover:rotate-12 transition-transform" />
            </motion.button>
        </div>
    );
};

export default SupportFab;
