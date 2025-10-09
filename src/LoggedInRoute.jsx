import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from './App';

const LoggedInRoute = ({ Component }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(Auth)

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/main');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            {!isLoggedIn && <Component />}
        </>
    );
};

export default LoggedInRoute;


