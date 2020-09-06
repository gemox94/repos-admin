import React, { useReducer } from 'react';

const userReducer = (state, action) => {
    switch (action.type) {

        case 'SET_SESSION': {
            const { user, token } = action.payload;
            return { ...state, user, token };
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
