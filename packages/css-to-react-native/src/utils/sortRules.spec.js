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
 *  SOFTWARE.
 */

import { sortRules } from './sortRules'

describe('sortRules', () => {
  it('should sort :export to be the last rule', () => {
    expect(
      sortRules([
        {
          type: 'rule',
          selectors: [':export'],
          declarations: [
            {
              type: 'declaration',
              property: 'foo',
              value: '1',
              position: {
                start: { line: 3, column: 9 },
                end: { line: 3, column: 15 }
              }
            }
          ],
          position: {
            start: { line: 2, column: 7 },
            end: { line: 4, column: 8 }
          }
        },
        {
          type: 'rule',
          selectors: ['.foo'],
          declarations: [
            {
              type: 'declaration',
              property: 'color',
              value: 'red',
              position: {
                start: { line: 7, column: 9 },
                end: { line: 7, column: 19 }
              }
            }
          ],
          position: {
            start: { line: 6, column: 7 },
            end: { line: 8, column: 8 }
          }
        }
      ])
    ).toEqual([
      {
        type: 'rule',
        selectors: ['.foo'],
        declarations: [
          {
            type: 'declaration',
            property: 'color',
            value: 'red',
            position: {
              start: { line: 7, column: 9 },
              end: { line: 7, column: 19 }
            }
          }
        ],
        position: {
          start: { line: 6, column: 7 },
          end: { line: 8, column: 8 }
        }
      },
      {
        type: 'rule',
        selectors: [':export'],
        declarations: [
          {
            type: 'declaration',
            property: 'foo',
            value: '1',
            position: {
              start: { line: 3, column: 9 },
              end: { line: 3, column: 15 }
            }
          }
        ],
        position: {
          start: { line: 2, column: 7 },
          end: { line: 4, column: 8 }
        }
      }
    ])

    expect(
      sortRules([
        {
          type: 'rule',
          selectors: ['.foo'],
          declarations: [
            {
              type: 'declaration',
              property: 'color',
              value: 'red',
              position: {
                start: { line: 7, column: 9 },
                end: { line: 7, column: 19 }
              }
            }
          ],
          position: {
            start: { line: 6, column: 7 },
            end: { line: 8, column: 8 }
          }
        },
        {
          type: 'rule',
          selectors: [':export'],
          declarations: [
            {
              type: 'declaration',
              property: 'foo',
              value: '1',
              position: {
                start: { line: 3, column: 9 },
                end: { line: 3, column: 15 }
              }
            }
          ],
          position: {
            start: { line: 2, column: 7 },
            end: { line: 4, column: 8 }
          }
        },
        {
          type: 'rule',
          selectors: ['.foo'],
          declarations: [
            {
              type: 'declaration',
              property: 'color',
              value: 'red',
              position: {
                start: { line: 7, column: 9 },
                end: { line: 7, column: 19 }
              }
            }
          ],
          position: {
            start: { line: 6, column: 7 },
            end: { line: 8, column: 8 }
          }
        }
      ])
    ).toEqual([
      {
        type: 'rule',
        selectors: ['.foo'],
        declarations: [
          {
            type: 'declaration',
            property: 'color',
            value: 'red',
            position: {
              start: { line: 7, column: 9 },
              end: { line: 7, column: 19 }
            }
          }
        ],
        position: {
          start: { line: 6, column: 7 },
          end: { line: 8, column: 8 }
        }
      },
      {
        type: 'rule',
        selectors: ['.foo'],
        declarations: [
          {
            type: 'declaration',
            property: 'color',
            value: 'red',
            position: {
              start: { line: 7, column: 9 },
              end: { line: 7, column: 19 }
            }
          }
        ],
        position: {
          start: { line: 6, column: 7 },
          end: { line: 8, column: 8 }
        }
      },
      {
        type: 'rule',
        selectors: [':export'],
        declarations: [
          {
            type: 'declaration',
            property: 'foo',
            value: '1',
            position: {
              start: { line: 3, column: 9 },
              end: { line: 3, column: 15 }
            }
          }
        ],
        position: {
          start: { line: 2, column: 7 },
          end: { line: 4, column: 8 }
        }
      }
    ])
  })

  it('should sort :export blocks to be after classes, but sorted by start line', () => {
    expect(
      sortRules([
        {
          type: 'rule',
          selectors: [':export'],
          declarations: [
            {
              type: 'declaration',
              property: 'bar',
              value: '1',
              position: {
                start: { line: 11, column: 3 },
                end: { line: 11, column: 9 }
              }
            },
            {
              type: 'declaration',
              property: 'bar',
              value: '2',
              position: {
                start: { line: 12, column: 3 },
                end: { line: 12, column: 9 }
              }
            }
          ],
          position: {
            start: { line: 10, column: 1 },
            end: { line: 13, column: 2 }
          }
        },
        {
          type: 'rule',
          selectors: ['.foo'],
          declarations: [
            {
              type: 'declaration',
              property: 'color',
              value: 'blue',
              position: {
                start: { line: 7, column: 3 },
                end: { line: 7, column: 14 }
              }
            }
          ],
          position: {
            start: { line: 6, column: 1 },
            end: { line: 8, column: 2 }
          }
        },
        {
          type: 'rule',
          selectors: [':export'],
          declarations: [
            {
              type: 'declaration',
              property: 'bar',
              value: '3',
              position: {
                start: { line: 3, column: 3 },
                end: { line: 3, column: 9 }
              }
            }
          ],
          position: {
            start: { line: 2, column: 1 },
            end: { line: 4, column: 2 }
          }
        }
      ])
    ).toEqual([
      {
        declarations: [
          {
            position: {
              end: { column: 14, line: 7 },
              start: { column: 3, line: 7 }
            },
            property: 'color',
            type: 'declaration',
            value: 'blue'
          }
        ],
        position: {
          end: { column: 2, line: 8 },
          start: { column: 1, line: 6 }
        },
        selectors: ['.foo'],
        type: 'rule'
      },
      {
        declarations: [
          {
            position: {
              end: { column: 9, line: 3 },
              start: { column: 3, line: 3 }
            },
            property: 'bar',
            type: 'declaration',
            value: '3'
          }
        ],
        position: {
          end: { column: 2, line: 4 },
          start: { column: 1, line: 2 }
        },
        selectors: [':export'],
        type: 'rule'
      },
      {
        declarations: [
          {
            position: {
              end: { column: 9, line: 11 },
              start: { column: 3, line: 11 }
            },
            property: 'bar',
            type: 'declaration',
            value: '1'
          },
          {
            position: {
              end: { column: 9, line: 12 },
              start: { column: 3, line: 12 }
            },
            property: 'bar',
            type: 'declaration',
            value: '2'
          }
        ],
        position: {
          end: { column: 2, line: 13 },
          start: { column: 1, line: 10 }
        },
        selectors: [':export'],
        type: 'rule'
      }
    ])
  })

  it('should do nothing with an empty array', () => {
    expect(sortRules([])).toEqual([])
  })
})
