import request from 'umi-request';
import { message } from 'antd';
import { DataType } from './typings';

const errorHandler = function (error: any, err_info: string) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.status);
    // console.log(error.response.headers);
    // console.log(error.data);
    // console.log(error.request);
    if (error.response.status > 400) {
      const err_body = error.data?.message ? error.data.message : error.data;
      message.error(`${err_info} - ${err_body}`, 5);
    }
    return false;
  } else {
    // 发出请求但是未收到结果，一般是网络错误
    message.error('network error!');
    throw error; // If throw. The error will continue to be thrown.
  }
};

export const getUser = ({ page, per_page }: { page: number; per_page: number }) =>
  request(`/api/users?page=${page}&per_page=${per_page}`, {
    method: 'GET',
  })
    .then((res) => {
      message.success('加载成功');
      console.log('@_test', 'okk', res);
      return res;
    })
    .catch((err) => {
      console.log('@_test', 'service get err');
      // console.log(typeof err, JSON.stringify(err));
      return errorHandler(err, '加载失败');
    });

export const editUser = ({ id, value }: { id: number; value: DataType }) => {
  return request(`/api/users/${id}`, {
    method: 'PUT',
    data: value,
  })
    .then((res) => {
      message.success('编辑成功');
      return true;
    })
    .catch((err) => {
      console.log('@_test', 'service edit err');
      return errorHandler(err, '编辑失败');
    });
};

export const addUser = ({ value }: { value: DataType }) => {
  return request(`/api/users`, {
    method: 'POST',
    data: value,
  })
    .then((res) => {
      message.success('添加成功');
      return true;
    })
    .catch((err) => {
      console.log('@_test', 'service add err');
      return errorHandler(err, '添加失败');
    });
};

export const deleteUser = ({ id }: { id: number }) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(id);
  //   }, 2000);
  // }).then((res) => {
  //   // console.log('@_test', 'okk');
  // });
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      message.success('删除成功');
      return true;
    })
    .catch((err) => {
      return errorHandler(err, '删除失败');
    });
};

export const createUser = (data: any) => {
  request('/mock/create', {
    method: 'POST',
    data,
  });
};
