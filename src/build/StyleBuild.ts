import { BaseBuild, UndoItem } from '../flow/UndoManager';
export interface StyleMeta {
  /**
   * 字体颜色
   */
  color: string;

  /**
   * 背景颜色
   */
  backgroundColor?: string;

  /**
   * 水平位置
   * left, center, right
   */
  textAlign?: string;

  /**
   * 字体大小
   */
  fontSize?: number;

  /**
   * 字体粗细
   */
  fontWeight?: number;

  /**
   * 字体样式,斜体
   */
  fontStyle?: string;

  /**
   * 字体
   */
  fontFamily?: string;

  /**
   * 文本装饰样式
   */
  textDecorationStyle?: string;

  /**
   * 下划线
   */
  underline?: string;

  /**
   * 上划线
   */
  overline?: string;

  /**
   * 穿越线
   */
  lineThrough?: string;

  /**
   * 文本装饰线颜色
   */
  textDecorationColor?: string;

  /**
   * 文本缩进
   */
  textIndent?: number;
}

export interface StyleBuildArgs {
  metaInfo: StyleMeta;
}

export class StyleBuild extends BaseBuild<StyleMeta> {
  protected metaInfo: StyleMeta;

  private builds: BaseBuild<any>[];

  /**
   * 添加关联单元格
   * @param build 
   */
  public addCell(build: BaseBuild<any>) {
    this.builds.push(build);
  }

  public restoreUndoItem(undoItem: UndoItem): void {
    throw new Error('Method not implemented.');
  }

  /**
   * 移除关联的单元格
   * @param build 
   */
  public removeBuild(build: BaseBuild<any>) {
    const index = this.builds.indexOf(build);
    this.builds.splice(index, 1);
  }

  /**
   * 获取样式层关联的所有单元格
   * @returns 
   */
  public getBuilds() {
    return this.builds;
  }

  protected initData(args: StyleBuildArgs) {
    this.builds = [];
  }


  protected initMeta() {
    throw new Error('Method not implemented.');
  }
}