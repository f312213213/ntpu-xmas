import React, {useEffect, useState} from 'react';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth";
import {Navigate} from "react-router-dom";
import Loader from "react-loader-spinner";

const Signin = ({setUser, user}) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        getRedirectResult(auth)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const userGet = result.user;
                setUser(userGet)
                setLoading(false)
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            setLoading(false)
        });
    },[])
    const signinButton = () => {
        setLoading(true)
        signInWithRedirect(auth, provider)
    }
    if (user.email) {
        return <Navigate to={'/post'} />
    }
    else{
        return (
            <div className={'flex justify-center items-center bg-rose-500 min-h-screen w-full flex-col'}>
                <button onClick={signinButton} className={'border-2 p-2 rounded-md bg-white hover:scale-110 transform transition shadow-xl hover:shadow-2xl'}>
                    {
                        loading ?
                            <Loader type="ThreeDots" color="#000" height={25} width={25} />
                            :
                            '登入-請使用學校配發之學術信箱'
                    }
                </button>
                <p className={'mt-4'}>
                    對方不會收到任何關於你的資訊，實名制僅確保使用者不會濫用此服務。
                </p>
            </div>
        );
    }

};

export default Signin;
