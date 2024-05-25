import React, {useEffect, useState} from 'react';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker, Flex,
    Form,
    Input,
    InputNumber,
    Radio, Result,
    Select,
    Slider, Space,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import moment from 'moment';
import {CheckCircleFilled, ClockCircleFilled, CloseCircleFilled} from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const ModifyForm = ({info,onChange,onChangeDepartureTime,onChangeDuration}) => {
    const [data,setData] = useState({})
    const [real_result,setReal_Result] = useState({})
    console.log(info)
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [loadings, setLoadings] = useState([]);
    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                    maxWidth: 1000,
                }}
            >
                <Form.Item label="行程">
                    { info.address &&
                        <Input  id="address" defaultValue={decodeURI(info.address)} onChange={onChange}/>
                    }
                </Form.Item>
                <Form.Item label="地址">
                    { info.address && <Input  id="address" defaultValue={decodeURI(info.address)} onChange={onChange}/>}
                </Form.Item>
                <Form.Item label="人物">
                    <Flex vertical gap="middle">
                        { info.members && <Radio.Group onChange={onChange}  id="members" defaultValue={decodeURI(info.members)} style={{display:"flex", justifyContent:"space-between"}}>
                            <Radio.Button value="独自一人" id="members" >独自一人</Radio.Button>
                            <Radio.Button value="三五好友" id="members" >三五好友</Radio.Button>
                            <Radio.Button value="亲子" id="members" >亲子</Radio.Button>
                            <Radio.Button value="家庭" id="members" >家庭</Radio.Button>
                            <Radio.Button value="情侣"id="members" >情侣</Radio.Button>
                            <Radio.Button value="闺蜜" id="members" >闺蜜</Radio.Button>
                            <Radio.Button value="学生"id="members" >学生</Radio.Button>
                        </Radio.Group>
                        }
                    </Flex>
                </Form.Item>
                <Form.Item label="人均费用">
                    { info.cost&&
                        <Input id = "cost" prefix="￥" suffix="RMB" defaultValue={info.cost} onChange={onChange}/>}
                </Form.Item>
                <Form.Item label="出发时间">
                    {info.departure_time && <DatePicker defaultValue={moment(info.departure_time, 'YYYY-MM-DD')} onChange={onChangeDepartureTime}/>}
                </Form.Item>
                <Form.Item label="开始/结束时间">
                    {info.departure_time && info. duration && <RangePicker defaultValue={[ moment(info.departure_time, 'YYYY-MM-DD'), moment(info.departure_time, 'YYYY-MM-DD').add(info.duration,'days')]}/>}
                </Form.Item>
                <Form.Item label="旅游时长(天数)">
                    {info.duration &&  <InputNumber defaultValue={info.duration} onChange={onChangeDuration}/>}
                </Form.Item>
            </Form>
            {info && info.status &&info.status.status&&
            <Result
                status={info.status.status === '1' ? 'success' : info.status.status === '101' ? 'warning' : 'info'}
                title={info.status.status === '1' ? "审核通过" : info.status.status === '101' ? "审核未通过" : "审核中"}
                subTitle={info.status.status === '1' ? "您的游记审核通过，现在已经发布了" : info.status.status === '101' ? "您的游记未通过，有点小问题" : "您的游记还在审核中"}
                extra={info.status.status === '1' ? <></> : info.status.status === '101' ? <Flex style={{width:'70%',margin:"0 0 0 150px"}}>
                  <TextArea
                        value = {decodeURI(info.status.comment)}
                        readOnly
                        showCount
                        maxLength={20}
                        style={{
                            resize: 'none',
                            width:'100%',
                            color:"#999",
                            backgroundColor: "#f8f8f8",
                        }}
                    >
                    </TextArea>
                </Flex> :<></>}
            />}
        </>
    );
};
export default ModifyForm;