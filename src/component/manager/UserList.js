import {Avatar, Button, List, message} from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import {CrownFilled, CrownOutlined} from "@ant-design/icons";
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const rightDataUrl = 'http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/user/'
const ContainerHeight = 600;
const UserList = () => {

    const [data, setData] = useState([]);
    const [banDisabled, setBanDisabled] = useState(false);
    const [unbanDisabled, setUnbanDisabled] = useState(false);
    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?JSON.parse(localStorage.getItem("userinfo")):"";
    const appendData = () => {
        fetch(rightDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(body.data);
                const newBanDisabled = body.data.map(item => ({id:item.id,disabled:item.isBan === 1}));
                const newUnbanDisabled = body.data.map(item => ({id:item.id,disabled:item.isBan !== 1}));
                setBanDisabled(newBanDisabled);
                setUnbanDisabled(newUnbanDisabled);
                console.log(newBanDisabled);
                console.log(newUnbanDisabled)
                message.success(`${body.data.length} more items loaded!`);
            });
    };
    useEffect(() => {
        appendData();
    }, []);
    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData();
        }
    };
    return (
        <List>
            <VirtualList
                data={data}
                height='95%'
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
            >
                {(item, index) =>(
                    <List.Item key={item.username}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href="https://ant.design">{item.username}</a>}
                            description={item.user_id}
                        />
                        {
                            item.authorization === "1" &&
                            <div style={{marginRight:20}}>
                                <CrownFilled/>
                            </div>
                        }
                        <div style={{ marginRight: '10px' }}>
                            <Button onClick={() => {
                                console.log(item)
                                fetch("http://localhost:8080/Ban",{
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body:JSON.stringify(item)
                                })
                                    .then((res) => res.json())
                                    .then((body) => {
                                        message.success(JSON.stringify(body));
                                        let newBanDisabled = banDisabled;
                                        newBanDisabled[index].disabled = true
                                        setBanDisabled(newBanDisabled);
                                    });
                            }
                            } disabled={item.id === userinfo.id || banDisabled[index].disabled}>禁用</Button>
                        </div>
                        <Button style={{marginRight:'7%'}} onClick={() => {
                            fetch("http://localhost:8080/UnBan",{
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body:JSON.stringify(item)
                            })
                                .then((res) => res.json())
                                .then((body) => {
                                   message.success(JSON.stringify(body));
                                   let newUnBanDisabled = unbanDisabled;
                                   newUnBanDisabled[index].disabled=true;
                                   setUnbanDisabled(newUnBanDisabled)
                                });
                        }
                        } disabled={item.id === userinfo.id || unbanDisabled[index].disabled}>解禁</Button>
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};
export default UserList;