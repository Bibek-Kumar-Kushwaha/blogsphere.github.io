import { createContext } from "react";
export const AppContext = createContext();

const ContextProvider = (props) => {
    const phone = "+977 9807822084"
    return(
        <AppContext.Provider value={phone}>
            {props.children}
        </AppContext.Provider>
    )
}

export default ContextProvider;

