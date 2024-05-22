import React from "react";
import {Avatar, Button, Card, Carousel, Divider, Flex, Image, Typography} from "antd";
import {
    ClockCircleFilled, EnvironmentFilled,
    EyeOutlined,
    LikeOutlined,
    MessageOutlined, MoneyCollectFilled,
    MoonFilled, TeamOutlined,
    UploadOutlined
} from "@ant-design/icons";
import journaldata from "../../assets/journaldata";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

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
    const info = journaldata[journal_id-1];
    const onClick = (e) => {
        console.log('click ', e);
    };
    return(
        <div style={{
            width:"1200px",position: "relative",
            margin: "0 auto",
            padding: "20px 0 0"}}>
            <Typography>
                <Title>
                    {<div style={{ display: "flex", alignItems: "center"}}>
                        <Avatar src={info.avatar} style={{ width: "64px", height: "64px" }} />
                        <div style={{flex:1}}>
                            <Title level={4}>{info.title}</Title>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <Text>{info.author}&nbsp;&nbsp;&nbsp;</Text>
                                <Divider type="vertical" style={{ backgroundColor: "black" , margin: "0 8px"}} />
                                <Text>&nbsp;&nbsp;&nbsp;创建于{info.create_time}</Text>
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
                                    className="data" style={{color:"#c90"}}>&nbsp;&nbsp;{info.departure_time}</span></p></li>
                            <li className="f_item howlong"><p className="txt"><MoonFilled style={{color:"green"}}/>&nbsp;&nbsp;天数&nbsp;&nbsp;<span className="line">/</span><span
                                className="data" style={{color:"#c90"}}>&nbsp;&nbsp;{info.duration}&nbsp;&nbsp;</span>天</p></li>
                            <li className="f_item howmuch"><p className="txt"><MoneyCollectFilled style={{color:"green"}}/>&nbsp;&nbsp;人均费用&nbsp;&nbsp;<span
                                className="line">/</span><span className="data" style={{color:"#c90"}}>&nbsp;&nbsp;{info.cost}&nbsp;&nbsp;</span>元</p></li>
                        </ul>
                        <ul className="foreword_list">
                            <li className="f_item who"><p className="txt"><TeamOutlined style={{color:"green"}}/>&nbsp;&nbsp;人物&nbsp;&nbsp;<span className="line">/</span><span
                                className="data" style={{color:"#c90"}}>&nbsp;&nbsp;{info.members}</span></p></li>
                            <li className="f_item how"><p className="txt"><EnvironmentFilled style={{color:"green"}}/>&nbsp;&nbsp;目的地
                                <span className="line">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                                <span className="data" style={{color:"#c90"}}>{info.end}</span>&nbsp;</p></li>
                        </ul>
                    </div>
                </Paragraph>
                <Title style={{borderBottom: "solid 4px #666", color:"#666", height: "80px", lineHeight: "80px",
                    fontSize: "40px"}}>前言</Title>
                <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                    <Title style={{height: "60px", fontSize:"30px"}}><EnvironmentFilled style={{color:"green"}}/>{info.journey}</Title>
                    {info.pre}
                </Typography>
                <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                    <Title style={{borderBottom: "solid 4px #666", color:"#666", height: "80px", lineHeight: "80px",
                        fontSize: "40px"}}>正文</Title>
                    {info.content}
                </Typography>

                <Title level={2} style={{borderBottom: "solid 4px #666", color:"#666", height: "80px", lineHeight: "80px",
                    fontSize: "40px"}}>相册</Title>
                <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                    {info.description}
                </Typography>
                <Paragraph style={{marginTop:'50px'}}>
                    <Carousel autoplay>
                        {
                            info.images.map((item) =>(
                                    <div style={contentStyle}>
                                        <Image src={item}/>
                                    </div>
                                )
                            )
                        }
                    </Carousel>
                </Paragraph>
                <Paragraph>
                    <Card title="审核意见" bordered={false} style={{marginLeft:200, marginRight:200, marginBottom:50}}>
                        <Flex  style={{width:'100%'}}>
                            <TextArea
                                showCount
                                maxLength={500}
                                onChange={onClick}
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
                        <Button type="primary"
                                onClick={() => {}}>保存</Button>
                        <Button type="primary"
                                onClick={() => {}}>提交</Button>
                    </Flex>
                </Paragraph>
            </Typography>
        </div>
    );
}
export default ManageJournalDetail;