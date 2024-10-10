import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Popover, Table, Tooltip } from 'antd';
import { callFetchDataUser, callFetchRole, callSoftDeleteUser } from '../../../services/api';
import {
    EditOutlined,
    ExportOutlined,
    ImportOutlined,
    ReloadOutlined,
    UserAddOutlined,
    UserDeleteOutlined
} from '@ant-design/icons';
import InputSearch from './InputSearch';
import dayjs from 'dayjs';
import UserDetail from './UserDetail';
import ModalAddNew from './ModalAddNewUser';
import { colorRole } from '../../utils/utils';

const TITLE_ADD_NEW = 'Add New Account User';
const TITLE_UPDATE = 'Update Information User';








const UserTable = () => {

    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [sortQuery, setSortQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('');
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [detailUser, setDetailUser] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roles, setRoles] = useState();
    const [title, setTitle] = useState();
    const [updateUser, setUpdateUser] = useState();
    const [open, setOpen] = useState(false);


    
    const handleConfirm = async (_id) => {
        const deleteUser = await callSoftDeleteUser(_id);
        if(deleteUser && deleteUser.message){
            message.success(deleteUser.message);
            fetchUser()
    };
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
            title: 'Username',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Role',
            dataIndex: ['role', 'name'],
            key: 'Role',
            render:  (text, index, action) => {
                return (
                    <p style={{ paddingLeft: 10, fontWeight: 'bold', marginBottom: 0, color: colorRole(text) }}>{text || ''}</p>
                )
            }
            

        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'

        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'

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
                                icon={<UserDeleteOutlined />} />

                        </Popconfirm>

                    </>
                )
            },
            key: 'Action'

        },
    ];
    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    useEffect(() => {
        fetchUser()
    }, [current, pageSize, filterQuery, sortQuery]);


    const handleOpenAddNew = async () => {
        if (!roles) {
            let role = await callFetchRole();
            setRoles(role.data.result);
        }
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

    const fetchUser = async () => {
        setIsLoading(true);
        let qs = `current=${current}&pageSize=${pageSize}&populate=role&fields=role.name`;
        if (filterQuery) {
            qs += `&${filterQuery}`;
        }
        if (sortQuery) {
            qs += `&${sortQuery}`;
        }
        const res = await callFetchDataUser(qs);
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
        setDetailUser(data);


    }

    const renderHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: '600', fontSize: "24px" }}>Table List User Account</span>
                <span style={{ display: 'flex', gap: "12px" }}>
                    <Button type="primary" icon={<ExportOutlined />}>
                        Export
                    </Button>
                    <Button type="primary" icon={<ImportOutlined />}>
                        Import
                    </Button>
                    <Button type="primary" icon={<UserAddOutlined />} onClick={() => handleOpenAddNew()}>
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
        fetchUser()

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
                detailUser={detailUser}
            />
            <ModalAddNew
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                roles={roles}
                handleReload={handleReload}
                title={title}
                updateUser={updateUser}
                setUpdateUser={setUpdateUser}
                TITLE_UPDATE={TITLE_UPDATE}
                TITLE_ADD_NEW={TITLE_ADD_NEW}

            />
        </div>
    )


}
export default UserTable;