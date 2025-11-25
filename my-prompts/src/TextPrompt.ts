import ansiEscapes from 'ansi-escapes';
import { Key, Prompt } from "./Prompt.js";
import chalk from 'chalk';

export interface TextPromptOptions  {
    type: 'text'
    name: string
    message: string
}

function isNonPrintableChar(char: string) {
    return /^[\x00-\x1F\x7F]$/.test(char);
}

export class TextPrompt extends Prompt {
    out = process.stdout
    cursor = 0

    constructor(private options: TextPromptOptions) {
        super();
    }

    onKeyInput(str: string, key: Key) {

        if (key.name === 'backspace' && this.cursor > 0) {
            this.cursor --;
            this.value = this.value.slice(0, this.cursor);
        }

        if(!isNonPrintableChar(str)) {
            this.value += str;
            this.cursor ++;
        }

        this.render();
    }

   render() {
    // ========== 第一步：清空当前行 ==========
    this.out.write(ansiEscapes.eraseLine);
    this.out.write(ansiEscapes.cursorTo(0));  // 光标移到行首
    
    // ========== 第二步：绘制主输入行 ==========
    this.out.write([
        chalk.bold(this.options.message),  // "请输入你的名字" (粗体)
        chalk.gray('›'),                   // "›" (灰色分隔符)
        ' ',                               // 空格
        chalk.blue(this.value)             // "John" (蓝色输入内容)
    ].join(''))
    // 效果：请输入你的名字 › John
    
    // ========== 第三步：保存当前光标位置 ==========
    this.out.write(ansiEscapes.cursorSavePosition)
    
    // ========== 第四步：移动到下一行绘制提示信息 ==========
    this.out.write(ansiEscapes.cursorDown(1) + ansiEscapes.cursorTo(0))
    
    if(this.value === '') {
        this.out.write(chalk.red('请输入名字'))  // 红色错误提示
    } else {
        this.out.write(ansiEscapes.eraseLine)    // 清除错误提示
    }
    
    // ========== 第五步：恢复光标到输入位置 ==========
    this.out.write(ansiEscapes.cursorRestorePosition)
}

}
