/** @format */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ Component }) => {
  const user = localStorage.getItem('id');

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  return <Component />;
};

export default Protected;
