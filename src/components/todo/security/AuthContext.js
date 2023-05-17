import { createContext, useState } from "react";
import { useContext } from 'react';
import { excuteBasicAuthenticationService } from '../api/HelloWorldApiService'

// Create a Context
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


// Share the created context with other components
export default function AuthProvider({ children }) {

    // Put some state in the context

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);


    // function login(username, password) {
    //      if(username === 'in28minutes' && password === 'dummy') {
    //         setAuthenticated(true);
    //         setUsername(username); 
    //         return true;
    //     } else {
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }

    // }

    function login(username, password) {

        const baToken = 'Basic ' + window.btoa(username + ":" + password);
        excuteBasicAuthenticationService(baToken)
            .then (response => console.log(response))
            .catch(error => console.log(error))
        
            setAuthenticated(false);            

    //      if() {
    //         setAuthenticated(true);
    //         setUsername(username); 
    //         return true;
    //     } else {
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }

    }

    function logout() {
        setAuthenticated(false);
        setUsername(null);
    }


    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    )
    }
