import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Card, Divider, Image, List, Typography} from "antd";
import {EyeOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";
const { Title, Text } = Typography;
const SearchResult = (props) => {
    const result = props.result;
    const search = window.location.search;
    const searchParams = new URLSearchParams(search);
    const searchtitle = decodeURI(searchParams.get("value"));
    const link = '/journal_detail?'+"journal_id=";
    console.log(Array.isArray(result));

    return(
        <>
            <div className="wrap">
                <div className="title clrfix">
                    <h2 className="lf">搜索 "{searchtitle}" 结果如下:</h2>
                </div>
                {Array.isArray(result) && <List grid={{gutter: 20, column: 1}}
                      dataSource={result}
                      pagination={{
                          onChange: page => {
                          },
                          pageSize: 3,
                      }}

                      renderItem={item => (
                          <List.Item>
                              <Link to={link+item.id}  target="_blank">
                                  <Card style={{
                                      width: '100%',
                                  }}
                                        title={
                                            <div style={{ display: "flex", alignItems: "center"}}>
                                                <Avatar src={item.author.avatar}/>
                                                <div>
                                                    <Title level={4}>{decodeURI(item.title)}</Title>
                                                    <div>
                                                        <Text>{item.author.username}&nbsp;&nbsp;&nbsp;</Text>
                                                        <Text>{item.departure_time}&nbsp;&nbsp;出发</Text>
                                                        <Divider type="vertical" style={{backgroundColor:"black"}}/>
                                                        <Text>共&nbsp;&nbsp;{item.duration}&nbsp;&nbsp;天</Text>
                                                    </div>
                                                </div>
                                                <div  style={{ marginLeft: "auto" }}>
                                                    <scan>
                                                        <EyeOutlined/>{item.views}&nbsp;&nbsp;&nbsp;<LikeOutlined/>{item.likes}&nbsp;&nbsp;&nbsp;<MessageOutlined />{item.views}
                                                    </scan>
                                                </div>
                                            </div>
                                        }>
                                      <List className={"journal_image_list"}
                                            grid={{gutter: 20, column: 3}}
                                            dataSource={item.images.slice(0,3)}
                                            renderItem={item => (
                                                <List.Item className="journal_image">
                                                    <Image src={item.image} style={{height:200,width:250}}/>
                                                </List.Item>
                          )}
                    />

                                  </Card>
                              </Link>
                          </List.Item>
                      )}
                />}
            </div>
        </>
    )
}

export default SearchResult;