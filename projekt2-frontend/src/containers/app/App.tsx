import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import BadAccessControl from '../../pages/BadAccessControl';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Logout from '../../pages/Logout';
import Xss from '../../pages/Xss';
import { ClientsContext } from '../../store/ClientsStore';
import './App.css';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState<boolean>(true);
  const { authClient } = useContext(ClientsContext);

  async function managePrincipal() {
    if (isAuthenticated) {
      setLoading(true);
      await authClient.getCurrentPrincipal();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    managePrincipal();
  }, [isAuthenticated])

  return (
    <div className="App" style={{ minWidth: '100vw', minHeight: '100vh', textAlign: 'center', overflow: "visible" }}>
      <HashRouter>
        {isLoading || loading ? <h1>Loading...</h1> : <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/xss" element={<Xss />} />
          <Route path="/:userType/bad-access-control" element={<BadAccessControl />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>}
      </HashRouter>
    </div>
  );
}

export default App;
