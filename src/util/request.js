/*
 * @Author: shenjianfei
 * @Date: 2020-12-21 16:17:02
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-03-05 15:20:28
 */
import AjaxPlugin from 'axios';
// import { ElLoading } from 'element-plus';

const HOST_URL = location.protocol + '//' + location.host + '/api';

const request = (
    url,
    {
        method,
        data = {},
        isMq = false, //是否是mq服务
        isMock = false, //是否是mock接口
        response = 'json', //文件传输需要替换格式
        gateway = '', //其他服务端
    }
) => {
    return new Promise((resolve, reject) => {
        if (isMq) {
            //是mq服务
            // url = HOST_URL_MQ + gateway + url;
        } else if (isMock) {
            //mock
            // url = HOST_URL_MOCK + gateway + url;
        } else {
            url = HOST_URL + gateway + url;
        }
        if (url.indexOf('?') < 0) {
            url += '?_dt=' + Math.random();
        }

        if (
            data &&
            typeof data === 'object' &&
            (method === 'get' || method === 'delete')
        ) {
            for (const k in data) {
                // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty(k)) {
                    if (k === 'key' && (data[k] || '').indexOf("'") >= 0) {
                        data[k] = data[k].replace(/\/'/g, '');
                    }
                    url += '&' + k + '=' + data[k];
                }
            }
        }
        let ajaxResult
        if (method === 'get') {
            ajaxResult = AjaxPlugin.get(url, { responseType: response });
        } else if (method === 'delete') {
            ajaxResult = AjaxPlugin.delete(url);
        } else if (method === 'post') {
            ajaxResult = AjaxPlugin.post(url, data);
        } else if (method === 'put') {
            ajaxResult = AjaxPlugin.put(url, data);
        }

        ajaxResult
            .then(
                (r) => {
                    resolve(r.data);
                },
                (r) => {
                    reject(r.data);
                }
            )
            
    });
};

export default request;
