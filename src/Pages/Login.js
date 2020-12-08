import React, { useState } from 'react';
import ky from 'ky';
import { setUserSession } from '../Utils/Common';

function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of login form
  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
        const credentials = { email: username.value, password: password.value };
        const response = await ky.post('https://checklists.wafvel.com/api/v1/user/token', {json: credentials}).json();
        console.log(response)
        setLoading(false);
        setUserSession(response.token, response.user,'https://checklists.wafvel.com/api/v1/user/token');
        props.history.push('/dashboard');
    } catch (error) {
        setLoading(false);
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
    }
   }

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;