import {Avatar, Button, Image, List, message} from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import journaldata from "../../assets/journaldata";
import {useNavigate} from "react-router-dom";
const JournalList_Manager = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 3;
    const totalItems = 4;
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(e.key);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <List
            grid={{gutter: 20, column: 1}}
            dataSource={journaldata}
            pagination={{
                onChange: page => {
                },
                pageSize: 3,
            }}
            renderItem={(item) => (
                <List.Item key={item.id} style={{display:"flex", justifyContent:"space-between"}}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={
                        <List className={"journal_image_list"}
                              grid={{gutter: 20, column: 3}}
                              dataSource={item.images}
                              renderItem={item => (
                                               <List.Item className="journal_image">
                                                   <Image src={item} width="80%"/>
                                               </List.Item>
                                           )}>
                        </List>
                    }
                    >
                    </List.Item.Meta>
                    <div style={{marginRight:10}}>
                        <Button href={"/Manager/JournalDetail?id="+item.id}>审核</Button>
                    </div>
                </List.Item>
            )}
             >
        </List>
    );
};
export default JournalList_Manager;

