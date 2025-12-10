import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/10 py-12 px-4 mt-auto w-full z-10 relative bg-background/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Brand */}
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <img src="/sologrind.png" alt="Solo Grind" className="h-10 w-auto object-contain" />
                        <span className="font-heading font-bold text-white">SOLO GRIND</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Level up your reality.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                    <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                    <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
                    <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
                </div>

            </div>

            <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
                <p>© 2025 Devmitra Profcution. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
