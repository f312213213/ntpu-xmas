import React, {useState} from 'react';
import { getDatabase, ref, set } from "firebase/database";
import {Navigate} from "react-router-dom";
import Loader from "react-loader-spinner";

const Post = ({user}) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const addPost = () => {
        setLoading(true)
        if (idRef.current.value === '' || textRef.current.value === ''){
            setResponse('兩個都要填喔！')
            setLoading(false)
        }
        else if(idRef.current.value.length !== 9){
            setResponse('學號不正確喔！')
            setLoading(false)
        }
        else{
            const database = getDatabase();
            set(ref(database, 'posts/by'+user.email.substring(1,10)+'/'+'to'+idRef.current.value),{
                email: 's'+idRef.current.value+'@gm.ntpu.edu.tw',
                content: textRef.current.value
            })
                .then(()=>{
                    idRef.current.value = ''
                    textRef.current.value = ''
                    setResponse('我們收到囉，會在聖誕節當天幫你寄出這封信！')
                })
                .catch(()=>{
                    setResponse('現在出了點問題，請跟管理員聯繫！')
                })

            setLoading(false)
        }
    }


    const detectLetter = () => {
        let isnum = /^\d+$/.test(idRef.current.value);
        if (!isnum){
            idRef.current.value = idRef.current.value.slice(0, -1)
        }
    }
    const idRef = React.useRef()
    const textRef = React.useRef()
    if (!user.email) {
        return <Navigate to={'/signin'}/>
    }
    else{
        if (user.email.indexOf('@gm.ntpu.edu.tw') === -1){
            return(
                <div className={'flex justify-center items-center min-h-screen w-full flex-col space-y-5'}>
                    <h1 className={'text underline text-red-500 text-3xl'}>
                        此信箱非學校配發之信箱
                    </h1>
                    <button onClick={()=>{window.location.reload()}} className={'border-2 rounded-md p-2'}>登出</button>
                </div>
            )
        }
        else {
            return (
                <div className={'flex justify-center items-center min-h-screen w-full flex-col space-y-5'}>
                    <h1 className={'text underline text-red-500 text-3xl'}>
                        2021聖誕傳情
                    </h1>
                    <input type="text" ref={idRef} onChange={detectLetter} className={'ring-2 focus:ring-4 p-2 rounded-xl border border-rose-400'} maxLength={9} placeholder={'對方的學號'}/>
                    <textarea name="" ref={textRef} className={'ring-2 focus:ring-4 p-2 rounded-xl p-2 border border-rose-400'} placeholder={'想說的話！'} id="" cols="30" rows="10"></textarea>
                    <p>
                        {response}
                    </p>
                    <button onClick={addPost} className={'border-2 rounded-md p-2'}>
                        {
                            loading ?
                                <Loader type="ThreeDots" color="#000" height={25} width={25} />
                                :
                                '送出'
                        }
                    </button>
                    <p className={'text-black'}>
                        對方會在聖誕節當天在他的學術信箱裡收到你留給他的話唷！
                    </p>
                </div>
            );
        }

    }

};

export default Post;
