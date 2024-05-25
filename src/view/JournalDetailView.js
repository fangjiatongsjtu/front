import React, {useEffect, useState} from "react";
import HeaderInfo from "../component/HeaderInfo";
import NavBar from "../component/NavBar";
import "../css/journaldetailview.css"
import journaldata from "../assets/journaldata";
import JournalDetail from "../component/JournalDetail";
import {getRequest, getRequest_v2} from "../util/ajax";


const JournalDetailView = () => {
    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?JSON.parse(localStorage.getItem("userinfo")):"";
    const isAuth = isLogin? userinfo.authorization === "1" : false;
    const searchParams = new URLSearchParams(window.location.search);
    const journal_id = searchParams.get('journal_id');
    console.log(journal_id);
    const journal_detail = journaldata[journal_id-1];
    const [real_journal_detail, setReal_Journal_Detail] = useState({});
    useEffect(() => {
        if(isAuth){
            window.location.href="/"
        }
        const handleJournal_Detail_Change = (data) => {
            console.log(data)
            setReal_Journal_Detail(data.data);
            console.log(data.data);
        }

        getRequest("http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue/" + journal_id, handleJournal_Detail_Change);
    }, [journal_id]);

    return(
        <div>
            <div className="journal-detail-pc">
                <HeaderInfo/>
                <NavBar/>
                <div className="container">
                    <div className="content">
                        <div className="main-img">
                            <div className="main-bg">
                                 <JournalDetail info = {real_journal_detail}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JournalDetailView;