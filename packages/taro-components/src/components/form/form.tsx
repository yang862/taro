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

import { Component, h, ComponentInterface, Event, EventEmitter, Element, Listen } from '@stencil/core'

@Component({
  tag: 'taro-form-core'
})
export class Form implements ComponentInterface {
  private form: HTMLFormElement
  private value: {[propName: string]: any} = {}
  private originalAppendChild: <T extends Node>(newChild: T) => T
  private originalInsertBefore: <T extends Node>(newChild: T, refChild: Node | null) => T
  private originalReplaceChild: <T extends Node>(newChild: Node, oldChild: T) => T
  private originalRemoveChild: <T extends Node>(oldChild: T) => T

  @Element() el: HTMLElement

  @Event({
    eventName: 'submit'
  }) onSubmit: EventEmitter

  @Listen('tarobuttonsubmit')
  onButtonSubmit (e: Event) {
    e.stopPropagation()

    this.value = this.getFormValue()

    this.onSubmit.emit({
      value: this.value
    })
  }

  @Listen('tarobuttonreset')
  onButtonReset (e: Event) {
    e.stopPropagation()
    this.form.reset()
  }

  componentDidLoad () {
    this.value = this.getFormValue()

    Object.defineProperty(this.el, 'value', {
      get: () => this.value,
      configurable: true
    })
  }

  componentDidRender () {
    if (!this.originalAppendChild) {
      this.originalAppendChild = this.el.appendChild
      this.originalInsertBefore = this.el.insertBefore
      this.originalReplaceChild = this.el.replaceChild
      this.originalRemoveChild = this.el.removeChild
    }
    if (!this.form) {
      this.el.appendChild = this.originalAppendChild
      this.el.insertBefore = this.originalInsertBefore
      this.el.replaceChild = this.originalReplaceChild
      this.el.removeChild = this.originalRemoveChild
      return
    }
    this.el.appendChild = <T extends Node>(newChild: T): T => {
      return this.form.appendChild(newChild)
    }
    this.el.insertBefore = <T extends Node>(newChild: T, refChild: Node | null): T => {
      return this.form.insertBefore(newChild, refChild)
    }
    this.el.replaceChild = <T extends Node>(newChild: Node, oldChild: T): T => {
      return this.form.replaceChild(newChild, oldChild)
    }
    this.el.removeChild = <T extends Node>(oldChild: T): T => {
      return this.form.removeChild(oldChild)
    }
  }

  getFormValue () {
    const el = this.el
    const elements: HTMLInputElement[] = []
    const tagElements = el.getElementsByTagName('input')
    for (let j = 0; j < tagElements.length; j++) {
      elements.push(tagElements[j])
    }
    const formItem = {}
    const hash = {}
    elements.forEach(item => {
      if (typeof item.name !== 'string') return
      if (item.className.indexOf('weui-switch') !== -1) {
        formItem[item.name] = item.checked
        return
      }
      if (item.type === 'radio') {
        if (item.checked) {
          hash[item.name] = true
          formItem[item.name] = item.value
        } else {
          if (!hash[item.name]) {
            formItem[item.name] = ''
          }
        }
        return
      }

      if (item.type === 'checkbox') {
        if (item.checked) {
          if (hash[item.name]) {
            formItem[item.name].push(item.value)
          } else {
            hash[item.name] = true
            formItem[item.name] = [item.value]
          }
        } else {
          if (!hash[item.name]) {
            formItem[item.name] = []
          }
        }
        return
      }
      formItem[item.name] = item.value
    })

    const textareaElements = el.getElementsByTagName('textarea')
    const textareaEleArr: HTMLTextAreaElement[] = []

    for (let i = 0; i < textareaElements.length; i++) {
      textareaEleArr.push(textareaElements[i])
    }
    textareaEleArr.forEach(v => {
      if (typeof v.name !== 'string') return
      formItem[v.name] = v.value
    })
    return formItem
  }

  render () {
    return (
      <form
        ref={dom => {
          this.form = dom!
        }}
      >
        <slot />
      </form>
    )
  }
}
