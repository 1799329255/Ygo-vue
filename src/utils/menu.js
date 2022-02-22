import { getRequest } from '@/utils/api';

/**
 * 初始化路由
 * @param router
 * @param store
 * @param first
 */
 export const initMenu = (router, store) => {
    return new Promise((resolve, reject) => {
      if (store.state.routes.length > 0) {
        resolve(true)
        return
      }
      getRequest('/tMenu/getTMenuListByTAdminId')
        .then(res => {
          let data = res.data
          if (data) {
            console.log(data)
            // 获取格式化后的路由
            let fmtRoutes = formatRoutes(data)
            // 添加到router中
            fmtRoutes.forEach(route => {
              console.log(data)
              router.addRoute(route)
            })
            // 将数据存入store
            store.commit('initRoutes', fmtRoutes)
            resolve(true)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  
  /**
   * 格式化路由
   * @param routes
   * @returns {*[]}
   */
  const formatRoutes = routes => {
    let fmtRoutes = []
    routes.forEach(router => {
      let { path, component, name, iconcls, tMenuList } = router
      let comp = null
      if (tMenuList && tMenuList instanceof Array) {
        tMenuList = formatRoutes(tMenuList)
      }
  
      if (component === 'Home') {
        comp = () => import('@/views/Home')
      } else {
        comp = () =>
          import(
            '@/views/' +
              component
                .toString()
                .toLowerCase()
                .substring(0, 3) +
              '/' +
              component
          )
      }
      let fmtRouter = {
        path: path,
        name: name,
        iconcls: iconcls,
        tMenuList: tMenuList,
        component: comp
      }
      fmtRoutes.push(fmtRouter)
    })
    return fmtRoutes
  }
  