import React, {useEffect, useState} from "react";
import HeaderInfo from "../component/HeaderInfo";
import NavBar from "../component/NavBar";
import journaldata from "../assets/journaldata";
import {Avatar, Button, Card, Carousel, Divider, Flex, Image, message, Space, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import {EnvironmentFilled, StarFilled, UserOutlined} from "@ant-design/icons";
import "../css/modifyview.css"
import ModifyForm from "../component/ModifyForm";
import {getRequest, postRequest, putRequest} from "../util/ajax";
import MultipleUrlInput from "../component/MultipleUrlInput";
const { Title, Paragraph, Text, Link } = Typography;
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const ModifyView = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const journal_id = searchParams.get('journal_id');
    console.log(journal_id);
    const journal_detail = journaldata[journal_id-1];
    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?JSON.parse(localStorage.getItem("userinfo")):"";
    const [real_journal_detail, setReal_Journal_Detail] = useState({});

    useEffect(() => {
        const handleJournal_Detail_Change = (data) => {
            setReal_Journal_Detail(data.data);
            console.log(data.data);
            if(data.data.author.username !== userinfo.username){
                window.location.href="/home"
            }
        }

        getRequest("http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue/" + journal_id, handleJournal_Detail_Change);
    }, [journal_id]);

    const onChangeDepartureTime = (date) => {
        const new_real_journal_detail = real_journal_detail;
        if(date){
        const year = date.$y;
        const month = date.$M + 1;
        const realdate = date.$d.getDate();
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(realdate).padStart(2, '0')}`;
        console.log(formattedDate);
        new_real_journal_detail.departure_time = formattedDate;
        setReal_Journal_Detail(new_real_journal_detail);
        console.log('Change:', real_journal_detail);}
        else {
            new_real_journal_detail.departure_time = "";
            setReal_Journal_Detail(new_real_journal_detail)
        }
    }

    const onChangeDuration = (value) => {
        const new_real_journal_detail = real_journal_detail;
        new_real_journal_detail["duration"] = value;
        setReal_Journal_Detail(new_real_journal_detail);
        console.log('Change:', new_real_journal_detail);
    }


    const onChange = (e) => {
        const key = e.target.id;
        const new_real_journal_detail = real_journal_detail;
        if(key === "preface"||key === "main_body" ||key ==="photo_description"||key ==="address"||key==="members"||key==="title")
        {
            new_real_journal_detail[key] = encodeURI(e.target.value)
        }
        else new_real_journal_detail[key] = e.target.value;
        setReal_Journal_Detail(new_real_journal_detail);
        console.log('Change:', new_real_journal_detail);

    }
    const onChangeStatus = (data) => {
        real_journal_detail.status = data.data;
        console.log('Change:', real_journal_detail);
    }
    const onModifySubmit = async () =>{
        const new_status = real_journal_detail.status;
        new_status.status = "0";
        new_status.comment="";
        await new Promise(resolve => {
            putRequest("http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/status/"+new_status.id,new_status,(response) => {
                onChangeStatus(response);
                resolve();
            });
        });
        const id = real_journal_detail.id;
        const url = "http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue/"+id;
        real_journal_detail.create_time = Date.now().toString();
        console.log(real_journal_detail);
        await new Promise(resolve => {
            putRequest(url,real_journal_detail,(response) => {
                message.success(JSON.stringify(response)).then(
                    ()=>{
                        resolve();
                        window.location.href="/yourjournal";}

                );
            });
        })
    }
    const onModifyQuit = () => {
        window.location.href ="/yourjournal"
    }

    return(
        <div>
            <div>
                <div className="modify-pc">
                    <HeaderInfo/>
                    <NavBar/>
                    <div className="container">
                        <div className="content">
                            <div className="main-img">
                                <div className="main-bg">
                                    <div style={{
                                        width:"1200px",position: "relative",
                                        margin: "0 auto",
                                        padding: "20px 0 0"}}>
                                        <Typography>
                                            <Title>
                                                {<div style={{ display: "flex", alignItems: "center"}}>
                                                    {
                                                        isLogin && <Avatar  style={{ width: "64px", height: "64px" }}  src={real_journal_detail.author &&real_journal_detail.author.avatar}/>
                                                    }
                                                    {
                                                        !isLogin && <Avatar  style={{ width: "64px", height: "64px" }}  icon={<UserOutlined/>}/>
                                                    }
                                                    <Text style={{marginLeft:20}}>{isLogin  && real_journal_detail.author &&real_journal_detail.author.username}{!isLogin && "我"}&nbsp;&nbsp;&nbsp;</Text>
                                                    <Flex  style={{width:'100%', marginLeft:'20px'}}>
                                                        {real_journal_detail && real_journal_detail.title && <TextArea
                                                            id="title"
                                                            defaultValue={decodeURI(real_journal_detail.title)}
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
                                                        />}
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
                                                                  {real_journal_detail && real_journal_detail.address && <TextArea
                                                                      id="address"
                                                                      defaultValue={decodeURI(real_journal_detail.address)}
                                                                      showCount
                                                                      maxLength={100}
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
                                                                  />}
                                                              </Title>
                                                          </Space>
                                                      }>
                                                    <Flex  style={{width:'100%'}}>
                                                        {real_journal_detail && real_journal_detail.preface && <TextArea
                                                            id="preface"
                                                            defaultValue={decodeURI(real_journal_detail.preface)}
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
                                                        />}
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
                                                                      {real_journal_detail && real_journal_detail.address &&<TextArea
                                                                          id="address"
                                                                          defaultValue={decodeURI(real_journal_detail.address)}
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
                                                                      />}
                                                                  </Title>
                                                              </Space>
                                                          }>
                                                        <Flex  style={{width:'100%'}}>
                                                            {real_journal_detail && real_journal_detail.main_body &&<TextArea
                                                                id="main_body"
                                                                defaultValue={decodeURI(real_journal_detail.main_body)}
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
                                                            />}
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
                                                                  {real_journal_detail && real_journal_detail.address &&<TextArea
                                                                      id="address"
                                                                      defaultValue={decodeURI(real_journal_detail.address)}
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
                                                                  />}
                                                              </Title>
                                                          </Space>
                                                      }>
                                                    <Flex  style={{width:'100%'}}>
                                                        {real_journal_detail && real_journal_detail.photo_description &&<TextArea
                                                            id="photo_description"
                                                            defaultValue={decodeURI(real_journal_detail.photo_description)}
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
                                                        />}
                                                    </Flex>
                                                    <Divider/>
                                                    <Paragraph style={{marginTop:'50px'}}>
                                                        <Carousel autoplay>
                                                            {
                                                                real_journal_detail.images && real_journal_detail.images.map((item) =>(
                                                                        <div style={contentStyle}>
                                                                            <Image src={item.image}/>
                                                                        </div>
                                                                    )
                                                                )
                                                            }
                                                        </Carousel>
                                                        <MultipleUrlInput/>
                                                    </Paragraph>
                                                </Card>
                                            </Typography>
                                            <Paragraph style={{marginTop:'50px'}}>
                                            </Paragraph>
                                            <Divider><span><StarFilled/>添加基本信息，您的大作将被更多人看到<StarFilled/></span></Divider>
                                            <ModifyForm info={real_journal_detail} onChange={onChange} onChangeDepartureTime={onChangeDepartureTime} onChangeDuration={onChangeDuration}/>
                                            <Flex style={{display:"flex",justifyContent:"center", marginBottom:20}} gap={32}>
                                                <Button type="primary"
                                                        onClick={onModifySubmit}>更新</Button>
                                                <Button type="primary"
                                                        onClick={onModifyQuit}>返回</Button>
                                            </Flex>
                                        </Typography>
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

export default ModifyView;