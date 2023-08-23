import React, { useState } from 'react';
import { Table, Button, Empty } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { connect, Dispatch } from 'umi';
import getColumns from './fields';
import UserModal from './components/UserModal';
import Footer from './components/Footer';
import { getUser } from './service';

import { DataType, NAMESPACE } from './typings';
interface IProps {
  userList?: {
    data?: [];
    meta?: any;
  };
  dispatch: Dispatch;
}

const Users: React.FC<IProps> = (props) => {
  const { userList, dispatch } = props;
  const [showModal, setshowModel] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [record, setRecord] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);

  // 控制弹窗开关
  const handleShowModal = (isShow: boolean) => {
    setshowModel(isShow);
  };

  const handleConfirmLoading = (isloading: boolean) => {
    setConfirmLoading(isloading);
  };

  //获取单行数据
  const getRecord = (record: DataType) => {
    setRecord(record);
  };

  //添加,根据record的id是否存在决定打开窗口类型
  const handleAdd = () => {
    const empty_record = {
      name: '',
      email: '',
      status: 1,
    };
    setRecord(empty_record);
    setshowModel(true);
  };

  //修改||添加
  const onFinish = (value: DataType) => {
    console.log('@_test', 'finish', value);
    setLoading(true);
    // 修改
    if (value.id) {
      dispatch({
        type: `${NAMESPACE}/edit`,
        payload: { id: record?.id, value },
        completed: () => {
          setLoading(false);
        },
        success: () => {
          // 成功后关闭弹窗和按钮加载
          handleConfirmLoading(false);
          handleShowModal(false);
        },
        onError: () => {
          //请求错误，关闭按钮加载不关闭弹窗
          handleConfirmLoading(false);
        },
      });
    } else {
      // 添加
      dispatch({
        type: `${NAMESPACE}/add`,
        payload: { value },
        completed: () => {
          setLoading(false);
        },
        success: () => {
          // 成功后关闭弹窗和按钮加载
          handleConfirmLoading(false);
          handleShowModal(false);
        },
        onError: () => {
          //请求错误，关闭按钮加载不关闭弹窗
          handleConfirmLoading(false);
        },
      });
    }
  };

  //删除
  const handleDelete = (userId: number) => {
    console.log('@_test', 'handleDelete');
    setLoading(true);
    dispatch({
      type: `${NAMESPACE}/delete`,
      payload: { id: userId },
      completed: () => {
        setLoading(false);
      },
    });
  };

  const handleRequest = async ({
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  }): Promise<any> => {
    console.log('@_test', current, pageSize);
    const data = await getUser({
      page: current,
      per_page: pageSize,
    });
    return {
      data: data.data,
      success: true,
      total: data.meta.total,
    };
  };

  //表单跳转
  const onPageChange = (pageNumber: number, pageSize: number) => {
    console.log('@_test pageNumber', pageNumber, pageSize);
    setLoading(true);
    dispatch({
      type: `${NAMESPACE}/queryUserList`,
      payload: {
        page: pageNumber,
        per_page: pageSize,
      },
      completed: () => {
        setLoading(false);
      },
    });
  };

  // 刷新
  const handleReload = () => {
    console.log('@_test', 'reloaded');
    setLoading(true);
    dispatch({
      type: `${NAMESPACE}/queryUserList`,
      payload: {
        page: userList?.meta.page,
        per_page: userList?.meta.per_page,
      },
      completed: () => {
        setLoading(false);
      },
    });
  };

  // 表单数据
  const columns = getColumns({ handleShowModal, getRecord, handleDelete });
  return userList ? (
    <div className="list-table">
      <ProTable
        loading={loading}
        columns={columns}
        dataSource={userList.data}
        rowKey="id"
        // request={handleRequest}
        search={false}
        pagination={false}
        headerTitle="user list table"
        options={{
          reload: () => {
            handleReload();
          },
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>,
        ]}
      ></ProTable>
      <Footer
        onPageChange={onPageChange}
        total={userList.meta.total}
        currentPage={userList.meta.page}
      ></Footer>
      <UserModal
        isModalOpen={showModal}
        confirmLoading={confirmLoading}
        handleShowModal={handleShowModal}
        handleConfirmLoading={handleConfirmLoading}
        record={record}
        onFinish={onFinish}
      ></UserModal>
    </div>
  ) : (
    <Empty />
  );
};
export default connect(({ users }: any) => users)(Users);
