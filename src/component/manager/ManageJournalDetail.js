import React, {useEffect, useState} from "react";
import {Avatar, Button, Card, Carousel, Divider, Dropdown, Flex, Image, Menu, message, Typography} from "antd";
import {
    ClockCircleFilled, DownOutlined, EnvironmentFilled,
    EyeOutlined,
    LikeOutlined,
    MessageOutlined, MoneyCollectFilled,
    MoonFilled, TeamOutlined,
    UploadOutlined
} from "@ant-design/icons";
import journaldata from "../../assets/journaldata";
import TextArea from "antd/es/input/TextArea";
import {getRequest, putRequest} from "../../util/ajax";

const { Title, Paragraph, Text, Link } = Typography;

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const ManageJournalDetail = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const journal_id = searchParams.get('id');
    console.log(journal_id);
    const [real_journal_detail, setReal_Journal_Detail] = useState({});
    const [create_time, setCreate_Time] = useState("");
    const [status,setStatus] = useState({});
    const [comment,setComment] = useState("")
    const onClick = (e) => {
        console.log('click ', e);
    };

    const onCommentChange = (e) =>{
        setComment(e.target.value);
        const new_status = status;
        new_status.comment = encodeURI(e.target.value);
        setStatus(new_status);
        console.log("Change:",new_status);
    }
    const handleSubmit = () => {
        const url = "http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/status/"+status.id;
        putRequest(url,status,(response)=>{
            setStatus(response.data);
            if(response.data.status === '1'){
                message.success("审核通过")
            }
            else{
                message.error("审核未通过")
            }
        })
    }
    const handleMenuClick = (e) => {
        if (e.key === 'pass') {
            // 处理审核通过的逻辑
            console.log(e.key);
            const new_status = status;
            new_status.status = '1';
            setStatus(new_status);
            console.log(new_status);
        } else if (e.key === 'reject') {
            // 处理审核不通过的逻辑
            console.log(e.key);
            const new_status = status;
            new_status.status = '101';
            setStatus(new_status);
            console.log(new_status);
        }
    };
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="pass">审核通过</Menu.Item>
            <Menu.Item key="reject">审核不通过</Menu.Item>
        </Menu>
    );


    useEffect(() => {
        const handleJournal_Detail_Change = (data) => {
            console.log(data)
            setReal_Journal_Detail(data.data);
            console.log(data.data);
            const timestampString = data.data.create_time;
            const timestamp = parseInt(timestampString);

            const date = new Date(timestamp);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            const formattedDate = `${year}-${month}-${day} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            console.log(formattedDate);
            setCreate_Time(formattedDate);
            setStatus(data.data.status);
            setComment(data.data.status.comment)
        }

        getRequest("http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue/" + journal_id, handleJournal_Detail_Change);
    }, [journal_id]);
    return(
        <div style={{
            width:"1200px",position: "relative",
            margin: "0 auto",
            padding: "20px 0 0"}}>
            <Typography>
                <Title>
                    {<div style={{ display: "flex", alignItems: "center"}}>
                        <Avatar src={real_journal_detail && real_journal_detail.author && real_journal_detail.author.avatar} style={{ width: "64px", height: "64px" }} />
                        <div style={{flex:1}}>
                            <Title level={4}>{real_journal_detail && decodeURI(real_journal_detail.title)}</Title>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <Text>{real_journal_detail && real_journal_detail.author&&real_journal_detail.author.username}&nbsp;&nbsp;&nbsp;</Text>
                                <Divider type="vertical" style={{ backgroundColor: "black" , margin: "0 8px"}} />
                                <Text>&nbsp;&nbsp;&nbsp;创建于{create_time}</Text>
                            </div>
                        </div>
                    </div>
                    }
                </Title>
                <Paragraph>
                    <div className="b_foreword" style={{ display: "flex", flexWrap: "wrap" }}>
                        <ul className="foreword_list">
                            <li className="f_item when">
                                <p className="txt"><ClockCircleFilled style={{color:"green"}}/>&nbsp;&nbsp;出发日期&nbsp;&nbsp;<span className="line">/</span><span
                                    className="data" style={{color:"#c90"}}>&nbsp;&nbsp;{real_journal_detail && real_journal_detail.departure_time}</span></p></li>
                            <li className="f_item howlong"><p className="txt"><MoonFilled style={{color:"green"}}/>&nbsp;&nbsp;天数&nbsp;&nbsp;<span className="line">/</span><span
                                className="data" style={{color:"#c90"}}>&nbsp;&nbsp;{real_journal_detail && real_journal_detail.duration}&nbsp;&nbsp;</span>天</p></li>
                            <li className="f_item howmuch"><p className="txt"><MoneyCollectFilled style={{color:"green"}}/>&nbsp;&nbsp;人均费用&nbsp;&nbsp;<span
                                className="line">/</span><span className="data" style={{color:"#c90"}}>&nbsp;&nbsp;{real_journal_detail && real_journal_detail.cost}&nbsp;&nbsp;</span>元</p></li>
                        </ul>
                        <ul className="foreword_list">
                            <li className="f_item who"><p className="txt"><TeamOutlined style={{color:"green"}}/>&nbsp;&nbsp;人物&nbsp;&nbsp;<span className="line">/</span><span
                                className="data" style={{color:"#c90"}}>&nbsp;&nbsp;{real_journal_detail && decodeURI(real_journal_detail.members)}</span></p></li>
                            <li className="f_item how"><p className="txt"><EnvironmentFilled style={{color:"green"}}/>&nbsp;&nbsp;目的地
                                <span className="line">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                                <span className="data" style={{color:"#c90"}}>{real_journal_detail && decodeURI(real_journal_detail.address)}</span>&nbsp;</p></li>
                        </ul>
                    </div>
                </Paragraph>
                <Title style={{borderBottom: "solid 4px #666", color:"#666", height: "80px", lineHeight: "80px",
                    fontSize: "40px"}}>前言</Title>
                <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                    <Title style={{height: "60px", fontSize:"30px"}}><EnvironmentFilled style={{color:"green"}}/>{real_journal_detail && decodeURI(real_journal_detail.address)}</Title>
                    {real_journal_detail && decodeURI(real_journal_detail.preface)}
                </Typography>
                <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                    <Title style={{borderBottom: "solid 4px #666", color:"#666", height: "80px", lineHeight: "80px",
                        fontSize: "40px"}}>正文</Title>
                    {real_journal_detail && decodeURI(real_journal_detail.main_body)}
                </Typography>

                <Title level={2} style={{borderBottom: "solid 4px #666", color:"#666", height: "80px", lineHeight: "80px",
                    fontSize: "40px"}}>相册</Title>
                <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                    {real_journal_detail && decodeURI(real_journal_detail.photo_description)}
                </Typography>
                <Paragraph style={{marginTop:'50px'}}>
                    {
                       real_journal_detail && real_journal_detail.images &&<Carousel autoplay>
                        {
                             real_journal_detail.images.map((item) =>(
                                    <div style={contentStyle}>
                                        <Image src={item.image}/>
                                    </div>
                                )
                            )
                        }
                    </Carousel>}
                </Paragraph>
                <Paragraph>
                    <Card title="审核意见" bordered={false} style={{marginLeft:200, marginRight:200, marginBottom:50}}>
                        <Flex  style={{width:'100%'}}>
                            <TextArea
                                showCount
                                maxLength={500}
                                defaultValue = {comment}
                                onChange={onCommentChange}
                                placeholder="请给出你的审核意见)"
                                style={{
                                    height: 500,
                                    resize: 'none',
                                    width:'100%',
                                    color:"#999",
                                    backgroundColor: "#f8f8f8",
                                }}
                            />
                        </Flex>
                    </Card>
                    <Flex style={{display:"flex",justifyContent:"center", marginBottom:20}} gap={32}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type="primary">
                                审核 <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Button type="primary"
                                onClick={handleSubmit}>提交</Button>
                        <Button type="primary"
                                onClick={() => {window.location.href="/Manager/Journal"}}>返回</Button>
                    </Flex>
                </Paragraph>
            </Typography>
        </div>
    );
}
export default ManageJournalDetail;