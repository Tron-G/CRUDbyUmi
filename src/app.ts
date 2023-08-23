import { message } from 'antd';

export const dva = {
  config: {
    onError(e: any) {
      e.preventDefault();
      message.error('uncatched error');
      // console.error(e.message);
    },
  },
};
