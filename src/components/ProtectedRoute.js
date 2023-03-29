import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children }) {
  return (
    <Route>
      {
                () => (loggedIn === true ? children : <Redirect to="/signin" />)
            }
    </Route>

  );
}

export default ProtectedRoute;
