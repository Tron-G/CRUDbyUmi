import React, { ReactNode, useEffect, useImperativeHandle } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Input, DatePicker, Switch } from 'antd';
import { DataType } from '../typings';
import moment from 'moment';

interface IFormProps {
  record: DataType | null;
  onRef: any;
  onFinish: (value: any) => void;
}

const PopupFrom: React.FC<IFormProps> = (props) => {
  const { record, onRef, onFinish } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    // id不存在代表是添加用户需要清空表单
    if (record?.id) {
      form.setFieldsValue({
        ...record,
        create_time: moment(record.create_time),
        status: Boolean(record.status),
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        ...record,
        status: Boolean(record?.status),
      });
    }
  }, [record]);

  // 提交表单
  const onSubmit = () => {
    form.submit();
  };

  //表单验证
  const onValidateFields = () => {
    return form.validateFields();
  };

  //向父组件暴露表单提交、表单验证
  useImperativeHandle(onRef, () => ({ onSubmit, onValidateFields }));

  const getFormItem = (key: string) => {
    const label_name = key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase();
    const hidden_item = ['id', 'update_time'].includes(key);

    let inner_item = <Input />;
    if (key === 'create_time') {
      inner_item = <DatePicker showTime style={{ width: '100%' }} />;
    } else if (key === 'status') {
      inner_item = (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      );
    }
    //批量传递props
    const config: any = {
      label: label_name,
      name: key,
      key: key,
      hidden: hidden_item,
      rules: [{ required: true, message: `Please input ${key}` }],
    };
    if (key === 'status') {
      config['valuePropName'] = 'checked';
    }
    return <Form.Item {...config}>{inner_item}</Form.Item>;
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      // initialValues={record ? record : {}}
      onFinish={onFinish}
      onFinishFailed={() => {}}
      autoComplete="off"
    >
      {record && Object.keys(record).map((key) => getFormItem(key))}
    </Form>
  );
};

export default PopupFrom;
