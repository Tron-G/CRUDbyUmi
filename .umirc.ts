import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock: {},
  proxy: {
    '/api': {
      target: 'http://public-api-v1.aspirantzhang.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  routes: [
    // { path: '/', component: '@/pages/index' },
    { exact: true, path: '/', redirect: '/users' },
    { path: '/users', component: '@/pages/users/index' },
  ],
  fastRefresh: {},
  theme: {
    'primary-color': '#1DA57A',
  },
});
