import axios from 'axios'
import {Message} from 'element-ui'
import {getCookie} from '../utils/cookie'

// 请求拦截器
axios.interceptors.request.use(config => {
    // 如果存在token，则后续请求携带此token
    if(getCookie('tokenStr')){
        config.headers['Authorization'] = getCookie('tokenStr')
    } else if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
}, error => {
    console.log(error);
})

//响应拦截器
axios.interceptors.response.use(success => {
    console.log("111",success)
    let data = success.data
    if (data.code == 200){
        Message.success({ message: data.msg })
        return data;
    } else {
        Message.error({ message: data.msg })
        return data;
    }
}, error => {
    console.log("222",error)
    if (error.response.code != 200) {
        Message.error({ message: success.data.msg })
        return error.data;
    }
    return;
})

const baseUrl = '';
// 传送JSON格式的POST请求
export const postRequest = (url, params,config) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}${url}`, params,config).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}
// GET请求
export const getRequest = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}${url}`, {
            params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}


// 传送json格式的put请求
export const putRequest = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.put(`${baseUrl}${url}`, params).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

// delete请求
export const deleteRequest = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}${url}`, {
            params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}