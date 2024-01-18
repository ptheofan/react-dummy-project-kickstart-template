import { useContext, useEffect } from 'react';
import { Types, UserContext } from '@/contexts/UserProvider';
import { Navigate, Outlet } from 'react-router-dom';

export default function GuardLoggedIn({ inverse = false, toPath = "/" }: { inverse?: boolean, toPath?: string }) {
  const { state, dispatch } = useContext(UserContext);

  const redirectToValue = window.location.href;

  useEffect(() => {
    // Ensure this is only when redirecting to /login
    if (toPath === '/login') {
      dispatch({
        type: Types.SetLoginRedirect,
        payload: redirectToValue,
      });
    }
  }, [dispatch, inverse, redirectToValue, toPath]);

  if (!inverse && state.accessToken) {
    return <Outlet />;
  } else if (inverse && !state.accessToken) {
    return <Outlet />;
  }

  return <Navigate to={ toPath } />;
}
