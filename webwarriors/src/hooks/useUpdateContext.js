import React from 'react'
import { useState } from 'react'
import {useAuthContext} from './useAuthContext'

export const useUpdateContext = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const {user} = useAuthContext()

    const update = async (uploaded_file, username, email, bio) =>{
        setIsLoading(true)
        setError(null)

        console.log(uploaded_file, username, email, bio)
        const response = await fetch(`http://localhost:5001/users/updateprofile/${user.user._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({uploaded_file, username, email, bio})
        })

        const json = await response.json()
        console.log("uc: ", json)

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            // save the user to local storare
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }

    }
    return {update, isLoading, error}
}

export default useUpdateContext