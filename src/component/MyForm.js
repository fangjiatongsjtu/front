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
    Radio,
    Select,
    Slider, Space,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

/*const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
};*/

const MyForm = ({onChange, onChangeDepartureTime, onChangeDuration}) => {
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [loadings, setLoadings] = useState([]);
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
                {/*<Form.Item label="TreeSelect">
                    <TreeSelect
                        treeData={[
                            {
                                title: 'Light',
                                value: 'light',
                                children: [
                                    {
                                        title: 'Bamboo',
                                        value: 'bamboo',
                                    },
                                ],
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Cascader">
                    <Cascader
                        options={[
                            {
                                value: 'zhejiang',
                                label: 'Zhejiang',
                                children: [
                                    {
                                        value: 'hangzhou',
                                        label: 'Hangzhou',
                                    },
                                ],
                            },
                        ]}
                    />
                </Form.Item>*/}
                <Form.Item label="行程">
                   <Input id="address" onChange={onChange}/>
                </Form.Item>
                <Form.Item label="地址">
                    <Input id="address" onChange={onChange}/>
                </Form.Item>
                <Form.Item label="人物">
                    <Flex vertical gap="middle">
                        <Radio.Group onChange={onChange} id="members" defaultValue="独自一人"style={{display:"flex", justifyContent:"space-between"}}>
                            <Radio.Button value="独自一人" id="members">独自一人</Radio.Button>
                            <Radio.Button value="三五好友" id="members">三五好友</Radio.Button>
                            <Radio.Button value="亲子" id="members">亲子</Radio.Button>
                            <Radio.Button value="家庭" id="members">家庭</Radio.Button>
                            <Radio.Button value="情侣" id="members">情侣</Radio.Button>
                            <Radio.Button value="闺蜜" id="members">闺蜜</Radio.Button>
                            <Radio.Button value="学生" id="members">学生</Radio.Button>
                        </Radio.Group>
                    </Flex>
                </Form.Item>
                <Form.Item label="人均费用">
                    <Input prefix="￥" suffix="RMB"  id = "cost" onChange={onChange}/>
                </Form.Item>
                <Form.Item label="出发时间">
                    <DatePicker  onChange={onChangeDepartureTime}/>
                </Form.Item>
                <Form.Item label="开始/结束时间">
                    <RangePicker />
                </Form.Item>
                <Form.Item label="旅游时长(天数)">
                    <InputNumber id="duration" onChange={onChangeDuration}/>
                </Form.Item>
            </Form>
        </>
    );
};
export default MyForm;