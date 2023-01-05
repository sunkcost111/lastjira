import React from 'react';
import {useAuth} from "./context/auth-context";
import {UnauthenicatedApp} from "./unauthenicated-app";
import {AuthenicatedApp} from "./authenicated-app";
import {ErrorBoundary} from "./components/error-boundary";
import {FullPageErrorFallBack} from 'components/lib'

function App() {
  const {user} = useAuth()
  return (
    <div className="App" >
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {user ? <AuthenicatedApp/> : <UnauthenicatedApp/>}
      </ErrorBoundary>
    </div>
  );
}

export default App;
