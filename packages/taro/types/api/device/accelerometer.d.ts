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

import Taro from '../../index'

declare module '../../index' {
  namespace startAccelerometer {
    type Option = {
      /**
       * 监听加速度数据回调函数的执行频率
       * @default "normal"
       */
      interval?: keyof Interval
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }

    type Interval = {
      /** 适用于更新游戏的回调频率，在 20ms/次 左右 */
      game: 'game',
      /** 适用于更新 UI 的回调频率，在 60ms/次 左右 */
      ui: 'ui',
      /** 普通的回调频率，在 200ms/次 左右 */
      normal: 'normal'
    }
  }

  namespace stopAccelerometer {
    type Option = {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }
  }

  namespace onAccelerometerChange {
    type Callback = (res: Result) => void
    type Result = {
      /** X 轴 */
      x: number
      /** Y 轴 */
      y: number
      /** Z 轴 */
      z: number
    }
  }

  interface TaroStatic {
    /**
     * 开始监听加速度数据。
     * @example
     * ```tsx
     * Taro.startAccelerometer({ interval: 'game' })
     * ```
     * @supported weapp, h5, rn, tt
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.startAccelerometer.html
     */
    startAccelerometer (res?: startAccelerometer.Option): Promise<TaroGeneral.CallbackResult>

    /**
     * 停止监听加速度数据。
     * @example
     * ```tsx
     * Taro.stopAccelerometer()
     * ```
     * @supported weapp, h5, rn, tt
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.stopAccelerometer.html
     */
    stopAccelerometer (res?: stopAccelerometer.Option): Promise<TaroGeneral.CallbackResult>

    /**
     * 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 `Taro.stopAccelerometer` 停止监听。
     * @supported weapp, h5, rn, tt
     * @example
     * ```tsx
     * Taro.onAccelerometerChange(res => {
     *   console.log(res.x)
     *   console.log(res.y)
     *   console.log(res.z)
     * })
     * ```
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.onAccelerometerChange.html
     */
    onAccelerometerChange (callback: onAccelerometerChange.Callback): void

    /**
     * 取消监听加速度数据事件，参数为空，则取消所有的事件监听。
     * @supported weapp, h5, rn
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.offAccelerometerChange.html
     */
    offAccelerometerChange(
      /** 加速度数据事件的回调函数 */
      callback?: (...args: any[]) => any,
    ): void
  }
}
