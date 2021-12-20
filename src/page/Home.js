import React from 'react';
import {Link} from "react-router-dom";


const Home = () => {
    return (
        <div className={'flex justify-center items-center bg-rose-500 min-h-screen w-full text-black flex-col text-center'}>
            <h1 className={'text-2xl'}>
                2021臺北大學聖誕傳情
            </h1>
            浪漫na
            <Link to={'/post'}>
                <button className={'border-2 rounded-md p-2 bg-white hover:scale-110 transform transition shadow-xl hover:shadow-2xl mt-4'}>GOGO</button>
            </Link>
        </div>
    );
};

export default Home;
