import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase'

const RequireAuth = ({ children }) => {

    const [check, setAuth] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setAuth({ user: currentUser.email});
                console.log(currentUser.uid);
            }
            else {
                setAuth({ user: ''});
            }
        });
    }, [])

    if (check === null) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    if (check.user === '') return <Navigate to='/login' />
    
    return children

}

export default RequireAuth