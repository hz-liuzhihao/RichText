import { RichTextBuild, RichTextMeta } from './build/RichTextBuild';
import { RichTextEditor } from './editor/RichTextEditor';
export interface RichTextArgs {
  dom: HTMLDivElement;

  metaInfo: RichTextMeta;
}

/**
 * RichText类入口
 */
export class RichText {

  private dom: HTMLDivElement;

  private build: RichTextBuild;

  private editor: RichTextEditor;

  public constructor(args: RichTextArgs) {
    this.dom = args.dom;
    this.initBuild(args);
    this.initEditor(args);
  }

  /**
   * 初始化数据层
   * @param args 
   */
  public initBuild(args: RichTextArgs) {
    throw new Error('Method not implemented.');
  }

  /**
   * 初始化编辑层
   * @param args 
   */
  public initEditor(args: RichTextArgs) {
    throw new Error('Method not implemented.');
  }
}