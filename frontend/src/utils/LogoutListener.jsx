import React, { useEffect } from 'react';

const LogoutListener = ({ onLogout }) => {
    useEffect(() => {
        const handleStorage = (e) => {
            // Check if the event key is 'logout'
            if (e.key === 'logout') {
                // If it is, trigger the logout action
                onLogout();
            }
        };

        // Add event listener for 'storage' events
        window.addEventListener('storage', handleStorage);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorage);
        };
    }, [onLogout]);

    return null;
};

export default LogoutListener;
