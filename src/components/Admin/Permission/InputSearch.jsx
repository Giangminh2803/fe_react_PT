import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';
import { green, purple, red, yellow } from '@ant-design/colors';
const { Option } = Select;
const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [isReset, setIsReset] = useState(false);
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        marginBottom: "25px"

    };

    const onFinish = (values) => {
       
        let query = '';
        if (values.name) {
            query += `&name=/${values.name}/i`;
        }
        if (values.apiPath) {
            query += `&apiPath=/${values.apiPath}/i`;
        }
        if (values.module) {
            query += `&module=/${values.module}/i`;
        }
        if (values.method) {
            query += `&method=/${values.method}/i`;
        }

        if (query) {

            props.setFilterQuery(query);
            setIsReset(true);
        }

    };

    const handleClear = () => {

        if (isReset) {
            let query = null;
            props.setFilterQuery(query)
            form.resetFields();
            setIsReset(false);
        }

    }
    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`name`}
                        label={`Name`}
                    >
                        <Input placeholder="Get/Update/Delete/Create..." />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`apiPath`}
                        label={`Api Path`}
                    >
                        <Input placeholder="/api/v1/..." />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`module`}
                        label={`Module`}
                    >
                        <Input placeholder="Role/Permission/User..." />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`method`}
                        label={`Method`}
                    >
                        <Select placeholder="Select your method">
                            <Option value="GET" style={{ color: green[6], fontWeight: 'bold' }}>GET</Option>
                            <Option value="POST" style={{ color: yellow[6], fontWeight: 'bold' }}>POST</Option>
                            <Option value="PATCH" style={{ color: purple[6], fontWeight: 'bold' }} >PATCH</Option>
                            <Option value="DELETE" style={{ color: red[6], fontWeight: 'bold' }}>DELETE</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            handleClear()
                        }}
                    >
                        Clear
                    </Button>

                </Col>
            </Row>
        </Form>
    );
};


export default InputSearch;