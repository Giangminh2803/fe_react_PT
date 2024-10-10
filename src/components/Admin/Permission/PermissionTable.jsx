import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Table, Tooltip } from 'antd';
import {
    callDeletePermission,
    callFetchDataPermission,
    callFetchRole
}
    from '../../../services/api';
import {
    EditOutlined,
    ExportOutlined,
    ImportOutlined,
    ReloadOutlined,

} from '@ant-design/icons';
import InputSearch from './InputSearch';
import dayjs from 'dayjs';
import UserDetail from './PermissionDetail';
import ModalAddUpdatePermission from './ModalAddUpdatePermission';
import { colorMethod } from '../../utils/utils';
import { MdAddModerator } from 'react-icons/md';
import { BsShieldFillMinus } from 'react-icons/bs';

const TITLE_ADD_NEW = 'Add New Permission';
const TITLE_UPDATE = 'Update Information Permission';

const PermissionTable = () => {

    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [sortQuery, setSortQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('');
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [detailPermission, setDetailPermission] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roles, setRoles] = useState();
    const [title, setTitle] = useState();
    const [updatePermission, setUpdateUser] = useState();




    const handleConfirm = async (_id) => {
        const deletePermission = await callDeletePermission(_id);
     
        if (deletePermission && deletePermission.statusCode === 200) {
            message.success(`Deleted Successfully!`);
            
        }else{
            message.error(`Something went wrong!`)

        }
        fetchPermission();
    }

    const cancel = (e) => {

        message.error('Click on No');
    };

    const handleUpdateUser = async (dataUser) => {
        setIsModalOpen(true);
        setTitle(TITLE_UPDATE);
        setUpdateUser(dataUser);
     
        let role = await callFetchRole();
        setRoles(role.data.result);


    }
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: (text, record, index) => {
                return (
                    <>
                        <a onClick={() => handleOpenDetail(record)}
                        >{text}</a>
                    </>
                )
            },
        },
        {
            title: 'Name Permission',
            dataIndex: 'name',
            key: 'name',
            render: (text, index, action) => {
                return (
                    <p style={{ paddingLeft: 10, fontWeight: '600' }} >{text.toUpperCase()}</p>
                )
            }
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',

            render: (text, index, action) => {
                return (
                    <p style={{ paddingLeft: 10, fontWeight: 'bold', marginBottom: 0, color: colorMethod(text) }}>{text || ''}</p>
                )
            },

        },
        {
            title: 'Api Path',
            dataIndex: 'apiPath',
            key: 'apiPath'
        },
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, index, action) => {
                return (
                    <>{dayjs(text).format('DD-MM-YYYY')}</>
                )
            },
            sorter: (a, b) => a.createdAt - b.createdAt,


        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <>

                        <Button color="primary"
                            variant="outlined"
                            style={{ marginRight: '10px' }}
                            icon={<EditOutlined />}
                            onClick={() => handleUpdateUser(record)}
                        />

                        <Popconfirm
                            title="Delete a user"
                            description="Are you sure you will delete this account?"
                            onCancel={cancel}
                            onConfirm={() => handleConfirm(record._id)}
                            okText="YES"
                            cancelText="No"
                            placement='leftBottom'

                        >
                            <Button
                                color="danger"
                                variant="outlined"
                                icon={<BsShieldFillMinus />} />

                        </Popconfirm>

                    </>
                )
            },
            key: 'Action'

        },
    ];
    const defaultCheckedList = columns.map((item) => 
        item.key
    );
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    useEffect(() => {
        fetchPermission()
    }, [current, pageSize, filterQuery, sortQuery]);


    const handleOpenAddNew = async () => {
        
        setTitle(TITLE_ADD_NEW);
        setIsModalOpen(true);

    }

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }

        if (sorter && sorter.field) {

            const sq = sorter.order === "ascend" ? `&sort=${sorter.field}` : `&sort=-${sorter.field}`;
            setSortQuery(sq);
           
        }

    };

    const fetchPermission = async (clear = false) => {
        setIsLoading(true);
        let qs = `current=${current}&pageSize=${pageSize}&sort=-createdAt`;
        if (filterQuery) {
            qs += `&${filterQuery}`;
        }
        if (sortQuery) {
            qs += `&${sortQuery}`;
        }
        if (clear) {
            qs = '';
            setIsClear(false);
        }
        const res = await callFetchDataPermission(qs);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotalPage(res.data.meta.total);
        }
        setIsLoading(false);
    }


    const options = columns.map(({ key, title }) => ({
        label: title,
        value: key,
    }));
    const newColumns = columns.map((item) => ({
        ...item,
        hidden: !checkedList.includes(item.key),
    }));

    const handleOpenDetail = (data) => {
        setIsOpenDetail(true);
        setDetailPermission(data);


    }

    const renderHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: '600', fontSize: "24px" }}>Table List Permission</span>
                <span style={{ display: 'flex', gap: "12px" }}>
                    <Button type="primary" icon={<ExportOutlined />}>
                        Export
                    </Button>
                    <Button type="primary" icon={<ImportOutlined />}>
                        Import
                    </Button>
                    <Button type="primary" icon={<MdAddModerator />} onClick={() => handleOpenAddNew()}>
                        Add new
                    </Button>
                    <Tooltip title="search">
                        <Button shape="circle" icon={<ReloadOutlined />} onClick={() => handleReload()} />
                    </Tooltip>
                </span>
            </div>
        )
    }

    const handleReload = () => {

        fetchPermission();


    }

    return (
        <div>

            <InputSearch setFilterQuery={setFilterQuery} />
            <Table
                title={renderHeader}
                className='dataTable-user'
                columns={newColumns}
                dataSource={listUser}
                onChange={onChange}
                options={options}
                loading={isLoading}
                showSorterTooltip={{ target: 'sorter-icon' }}
                rowKey='name'
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        total: totalPage,
                        showSizeChanger: true
                    }
                }
            >

            </Table>
            <UserDetail
                isOpenDetail={isOpenDetail}
                setIsOpenDetail={setIsOpenDetail}
                detailPermission={detailPermission}
            />
            <ModalAddUpdatePermission
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleReload={handleReload}
                title={title}
                updatePermission={updatePermission}
                setUpdateUser={setUpdateUser}
                TITLE_UPDATE={TITLE_UPDATE}
                TITLE_ADD_NEW={TITLE_ADD_NEW}

            />
        </div>
    )


}
export default PermissionTable;