import React from "react";
import {Avatar, Divider, Image, List, Typography} from 'antd';
import {
    ClockCircleFilled,
    ClockCircleOutlined, EnvironmentFilled,
    EyeOutlined, LikeFilled,
    LikeOutlined,
    MessageOutlined, MoneyCollectFilled, MoonFilled, ShareAltOutlined, StarFilled, TeamOutlined,
    UploadOutlined
} from "@ant-design/icons";
import "../css/journaldetail.css";
import { Carousel } from 'antd';
import CommentSection from "./CommentSection";
import { DiscussionEmbed } from 'disqus-react';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const { Title, Paragraph, Text, Link } = Typography;
const JournalDetail = (props) => {
    const info = props.info;
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
                                <Text>创建于{info.create_time}</Text>
                                <Divider type="vertical" style={{ backgroundColor: "black" , margin: "0 8px"}} />
                                <Text>浏览&nbsp;&nbsp;{info.views}</Text>
                            </div>
                        </div>
                        <div  style={{ marginLeft: "auto", textAlign:"right", fontSize:'0.5em'}}>
                            <scan>
                                <EyeOutlined/>{info.views}&nbsp;&nbsp;&nbsp;<LikeOutlined/>{info.likes}&nbsp;&nbsp;&nbsp;<MessageOutlined />{info.comments}&nbsp;&nbsp;&nbsp;<UploadOutlined/>{info.uploads}
                            </scan>
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
            </Typography>
            <div className="b_link_part">
                <ul className="link_list">
                    <li className="bottom_item like">
                        <div className="likeCT"><a className="sub_item" data-beacon="Zan-bottom"
                                                  ><span className="iconfont"></span><LikeFilled/>&nbsp;&nbsp;赞&nbsp;&nbsp;<span
                            className="num">{info.likes}</span></a></div>
                    </li>
                    <li className="bottom_item view_collected">
                        <div className="collectCT"><a className="sub_item" data-beacon="Shoucang-bottom"
                                                      ><span
                            className="iconfont"></span><StarFilled/>&nbsp;&nbsp;收藏&nbsp;&nbsp;<span>{info.uploads}</span></a></div>
                    </li>
                    <li className="bottom_item share">
                        <div className="shartCT"><span className="sub_item"
                                                       ><ShareAltOutlined/>&nbsp;&nbsp;分享&nbsp;&nbsp;<span>{info.share}</span></span>
                        </div>
                    </li>
                </ul>
            </div>
            <CommentSection/>
            {/*<DiscussionEmbed
                shortname='example'
                config={
                    {
                        language: 'zh-cn'
                    }
                }
            />*/}
        </div>
    );
}

export default JournalDetail;