import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface InfoPageProps {
    title: string;
    content?: string;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, content }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1 className="text-4xl font-heading font-bold mb-6 text-primary">{title}</h1>
                <div className="glass-card p-8 border border-white/10 text-gray-300 leading-relaxed space-y-4">
                    <p>{content || "Let’s level up — together "}</p>
                    <p>- Devmitra Production</p>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
