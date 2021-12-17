import React, {useEffect} from 'react';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth";
import {Navigate} from "react-router-dom";

const Signin = ({setUser, user}) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    useEffect(()=>{
        getRedirectResult(auth)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const userGet = result.user;
                setUser(userGet)
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });


    },[])
    const signinButton = () => {
        signInWithRedirect(auth, provider)
    }
    if (user.email) {
        return <Navigate to={'/post'} />
    }
    else{
        return (
            <div className={'flex justify-center items-center bg-rose-500 min-h-screen w-full flex-col'}>
                <button onClick={signinButton} className={'border-2 p-2 rounded-md bg-white'}>
                    登入 - 請使用學校配發之學術信箱
                </button>
                <p>
                    對方不會收到任何關於你的資訊，實名制僅確保使用者不會濫用此服務。
                </p>
            </div>
        );
    }

};

export default Signin;
