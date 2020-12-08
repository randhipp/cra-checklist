import React from 'react';
import { getUrl, getUser, removeUserSession } from '../Utils/Common';
import ReactJson from 'react-json-view';

function Dashboard(props) {
    const user = getUser();
    const api_url = getUrl();
   
    // handle click event of logout button
    const handleLogout = () => {
      removeUserSession();
      props.history.push('/login');
    }
   
    return (
      <div>
        Welcome {user.name} - {user.email}!<br /><br />
        <ReactJson src={ {user: user, url:api_url} } theme="hopscotch" />
        <br /><br />
        <input type="button" onClick={handleLogout} value="Logout" />
      </div>
    );
  }
   
  export default Dashboard;