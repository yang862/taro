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
import { AnyHTMLElement } from '@stencil/core/internal'
import { newSpecPage, SpecPage } from '@stencil/core/testing'

import { Slider } from '../src/components/slider/slider'

describe('Slider', () => {
  let page: SpecPage

  it('should be max', async () => {
    const max = 200
    const current = 300
    page = await newSpecPage({
      components: [Slider],
      template: () => (<taro-slider-core
        max={max}
        value={current}
      />),
    })
    await page.waitForChanges()

    expect(page.root?.value).toEqual(max)

    expect(page.root).toMatchSnapshot()
  })

  it('should be min', async () => {
    const min = 50
    const current = 0
    page = await newSpecPage({
      components: [Slider],
      template: () => (<taro-slider-core
        min={min}
        value={current}
      />),
    })

    expect(page.root?.value).toEqual(min)

    expect(page.root).toMatchSnapshot()
  })

  it('steps', async () => {
    page = await newSpecPage({
      components: [Slider],
      template: () => (<taro-slider-core min={50} max={200} step={2} value={79} />),
    })
    const track = page.root?.querySelector<AnyHTMLElement>('.weui-slider__track')
    const handler = page.root?.querySelector<AnyHTMLElement>('.weui-slider__handler')

    expect(page.root?.value).toEqual(80)
    expect(track?.style.width).toEqual('20%')
    expect(handler?.style.left).toEqual('20%')

    expect(page.root).toMatchSnapshot()
  })

  it('events', async () => {
    const onChange = jest.fn()
    const onChanging = jest.fn()
    page = await newSpecPage({
      components: [Slider],
      template: () => (<taro-slider-core onChange={onChange} onChanging={onChanging} />),
    })

    const inner = page.root?.querySelector<AnyHTMLElement>('.weui-slider__inner')
    const handler = page.root?.querySelector<AnyHTMLElement>('.weui-slider__handler')
    const innerWidth = inner?.getBoundingClientRect().width || 0
    const rect = handler?.getBoundingClientRect() || { left: 0, right: 0 }
    const centerPoint = (rect.left + rect.right) / 2

    await page.waitForChanges()
    handler?.dispatchEvent(new Event('touchstart', {
      // @ts-ignore
      targetTouches: [{
        identifier: 0,
        target: handler,
        pageX: centerPoint
      }]
    }))

    handler?.dispatchEvent(new Event('touchmove', {
      // @ts-ignore
      targetTouches: [{
        identifier: 0,
        target: handler,
        pageX: centerPoint + innerWidth / 2
      }]
    }))

    handler?.dispatchEvent(new Event('touchend'))

    const step = 0 // 50
    expect(onChanging).toBeCalledTimes(1)
    expect(onChanging.mock.instances[0].value).toEqual(step)
    expect(page.root?.value).toEqual(step)

    expect(page.root).toMatchSnapshot()
  })
})
