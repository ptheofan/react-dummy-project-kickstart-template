import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Accounts from '@/pages/Accounts.tsx';
import Login from '@/pages/Login.tsx';
import Register from '@/pages/Register.tsx';
import ForgotPassword from '@/pages/ForgotPassword.tsx';
import NotFound from '@/pages/NotFound.tsx';
import BasicLayout from '@/components/layouts/BasicLayout.tsx';
import AppLayout from '@/components/layouts/AppLayout.tsx';
import GuardLoggedIn from '@/components/guards/GuardLoggedIn.tsx';
import UserHome from '@/pages/UserHome.tsx';
import Logout from '@/pages/Logout.tsx';
import ThemePage from '@/pages/Theme.tsx';
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {

  return (
    <ThemeProvider storageKey="theme">
      <Routes>
        <Route element={ <GuardLoggedIn toPath={ '/login' }/> }>
          <Route path="/" element={ <AppLayout/> }>
            <Route index element={ <UserHome/> }/>
            <Route path="/accounts" element={ <Accounts/> }/>
            <Route path="/logout" element={ <Logout/> }/>
          </Route>
        </Route>

        <Route element={ <GuardLoggedIn inverse toPath={ '/' }/> }>
          <Route element={ <BasicLayout/> }>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/register" element={ <Register/> }/>
            <Route path="/forgot-password" element={ <ForgotPassword/> }/>
          </Route>
        </Route>

        <Route element={ <BasicLayout/> }>
          <Route path="/theme" element={ <ThemePage/> }/>
          <Route path="*" element={ <NotFound/> }/>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
