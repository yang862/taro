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

import AsyncStorage from '@react-native-async-storage/async-storage'
import { errorHandler, successHandler } from '../../utils'

export async function setStorage(option: Taro.setStorage.Option): Promise<TaroGeneral.CallbackResult> {
  const { key, data, success, fail, complete } = option
  const res = { errMsg: 'setStorage:ok' }

  try {
    await AsyncStorage.setItem(key, JSON.stringify(data))
    return successHandler(success, complete)(res)
  } catch (err) {
    res.errMsg = err.message
    return errorHandler(fail, complete)(res)
  }
}
