import '../css/commentsection.css'
import React, {useState} from "react";
import avatar1 from '../assets/carousel/book1.jpg';
import avatar2 from '../assets/carousel/book2.jpg';
import stukk from '../assets/carousel/book3.jpg';
import {Button, Divider, List} from "antd";
import CommentItem from "./CommentItem";
import { Flex, Input } from 'antd';
const { TextArea } = Input;
const onChange = (e) => {
    console.log('Change:', e.target.value);
};

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 * 3. 发布评论
 */

// 评论列表数据
const defaultList = [
    {
        // 评论id
        rpid: 3,
        // 用户信息
        user: {
            uid: '13258165',
            avatar: avatar1,
            uname: '周杰伦',
        },
        // 评论内容
        content: '哎哟，不错哦',
        // 评论时间
        ctime: '10-18 08:15',
        like: 98,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: avatar2,
            uname: '许嵩',
        },
        content: '我寻你千百度 日出到迟暮',
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            avatar: stukk,
            uname: 'stu_kk',
        },
        content: '关注stu_kk',
        ctime: '10-19 09:00',
        like: 66,
    },
]
// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar: stukk,
    // 用户昵称
    uname: 'stu_kk',
}


/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
    {type: 'hot', text: '最热', isActive: true},
    {type: 'time', text: '最新', isActive: false},
]

const CommentSection = () => {
    const [commentList, setCommentList] = useState(defaultList); // 评论列表
    const [tabList, setTabList] = useState(tabs); // 导航 Tab 数组
    const [commentContent, setCommentContent] = useState(''); // 评论内容
    const changeTabList = (id) => { //改变导航Tab
        const newTabList = tabList.map((item, index) => {
            if (index === id) {
                item.isActive = true;
            } else {
                item.isActive = false;
            }
            return item;
        });
        return newTabList;
    }

    const clickTab = (id) => { // 点击导航Tab
        const newCommentList = id === 0 ? commentList.sort((a, b) => b.like - a.like) : commentList.sort((a, b) => (
            b.ctime > a.ctime ? 1 : -1
        ));
        console.log(newCommentList)
        setCommentList(newCommentList);
        setTabList(changeTabList(id));
    }

    const sendComment = () => { //发布评论
        console.log(111)
        if (commentContent.trim() === '') {
            alert('评论内容不能为空');
            return;
        }
        const newCommentList = [
            {
                rpid: commentList.length + 1,
                user: user,
                content: commentContent,
                ctime: '12-19 09:00',
                like: 0,
            },
            ...commentList,
        ];
        setCommentList(newCommentList);
        setCommentContent('');
    }

    const deleteCommentById = (id) => { //根据Id删除自己的评论
        setCommentList(commentList.filter((item) => item.rpid !== id))
    }

    return (
        <div className="comment-section">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        <span className="total-reply">{10}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名： active */}
                        {tabList.map((item,index) => (
                            <span onClick={()=>clickTab(index)} className={item.isActive ? 'nav-item active' : 'nav-item'}  key={item.type}>{item.text}{index === 0 ? <Divider type="vertical"/> : ""}</span>
                        ))}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap" style={{
                "--93f77c20":"26px",
                width: "100%"}}>
                <div className="box-normal" style={{marginTop:20}}>
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={user.avatar} alt="用户头像" style={{height:40, width:40,borderRadius:"50%"}}/>
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        <Flex vertical gap={32}>
                            <TextArea
                                showCount
                                maxLength={100}
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                placeholder="发一条友善的评论"
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }}
                            />
                        </Flex>
                        <div className="reply-box-send" onClick={sendComment} style={{marginTop:40}}>
                            <Button className="send-text" style={{borderRadius:0, backgroundColor:"skyblue", color:"white", border:"none"}}>发布</Button>
                        </div>
                    </div>
                </div>
                <div className="reply-list">

                    <List grid={{gutter: 20, column: 1}}
                          dataSource={commentList}
                          pagination={{
                              onChange: page => {
                              },
                              pageSize: 3,
                          }}
                          renderItem={item => (
                              <List.Item>
                                  <CommentItem comment= {item}/>
                              </List.Item>
                          )}
                    />
                    {/*commentList.map(item => (
                        <div className="reply-item" key={item.rpid}>

                            <div className="root-reply-avatar">
                                <div className="bili-avatar">
                                    <img
                                        className="bili-avatar-img"
                                        alt=""
                                        src={item.user.avatar}
                                        style={{height:40, width:40,borderRadius:"50%"}}
                                    />
                                </div>
                            </div>

                            <div className="content-wrap">

                                <div className="user-info">
                                    <div className="user-name">{item.user.uname}</div>
                                </div>

                                <div className="root-reply">
                                    <span className="reply-content">{item.content}</span>
                                    <div className="reply-info">

                                        <span className="reply-time">{item.ctime}</span>

                                        <span className="reply-time">点赞数:{item.like}</span>

                                        {item.user.uid === user.uid && <span className="delete-btn" onClick={() => deleteCommentById(item.rpid)}>删除</span> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))*/}
                </div>
            </div>
        </div>
    )
}

export default CommentSection;