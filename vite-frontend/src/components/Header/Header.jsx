import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from '../Home Page/Home';
import { Navigation } from './Navigation';
import { Login } from '../Login/Login';
import { Student } from '../Student Page/Student';
import { Admin } from '../Admin Page/Admin';
import { AuthProvider } from '../Login Authentication/Auth';

export const Header = () => {
  const location = useLocation();
  const hideNavigation = ['/Login', '/student', '/admin'].includes(location.pathname);

  return (
    <>
      {!hideNavigation && <Navigation />}
      <AuthProvider>
        <div className="navigation-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/JoinNow" />
              <Route path="/Login" element={<Login />} />
              <Route path='/student' element={<Student />}/>
              <Route path='/admin' element={<Admin />}/>
            </Routes>
        </div>
      </AuthProvider>
    </>
  );
};
