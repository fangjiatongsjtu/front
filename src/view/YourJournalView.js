import React, {useEffect, useState} from "react";
import HeaderInfo from "../component/HeaderInfo";
import NavBar from "../component/NavBar";
import "../css/yourjournalview.css"
import {JournalTable} from "../component/JournalTable";
import {message} from "antd";
const YourJournalView = () => {
    const [data,setData] = useState([]);
    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?JSON.parse(localStorage.getItem("userinfo")):"";
    const username = isLogin ?userinfo.username:"";
    const isAuth = isLogin? userinfo.authorization === "1" : false;
    const url = "http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue/?travelogue.author.username="+username;
    const appendData = () => {
        fetch(url)
            .then((res) => res.json())
            .then((body) => {
                setData(body.data);
            });
    }

    useEffect(()=>{
        if(isAuth)
            window.location.href="/";
        appendData();
    },[])
    return(
        <div>
            <div>
                <div className="your-journal-pc">
                    <HeaderInfo/>
                    <NavBar/>
                    <div className="container">
                        <div className="content">
                            <div className="main-img">
                                <div className="main-bg">
                                    <div className="title clrfix">
                                        <h2 className="lf">你的游记</h2>
                                    </div>
                                <JournalTable info={data !== [] && data}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourJournalView;