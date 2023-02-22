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

import { chalk } from '@tarojs/helper'
import * as path from 'path'

import { run } from './utils'

jest.mock('../doctor', () => {
  return {
    __esModule: true,
    default: {
      validators: [() => ({
        desc: 'configValidator',
        lines: [{
          desc: 'A',
          valid: false
        }]
      }), () => ({
        desc: 'packageValidator',
        lines: [{
          desc: 'B',
          valid: true
        }, {
          desc: 'C',
          valid: true,
          solution: 'c'
        }]
      }), () => ({
        desc: 'recommandValidator',
        lines: []
      }), () => ({
        desc: 'eslintValidator',
        raw: 'eslint msg'
      })]
    }
  }
})

jest.mock('ora', () => {
  const ora = jest.fn()
  ora.mockReturnValue({
    start () {
      return {
        succeed () {}
      }
    }
  })
  return ora
})

const runDoctor = run('doctor', ['commands/doctor'])

describe('doctor', () => {
  it('should exit because there isn\'t a Taro project', async () => {
    const exitSpy = jest.spyOn(process, 'exit') as jest.SpyInstance<void, any>
    const logSpy = jest.spyOn(console, 'log')

    exitSpy.mockImplementation(() => {
      throw new Error()
    })
    logSpy.mockImplementation(() => {})

    try {
      await runDoctor('')
    } catch (error) {} // eslint-disable-line no-empty

    expect(exitSpy).toBeCalledWith(1)
    expect(logSpy).toBeCalledWith(chalk.red('找不到项目配置文件config/index，请确定当前目录是 Taro 项目根目录!'))

    exitSpy.mockRestore()
    logSpy.mockRestore()
  })

  it('should log reports', async () => {
    const NOTE_ALL_RIGHT = chalk.green('[✓] ')
    const NOTE_VALID = chalk.yellow('[!] ')
    const NOTE_INVALID = chalk.red('[✗] ')

    const titleChalk = chalk.hex('#aaa')
    const lineChalk = chalk.hex('#fff')
    const solutionChalk = chalk.hex('#999')

    const logSpy = jest.spyOn(console, 'log')
    logSpy.mockImplementation(() => {})

    await runDoctor(path.join(__dirname, 'fixtures/default'))

    expect(logSpy).nthCalledWith(1, '\n' + titleChalk('configValidator'))
    expect(logSpy).nthCalledWith(2, '  ' + NOTE_INVALID + lineChalk('A'))

    expect(logSpy).nthCalledWith(3, '\n' + titleChalk('packageValidator'))
    expect(logSpy).nthCalledWith(4, '  ' + NOTE_VALID + lineChalk('B'))
    expect(logSpy).nthCalledWith(5, '  ' + NOTE_VALID + lineChalk('C'))
    expect(logSpy).nthCalledWith(6, '      ' + solutionChalk('c'))

    expect(logSpy).nthCalledWith(7, '\n' + titleChalk('recommandValidator'))
    expect(logSpy).nthCalledWith(8, `  ${NOTE_ALL_RIGHT}没有发现问题`)

    expect(logSpy).nthCalledWith(9, '\n' + titleChalk('eslintValidator'))
    expect(logSpy).nthCalledWith(10, 'eslint msg')

    logSpy.mockRestore()
  })
})
