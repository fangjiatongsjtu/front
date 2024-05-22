import React from 'react';
import HeaderInfo from "../component/HeaderInfo";
import "../css/gateway.css"
const GatewayView = () => {
    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?JSON.parse(localStorage.getItem("userinfo")):"";
    const isAuth = isLogin? userinfo.authorization === "1" : 0;
    return (
        <div className="gateway-pc">
            <HeaderInfo/>
            <div className="gateway-container">
                <div className="gateway-content">
                    <div className="main-img">
                        <div className="main-bg">
                            <div className="main-content">
                                <div className="business-list">
                                    <div className="business-item "></div>
                                    <div className="business-item "></div>
                                    <a href="https://dujia.qunar.com/" target="_blank">
                                        <div className="business-item pointer"></div>
                                    </a>
                                    <div className="business-item "></div>
                                    <div className="business-item "></div>
                                </div>
                            </div>
                            <div className="floating-text">
                                Welcome to JourneyJot
                            </div>
                            <div className="floating-text1">
                                这里是年轻人最爱的游记展示平台，请开启你的游记之旅吧
                            </div>
                        </div>
                    </div>
                    <div className="center-w1200" style={{marginTop: "33px", overflow: "hidden"}}>
                        <div className="service-card">
                            <a href={isAuth?"/Manager":"/home"}
                               target="_blank">
                                <img className="block-img"
                                     src="//qimgs.qunarzz.com/wpf_newmpic_001/0476d15de40bf364d51422f79db5d48d.jpg"
                                     alt="."/>
                            </a>
                        </div>
                        <div className="service-card">
                            <a href="https://www.ctrip.com" target="_blank">
                                <img className="block-img" src="//qimgs.qunarzz.com/wpf_newmpic_001/4f045dc1931c0e283a9b63336fcb2a22.jpg" alt="."/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GatewayView;