
import React, { useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
    children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { isAuthenticated, openAuthModal, isAuthModalOpen } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            openAuthModal();
        }
    }, [isAuthenticated, openAuthModal]);

    if (!isAuthenticated) {
        // If the modal is closed and we are not authenticated, redirect to home
        if (!isAuthModalOpen) {
            return <Navigate to="/" state={{ from: location }} replace />;
        }
        // While modal is open, we can show a loader or just a blank screen
        // Returning null here is safe as the AuthModal is rendered at the App level
        return null;
    }

    return children as React.ReactElement;
};
