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

const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
};

const MyForm = () => {
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
                <Form.Item label="TreeSelect">
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
                </Form.Item>
                <Form.Item label="行程">
                   <Input/>
                </Form.Item>
                <Form.Item label="地址">
                    <Input/>
                </Form.Item>
                <Form.Item label="人物">
                    <Flex vertical gap="middle">
                        <Radio.Group onChange={onChange} defaultValue="a"style={{display:"flex", justifyContent:"space-between"}}>
                            <Radio.Button value="a">独自一人</Radio.Button>
                            <Radio.Button value="b">三五好友</Radio.Button>
                            <Radio.Button value="c">亲子</Radio.Button>
                            <Radio.Button value="d">家庭</Radio.Button>
                            <Radio.Button value="e">情侣</Radio.Button>
                            <Radio.Button value="f">闺蜜</Radio.Button>
                            <Radio.Button value="g">学生</Radio.Button>
                        </Radio.Group>
                    </Flex>
                </Form.Item>
                <Form.Item label="人均费用">
                    <Input prefix="￥" suffix="RMB" />
                </Form.Item>
                <Form.Item label="出发时间">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="开始/结束时间">
                    <RangePicker />
                </Form.Item>
                <Form.Item label="旅游时长(天数)">
                    <InputNumber />
                </Form.Item>
            </Form>
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
export default MyForm;