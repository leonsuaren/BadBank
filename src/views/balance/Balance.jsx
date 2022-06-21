import React, { useContext } from 'react';

import { UserContext } from '../../context/user-context';

export const Balance = () => {
  const userContext = useContext(UserContext);
  return (
    <h1>Balance <br />
    {JSON.stringify(userContext)}
    </h1>
  )
}