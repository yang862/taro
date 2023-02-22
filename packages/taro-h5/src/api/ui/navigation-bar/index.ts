/* 
 *  MIT License
 *  
 *  Copyright (c) 2018 O2Team
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 */

import Taro from '@tarojs/api'
import { setTitle } from '@tarojs/router/dist/utils/navigate'

import { getParameterError, shouldBeObject, temporarilyNotSupport } from '../../../utils'
import { MethodHandler } from '../../../utils/handler'

// 导航栏
export const showNavigationBarLoading = temporarilyNotSupport('showNavigationBarLoading')

export function setNavigationBarTitle (options?: Taro.setNavigationBarTitle.Option) {
  // options must be an Object
  const isObject = shouldBeObject(options)
  if (!isObject.flag) {
    const res = { errMsg: `setNavigationBarTitle:fail ${isObject.msg}` }
    console.error(res.errMsg)
    return Promise.reject(res)
  }

  const { title, success, fail, complete } = options as Exclude<typeof options, undefined>
  const handle = new MethodHandler({ name: 'setNavigationBarTitle', success, fail, complete })

  if (!title || typeof title !== 'string') {
    return handle.fail({
      errMsg: getParameterError({
        para: 'title',
        correct: 'String',
        wrong: title
      })
    })
  }

  setTitle(title)

  return handle.success()
}

/**
 * 设置页面导航条颜色
 */
export const setNavigationBarColor: typeof Taro.setNavigationBarColor = (options) => {
  const { backgroundColor, success, fail, complete } = options
  const handle = new MethodHandler({ name: 'setNavigationBarColor', success, fail, complete })
  const meta = document.createElement('meta')
  meta.setAttribute('name', 'theme-color')
  meta.setAttribute('content', backgroundColor)
  document.head.appendChild(meta)
  return handle.success()
}

export const hideNavigationBarLoading = temporarilyNotSupport('hideNavigationBarLoading')
export const hideHomeButton = temporarilyNotSupport('hideHomeButton')
