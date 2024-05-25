import '../css/commentsection.css'
import React, {useState} from "react";
import {Button, Divider, List, message} from "antd";
import CommentItem from "./CommentItem";
import { Flex, Input } from 'antd';
import {postRequest, putRequest} from "../util/ajax";
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
// 当前登录用户信息



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

const CommentSection = ({info,onChange}) => {
    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?JSON.parse(localStorage.getItem("userinfo")):"";
    const user_avatar = isLogin?JSON.parse(localStorage.getItem("userinfo")).avatar:"";
    const [commentList, setCommentList] = useState({}); // 评论列表
    const [tabList, setTabList] = useState(tabs); // 导航 Tab 数组
    const [commentContent, setCommentContent] = useState(''); // 评论内容
    const [commentResult, setCommentResult] = useState({});
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
    const deleteCommentById = (id) => { //根据Id删除自己的评论
        setCommentList(commentList.filter((item) => item.rpid !== id))
    }

    const onCommentSubmit = () => {
        const url = "http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/comment";
        // 获取当前日期和时间
        const now = new Date();

        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;

        console.log(formattedDate);
        const comment = {
            content:encodeURI(commentContent),
            likes:0,
            ctime:formattedDate,
            author: userinfo,
        }
        console.log(comment);
        postRequest(url,comment,(response)=>{
                console.log(response.data);
                setCommentResult(response.data);
                info.comments = [...info.comments,response.data];
                console.log(info);
                const url2 = "http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/travelogue/"+info.id;
                putRequest(url2,info,(response) => {
                message.success(JSON.stringify(response.data)).then(
                    ()=>{
                        console.log(response.data);
                        setCommentContent("");
                    }
                )
                })

        });
    }
    return (
        <div className="comment-section">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        {
                            info && info.comments && info.comments.length && <span className="total-reply">{info.comments.length}</span>
                        }
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
                            {
                                userinfo && isLogin &&  <img className="bili-avatar-img" src={user_avatar} alt="用户头像" style={{height:40, width:40,borderRadius:"50%"}}/>
                            }
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
                                disabled={!isLogin}
                            />
                        </Flex>
                        <div className="reply-box-send" style={{marginTop:40}}>
                            <Button className="send-text" style={{borderRadius:0, backgroundColor:"skyblue", color:"white", border:"none"}} onClick={onCommentSubmit}  disabled={!isLogin}>发布</Button>
                        </div>
                    </div>
                </div>
                <div className="reply-list">

                    <List grid={{gutter: 20, column: 1}}
                          dataSource={info.comments}
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