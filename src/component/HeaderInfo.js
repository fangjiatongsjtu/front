import React, {useState} from "react";
import {Affix} from "antd";
import logo from "../assets/logo.svg"
import "../css/headerinfo.css"
const HeaderInfo = () => {
    const [top, setTop] = useState(0);
    return (
        <Affix offsetTop={top}>
        <div className="header-pc">
                <div className="width2000">
                    <div className="logo pointer">
                        <a href="" >
                            <img src={logo} alt="."/>
                            <div className="title">JourneyJot</div>
                        </a>
                    </div>
                    <div className="nav">
                        <a href="" target="_self">
                            <div className="nav-item">
                                <div className="nav-labe actived">首页</div>
                            </div>
                        </a>
                        <a href="http://www.se.sjtu.edu.cn/" target="_blank">
                        <div className="nav-item">
                            <div className="nav-labe false">业务合作</div>
                        </div>
                        </a>
                        <a href="http://www.se.sjtu.edu.cn/" target="_blank">
                        <div className="nav-item">
                            <div className="nav-labe false">加入我们</div>
                        </div>
                        </a>

                        <a href="http://www.se.sjtu.edu.cn/" target="_blank">
                        <div className="nav-item">
                            <div className="nav-labe false">About Us</div>
                        </div>
                        </a>
                        <a href="http://www.se.sjtu.edu.cn/" target="_blank">
                        <div className="nav-item">
                            <div className="nav-labe false">Trip.com Group</div>
                        </div>
                        </a>
                    </div>
                </div>
            </div>
        </Affix>
    );
}

export default HeaderInfo;