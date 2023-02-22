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

import { E2EPage, newE2EPage } from '@stencil/core/testing'

describe('Audio', () => {
  let page: E2EPage

  it('props', async () => {
    const src = 'http://storage.jd.com/cjj-pub-images/horse.ogv'
    const controls = true
    const loop = true
    page = await newE2EPage({
      html: `<taro-audio-core src="${src}" controls="${controls}" loop="${loop}"></taro-audio-core>`,
    })

    const el = await page.find('taro-audio-core')
    const audio = await el.find('audio')
    // expect(audio).toBeInstanceOf(HTMLAudioElement)
    expect(el.getAttribute('src')).toEqual(src)
    expect(audio).toHaveAttribute('controls')
    expect(audio).toHaveAttribute('loop')

    el.toggleAttribute('controls', false)
    el.toggleAttribute('loop', false)
    await page.waitForChanges()
    expect(audio).not.toHaveAttribute('controls')
    expect(audio).not.toHaveAttribute('loop')
  })
})
