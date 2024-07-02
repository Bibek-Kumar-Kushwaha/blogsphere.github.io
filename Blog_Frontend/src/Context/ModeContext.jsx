import { createContext, useState } from "react";

// Create a context object
export const AppContext = createContext();

// ContextProvider component
const ContextProvider = (props) => {
  // Define state for authentication
  const [isAuth, setIsAuth] = useState(false);

  return (
    // Provide the context with values
    <AppContext.Provider value={{ isAuth, setIsAuth }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
