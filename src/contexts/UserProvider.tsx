import React, { createContext, useEffect, useReducer } from 'react';
import tabActiveEventValue from '../utils/tabActiveEventValue.ts';
import refreshTokens from '../api/refreshTokens.ts';
import { ActionMap } from '../utils/ActionMap.ts';

// Modify UserType to match your user model and update teh initialState accordingly
export type UserType = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  loginRedirect: string;
};

const initialState: UserType = {
  id: '',
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  loginRedirect: '',
};

// eslint-disable-next-line react-refresh/only-export-components
export enum Types {
  SetUser = 'SET_USER',
  ClearUser = 'CLEAR_USER',
  SetLoginRedirect = 'SET_LOGIN_REDIRECT',
  ClearLoginRedirect = 'CLEAR_LOGIN_REDIRECT',
  SetTokens = 'SET_TOKENS',
}

type UserPayload = {
  [Types.SetUser]: UserType;
  [Types.ClearUser]: undefined;
  [Types.SetLoginRedirect]: string;
  [Types.ClearLoginRedirect]: undefined;
  [Types.SetTokens]: {
    accessToken: string;
    refreshToken: string;
  };
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

const UserContext = createContext<{
  state: UserType;
  dispatch: React.Dispatch<UserActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const userReducer = (state: UserType, action: UserActions) => {
  switch(action.type) {
    case Types.SetUser:
      return {
        ...state,
        ...action.payload,
      };
    case Types.SetLoginRedirect:
      return {
        ...state,
        loginRedirect: action.payload,
      };
    case Types.ClearLoginRedirect:
      return {
        ...state,
        loginRedirect: initialState.loginRedirect,
      };
    case Types.ClearUser:
      return {
        ...state,
        initialState,
      };
    case Types.SetTokens:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    default:
      return state;
  }
}

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isTabActive, setIsTabActive] = React.useState(true);
  const [refreshIntervalId, setRefreshIntervalId] = React.useState<NodeJS.Timeout | undefined>(undefined);

  // Monitor local storage changes for the tokens
  useEffect(() => {
    const handleStorageChange = (evt: StorageEvent) => {
      if (evt.key !== 'accessToken' && evt.key !== 'refreshToken') {
        return;
      }

      const accessToken = window.localStorage.getItem('accessToken');
      const refreshToken = window.localStorage.getItem('refreshToken');
      if (state.accessToken !== accessToken || state.refreshToken !== refreshToken) {
        dispatch({
          type: Types.SetTokens,
          payload: {
            accessToken: accessToken || '',
            refreshToken: refreshToken || '',
          },
        });
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Monitor tab active state
  // Monitor tab active state and window focus
  useEffect(() => {
    const { hidden, eventName } = tabActiveEventValue();
    if (hidden === "" || eventName === "") {
      return;
    }

    const handleVisibilityChange = () => {
      setIsTabActive(!(document[hidden as keyof Document] as boolean));
    }

    document.addEventListener(eventName, handleVisibilityChange, false);
    return () => {
      document.removeEventListener(eventName, handleVisibilityChange);
    }
  }, []);


  // Handles tokens refresh when the tab is active
  useEffect(() => {
    // Todo: compute next check in based on token expiration
    const nextCheckIn = 60 * 60 * 1000; // 1 hour
    const refreshTokensHandler = () => {
      if (isTabActive) {
        const {accessToken, refreshToken} = refreshTokens(state);
        dispatch({
          type: Types.SetTokens,
          payload: {
            accessToken,
            refreshToken,
          },
        });
      }
    };

    // Tab is inactive, clear the timer, we do not refresh tokens when tab is inactive
    if (!isTabActive) {
      if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
        setRefreshIntervalId(undefined);
      }
      return;
    }

    // Tab is active, if we already have a timer, clear it and set a new one
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      setRefreshIntervalId(undefined);
    }
    console.log('Setting refresh interval', nextCheckIn, state);
    setRefreshIntervalId(setTimeout(refreshTokensHandler, nextCheckIn));
    return () => {
      if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
        setRefreshIntervalId(undefined);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTabActive]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
