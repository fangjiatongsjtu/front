import React, {useEffect, useState} from "react";
import {Image, List, message, Space, Table, Tag} from 'antd';
import journaldata from "../assets/journaldata";
import {CheckCircleFilled, ClockCircleFilled, CloseCircleFilled} from "@ant-design/icons";
import {deleteRequest} from "../util/ajax";


export function JournalTable({info}){
    const [data,setData] = useState(info);
    useEffect(()=>{
        setData(info);
    })
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{decodeURI(text)}</a>,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render:(text) => <a>{text && decodeURI(text.username)}</a>
        },
        {
            title: 'Journey',
            dataIndex: 'address',
            key: 'journey',
            render:(text) => <a>{decodeURI(text)}</a>
        },
        {
            title: 'Images',
            dataIndex: 'images',
            key: 'images',
            render: (_,{ images }) =>(
                <>
                    {
                       images[0] &&  <Image src={images[0].image} style={{height:150,width:200}}></Image>
                    }
                </>
            )
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render:(_, {status}) => (
                <>
                    {status.status === "101" && (
                        <span><CloseCircleFilled style={{color:"red"}}/>审核不通过</span>
                    )}
                    {status.status === "1" && (
                        <span><CheckCircleFilled style={{color:"green"}}/>审核通过</span>
                    )}
                    {status.status === "0" && (
                        <span><ClockCircleFilled style={{color:"blue"}}/>审核中</span>
                    )}
                </>
            )

        },
        /* {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },*/
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a href={"/Modify?journal_id="+record.id}>Modify {decodeURI(record.title)}</a>
                    <a onClick={()=>{
                        const url = "http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue/"+record.id;
                        deleteRequest(url,(response) => {
                            message.success("Delete"+decodeURI(record.title)).then(() => {
                                setData(data.filter(item => item.id !== response.data));
                                }
                            )
                        })
                    }}>Delete</a>
                </Space>
            ),
        },
    ];

    return(
        <div>{
           data &&  <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 3,
                    showSizeChanger: true,
                }}
                style={{width:'70%'}}/>
        }
        </div>
    );
};