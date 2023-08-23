import { Space, Tag, Popconfirm, Switch } from 'antd';
import { DataType } from './typings';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
interface IFields {
  handleShowModal: (isShow: boolean) => void;
  getRecord: (record: DataType) => void;
  handleDelete: (userId: number) => void;
}

const getColumns = ({
  handleShowModal,
  getRecord,
  handleDelete,
}: IFields): ProColumns<DataType>[] => {
  const handleEdit = (record: DataType) => {
    handleShowModal(true);
    getRecord(record);
  };

  const onComfirm = (id: number) => {
    handleDelete(id);
  };

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      valueType: 'digit',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      valueType: 'text',
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      valueType: 'switch',
      render: (_, record) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            disabled={true}
            checked={Boolean(record.status)}
          />
        );
      },
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      valueType: 'option',
      render: (_, record) => [
        <a onClick={() => handleEdit(record)} key={'edit'}>
          Edit
        </a>,
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => onComfirm(record.id as number)}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
          key={'delete'}
        >
          <a>Delete</a>
        </Popconfirm>,
      ],
    },
  ];
};

export default getColumns;
