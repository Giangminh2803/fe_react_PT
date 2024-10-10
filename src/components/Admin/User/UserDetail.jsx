import React, { useEffect, useState } from 'react';
import { Badge, Button, Descriptions, Drawer, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { SyncOutlined } from '@ant-design/icons';




const UserDetail = (props) => {
    


    const items = [
        {
            key: '1',
            label: 'Username',
            children: props?.detailUser?.name

        },
        {
            key: '2',
            label: 'Email',
            children: props?.detailUser?.email,
        },
        {
            key: '3',
            label: 'Gender',
            children: props?.detailUser?.gender,
        },
        {
            key: '4',
            label: 'Age',
            children: props?.detailUser?.age,
        },

        {
            key: '6',
            label: 'Role',
            children:
                props?.detailUser?.role?.name === "SUPER ADMIN" ?
                    <Badge
                        status="success"
                        text={props?.detailUser?.role?.name}
                        style={{ color: '#52C41A', fontWeight: 600 }} ></Badge>
                    :
                    <Badge
                        status="processing"
                        text={props?.detailUser?.role?.name}
                        style={{ color: '#1677ff', fontWeight: 600 }} ></Badge>,


        },
        {
            key: '5',
            label: 'Address',
            children: props?.detailUser?.address,

        },
        {
            key: '7',
            label: 'Id Card',
            children: props?.detailUser?.idCard,
        },
        {
            key: '8',
            label: 'Phone Number',
            children: props?.detailUser?.phone,
        },
        {
            key: '9',
            label: 'Created At',
            children: dayjs(props?.detailUser?.createdAt).format('HH:MM:ss -- DD-MM-YYYY'),
        },
        {
            key: '10',
            label: 'Updated At',
            children: dayjs(props?.detailUser?.updatedAt).format('HH:MM:ss -- DD-MM-YYYY'),
        },

        {
            key: '11',
            label: 'Updated By',
            children:
                (<>
                    {props?.detailUser?.updatedBy === undefined ?
                        <Tag icon={<SyncOutlined spin />} color="processing">
                            Updating
                        </Tag> :
                        props?.detailUser?.updatedBy?.email

                    }
                </>),

        },

    ];

    const onClose = () => {
        props.setIsOpenDetail(false);
       
    };


    return (
        <div>
            <Drawer onClose={onClose} open={props.isOpenDetail} width={"100vh"}>
                <Descriptions title="User Info" bordered items={items} column={2} />
            </Drawer>
        </div>
    );
};
export default UserDetail;