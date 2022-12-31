import React from 'react';
import {useAuth} from "./context/auth-context";
import {UnauthenicatedApp} from "./unauthenicated-app";
import {AuthenicatedApp} from "./authenicated-app";

function App() {
  const {user} = useAuth()
  return (
    <div className="App" >
      {user ? <AuthenicatedApp/> : <UnauthenicatedApp/>}
    </div>
  );
}

export default App;
