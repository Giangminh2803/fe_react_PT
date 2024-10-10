import React, { useEffect } from 'react';
import { Form, Input, InputNumber, message, Modal, Select } from 'antd';
import { callUpdateUser } from '../../../services/api';


const ModalAddNew = (props) => {
    const [form] = Form.useForm();

    const handleCancel = () => {
        props.setIsModalOpen(false);
        form.resetFields();
        props.setUpdateUser();
    };

    const onFinish = async (values) => {
        let { name, email, password, idCard, phone, age, gender, role, address } = values
        if (props.title === props.TITLE_ADD_NEW) {
            
            const user = await callCreateUser(name, email, password, idCard, phone, age, gender, role, address);
            if (user && user.statusCode === 201) {
                message.success(user.message);
                props.handleReload();
                props.setIsModalOpen(false);

            } else {
                message.error("New creation failed");
            }

            form.resetFields();

        } else {
            if(role.name ===  props.updateUser.role.name || role.name === props.updateUser.role._id){
                role = props.updateUser.role._id;
               
            }else{
                role = role.name;
            }
            let id = props.updateUser._id;
            const update = await callUpdateUser(id ,name, idCard, phone, age, gender, role, address)
            
            
            if (update ) {
                message.success(update.message);
                props.handleReload();
                props.setIsModalOpen(false);

            } else {
                message.error("New creation failed");
            }
            
        }

    };
    const handleUpdateData = () => {
        if (props.updateUser && props.title === props.TITLE_UPDATE) {
            form.setFieldsValue(props.updateUser);

        }

    }
    useEffect(() => {
        handleUpdateData()


    }, [props.updateUser])

    return (
        <>

            <Modal title={props.title} open={props.isModalOpen} onOk={() => { form.submit() }} onCancel={handleCancel}>
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
                        label="Username"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input disabled={props.title === props.TITLE_UPDATE ? true : false} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        hidden={props.title === props.TITLE_UPDATE ? true : false}
                        rules={[
                            {
                                required: props.title === props.TITLE_UPDATE ? false : true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Id Card"
                        name="idCard"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Id Card!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="age"
                        label="Age"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                                required: true
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select gender!',
                            },
                        ]}
                    >
                        <Select placeholder="select your gender">
                            <Option value="MALE">Male</Option>
                            <Option value="FEMALE">Female</Option>
                            <Option value="OTHER">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={["role", 'name']}
                        label="Role"
                        rules={[
                            {
                                required: true,
                                message: 'Please select role!',
                            },
                        ]}
                    >
                        {props.roles ?
                            <Select placeholder="select your role"
                           
                            >
                                {props.roles.map((role) => (
                                    <> <Option value={role._id}>{role.name}</Option></>
                                ))}

                            </Select>
                            : <></>
                        }


                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>



                </Form>
            </Modal>
        </>
    );
};
export default ModalAddNew;



