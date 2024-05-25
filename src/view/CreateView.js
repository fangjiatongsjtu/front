import React, {useEffect, useState} from "react";
import HeaderInfo from "../component/HeaderInfo";
import NavBar from "../component/NavBar";
import "../css/journalcreate.css"
import {Avatar, Button, Card, Carousel, Divider, Image, message, Space, Typography, Upload} from "antd";
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
import MultipleUrlInput from "../component/MultipleUrlInput";
import {postRequest} from "../util/ajax";
const { Title, Paragraph, Text, Link } = Typography;
const CreateView = () => {
    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?JSON.parse(localStorage.getItem("userinfo")):"";
    const isAuth = isLogin? userinfo.authorization === "1" : false;

    const default_travelogue ={
        preface:"",
        main_body:"",
        photo_description:"",
        address:"",
        members:"",
        title:"",
        departure_time:"",
        duration:-1,
        cost:-1,
        likes:0,
        views:0,
        shares:0,
        create_time:"",
        status:{status:"0",comment:""},
        images:[],
        author:userinfo,
        comments:[]
    }
    useEffect(()=>{
        if(!isLogin)
            window.location.href="/home";
        if(isAuth){
            window.location.href="/"
        }
    },[])
    const [travellogue,setTravellogue]=useState(default_travelogue);
    const onChange = (e) => {
        const key = e.target.id;
        const new_travellogue = travellogue;
        if(key === "cost") new_travellogue[key] = parseInt(e.target.value);
        else if(key === "preface"||key === "main_body" ||key ==="photo_description"||key ==="address"||key==="members"||key==="title")
        {
            new_travellogue[key] = encodeURI(e.target.value)
        }
        else new_travellogue[key] = e.target.value;
        setTravellogue(new_travellogue);
        console.log('Change:', travellogue);
    };

    const onChangeDepartureTime = (date) => {
        const new_travellogue = travellogue;
        if(date){
        const year = date.$y;
        const month = date.$M + 1;
        const realdate = date.$d.getDate();
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(realdate).padStart(2, '0')}`;
        console.log(formattedDate);
        new_travellogue["departure_time"]=formattedDate;
        setTravellogue(new_travellogue);
        console.log('Change:', travellogue);}
        else {
           new_travellogue.departure_time= "";
           setTravellogue(new_travellogue);
        }
    }
    const onChangeDuration = (value) => {
        const new_travellogue = travellogue;
        new_travellogue["duration"] = value;
        setTravellogue(new_travellogue);
        console.log('Change:', travellogue);
    }

    const onChangeImages = (value) => {
        const new_travellogue = travellogue;
        new_travellogue.images = value;
        setTravellogue(new_travellogue);
        console.log('Change:', travellogue);
    }
    const onChangeStatus = (data) => {
        travellogue.status = data.data;
        console.log('Change:', travellogue);
    }


    const onSubmit = async (e) =>{
       const old_status = travellogue.status;
       await new Promise(resolve => {
            postRequest("http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/status",old_status,(response) => {
                onChangeStatus(response);
                resolve();
            });
        });
        travellogue.create_time = Date.now().toString();
        console.log(travellogue);
        await new Promise(resolve => {
            postRequest("http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue",travellogue,(response) => {
                message.success(JSON.stringify(response)).then(
                    ( )=> {
                        resolve();
                        window.location.href="/home";
                    }
                );
            });
        });
    }
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
                                        id="title"
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
                                                id="address"
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
                                    id="preface"
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
                                                      id="address"
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
                                            id="main_body"
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
                                                  id="address"
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
                                        id="photo_description"
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
                                {/*<MyUpload/>*/}
                                <MultipleUrlInput onChangeImages={onChangeImages}/>
                            </Card>
                        </Typography>
                        <Paragraph style={{marginTop:'50px'}}>
                        </Paragraph>
                        <Divider><span><StarFilled/>添加基本信息，您的大作将被更多人看到<StarFilled/></span></Divider>
                        <MyForm onChange={onChange} onChangeDepartureTime={onChangeDepartureTime} onChangeDuration={onChangeDuration}/>
                        <Flex style={{display:"flex",justifyContent:"center", marginBottom:20}} gap={32}>
                            <Button type="primary" onClick={onSubmit}
                                    >提交</Button>
                        </Flex>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default CreateView;