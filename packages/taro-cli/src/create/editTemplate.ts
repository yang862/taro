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
import * as fs from 'fs-extra'
import * as path from 'path'

import { validateProjectName } from './validate'

interface PlaceholderConfig {
  projectName: string
  templatePath: string
  projectPath: string
}

const UNDERSCORED_DOTFILES = [
  'buckconfig',
  'eslintrc.js',
  'flowconfig',
  'gitattributes',
  'gitignore',
  'prettierrc.js',
  'watchmanconfig',
  'editorconfig',
  'bundle',
  'ruby-version'
]
const DEFAULT_RN_PROJECT_NAME = 'taroDemo'

function getTemplateName (cwd: string) {
  const result = fs.readFileSync(path.join(cwd, './ios/Podfile'), 'utf8').match(/target '(.*)' do/m)
  const name = result?.[1] || DEFAULT_RN_PROJECT_NAME
  return name
}
async function replaceNameInUTF8File (filePath: string, projectName: string, defaultName: string) {
  const fileContent = await fs.readFile(filePath, 'utf8')
  const replacedFileContent = fileContent
    .replace(new RegExp(defaultName, 'g'), projectName)
    .replace(new RegExp(defaultName.toLowerCase(), 'g'), projectName.toLowerCase())

  if (fileContent !== replacedFileContent) {
    await fs.writeFile(filePath, replacedFileContent, 'utf8')
  }
}
async function processDotfiles (filePath: string) {
  const dotfile = UNDERSCORED_DOTFILES.find(e => filePath.includes(`_${e}`))

  if (dotfile === undefined) {
    return
  }

  await renameFile(filePath, `_${dotfile}`, `.${dotfile}`)
}
function walk (current: string): string[] {
  if (!fs.lstatSync(current).isDirectory()) {
    return [current]
  }

  const files = fs.readdirSync(current).map(child => walk(path.join(current, child)))
  const result: string[] = []
  return result.concat.apply([current], files)
}

async function renameFile (filePath: string, oldName: string, newName: string) {
  const newFileName = path.join(
    path.dirname(filePath),
    path.basename(filePath).replace(new RegExp(oldName, 'g'), newName)
  )

  await fs.rename(filePath, newFileName)
}
function shouldRenameFile (filePath: string, nameToReplace: string) {
  return path.basename(filePath).includes(nameToReplace)
}

function shouldIgnoreFile (filePath: string) {
  return filePath.match(/node_modules|yarn.lock|package-lock.json/g)
}

export async function changeDefaultNameInTemplate ({ projectName, templatePath, projectPath }: PlaceholderConfig) {
  const regex = validateProjectName(projectName)
  if (!regex) {
    console.log(chalk.yellow('因项目名称不符合 java package 包命名规则（只能包含字母、数字和下划线，且必须以字母开头），故项目默认名不做替换！'))
    return
  }
  const defaultName = getTemplateName(templatePath)

  for (const filePath of walk(projectPath).reverse()) {
    if (shouldIgnoreFile(filePath)) {
      continue
    }
    if (!(await fs.stat(filePath)).isDirectory()) {
      await replaceNameInUTF8File(filePath, projectName, defaultName)
    }
    if (shouldRenameFile(filePath, defaultName)) {
      await renameFile(filePath, defaultName, projectName)
    }
    if (shouldRenameFile(filePath, defaultName.toLowerCase())) {
      await renameFile(filePath, defaultName.toLowerCase(), projectName.toLowerCase())
    }

    await processDotfiles(filePath)
  }
  console.log(`${chalk.green('✔ ')}${chalk.grey('项目名更新成功！')}`)
}
