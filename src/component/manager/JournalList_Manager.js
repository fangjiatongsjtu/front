import {Avatar, Button, Divider, Image, List, message, Typography} from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import journaldata from "../../assets/journaldata";
import {useNavigate} from "react-router-dom";
import {CheckCircleFilled, CloseCircleFilled} from "@ant-design/icons";
const { Title, Text } = Typography;
const JournalList_Manager = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 3;
    const totalItems = 4;
    const navigate = useNavigate();
    const [data,setData] = useState([]);


    const handleClick = (e) => {
        navigate(e.key);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const appendData = () => {
        const rightDataUrl = 'http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue/'
        fetch(rightDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(body.data);
                message.success(`${body.data.length} more items loaded!`);
            });
    };

    useEffect(()=>{
        appendData();
    },[])
    return (
       data &&  <List
            style={{marginLeft:20}}
            grid={{gutter: 20, column: 1}}
            dataSource={data}
            pagination={{
                onChange: page => {
                },
                pageSize: 3,
            }}
            renderItem={(item) => (
                <List.Item key={item.id} style={{display:"flex", justifyContent:"space-between"}}>
                    <List.Item.Meta
                        title={
                        <div style={{ display: "flex", alignItems: "center"}}>
                            <Avatar src={item.author.avatar}/>
                            <div>
                                <Title level={4}>{decodeURI(item.title)}</Title>
                                <div>
                                    <Text>{item.author.username}&nbsp;&nbsp;&nbsp;</Text>
                                </div>
                            </div>
                        </div>
                    }
                        description={
                        <List className={"journal_image_list"}
                              grid={{gutter: 20, column: 3}}
                              dataSource={item.images.slice(0,3)}
                              renderItem={item => (
                                               <List.Item className="journal_image">
                                                   <Image src={item.image} style={{height:200,width:250}}/>
                                               </List.Item>
                                           )}>
                        </List>
                    }
                    >
                    </List.Item.Meta>
                    <div style={{display:"flex",alignItems:"center"}}>
                        {item.status.status === "1" &&
                            <div style={{marginRight:10}}>
                                <CheckCircleFilled  style={{color:"green"}}/>
                                <span>通过</span>
                            </div>}
                        {item.status.status === "101" &&
                            <div style={{marginRight:10}}>
                                <CloseCircleFilled  style={{color:"red"}}/>
                                <span>未通过</span>
                            </div>}
                        <Button style={{marginRight:10}} href={"/Manager/JournalDetail?id="+item.id} disabled={item.status.status!=='0'}>审核</Button>
                    </div>
                </List.Item>
            )}
             >
        </List>
    );
};
export default JournalList_Manager;


