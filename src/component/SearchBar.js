import React from "react";
import { Input } from 'antd';

const { Search } = Input;
const SearchBar = () => {
    return(
        <div className="searchbar-container">
            <Search
                style={{ width: 200, marginLeft: "auto" }}
                placeholder="搜索游记..."
            />
        </div>
    );
}

export default SearchBar;