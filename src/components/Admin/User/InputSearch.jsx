import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';
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
        if (values.email) {
            query += `&email=/${values.email}/i`;
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
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`name`}
                        label={`Name`}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`email`}
                        label={`Email`}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`phone`}
                        label={`Số điện thoại`}
                    >
                        <Input placeholder="placeholder" />
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
                    {/* <a
                style={{ fontSize: 12 }}
                onClick={() => {
                    setExpand(!expand);
                }}
            >
                {expand ? <UpOutlined /> : <DownOutlined />} Collapse
            </a> */}
                </Col>
            </Row>
        </Form>
    );
};


export default InputSearch;