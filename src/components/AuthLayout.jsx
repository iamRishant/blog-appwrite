// this is for protection

import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    // here authentication mean whether this route require authentication or not
    //example login singup page dont require authentication so they are not protected

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            // if authentication is required and user is not logged in
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            // so if a logged in user try to access /login and /signup it will redirect it to home page
            //pages which  dont require authentication will have authentication as false (login and signup page)
            //and when an logged in user try to access that page it will redirect to home page
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
