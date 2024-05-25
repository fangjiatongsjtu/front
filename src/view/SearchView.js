import React from "react";
import HeaderInfo from "../component/HeaderInfo";
import NavBar from "../component/NavBar";
import "../css/searchview.css"
import SearchResult from "../component/SearchResult";
import {getRequest} from "../util/ajax";

class SearchView extends React.Component{
    constructor(props) {
        super(props);
        const search = window.location.search;
        const searchParams = new URLSearchParams(search);
        const searchtitle = encodeURI(searchParams.get("value"));
        this.state = {
            result:{},
            searchtitle:searchtitle,
            data:[]
        };
    }

    componentDidMount() {
        const searchtitle = this.state.searchtitle;
        const url = "http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue";
        getRequest(url, (response)=>{
            const regex = new RegExp(searchtitle, 'i'); // 'i' 表示不区分大小写

            const filteredData = response.data.filter(item => {
                //return item.title.includes(searchtitle);
                return regex.test(item.title);
            });
            console.log(filteredData);
            this.setState({
                result:filteredData,
                data:filteredData
            })
        })



    }

    render() {
        return(
            <div>
                <div>
                    <div className="search-pc">
                        <HeaderInfo/>
                        <NavBar/>
                        <div className="container">
                            <div className="content">
                                <div className="main-img">
                                    <div className="main-bg">
                                        <div className="journal_list">
                                        {
                                        this.state.result&& <SearchResult result={this.state.result}/>
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchView;