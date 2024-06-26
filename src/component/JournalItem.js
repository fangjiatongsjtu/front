import React from "react";
import {Avatar, Card, Divider, Image, List} from "antd";
import {Link} from "react-router-dom";
import { Typography } from "antd";
import {EyeOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";
const { Title, Text } = Typography;


const JournalItem = ({info}) => {
    //const info = props.info;
    const link = '/journal_detail?'+"journal_id="+info.id;
    console.log(info)
    return(
        <Link to={link} target="_blank">
                <div>
                    <Card
                        style={{
                            width: '100%',
                        }}
                        title={
                        <div style={{ display: "flex", alignItems: "center"}}>
                            <Avatar src={info.author.avatar}/>
                            <div>
                                <Title level={4}>{decodeURI(info.title)}</Title>
                                <div>
                                    <Text>{info.author.username}&nbsp;&nbsp;&nbsp;</Text>
                                    <Text>{info.departure_time}&nbsp;&nbsp;出发</Text>
                                    <Divider type="vertical" style={{backgroundColor:"black"}}/>
                                    <Text>共&nbsp;&nbsp;{info.duration}&nbsp;&nbsp;天</Text>
                                </div>
                            </div>
                            <div  style={{ marginLeft: "auto" }}>
                            <scan>
                                <EyeOutlined/>{info.views}&nbsp;&nbsp;&nbsp;<LikeOutlined/>{info.likes}&nbsp;&nbsp;&nbsp;<MessageOutlined />{info.comments.length}
                            </scan>
                            </div>
                        </div>
                    }
                    >
                        <List className={"journal_image_list"}
                              grid={{gutter: 20, column: 3}}
                              dataSource={info.images.slice(0,3)}
                              renderItem={item => (
                                  <List.Item className="journal_image">
                                      <Image src={item.image} style={{height:200,width:250}}/>
                                  </List.Item>
                              )}
                        />
                    </Card>
                </div>
            </Link>
    );
}

export default JournalItem;