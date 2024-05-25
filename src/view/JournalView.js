import React, {useEffect, useState} from "react";
import HeaderInfo from "../component/HeaderInfo";
import NavBar from "../component/NavBar";
import "../css/journalview.css"
import {
    Button,
    Cascader,
    Checkbox, Col,
    ColorPicker,
    DatePicker, Flex,
    Form,
    Input,
    InputNumber,
    Radio, Row,
    Select,
    Slider, Space,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import { Tag } from 'antd';
import journaldata from "../assets/journaldata";
import JournalList from "../component/JournalList";
import {getRequest} from "../util/ajax";
const tagsData = ['全部','1000元以下', '1000元~5000元', '5000元~10000元', '10000元以上'];
const tagsData2 = ['全部','独自一人', '三五好友', '亲子', '家庭','情侣','闺蜜', '学生'];
const { RangePicker } = DatePicker;
const { Search, TextArea } = Input;
const { Option } = Select;

const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
};

const JournalView = () => {
    const [selectedTags, setSelectedTags] = React.useState(['全部']);
    const [selectedMemberTags, setMemberSelectedTags] = React.useState(['全部']);
    const [dataSource, setDataSource] = React.useState(journaldata);

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
    const handleMemberChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedMemberTags, tag]
            : selectedMemberTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        const nextDataSource = dataSource.filter(item =>
            nextSelectedTags.includes(item.members))
        setMemberSelectedTags(nextSelectedTags);
        setDataSource(nextDataSource)
    };
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);

    };

    const handleDataSourceChange = () =>{

    }
    const onSearch = (value, _e, info) => {
        console.log(value);
        window.location.href ="/search?value="+value;
    }
    return(
        <div>
            <div className="journal-pc">
                <HeaderInfo/>
                <NavBar/>
                <div className="container">
                    <div className="content">
                        <div className="main-img">
                            <div className="main-bg">
                                <div>
                                <Form
                                    labelCol={{
                                        span: 4,
                                    }}
                                    wrapperCol={{
                                        span: 14,
                                    }}
                                    layout="horizontal"
                                    disabled={false}
                                    style={{
                                        maxWidth: 1000,
                                    }}>
                                    <div style={{marginLeft: 100, marginTop:50}}>
                                    <Form.Item>
                                    <Search
                                        style={{width:600, marginLeft:40}}
                                        onSearch={onSearch}
                                        placeholder="搜索游记..."
                                    />
                                    </Form.Item>
                                    <Form.Item label="出发时间">
                                            <DatePicker />
                                    </Form.Item>
                                        <Form.Item label="人均费用">
                                            {/*<Input prefix="￥" suffix="RMB" />*/}
                                            <Flex gap={4} wrap align="center">
                                                {tagsData.map((tag) => (
                                                    <Tag.CheckableTag
                                                        key={tag}
                                                        checked={selectedTags.includes(tag)}
                                                        onChange={(checked) => handleChange(tag, checked)}
                                                    >
                                                        {tag}
                                                    </Tag.CheckableTag>
                                                ))}
                                            </Flex>
                                        </Form.Item>
                                        <Form.Item label="人物">
                                            <Flex gap={4} wrap align="center">
                                                {tagsData2.map((tag) => (
                                                    <Tag.CheckableTag
                                                        key={tag}
                                                        checked={selectedTags.includes(tag)}
                                                        onChange={(checked) => handleMemberChange(tag, checked)}
                                                    >
                                                        {tag}
                                                    </Tag.CheckableTag>
                                                ))}
                                            </Flex>
                                        </Form.Item>
                                        <Form.Item label="出发时间">
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item label="开始/结束时间">
                                            <RangePicker />
                                        </Form.Item>
                                        <Form.Item label="旅游时长(天数)">
                                            <InputNumber /> 天
                                        </Form.Item>
                                    </div>
                                </Form>
                                </div>
                                {
                                    data &&
                                    <div style={{ marginBottom: '20px' }}>
                                    <JournalList journalData={data}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JournalView;