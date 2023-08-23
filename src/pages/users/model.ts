import { Effect, Reducer, Subscription } from 'umi';
import { editUser, getUser, deleteUser, addUser } from './service';

interface UserModelType {
  namespace: 'users';
  state: {
    userList: {
      data?: [];
      meta?: any;
    } | null;
  };
  reducers: {
    getList: Reducer;
  };
  effects: {
    add: Effect;
    queryUserList: Effect;
    edit: Effect;
    delete: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const IndexModel: UserModelType = {
  namespace: 'users',

  state: {
    userList: null,
  },

  effects: {
    *queryUserList({ payload: { page, per_page }, completed }, { put, call }): any {
      try {
        const response = yield call(getUser, { page, per_page });
        if (response instanceof Error) {
          throw response;
        }
        if (response !== false) {
          yield put({
            type: 'getList',
            payload: response,
          });
        }
        completed?.();
      } catch (err) {
        console.log('@_test', 'query err', err);
        completed?.();
        throw err;
      }
    },

    *add({ payload: { value }, completed, success, onError }, { put, call, take, select }): any {
      try {
        const response = yield call(addUser, { value });

        // 请求结果错误，手动抛出异常
        if (response instanceof Error) {
          onError?.();
          throw response;
        }
        if (response !== false) {
          success?.();
          // 查询并更新用户列表
          const { page, per_page } = yield select((state: any) => state.users.userList.meta);
          yield put({
            type: 'queryUserList',
            payload: {
              page,
              per_page,
            },
            completed,
          });
          // 手动阻塞函数，监听到 queryUserList 方法结束再执行下一步
          yield take('queryUserList/@@end');
        } else {
          onError?.();
        }
      } catch (err) {
        console.log('@_test', 'add finally');
        //结束页面加载状态
        completed?.();
      }
    },

    *edit(
      { payload: { id, value }, completed, success, onError },
      { put, call, take, select }
    ): any {
      try {
        // 发起put请求，更新数据
        const response = yield call(editUser, { id, value });

        // 请求结果错误，手动抛出异常
        if (response instanceof Error) {
          onError?.();
          throw response;
        }
        if (response !== false) {
          success?.();
          // 查询并更新用户列表
          const { page, per_page } = yield select((state: any) => {
            // console.log('@_test', 'state', state, state.users, state.users.meta);
            return state.users.userList.meta;
          });
          yield put({
            type: 'queryUserList',
            payload: {
              page,
              per_page,
            },
            completed,
          });
          // 手动阻塞函数，监听到 queryUserList 方法结束再执行下一步
          yield take('queryUserList/@@end');
        } else {
          onError?.();
        }
      } catch (err) {
        console.log('@_test', 'edit finally');
        //结束页面加载状态
        completed?.();
      }
    },

    *delete({ payload, completed }, { put, call, take, select }): any {
      try {
        const response = yield call(deleteUser, { id: payload.id });
        // 请求结果错误，手动抛出异常
        if (response instanceof Error) {
          throw response;
        }
        if (response !== false) {
          const { page, per_page } = yield select((state: any) => state.users.userList.meta);
          yield put({
            type: 'queryUserList',
            payload: {
              page,
              per_page,
            },
          });
          yield take('queryUserList/@@end');
        }
        completed?.();
      } catch (err) {
        completed?.();
        throw err;
      }
    },
  },
  reducers: {
    //更新用户列表数据
    getList(state, { payload }) {
      console.log('@_test', 'data loaded', payload);
      return {
        ...state,
        userList: payload,
      };
    },
  },
  subscriptions: {
    //监听路由跳转，发起网络请求
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'queryUserList',
            payload: {
              page: 1,
              per_page: 10,
            },
          });
        }
      });
    },
  },
};

export default IndexModel;
