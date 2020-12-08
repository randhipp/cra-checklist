import React from 'react';
import { Route } from 'react-router-dom';
import { getToken } from './Common';

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : 
    
      // <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      <div>
        You Must Login First
      </div>
    }
    />
  )
}

export default PrivateRoute;