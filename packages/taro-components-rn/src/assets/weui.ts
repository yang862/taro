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

// import { ART } from 'react-native'

interface IconItem {
  defaultColor?: string;
  image: number;
}

/**
 * @see icon default color: https://github.com/Tencent/weui/blob/master/src/style/icon/weui-icon_font.less
 */
export const VIEWBOX_SIZE = 1001
export const CIRCLE: IconItem = {
  // path: new Path('M501 941q-120 0 -223 -60q-100 -59 -159 -159q-60 -103 -60 -223t60 -223q59 -99 159 -158q103 -60 223 -60t222 60q100 59 159 158q60 103 60 223t-60 223q-59 100 -159 159q-102 60 -222 60zM501 92q-110 0 -204 55q-91 53 -145 144q-55 94 -55 203.5t55 203.5 q54 92 145 145q94 55 203.5 55t203.5 -55q91 -53 145 -145q55 -94 55 -203.5t-55 -203.5q-54 -91 -145 -144q-94 -55 -203 -55z'),
  defaultColor: '#C9C9C9',
  image: require('./icons/circle.png')
}
export const DOWNLOAD: IconItem = {
  // path: new Path('M494 947q-118 0 -221 -62q-100 -59 -159 -161q-61 -106 -61 -230q0 -118 61 -221q59 -100 159 -159q103 -61 221 -61q124 0 230 61q102 59 161 159q62 103 62 221q0 125 -62 230q-59 102 -161 161q-105 62 -230 62zM652 419l-118 -154q-14 -18 -34 -18t-34 18l-118 154 q-14 18 -7.5 31t29.5 13h93v279q0 8 5.5 13.5t12.5 5.5h38q7 0 12.5 -5.5t5.5 -13.5v-279h93q23 0 29.5 -13t-7.5 -31z'),
  defaultColor: '#09BB07',
  image: require('./icons/download.png')
}
export const INFO: IconItem = {
  // path: new Path('M494 996q-132 0 -246 -68q-111 -66 -176 -179q-68 -118 -68 -255q0 -132 68 -246q65 -111 176 -176q114 -68 246 -68q137 0 255 68q113 65 179 176q68 114 68 246q0 138 -68 255q-66 113 -179 179q-117 68 -255 68zM527 257q0 -2 -2 -2h-49q-3 0 -3 2l-8 354q0 2 2 2h66 q3 0 2 -2zM500 660q-18 0 -30.5 12.5t-12.5 30t12.5 30t30.5 12.5t30.5 -12.5t12.5 -30t-12.5 -30t-30.5 -12.5z'),
  defaultColor: '#10AEFF',
  image: require('./icons/info.png')
}
export const SAFE_SUCCESS: IconItem = {
  // path: new Path('M501 995q-85 -19 -170 -43q-66 -18 -145 -43q175 55 -128 -41v-340q0 -142 71 -259q62 -101 170 -173q94 -63 202 -91q108 28 201 91q109 72 170 173q72 117 72 259v340q-303 96 -128 41q-79 25 -145 43q-85 24 -170 43zM749 646l-299 -295q-4 -3 -8 0l-138 143q-3 4 0 8 l18 25q1 2 3.5 2t3.5 -1l113 -86q1 -2 3.5 -1.5t4.5 1.5l274 229q2 1 4.5 1t3.5 -2l17 -16q4 -4 0 -8z'),
  defaultColor: '#09BB07',
  image: require('./icons/safe_success.png')
}
export const SAFE_WARN: IconItem = {
  // path: new Path('M501 996q-65 -15 -130 -33q-56 -14 -115 -32q-44 -14 -103 -32q-127 -41 -95 -31v-339q0 -143 71 -260q62 -100 170 -173q94 -62 202 -91q108 29 201 91q109 73 170 173q72 117 72 260v339q-296 94 -128 41q-80 25 -145 43q-85 24 -170 44zM475 724h52q4 0 7 -3t3 -7 l-12 -314q0 -2 -1.5 -3.5t-3.5 -1.5h-38q-5 0 -6 5l-11 314q0 4 3 7t7 3zM501 276q-15 0 -26 10.5t-11 26t11 26t26 10.5t25.5 -10.5t10.5 -26t-10.5 -26t-25.5 -10.5z'),
  defaultColor: '#FFBE00',
  image: require('./icons/safe_warn.png')
}
export const SUCCESS: IconItem = {
  // path: new Path('M494 995q-132 0 -246 -68q-111 -66 -176 -179q-67 -117 -67 -254q0 -131 67 -246q66 -110 176 -176q115 -67 246 -67q137 0 254 67q113 65 179 176q68 114 68 246q0 137 -68 254q-66 113 -179 179q-117 68 -254 68zM776 646l-352 -347q-1 -1 -3.5 -1t-3.5 1l-163 168 q-3 4 0 9l22 30q1 2 3.5 2t3.5 -1l133 -102q2 -1 4.5 -1t3.5 1l323 269q2 2 4.5 2t3.5 -2l21 -21q4 -4 0 -7z'),
  defaultColor: '#09BB07',
  image: require('./icons/success.png')
}
export const SUCCESS_CIRCLE: IconItem = {
  // path: new Path('M501 941q-120 0 -223 -60q-100 -59 -159 -159q-60 -103 -60 -223t60 -223q59 -99 159 -158q103 -60 223 -60t222 60q100 59 159 158q60 103 60 223t-60 223q-59 100 -159 159q-102 60 -222 60zM501 92q-110 0 -204 55q-91 53 -145 144q-55 94 -55 203.5t55 203.5 q54 92 145 145q94 55 203.5 55t203.5 -55q91 -53 145 -145q55 -94 55 -203.5t-55 -203.5q-54 -91 -145 -144q-94 -55 -203 -55zM715 642l-266 -221q-6 -5 -15 -5.5t-15 4.5l-96 73q-6 5 -13.5 4t-12.5 -7l-3 -4q-5 -7 -4.5 -15.5t6.5 -14.5l125 -128q5 -6 13 -6t14 5 l293 289q5 5 5.5 12.5t-5 13t-13.5 5.5t-13 -5zM741 643l1 -1l1 -1z'),
  defaultColor: '#09BB07',
  image: require('./icons/success_circle.png')
}
export const SUCCESS_NO_CIRCLE: IconItem = {
  // path: new Path('M61 435q-10 11 -13 27.5t4 30.5l5 11q7 13 20 16.5t25 -5.5l203 -147q12 -9 28.5 -8.5t27.5 10.5l541 446q11 9 26.5 8t26.5 -11l-13 13q10 -11 10 -25.5t-10 -25.5l-583 -591q-10 -11 -25 -11t-25 10z'),
  defaultColor: '#09BB07',
  image: require('./icons/success_no_circle.png')
}
export const WAITING: IconItem = {
  // path: new Path('M495 997q-132 0 -246 -68q-111 -66 -176 -179q-67 -117 -67 -254q0 -131 67 -246q66 -110 176 -176q115 -67 246 -67q137 0 254 67q113 65 179 176q68 114 68 246q0 137 -68 254q-66 113 -179 179q-117 68 -254 68zM719 315l-16 -28q-3 -4 -7 -2l-250 119q-3 2 -5 4 q-4 3 -4 9l16 378q0 2 1.5 3.5t3.5 1.5h43q2 0 3.5 -1.5t1.5 -3.5l14 -339l197 -133q2 -2 2.5 -4t-0.5 -4z'),
  defaultColor: '#10AEFF',
  image: require('./icons/waiting.png')
}
export const WAITING_CIRCLE: IconItem = {
  // path: new Path('M741 643l1 -1l1 -1zM501 941q-120 0 -223 -60q-100 -59 -159 -159q-60 -103 -60 -223t60 -223q59 -99 159 -158q103 -60 223 -60t222 60q100 59 159 158q60 103 60 223t-60 223q-59 100 -159 159q-102 60 -222 60zM501 92q-110 0 -204 55q-91 53 -145 144 q-55 94 -55 203.5t55 203.5q54 92 145 145q94 55 203.5 55t203.5 -55q91 -53 145 -145q55 -94 55 -203.5t-55 -203.5q-54 -91 -145 -144q-94 -55 -203 -55zM455 653h-36v-253h253v36h-217v217z'),
  defaultColor: '#10AEFF',
  image: require('./icons/waiting_circle.png')
}
export const WARN: IconItem = {
  // path: new Path('M494 995q-132 0 -246 -68q-111 -66 -176 -179q-67 -117 -67 -254q0 -131 67 -246q66 -110 176 -176q115 -67 246 -67q137 0 254 67q113 65 179 176q68 114 68 246q0 137 -68 254q-66 113 -179 179q-117 68 -254 68zM473 729h54q4 0 7 -3t3 -8l-12 -320q0 -2 -1.5 -3.5 t-3.5 -1.5h-39q-3 0 -4.5 1.5t-1.5 3.5l-12 320q0 5 3 8t7 3zM500 271q-15 0 -26 11t-11 26.5t11 26.5t26 11t26 -11t11 -26.5t-11 -26.5t-26 -11z'),
  defaultColor: '#F43530',
  image: require('./icons/warn.png')
}
export const INFO_CIRCLE: IconItem = {
  // path: new Path('M500 672q24 0 40.5 17t16.5 40.5t-16.5 40.5t-40.5 17t-40.5 -17t-16.5 -40.5t16.5 -40.5t40.5 -17zM557 615h-143v-29h57v-316h-57v-28h201v28h-58v345zM514 959q-132 0 -242 -63q-107 -61 -168 -168q-63 -110 -63 -242q0 -119 62.5 -221t168.5 -162q111 -62 242 -62 q118 0 222 62q101 60 161 161q62 104 62 222q0 131 -62 242q-60 106 -162 168.5t-221 62.5zM500 98q-109 0 -203 55q-91 53 -144 144q-55 94 -55 203t55 203q53 91 144 144q94 55 203 55t203 -55q91 -53 144 -144q55 -94 55 -203t-55 -203q-53 -91 -144 -144 q-94 -55 -203 -55z'),
  // There is no mentions of this one.
  defaultColor: '#10AEFF',
  image: require('./icons/info_circle.png')
}
export const CANCEL: IconItem = {
  // path: new Path('M654 682l-154 -154l-154 154l-28 -28l154 -154l-154 -154l28 -28l154 154l154 -154l28 28l-154 154l154 154zM500 935q-118 0 -220 -59q-98 -58 -156 -156q-59 -102 -59 -220t59 -220q58 -98 156 -156q102 -59 220 -59t220 59q98 58 156 156q59 102 59 220t-59 220 q-58 98 -156 156q-102 59 -220 59zM500 105q-107 0 -200 54q-89 52 -141 141q-54 93 -54 200t54 200q52 89 141 141q93 54 200 54t200 -54q89 -52 141 -141q54 -93 54 -200t-54 -200q-52 -89 -141 -141q-93 -54 -200 -54z'),
  defaultColor: '#F43530',
  image: require('./icons/cancel.png')
}
export const SEARCH: IconItem = {
  // path: new Path('M654 291q-53 -43 -117 -66q-66 -24 -137 -24q-109 0 -202 54q-90 53 -143 144q-55 93 -55 202t55 202q53 90 143 143q93 55 202 55t202 -55q91 -53 144 -143q54 -93 54 -202q0 -71 -24 -137q-23 -64 -66 -117l291 -290l-57 -57zM400 281q87 0 162 43q72 43 115 115 q43 75 43 162t-43 161q-43 73 -115 115q-75 44 -162 44t-161 -44q-73 -42 -115 -115q-44 -74 -44 -161t44 -162q42 -72 115 -115q74 -43 161 -43zM400 281z'),
  defaultColor: '#B2B2B2',
  image: require('./icons/search.png')
}
export const CLEAR: IconItem = {
  // path: new Path('M500 1000q-136 0 -252 -68q-113 -67 -180 -180q-68 -116 -68 -252t68 -252q67 -113 180 -180q116 -68 252 -68t252 68q113 67 180 180q68 116 68 252t-68 252q-67 113 -180 180q-116 68 -252 68zM709 331q10 -10 9.5 -23.5t-10.5 -23t-23.5 -9.5t-23.5 10l-162 168 l-168 -162q-10 -10 -23.5 -9.5t-23 10.5t-9.5 23.5t10 23.5l168 162l-162 168q-10 10 -9.5 23.5t10.5 23.5t23.5 9.5t23.5 -10.5l162 -168l168 162q10 10 23.5 9.5t23.5 -10.5t9.5 -23.5t-10.5 -23.5l-168 -162z'),
  defaultColor: '#B2B2B2',
  image: require('./icons/clear.png')
}
export const BACK: IconItem = {
  // path: new Path('M494 995q-132 0 -246 -68q-111 -66 -176 -179q-67 -117 -67 -254q0 -131 67 -246q66 -110 176 -176q115 -67 246 -67q137 0 254 67q113 65 179 176q68 114 68 246q0 137 -68 254q-66 113 -179 179q-117 68 -254 68zM758 473q0 -2 -2 -3.5t-4 -1.5l-367 -11l131 -149 q1 -2 1 -4t-1 -4l-21 -20q-3 -4 -7 0l-236 208q-2 2 -2.5 4.5t1.5 4.5l236 209q4 4 8 0l20 -20q2 -2 2 -4.5t-1 -3.5l-132 -149l368 -11q2 0 3.5 -1.5t1.5 -4.5v-39h1z'),
  // defaultColor: '',
  image: require('./icons/back.png')
}
export const DELETE: IconItem = {
  // path: new Path('M891 802v-716q0 -27 -19 -46t-46 -19h-650q-27 0 -46 19t-19 46v716h-67q-9 0 -15.5 6t-6.5 16v44q0 9 6.5 15.5t15.5 6.5h262v46q0 18 12.5 30.5t30.5 12.5h303q19 0 31.5 -12.5t12.5 -30.5v-46h262q9 0 15.5 -6.5t6.5 -15.5v-44q0 -10 -6.5 -16t-15.5 -6h-67zM199 802 v-692h604v692h-604zM594 695q-9 0 -15.5 -6.5t-6.5 -15.5v-435q0 -9 6.5 -15.5t15.5 -6.5h45q9 0 15.5 6.5t6.5 15.5v435q0 9 -6.5 15.5t-15.5 6.5h-45zM363 695q-9 0 -15.5 -6.5t-6.5 -15.5v-435q0 -9 6.5 -15.5t15.5 -6.5h45q9 0 15.5 6.5t6.5 15.5v435q0 9 -6.5 15.5 t-15.5 6.5h-45zM363 695z'),
  // defaultColor: '',
  image: require('./icons/delete.png')
}
