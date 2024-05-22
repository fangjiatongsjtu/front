import React from "react";
import {Avatar, Card, Divider, Image, List, Typography} from "antd";
import {EnvironmentFilled, EyeOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";
const { Title, Paragraph, Text, Link } = Typography;

const CommentItem = (props) =>{
    const comment = props.comment
    return(
        <Card
            style={{
                width: '100%',
                border: "none"
            }}
            title={
                <div style={{ display: "flex", alignItems: "center"}}>
                    <Avatar src={comment.user.avatar}/>
                    <Text style={{marginLeft:20}}>{comment.user.uname}&nbsp;&nbsp;&nbsp;
                    </Text>
                    <div  style={{ marginLeft: "auto" }}>
                        <scan>
                            <EyeOutlined/>{comment.views}&nbsp;&nbsp;&nbsp;<LikeOutlined/>{comment.like}&nbsp;&nbsp;&nbsp;<MessageOutlined />{comment.comments}
                        </scan>
                    </div>
                </div>
            }
        >
            <div>
                <Typography variant="body1" className="journal_body" style={{  whiteSpace: "pre-line" , color: "#333", fontSize: "15px"}}>
                    <Paragraph style={{fontWeight:800}}>{comment.content}</Paragraph>
                    <Paragraph style={{color:"GrayText"}}>发布于&nbsp;&nbsp;&nbsp;{comment.ctime}</Paragraph>
                </Typography>
            </div>
        </Card>
    );
}

export default CommentItem;