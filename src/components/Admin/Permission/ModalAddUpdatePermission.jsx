import React, { useEffect } from 'react';
import { Form, Input, InputNumber, message, Modal, Select } from 'antd';
import { callCreatePermission, callUpdatePermission, callUpdateUser } from '../../../services/api';
import { green, purple, red, yellow } from '@ant-design/colors';


const ModalAddUpdatePermission= (props) => {
    const [form] = Form.useForm();

    const handleCancel = () => {
        props.setIsModalOpen(false);
        form.resetFields();
        props.setUpdateUser();
    };

    const onFinish = async (values) => {
        
        let {_id, name, apiPath, method, module } = values
        
        if (props.title === props.TITLE_ADD_NEW) {
            const permission = await callCreatePermission(name, apiPath, method, module);
            if (permission && permission.statusCode === 201) {
                message.success(permission.message);
                props.handleReload();
                props.setIsModalOpen(false);

            } else {
                message.error("New creation failed");
            }

                

        }else{
            
            const updatePermission = await callUpdatePermission(_id, name, apiPath, method, module);
           
           if(updatePermission && updatePermission.statusCode === 200){
            message.success(updatePermission.message);
            props.handleReload();
            props.setIsModalOpen(false);
           }else{
            message.error(`There's an error somewhere, the update failed!`);
            
        }
            
        }

        form.resetFields();  
    };
    const handleFillDataUpdate = () => {
        if (props.updatePermission && props.title === props.TITLE_UPDATE) {
            form.setFieldsValue(props.updatePermission);
        }

    }
    useEffect(() => {
        handleFillDataUpdate()


    }, [props.updatePermission])

    return (
        <div>

            <Modal title={props.title} open={props.isModalOpen} onOk={() => form.submit() } onCancel={handleCancel}>
                <Form form={form}
                    layout='vertical'
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}

                    onFinish={onFinish}
                    
                    autoComplete="off"
                >
                    <Form.Item
                        
                        name="_id"
                        hidden= {true}
                        rules={[
                            {
                                
                                message: 'Please input your Name Permission!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name Permission!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Api Path"
                        name="apiPath"
                        placeholder='/api/v1/...'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Api Path!',
                            },
                        ]}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        name="method"
                        label="Method"
                        rules={[
                            {
                                required: true,
                                message: 'Please select method!',
                            },
                        ]}
                    >
                        <Select placeholder="select your method">
                            <Select.Option value="GET" style={{color: green[6],  fontWeight: 'bold'}}>GET</Select.Option>
                            <Select.Option value="POST" style={{color: yellow[6],  fontWeight: 'bold'}}>POST</Select.Option>
                            <Select.Option value="PATCH" style={{color: purple[6],  fontWeight: 'bold'}} >PATCH</Select.Option>
                            <Select.Option value="DELETE"style={{color: red[6],  fontWeight: 'bold'}}>DELETE</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Module"
                        name="module"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your module!',
                            },
                        ]}
                    >
                        <Input  />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
export default ModalAddUpdatePermission;



