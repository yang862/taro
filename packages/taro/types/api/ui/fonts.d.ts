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
  namespace loadFontFace {
    interface Option {
      /** 是否全局生效
       * @default false
       */
      global?: boolean,
      /** 定义的字体名称 */
      family: string
      /** 字体资源的地址。建议格式为 TTF 和 WOFF，WOFF2 在低版本的 iOS 上会不兼容。 */
      source: string
      /** 可选的字体描述符 */
      desc?: DescOption
      /** 接口调用成功的回调函数 */
      success?: (res: CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: CallbackResult) => void
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: CallbackResult) => void
    }

    interface CallbackResult extends TaroGeneral.CallbackResult {
      /** 加载字体结果 */
      status: string
    }
    /** 可选的字体描述符 */
    interface DescOption {
      /** @supported h5 */
      ascentOverride?: string
      /** @supported h5 */
      descentOverride?: string
      /** @supported h5 */
      featureSettings?: string
      /** @supported h5 */
      lineGapOverride?: string
      /** @supported h5 */
      stretch?: string
      /** 字体样式，可选值为 normal / italic / oblique */
      style?: string
      /** @supported h5 */
      unicodeRange?: string
      /** 设置小型大写字母的字体显示文本，可选值为 normal / small-caps / inherit */
      variant?: string
      /** @supported h5 */
      variationSettings?: string
      /** 字体粗细，可选值为 normal / bold / 100 / 200../ 900 */
      weight?: string
    }
  }

  interface TaroStatic {
    /** 动态加载网络字体。文件地址需为下载类型。iOS 仅支持 https 格式文件地址。
     *
     * 注意：
     * 1. 字体文件返回的 contet-type 参考 [font](https://www.iana.org/assignments/media-types/media-types.xhtml#font)，格式不正确时会解析失败。
     * 2. 字体链接必须是https（ios不支持http)
     * 3. 字体链接必须是同源下的，或开启了cors支持，小程序的域名是`servicewechat.com`
     * 4. canvas等原生组件不支持使用接口添加的字体
     * 5. 工具里提示 Faild to load font可以忽略
     * @supported weapp, h5
     * @h5 不支持 global (默认全局加载)
     * @example
     * ```tsx
     * Taro.loadFontFace({
     *   family: 'Bitstream Vera Serif Bold',
     *   source: 'url("https://sungd.github.io/Pacifico.ttf")',
     *   success: console.log
     * })
     * ```
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html
     */
    loadFontFace(option: loadFontFace.Option): Promise<loadFontFace.CallbackResult>
  }
}
