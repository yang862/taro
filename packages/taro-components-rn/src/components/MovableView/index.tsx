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
import { PanResponder, Animated, LayoutChangeEvent } from 'react-native'
import View from '../View'
import { AnimatedValueProps, MovableViewProps } from './PropsType'

class _MovableView extends React.Component<MovableViewProps, any> {
  static defaultProps = {
    direction: 'none',
    disabled: false,
    animation: true
  }

  panResponder: any
  $ref: any = React.createRef()
  W: any
  H: any
  constructor(props: MovableViewProps) {
    super(props)
    this.state = {
      pan: new Animated.ValueXY(),
      xOffset: 0,
      yOffset: 0
    }
    const { x = 0, y = 0 } = props
    Animated.spring(this.state.pan, {
      toValue: { x: Number(x), y: Number(y) },
      useNativeDriver: false
    }).start()
    this.createPanResponder()
  }

  createPanResponder = (): void => {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => !this.props.disabled,
      onMoveShouldSetPanResponderCapture: () => !this.props.disabled,
      onPanResponderGrant: () => {
        const { pan } = this.state
        const { direction } = this.props
        pan.setOffset({
          x: direction === 'all' || direction === 'horizontal' ? pan.x._value : 0,
          y: direction === 'all' || direction === 'vertical' ? pan.y._value : 0
        })
        this.props.onDragStart?.()
      },
      onPanResponderMove: (e, gestureState) => {
        const { pan } = this.state
        const { direction } = this.props
        Animated.event(
          [
            null,
            {
              dx: direction === 'all' || direction === 'horizontal' ? this.state.pan.x : new Animated.Value(0),
              dy: direction === 'all' || direction === 'vertical' ? this.state.pan.y : new Animated.Value(0),
            }
          ],
          {
            useNativeDriver: false
          }
        )(e, gestureState)
        this.props.onChange?.({
          x: pan.x,
          y: pan.y,
          source: 'touch'
        })
      },
      onPanResponderRelease: () => {
        const { pan } = this.state
        const { layout = { width: 0, height: 0 } } = this.props
        this.state.pan.flattenOffset()
        const x = pan.x._value > layout.width - this.W ? layout.width - this.W : pan.x._value < 0 ? 0 : pan.x._value
        const y = pan.y._value > layout.height - this.H ? layout.height - this.H : pan.y._value < 0 ? 0 : pan.y._value
        const needChange = x !== pan.x._value || y !== pan.y._value
        Animated.spring(this.state.pan, {
          toValue: { x: x, y: y },
          useNativeDriver: false
        }).start(() => {
          if (needChange) {
            this.props.onChange?.({
              x,
              y,
              source: 'friction'
            })
          }
        })
        this.props.onDragEnd?.()
      }
    })
  }

  componentDidMount(): void {
    const { pan } = this.state
    const { onMove } = this.props
    if (typeof onMove === 'function') pan.addListener((values: AnimatedValueProps) => onMove(values))
  }

  componentWillUnmount(): void {
    const { pan } = this.state
    pan.removeAllListeners()
  }

  _onLayout = (event: LayoutChangeEvent): void => {
    const { width, height } = event.nativeEvent.layout
    this.W = width
    this.H = height
  }

  render(): JSX.Element {
    const { style } = this.props
    return (
      <Animated.View testID="movableView" ref={this.$ref} onLayout={this._onLayout} {...this.panResponder.panHandlers} style={[{
        alignSelf: 'flex-start'
      }, style, this.state.pan.getLayout()]}>
        <View>{this.props.children}</View>
      </Animated.View>
    )
  }
}

export default _MovableView
