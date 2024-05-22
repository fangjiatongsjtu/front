import React from "react";
import HeaderInfo from "../component/HeaderInfo";
import NavBar from "../component/NavBar";
import "../css/journalcreate.css"
import {Avatar, Card, Carousel, Divider, Image, Space, Typography, Upload} from "antd";
import { Flex, Input } from 'antd';
import {
    EnvironmentFilled,
    EyeOutlined,
    LikeOutlined,
    MessageOutlined,
    StarFilled,
    UploadOutlined, UserOutlined
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import MyUpload from "../component/MyUpload";
import MyForm from "../component/MyForm";
const { Title, Paragraph, Text, Link } = Typography;
const onChange = (e) => {
    console.log('Change:', e.target.value);
};
const CreateView = () => {
    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?JSON.parse(localStorage.getItem("userinfo")):"";
    return(
        <div>
            <div className="journal-create-pc">
                <HeaderInfo/>
                <NavBar/>
                <div style={{
                    width:"1200px",position: "relative",
                    margin: "0 auto",
                    padding: "20px 0 0"}}>
                    <Typography>
                        <Title>
                            {<div style={{ display: "flex", alignItems: "center"}}>
                                {
                                    isLogin && <Avatar  style={{ width: "64px", height: "64px" }}  src={userinfo.avatar}/>
                                }
                                {
                                    !isLogin && <Avatar  style={{ width: "64px", height: "64px" }}  icon={<UserOutlined/>}/>
                                }
                                <Text style={{marginLeft:20}}>{isLogin && userinfo.username}{!isLogin && "我"}&nbsp;&nbsp;&nbsp;
                                </Text>
                                <Flex  style={{width:'100%', marginLeft:'20px'}}>
                                    <TextArea
                                        showCount
                                        maxLength={20}
                                        onChange={onChange}
                                        placeholder="为游记起一个拉轰的名字"
                                        style={{
                                            height: 30,
                                            resize: 'none',
                                            width:'90%',
                                            color:"#999",
                                            backgroundColor: "#f8f8f8",
                                            border: 0,
                                        }}
                                    />
                                </Flex>

                            </div>
                            }
                        </Title>
                        <Title style={{borderBottom: "solid 4px #666", color:"#666", height: "80px", lineHeight: "80px",
                            fontSize: "40px"}}>前言</Title>
                        <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                            <Card style={{
                                width:'100%'
                            }}
                            title={
                                    <Space
                                        direction="horizontal"
                                        size="middle"
                                        style={{
                                            display: 'inline'
                                        }}
                                    >
                                        <Title style={{height: "60px", fontSize:"30px"}}>
                                            <EnvironmentFilled style={{color:"#999"}}/>
                                            <TextArea
                                                showCount
                                                maxLength={20}
                                                onChange={onChange}
                                                placeholder="说说这次旅行"
                                                style={{
                                                    height: 40,
                                                    resize: 'none',
                                                    color:"#999",
                                                    backgroundColor: "#f8f8f8",
                                                    width:'95.5%',
                                                    marginLeft:'20px'
                                                }}
                                            />
                                        </Title>
                                    </Space>
                            }>
                            <Flex  style={{width:'100%'}}>
                                <TextArea
                                    showCount
                                    maxLength={500}
                                    onChange={onChange}
                                    placeholder="为这次旅行写一段华丽丽的开篇吧:)"
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
                        </Typography>
                        <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                            <Title style={{borderBottom: "solid 4px #666", color:"#666", height: "80px", lineHeight: "80px",
                                fontSize: "40px"}}>正文</Title>
                            <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                                <Card style={{
                                    width:'100%'
                                }}
                                      title={
                                          <Space
                                              direction="horizontal"
                                              size="middle"
                                              style={{
                                                  display: 'inline'
                                              }}
                                          >
                                              <Title style={{height: "60px", fontSize:"30px"}}>
                                                  <EnvironmentFilled style={{color:"#999"}}/>
                                                  <TextArea
                                                      showCount
                                                      maxLength={20}
                                                      onChange={onChange}
                                                      placeholder="添加游玩地点（非必填）"
                                                      style={{
                                                          height: 40,
                                                          resize: 'none',
                                                          color:"#999",
                                                          backgroundColor: "#f8f8f8",
                                                          width:'95.5%',
                                                          marginLeft:'20px'
                                                      }}
                                                  />
                                              </Title>
                                          </Space>
                                      }>
                                    <Flex  style={{width:'100%'}}>
                                        <TextArea
                                            showCount
                                            maxLength={500}
                                            onChange={onChange}
                                            placeholder="添加随记、交通或旅游心得"
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
                            </Typography>
                        </Typography>

                        <Title level={2} style={{borderBottom: "solid 4px #666", color:"#666", height: "80px", lineHeight: "80px",
                            fontSize: "40px"}}>相册</Title>
                        <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                            <Card style={{
                                width:'100%'
                            }}
                                  title={
                                      <Space
                                          direction="horizontal"
                                          size="middle"
                                          style={{
                                              display: 'inline'
                                          }}
                                      >
                                          <Title style={{height: "60px", fontSize:"30px"}}>
                                              <EnvironmentFilled style={{color:"#999"}}/>
                                              <TextArea
                                                  showCount
                                                  maxLength={20}
                                                  onChange={onChange}
                                                  placeholder="说说相册"
                                                  style={{
                                                      height: 40,
                                                      resize: 'none',
                                                      color:"#999",
                                                      backgroundColor: "#f8f8f8",
                                                      width:'95.5%',
                                                      marginLeft:'20px'
                                                  }}
                                              />
                                          </Title>
                                      </Space>
                                  }>
                                <Flex  style={{width:'100%'}}>
                                    <TextArea
                                        showCount
                                        maxLength={500}
                                        onChange={onChange}
                                        placeholder="添加相册的描述吧"
                                        style={{
                                            height: 500,
                                            resize: 'none',
                                            width:'100%',
                                            color:"#999",
                                            backgroundColor: "#f8f8f8",
                                        }}
                                    />
                                </Flex>
                                <Divider/>
                                <MyUpload/>
                            </Card>
                        </Typography>
                        <Paragraph style={{marginTop:'50px'}}>
                        </Paragraph>
                        <Divider><span><StarFilled/>添加基本信息，您的大作将被更多人看到<StarFilled/></span></Divider>
                        <MyForm/>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default CreateView;