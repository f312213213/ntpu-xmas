import './App.css';
import React, {useState} from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Signin from "./page/Signin";
import Home from "./page/Home";
import Post from "./page/Post";

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyAwe1cp8laACwbbKSWvdwVUi9Dx4asNSFI",
        authDomain: "ntpu-xmas.firebaseapp.com",
        projectId: "ntpu-xmas",
        databaseURL: "https://ntpu-xmas-default-rtdb.asia-southeast1.firebasedatabase.app/",
        storageBucket: "ntpu-xmas.appspot.com",
        messagingSenderId: "628966600813",
        appId: "1:628966600813:web:caabf5786bcb6111d50f64",
        measurementId: "G-E7RF27GCN2"
    };
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const [user, setUser] = useState({})
    return (
        <Router>
            <Routes>
                <Route exact path={'/'} exact element={<Home/>}/>
                <Route path={'/signin'} exact element={<Signin setUser={setUser} user={user}/>}/>
                <Route path={'/post'} exact element={<Post user={user}/>}/>
                <Route exact path={'*'} element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;
