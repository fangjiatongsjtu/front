import React from "react";
import HeaderInfo from "../component/HeaderInfo";
import NavBar from "../component/NavBar";
import "../css/journaldetailview.css"
import journaldata from "../assets/journaldata";
import JournalDetail from "../component/JournalDetail";


const JournalDetailView = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const journal_id = searchParams.get('journal_id');
    console.log(journal_id);
    const journal_detail = journaldata[journal_id-1]
    return(
        <div>
            <div className="journal-detail-pc">
                <HeaderInfo/>
                <NavBar/>
                <div className="container">
                    <div className="content">
                        <div className="main-img">
                            <div className="main-bg">
                                <JournalDetail info = {journal_detail}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JournalDetailView;