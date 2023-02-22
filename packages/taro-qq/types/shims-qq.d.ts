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

import Component from '@tarojs/components'

declare module '@tarojs/components' {
  export interface ButtonProps {
    /**
     * 应用的包名 （安卓）
     * 生效时机：`open-type="launchApp"`
     * @supported qq
     * @see https://q.qq.com/wiki/develop/miniprogram/frame/open_ability/open_app.html
     */
    appPackagename?: string

    /**
     * 应用的bundleid （iOS）
     * 生效时机：`open-type="launchApp"`
     * @supported qq
     * @see https://q.qq.com/wiki/develop/miniprogram/frame/open_ability/open_app.html
     */
    appBundleid?: string

    /**
     * QQ互联中的AppID
     * 生效时机：`open-type="launchApp"`
     * @supported qq
     * @see https://q.qq.com/wiki/develop/miniprogram/frame/open_ability/open_app.html
     */
    appConnectId?: string

    /**
     * 打开群资料卡时，传递的群号
     * 生效时机：`open-type="openGroupProfile"`
     * @supported qq
     */
    groupId?: string

    /**
     * 打开公众号资料卡时，传递的号码
     * 生效时机：`open-type="openPublicProfile"`
     * @supported qq >= 1.12.0
     */
    publicId?: string

    /**
     * 分享类型集合，请参考下面share-type有效值说明。share-type后续将不再维护，请更新为share-mode
     * 生效时机：`open-type="share"`
     * @default 27
     * @supported qq >= 1.4.4
     */
    shareType?: number

    /**
     * 分享类型集合，请参考下面share-mode有效值说明
     * 生效时机：`open-type="share"`
     * @default ['qq', 'qzone']
     * @supported qq >= 1.15.0
     */
    shareMode?: string[]

    /**
     * 无障碍访问，（属性）元素的额外描述
     * @supported qq
     */
    ariaLabel?: string

    /**
     * 添加好友时，对方的 openid
     * 生效时机：`open-type="addFriend"`
     * @supported qq
     */
    openId?: string

    /**
     * 发送对象的 FriendInfo
     * 生效时机：`open-type="shareMessageToFriend"`
     * @supported qq >= 1.17.0
     */
    shareMessageFriendInfo?: ButtonProps.FriendInfo

    /**
     * 添加好友的回调
     * 生效时机：`open-type="addFriend"`
     * @supported qq
     */
    onAddFriend?: Component.CommonEventFunction

    /**
     * 添加群应用的回调。errCode 错误码：41004（当前用户非管理员或群主，无权操作），41005（超过可添加群应用的群数量）
     * 生效时机：`open-type="addGroupApp"`
     * @supported qq >= 1.16.0
     */
    onAddGroupApp?: Component.CommonEventFunction
  }
  namespace ButtonProps {
    type FriendInfo = any
  }
}
