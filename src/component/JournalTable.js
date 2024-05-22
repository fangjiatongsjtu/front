import React from "react";
import {Image, List, Space, Table, Tag} from 'antd';
import journaldata from "../assets/journaldata";
import {CheckCircleFilled, ClockCircleFilled, CloseCircleFilled} from "@ant-design/icons";
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
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Journey',
        dataIndex: 'journey',
        key: 'journey',
    },
    {
        title: 'Images',
        dataIndex: 'images',
        key: 'images',
        render: (_,{ images }) =>(
            <>
                {

                        <Image src={images[0]}></Image>
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
                {status === 0 && (
                    <span><CloseCircleFilled style={{color:"red"}}/>审核不通过</span>
                )}
                {status === 1 && (
                    <span><CheckCircleFilled style={{color:"green"}}/>审核通过</span>
                )}
                {status === 101 && (
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
                <a href={"/Modify?journal_id="+record.id}>Modify {record.title}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
export function JournalTable(){
    return(
        <div>
            <Table columns={columns} dataSource={journaldata} style={{width:'70%'}}/>
        </div>
    );
};