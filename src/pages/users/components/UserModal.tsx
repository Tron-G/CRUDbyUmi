import { Modal } from 'antd';
import { DataType } from '../typings';
import React, { useEffect, useRef } from 'react';
import PopupFrom from './PopupFrom';

interface IUserModelProps {
  isModalOpen: boolean;
  confirmLoading: boolean;
  handleShowModal: (isShow: boolean) => void;
  handleConfirmLoading: (isloading: boolean) => void;
  record: DataType | null;
  onFinish: (value: any) => void;
}

const UserModal: React.FC<IUserModelProps> = (props) => {
  const {
    isModalOpen,
    confirmLoading,
    handleShowModal,
    handleConfirmLoading,
    record,
    onFinish,
  } = props;
  const formRef = useRef<any>(null);

  const handleOk = () => {
    //先进行表单验证
    const res = formRef?.current?.onValidateFields?.();
    if (res instanceof Promise) {
      res
        .then((value) => {
          // 成功后开启按钮加载并提交
          handleConfirmLoading(true);
          formRef?.current?.onSubmit?.();
          // handleShowModal(false);
        })
        .catch((err) => {
          console.log('@_test', 'input form err', err);
        });
    }
  };
  const handleCancel = () => {
    handleShowModal(false);
  };

  return (
    <Modal
      title={record?.id ? `Edit ID: ${record.id}` : 'Add User'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      forceRender
    >
      <PopupFrom record={record} onRef={formRef} onFinish={onFinish}></PopupFrom>
    </Modal>
  );
};

export default UserModal;
