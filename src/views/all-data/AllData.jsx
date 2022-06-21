import React, { useContext } from 'react';

import { UserContext } from '../../context/user-context'

export const AllData = () => {
  const userContext = useContext(UserContext);
  return (
    <h1>All Data <br />
    {JSON.stringify(userContext)}
    </h1>
  )
}