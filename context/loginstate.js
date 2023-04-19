import { createContext, useContext, useMemo, useState, useEffect } from 'react';

const AppContext = createContext();

export function LoginWrapper({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);

    let loginstate = {/* whatever you want */
        loggedIn,
        setLoggedIn
    }


    return (
        <AppContext.Provider value={loginstate}>
            {children}
        </AppContext.Provider>
    );
}
export function useLoginContext() {
    return useContext(AppContext);
}