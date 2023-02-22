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

import Taro from '@tarojs/taro'
import { parsePath } from 'history'

import { history, prependBasename } from './history'
import { RouterConfig } from './router'
import stacks from './router/stack'
import { addLeadingSlash, routesAlias } from './utils'

import type { NavigateBackOption, Option } from '../types/api'

type MethodName = 'navigateTo' | 'navigateBack' | 'switchTab' | 'redirectTo' | 'reLaunch'

function processNavigateUrl (option: Option) {
  const pathPieces = parsePath(option.url)

  // 处理相对路径
  if (pathPieces.pathname?.includes('./')) {
    const parts = routesAlias.getOrigin(history.location.pathname).split('/')
    parts.pop()
    pathPieces.pathname.split('/').forEach((item) => {
      if (item === '.') {
        return
      }
      item === '..' ? parts.pop() : parts.push(item)
    })
    pathPieces.pathname = parts.join('/')
  }

  // 处理自定义路由
  pathPieces.pathname = routesAlias.getAlias(addLeadingSlash(pathPieces.pathname))

  // 处理 basename
  pathPieces.pathname = prependBasename(pathPieces.pathname)

  // hack fix history v5 bug: https://github.com/remix-run/history/issues/814
  if (!pathPieces.search) pathPieces.search = ''

  return pathPieces
}

async function navigate (option: Option | NavigateBackOption, method: MethodName) {
  return new Promise<TaroGeneral.CallbackResult>((resolve, reject) => {
    stacks.method = method
    const { success, complete, fail } = option
    const unListen = history.listen(() => {
      const res = { errMsg: `${method}:ok` }
      success?.(res)
      complete?.(res)
      resolve(res)
      unListen()
    })

    try {
      if ('url' in option) {
        const pathPieces = processNavigateUrl(option)
        const state = { timestamp: Date.now() }
        if (method === 'navigateTo') {
          history.push(pathPieces, state)
        } else if (method === 'redirectTo' || method === 'switchTab') {
          history.replace(pathPieces, state)
        } else if (method === 'reLaunch') {
          stacks.delta = stacks.length
          history.replace(pathPieces, state)
        }
      } else if (method === 'navigateBack') {
        stacks.delta = option.delta
        history.go(-option.delta)
      }
    } catch (error) {
      const res = { errMsg: `${method}:fail ${error.message || error}` }
      fail?.(res)
      complete?.(res)
      reject(res)
    }
  })
}

export function navigateTo (option: Taro.navigateTo.Option): ReturnType<typeof Taro.navigateTo> {
  return navigate(option, 'navigateTo')
}

export function redirectTo (option: Taro.redirectTo.Option): ReturnType<typeof Taro.redirectTo> {
  return navigate(option, 'redirectTo')
}

export function navigateBack (option: Taro.navigateBack.Option = { delta: 1 }): ReturnType<typeof Taro.navigateBack> {
  if (!option.delta || option.delta < 1) {
    option.delta = 1
  }
  return navigate(option as NavigateBackOption, 'navigateBack')
}

export function switchTab (option: Taro.switchTab.Option): ReturnType<typeof Taro.switchTab> {
  return navigate(option, 'switchTab')
}

export function reLaunch (option: Taro.reLaunch.Option): ReturnType<typeof Taro.reLaunch> {
  return navigate(option, 'reLaunch')
}

export function getCurrentPages (): Taro.Page[] {
  if (process.env.NODE_ENV !== 'production' && RouterConfig.mode === 'multi') {
    console.warn('多页面路由模式不支持使用 getCurrentPages 方法！')
  }
  const pages = stacks.get()
  return pages.map(e => ({ ...e, route: e.path?.replace(/\?.*/g, '') || '' }))
}
