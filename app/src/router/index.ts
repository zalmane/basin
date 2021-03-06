import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/pages/Editor.vue'
import DataFrameViewerDriver from '@/pages/DataFrameViewerDriver.vue'
import BlockPickerDriver from '@/pages/BlockPickerDriver.vue'
import FlowIndex from '@/pages/flow/Index.vue'
import catalogRoutes from '@/pages/catalog/routes'
import connectorRoutes from '@/pages/connector/routes'
import driverRoutes from '@/pages/driver/routes'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: FlowIndex
    },
    ...catalogRoutes,
    ...connectorRoutes,
    ...driverRoutes,
    {
      path: '/flow/:id',
      name: 'flow_edit',
      component: Editor
    },
    {
      path: '/flow/create',
      name: 'flow_create',
      component: Editor
    },
    {
      path: '/flow',
      name: 'flow_index',
      component: FlowIndex
    },
    {
      path: '/driver/df',
      name: 'driver_df',
      component: DataFrameViewerDriver
    },
    {
      path: '/driver/blockpicker',
      name: 'driver_blockpicker',
      component: BlockPickerDriver
    },
  ]
})