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

import { h } from '@stencil/core'
import { newSpecPage, SpecPage } from '@stencil/core/testing'

import { RtcRoom } from '../src/components/rtc-room/rtc-room'
import { RtcRoomItem } from '../src/components/rtc-room/rtc-room-item'
import { printUnimplementedWarning } from './utils'

const logError = jest.fn()
console.error = logError

describe('RtcRoom', () => {
  let page: SpecPage

  it('unimplemented', async () => {
    page = await newSpecPage({
      components: [RtcRoom, RtcRoomItem],
      template: () => (<taro-rtc-room-core>
        <taro-rtc-room-item-core />
        <taro-rtc-room-item-core />
        <taro-rtc-room-item-core />
        <taro-rtc-room-item-core />
      </taro-rtc-room-core>),
    })
    await page.waitForChanges()

    expect(page.root).toEqualHtml(`
      <taro-rtc-room-core>
        <taro-rtc-room-item-core></taro-rtc-room-item-core>
        <taro-rtc-room-item-core></taro-rtc-room-item-core>
        <taro-rtc-room-item-core></taro-rtc-room-item-core>
        <taro-rtc-room-item-core></taro-rtc-room-item-core>
      </taro-rtc-room-core>
    `)
    expect(logError).toHaveBeenCalledWith(printUnimplementedWarning(page.root))
  })
})
