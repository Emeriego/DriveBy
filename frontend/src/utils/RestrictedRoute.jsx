import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRefreshTokens } from './auth';
import { authActions } from '../store';
import './spin.css'



const Spinner = () => (
    <div className="spinner-overlay">
        <div className="spinner"></div>
    </div>
);


const RestrictedRoute = ({ element }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New state to track loading


   

    useEffect(() => {
        const fetchRefreshTokens = async () => {
            try {
                await setRefreshTokens(dispatch, authActions);
                setIsTokenRefreshed(true);
            } catch (error) {
                console.error("Error refreshing tokens:", error);
            } finally {
                // Add a slight delay before setting isLoading to false
                setTimeout(() => {
                    setIsLoading(false);
                }, 500); // Keep the spinner for 3 seconds after token refresh completes
            }
        };

        fetchRefreshTokens();
    }, [dispatch]);

    // If loading, return null to prevent rendering until token refresh check completes
    if (isLoading) {
        // return <div className="spinner"></div>;
        return <Spinner />;

    }

    if (!isLoggedIn || !isTokenRefreshed) {
        // Return loading indicator or redirect to login until token is refreshed
        return <Navigate to="/login" />;
    }

    // Once token is refreshed and user is logged in, render the element (UserCrafts)
    return element;
};

export default RestrictedRoute;
