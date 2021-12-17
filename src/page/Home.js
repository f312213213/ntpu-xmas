import React from 'react';
import {Link} from "react-router-dom";


const Home = () => {
    return (
        <div className={'flex justify-center items-center bg-rose-500 min-h-screen w-full text-black flex-col'}>
            浪漫na
            <br/>
            幫你聖誕傳情！
            <Link to={'/post'}>
                <button className={'border-2 rounded-md p-2 bg-white'}>走囉</button>
            </Link>
        </div>
    );
};

export default Home;
