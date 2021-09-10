import { RichTextBuild, RichTextBuildArgs } from './build/RichTextBuild';
import { RichTextEditor } from './editor/RichTextEditor';
import { IWorkBench, UndoItem, UndoManage } from './flow/UndoManager';

interface WorkbenchArgs {
  config: RichTextConfig;
}

class Workbench implements IWorkBench {

  private undoManage: UndoManage;

  private build: RichTextBuild;

  private editor: RichTextEditor;

  private config: RichTextConfig;

  public constructor(args) {
    const config = this.config = args.config;
    this.initManage(args);
    this.initBuild(args);
    this.initEditor(args);
  }

  /** @implements */
  public doChange(undoItems: UndoItem[]) {
    throw new Error('Method not implemented.');
  }

  public getUndoManage() {
    return this.undoManage;
  }

  /**
   * 初始化数据层
   * @param args 
   */
  private initBuild(args: WorkbenchArgs) {
    throw new Error('Method not implemented.');
  }

  /**
   * 初始化编辑层
   * @param args 
   */
  private initEditor(args: WorkbenchArgs) {
    throw new Error('Method not implemented.');
  }

  private initManage(args: WorkbenchArgs) {
    const config = this.config = args.config;
    if (config.undoManage) {
      config.undoManage.setWorkBench(this);
    }
    this.undoManage = config.undoManage || new UndoManage({
      workbench: this
    });
  }
}
export interface RichTextConfig {
  dom: HTMLDivElement;

  metaInfo: RichTextBuildArgs;

  undoManage: UndoManage;
}

/**
 * RichText类入口
 */
export class RichText {

  private dom: HTMLDivElement;



  public constructor(config: RichTextConfig) {
    this.dom = config.dom;
  }
}