import React from "react";
import { Input } from 'antd';

const { Search } = Input;
const SearchBar = () => {
    const onSearch = (value, _e, info) => {
        console.log(value);
        window.location.href ="/search?value="+value;
    }
    return(
        <div className="searchbar-container">
            <Search
                style={{ width: 200,marginLeft: "auto" }}
                placeholder="搜索游记..."
                onSearch={onSearch}
            />
        </div>
    );
}

export default SearchBar;