import React, { useState } from 'react';
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

const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
};

const ModifyForm = (props) => {
    const info = props.info;
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [loadings, setLoadings] = useState([]);
    const result = info.status === 1 ? {
        status:'success',
                title:"审核通过",
                subTitle:"您的游记审核通过，现在已经发布了.",
                extra:[
                        <Button type="primary" key="console">
                            Go Console
                        </Button>,
            <Button key="buy">Buy Again</Button>,
        ],

    }: info.status === 0 ? {status:"warning",
        title:"您的游记未通过，有点小问题",
    extra:[
    <Button type="primary" key="console">
        Go Console
    </Button>
] }: {title:"您的游记还在审核中",
    extra:[
    <Button type="primary" key="console">
        Go Console
    </Button>]
};
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };
    return (
        <>
            {/*<Checkbox
                checked={componentDisabled}
                onChange={(e) => setComponentDisabled(e.target.checked)}
            >
                Form disabled
            </Checkbox>*/}
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
                    <Input defaultValue={info.journey}/>
                </Form.Item>
                <Form.Item label="地址">
                    <Input value={info.start}/>
                </Form.Item>
                <Form.Item label="人物">
                    <Flex vertical gap="middle">
                        <Radio.Group onChange={onChange} defaultValue={info.members}style={{display:"flex", justifyContent:"space-between"}}>
                            <Radio.Button value="独自一人">独自一人</Radio.Button>
                            <Radio.Button value="三五好友">三五好友</Radio.Button>
                            <Radio.Button value="亲子">亲子</Radio.Button>
                            <Radio.Button value="家庭">家庭</Radio.Button>
                            <Radio.Button value="情侣">情侣</Radio.Button>
                            <Radio.Button value="闺蜜">闺蜜</Radio.Button>
                            <Radio.Button value="学生">学生</Radio.Button>
                        </Radio.Group>
                    </Flex>
                </Form.Item>
                <Form.Item label="人均费用">
                    <Input prefix="￥" suffix="RMB" value={info.cost}/>
                </Form.Item>
                <Form.Item label="出发时间">
                    <DatePicker defaultValue={moment(info.departure_time, 'YYYY-MM-DD')}/>
                </Form.Item>
                <Form.Item label="开始/结束时间">
                    <RangePicker defaultValue={[moment(info.departure_time, 'YYYY-MM-DD'), moment(info.departure_time, 'YYYY-MM-DD').add(info.duration,'days')]}/>
                </Form.Item>
                <Form.Item label="旅游时长(天数)">
                    <InputNumber defaultValue={info.duration}/>
                </Form.Item>
            </Form>
            <Result
                status={result.status}
                title={result.title}
                subTitle={result.subTitle}
                extra={result.extra}
            />
            <Flex style={{display:"flex",justifyContent:"center", marginBottom:20}} gap={32}>
                <Button type="primary"
                        loading={loadings[1]}
                        onClick={() => enterLoading(1)}>保存</Button>
                <Button type="primary"
                        loading={loadings[2]}
                        onClick={() => enterLoading(2)}>提交</Button>
            </Flex>
        </>
    );
};
export default ModifyForm;