/** @format */

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Protected = ({ Component }) => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  return <Component />;
};

export default Protected;