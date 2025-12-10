import React from 'react';

interface PasswordStrengthProps {
    password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
    const getStrength = (pwd: string): number => {
        let strength = 0;
        if (pwd.length >= 6) strength++;
        if (pwd.length >= 10) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/\d/.test(pwd)) strength++;
        if (/[^a-zA-Z\d]/.test(pwd)) strength++;
        return strength;
    };

    const strength = getStrength(password);
    const colors = ['bg-danger', 'bg-orange-500', 'bg-yellow-500', 'bg-success', 'bg-primary'];
    const textColors = ['text-danger', 'text-orange-500', 'text-yellow-500', 'text-success', 'text-primary'];
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="flex gap-1 mb-1">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded transition-colors ${i < strength ? colors[strength - 1] : 'bg-gray-700'
                            }`}
                    />
                ))}
            </div>
            <p className={`text-xs ${strength > 0 ? textColors[strength - 1] : 'text-gray-400'}`}>
                {strength > 0 ? labels[strength - 1] : 'Enter password'}
            </p>
        </div>
    );
};

export default PasswordStrength;
