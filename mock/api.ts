const user_data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const mock_data = {
  data: [
    {
      id: 14167,
      name: '帅哥',
      email: '@222',
      create_time: '2022-07-09T21:39:17Z',
      update_time: '2023-08-10T12:53:21Z',
      status: 127,
    },
    {
      id: 14166,
      name: 'mhzzzzz',
      email: '@222',
      create_time: '2022-07-11T05:39:17Z',
      update_time: '2023-08-10T12:54:05Z',
      status: 0,
    },
    {
      id: 14157,
      name: 'mhzzz43',
      email: '@222',
      create_time: '2022-07-10T21:39:16Z',
      update_time: '2023-08-13T11:25:20Z',
      status: 0,
    },
    {
      id: 14155,
      name: 'mhzzzzz11',
      email: '@222',
      create_time: '2022-07-11T05:39:16Z',
      update_time: '2022-07-11T05:39:16Z',
      status: 0,
    },
    {
      id: 14154,
      name: 'mhzzzzz11',
      email: '@222',
      create_time: '2022-07-11T05:39:16Z',
      update_time: '2022-07-11T05:39:16Z',
      status: 0,
    },
    {
      id: 14146,
      name: 'mhzweqe',
      email: '@222',
      create_time: '2022-07-10T21:39:15Z',
      update_time: '2023-08-15T13:12:55Z',
      status: 0,
    },
    {
      id: 14131,
      name: 'mhzzzzz11',
      email: '@222',
      create_time: '2022-07-11T05:39:14Z',
      update_time: '2022-07-11T05:39:14Z',
      status: 0,
    },
    {
      id: 14120,
      name: 'mhzzzzz11',
      email: '@222',
      create_time: '2022-07-11T05:39:14Z',
      update_time: '2022-07-11T05:39:14Z',
      status: 0,
    },
    {
      id: 14119,
      name: 'mhzzzzz11',
      email: '@222',
      create_time: '2022-07-11T05:39:14Z',
      update_time: '2022-07-11T05:39:14Z',
      status: 0,
    },
    {
      id: 14117,
      name: 'mhzzzzz11',
      email: '@222',
      create_time: '2022-07-11T05:39:14Z',
      update_time: '2022-07-11T05:39:14Z',
      status: 0,
    },
  ],
  meta: { total: 899, per_page: 10, page: 1 },
};

export default {
  'GET /mock/getUserList': {
    status: 'success',
    data: user_data,
  },
  'POST /mock/create': (req, res) => {
    setTimeout(() => {
      res.send({
        status: 'success',
        data: [1, 2, 3],
      });
    }, 2000);
  },
};
