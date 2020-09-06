import React, { useReducer } from 'react';

const userReducer = (state, action) => {
    switch (action.type) {

        case 'SET_SESSION': {
            const { user, token } = action.payload;
            return { ...state, user, token };
        }

        case 'SET_USER': {
            return { ...state, user: {...action.payload} };
        }

        case 'SET_TOKEN': {
            return { ...state, token: action.payload };
        }

        case 'SET_PRIVATE_REPOS': {
            return { ...state, privateRepos: [...action.payload] };
        }

        case 'SET_PUBLIC_REPOS': {
            return { ...state, publicRepos: [...action.payload] };
        }

        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}

export const UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {

    const reducer = useReducer(userReducer, { });

    return (
       <UserContext.Provider value={reducer}>
           {children}
       </UserContext.Provider>
    );

};

export const withUserContext = Component => {
  return (props) => {
      return (
          <UserContextProvider>
              <Component {...props}/>
          </UserContextProvider>
      );
  };
};
