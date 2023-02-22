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

import * as React from 'react'
import { View, LayoutChangeEvent } from 'react-native'
import { MovableAreaProps } from './PropsType'

class _MovableArea extends React.Component<MovableAreaProps, any> {
  static defaultProps = {}
  constructor(props: MovableAreaProps) {
    super(props)
    this.state = {
      width: this.props.width || 100,
      height: this.props.height || 100,
    }
  }

  _onLayout = (event: LayoutChangeEvent): void => {
    const { width, height } = event.nativeEvent.layout
    this.setState({
      width,
      height,
    })
  }

  render(): JSX.Element {
    const { style } = this.props
    const { width, height } = this.state
    return <View style={[{ height, width, overflow: 'hidden' }, style]} testID='moveableArea' onLayout={this._onLayout}>
      {React.cloneElement(this.props.children, { layout: { width, height } })}
    </View>
  }
}

export default _MovableArea
