import React from "react";
import HeaderInfo from "../component/HeaderInfo";
import NavBar from "../component/NavBar";
import "../css/yourjournalview.css"
import {JournalTable} from "../component/JournalTable";
const YourJournalView = () => {
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
                                <JournalTable/>
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