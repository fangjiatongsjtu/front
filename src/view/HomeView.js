import React, {useEffect, useState} from 'react';
import HeaderInfo from "../component/HeaderInfo";
import "../css/home.css"
import NavBar from "../component/NavBar";
import {JournalCarousel} from "../component/Carousel";
import JournalList from "../component/JournalList";
import {getRequest} from "../util/ajax";
const HomeView = () => {
    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?JSON.parse(localStorage.getItem("userinfo")):"";
    const isAuth = isLogin? userinfo.authorization === "1" : false;
    const [data,setData]=useState([])
    useEffect(()=>{
        if(isAuth){
         window.location.href="/"
        }
        getRequest("http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue/?travelogue.status.status=1",(response)=>{
            setData(response.data);
            console.log(response.data);
        })

    },[])
    return (
        <div className="home-pc">
            <HeaderInfo/>
            <NavBar/>
            <div className="home-container">
                <div className="home-content">
                    <div className="main-img">
                        <JournalCarousel/>
                        <div className="bd_recommend bgcc">
                            <div className="wrap">
                                <div className="title clrfix">
                                    <h2 className="lf">当季推荐</h2></div>
                                <div className="photo photo-low clrfix">
                                    <div className="pic pic-type-1">
                                        <div className="img-wrapper">
                                            <a href="https://travel.qunar.com/smartlist/7589216" target="_blank" data-beacon="bangdan_dangji">
                                                <img src="http://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/09da45332823f014429b94e55fa96c5d.jpg?width=2048&amp;height=1365&amp;top=0&amp;color=#928f52" alt=""/>
                                                <div className="bg-content" style={{ background: 'linear-gradient(-180deg, rgba(163,119,66,0.00) 0%, #928f52 100%)' }}>
                                                <div className="title-wrapper">
                                                    <p className="title">北京小长假周末必玩榜</p>
                                                </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pic pic-type-1">
                                        <div className="img-wrapper">
                                            <a
                                            href="https://travel.qunar.com/smartlist/7588616" target="_blank"
                                            data-beacon="bangdan_dangji">
                                                <img src="http://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/086174eabf6bd34955ce7b76fb8be567.jpg?width=1024&amp;height=683&amp;top=0&amp;color=#5191bb" alt=""/>
                                                <div className="bg-content"
                                                 style={{background:'linear-gradient(-180deg, rgba(163,119,66,0.00) 0%, #5191bb 100%)'}}>
                                                <div className="title-wrapper">
                                                    <p className="title">上海小长假周末必玩榜
                                                    </p>
                                                </div>
                                            </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pic pic-type-1">
                                        <div className="img-wrapper">
                                            <a
                                            href="https://travel.qunar.com/smartlist/7588553" target="_blank"
                                            data-beacon="bangdan_dangji">
                                                <img src="http://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/c06304f3eb91aa6bca56c1f88dff7986.jpg?width=577&amp;height=400&amp;top=0&amp;color=#446323" alt=""/>
                                            <div className="bg-content"
                                                 style={{background: 'linear-gradient(-180deg, rgba(163,119,66,0.00) 0%, #446323 100%)'}}>
                                                <div className="title-wrapper">
                                                    <p className="title">成都小长假周末必玩榜
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="journal_list">
                            {/*<JournalList journalData={journaldata}/>*/}
                            {data && <JournalList journalData={data}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomeView;