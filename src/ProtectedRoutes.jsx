import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from './App';

const ProtectedRoutes = ({ Component }) => {
  const navigate = useNavigate();
  const {isLoggedIn} = useContext(Auth)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && <Component />}
    </>
  );
};

export default ProtectedRoutes;
