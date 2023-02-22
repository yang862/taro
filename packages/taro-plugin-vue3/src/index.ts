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

import { fs, VUE_EXT } from '@tarojs/helper'
import { isString } from '@tarojs/shared'
import { capitalize, internalComponents, toCamelCase } from '@tarojs/shared/dist/template'

import { modifyH5WebpackChain } from './webpack.h5'
import { modifyMiniWebpackChain } from './webpack.mini'

import type { IPluginContext } from '@tarojs/service'

type CompilerOptions = {
  isCustomElement: (tag: string) => boolean
  whitespace: 'condense' | 'preserve'
  delimiters: string[]
  comments: boolean
  nodeTransforms: ((...args: any) => void)[]
}

interface IComponentConfig {
  includes: Set<string>
}

interface OnParseCreateElementArgs {
  nodeName: string
  componentConfig: IComponentConfig
}

export interface IConfig {
  mini?: {
    compilerOptions: CompilerOptions
  }
  vueLoaderOption?: {
    compilerOptions: CompilerOptions
    [key: string]: any
  }
}

let isBuildH5

export default (ctx: IPluginContext, config: IConfig = {}) => {
  const { framework } = ctx.initialConfig
  if (framework !== 'vue3') return

  isBuildH5 = process.env.TARO_ENV === 'h5'

  ctx.modifyWebpackChain(({ chain, data }) => {
    // 通用
    if (process.env.NODE_ENV !== 'production') {
      setAlias(chain)
    }
    setDefinePlugin(chain)

    if (isBuildH5) {
      // H5
      modifyH5WebpackChain(ctx, chain, config)
    } else {
      // 小程序
      modifyMiniWebpackChain(ctx, chain, data, config)
    }
  })

  ctx.modifyRunnerOpts(({ opts }) => {
    opts.frameworkExts = VUE_EXT

    if (!opts?.compiler) return

    if (isString(opts.compiler)) {
      opts.compiler = {
        type: opts.compiler
      }
    }

    const { compiler } = opts
    if (compiler.type === 'webpack5') {
      // 提供给 webpack5 依赖预编译收集器的第三方依赖
      const deps = [
        'vue',
        '@tarojs/plugin-framework-vue3/dist/runtime'
      ]
      compiler.prebundle ||= {}
      const prebundleOptions = compiler.prebundle
      prebundleOptions.include ||= []
      prebundleOptions.include = prebundleOptions.include.concat(deps)

      const taroVue3Plugin = {
        name: 'taroVue3Plugin',
        setup (build) {
          build.onLoad({ filter: /taro-h5[\\/]dist[\\/]api[\\/]taro/ }, ({ path }) => {
            const content = fs.readFileSync(path).toString()
            return {
              contents: require('./api-loader')(content)
            }
          })
        }
      }

      prebundleOptions.esbuild ||= {}
      const esbuildConfig = prebundleOptions.esbuild
      esbuildConfig.plugins ||= []
      esbuildConfig.plugins.push(taroVue3Plugin)
    }
  })

  ctx.onParseCreateElement(({ nodeName, componentConfig }: OnParseCreateElementArgs) => {
    if (capitalize(toCamelCase(nodeName)) in internalComponents) {
      componentConfig.includes.add(nodeName)
    }
  })
}

function setAlias (chain) {
  // 避免 npm link 时，taro composition apis 使用的 vue 和项目使用的 vue 实例不一致。
  chain.resolve.alias
    .set('vue', require.resolve('vue'))
}

function setDefinePlugin (chain) {
  chain
    .plugin('definePlugin')
    .tap(args => {
      const config = args[0]
      config.__VUE_OPTIONS_API__ = JSON.stringify(true)
      config.__VUE_PROD_DEVTOOLS__ = JSON.stringify(false)
      return args
    })
}
