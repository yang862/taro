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

import { isUrlRequest, urlToRequest } from 'loader-utils'
import sax from 'sax'

export default function miniTemplateLoader (source) {
  this.cacheable && this.cacheable()
  /**
   * 两种fix方案：
   * 1. 用任意xml标签包裹source，使之变成较标准的xml格式（含有一个根节点）
   * 2. 修改 sax.parser 的第一个参数为 true，启用严格模式
   *    2.1 该模式下小程序模板中的标签或属性不会处理（例如写入<Import SrC="..." />不会处理成<import src="..." />，而是保持原样
   *    2.2 该模式将认为传入的xml为非标准的，无需标准化，且不按照以根节点模式处理，因此可以正常解析小程序模板
   *
   * 推荐方案1，这样在构建时会正常打入需要的包，但是若用户有 SrC 类似的写法导致引用失败，则可直接修正，不会认为是打包出现了问题
   **/
  const sourceWithRoot = `<root>${source}</root>`
  const parser = sax.parser(false, { lowercase: true })
  const requests: Set<string> = new Set()
  const callback = this.async()
  const loadModule = request => this.importModule(request)

  parser.onattribute = ({ name, value }) => {
    if (value && name === 'src' && isUrlRequest(value)) {
      const request = urlToRequest(value)
      requests.add(request)
    }
  }
  parser.onend = async () => {
    try {
      const requestsArray = Array.from(requests)
      if (requestsArray.length) {
        for (let i = 0; i < requestsArray.length; i++) {
          await loadModule(requestsArray[i])
        }
      }
      callback(null, source)
    } catch (error) {
      callback(error, source)
    }
  }
  parser.write(sourceWithRoot).close()
}
