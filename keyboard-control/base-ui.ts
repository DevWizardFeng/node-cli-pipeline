// 导入 ANSI 转义序列库，用于控制终端光标和屏幕操作
import ansiEscapes from 'ansi-escapes';

// 定义坐标位置接口，表示终端中的位置坐标
export interface Position {
    x: number; // 水平位置（列），0 表示最左边
    y: number; // 垂直位置（行），0 表示最上边
}

// 抽象基类 BaseUI：提供终端 UI 的基础功能和工具方法
export abstract class BaseUI {
    // 私有只读属性：绑定标准输出流，用于向终端输出内容
    private readonly stdout: NodeJS.WriteStream = process.stdout;

    // 向终端输出文本内容
    protected print(text: string): void {
        // 直接调用 process.stdout.write 输出文本到终端
        process.stdout.write(text);
    }

    // 将光标移动到指定的坐标位置
    protected setCursorAt({ x, y }: Position): void {
        // 使用 ANSI 转义序列将光标移动到 (x, y) 坐标
        this.print(ansiEscapes.cursorTo(x, y));
    }

    // 在指定位置打印消息文本
    protected printAt(message: string, position: Position): void {
        // 先将光标移动到目标位置
        this.setCursorAt(position);
        // 然后在当前位置输出消息
        this.print(message);
    }

    // 清除指定行的所有内容
    protected clearLine(row: number): void {
        // 在指定行的开始位置输出清除行的 ANSI 转义序列
        this.printAt(ansiEscapes.eraseLine, { x: 0, y: row });
    }

    // 计算属性：获取终端的尺寸信息（列数和行数）
    get terminalSize(): { columns: number; rows: number } {
        return {
            // 返回终端列数，如果获取失败则使用默认值 0
            columns: this.stdout.columns || 0,
            // 返回终端行数，如果获取失败则使用默认值 0
            rows: this.stdout.rows || 0
        };
    }

    // 抽象方法：子类必须实现的渲染方法，用于绘制 UI 界面
    abstract render(): void;
}