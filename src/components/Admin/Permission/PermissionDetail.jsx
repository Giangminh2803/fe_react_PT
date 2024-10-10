import React, { useEffect, useState } from 'react';
import { Badge, Button, Descriptions, Drawer, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { SyncOutlined } from '@ant-design/icons';
import { colorMethod } from '../../utils/utils';




const UserDetail = (props) => {

    const items = [
        {
            key: '1',
            label: 'Name Permission',
            children: props?.detailPermission?.name

        },
        {
            key: '2',
            label: 'Api Path',
            children: props?.detailPermission?.apiPath,
        },
        {
            key: '3',
            label: 'Method',
            children: <p style={{  fontWeight: 'bold', color: colorMethod(props?.detailPermission?.method) }}>{props?.detailPermission?.method || ''}</p>


        },
        {
            key: '4',
            label: 'Module',
            children: props?.detailPermission?.module,
        },

        {
            key: '6',
            label: 'Created At',
            children: dayjs(props?.detailPermission?.createdAt).format('HH:MM:ss -- DD-MM-YYYY'),


        },
        {
            key: '5',
            label: 'Created By',
            children: props?.detailPermission?.createdBy?.email,

        },

        {
            key: '11',
            label: 'Updated By',
            children:
                (<>
                    {props?.detailPermission?.updatedBy === undefined ?
                        <Tag icon={<SyncOutlined spin />} color="processing">
                            Updating
                        </Tag> :
                        props?.detailPermission?.updatedBy?.email

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
                <Descriptions title="Permission Info" bordered items={items} column={2} />
            </Drawer>
        </div>
    );
};
export default UserDetail;