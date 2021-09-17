import { RichTextBuild, RichTextMeta } from './build/RichTextBuild';
import { RichTextEditor } from './editor/RichTextEditor';
import { IWorkBench, UndoItem, UndoManage, BaseBuild } from './flow/UndoManager';
import { PluginBuild } from './build/PluginBuild';
import { PluginEditor } from './editor/PluginEditor';
import BaseEditor from './editor/BaseEditor';

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

  public load() {
    this.editor.requestRender();
  }

  /**
   * 初始化数据层
   * @param args 
   */
  private initBuild(args: WorkbenchArgs) {
    this.build = new RichTextBuild({
      metaInfo: args.config.metaInfo
    });
  }

  /**
   * 初始化编辑层
   * @param args 
   */
  private initEditor(args: WorkbenchArgs) {
    this.editor = new RichTextEditor({
      build: this.build,
      workbench: this,
    });
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

/**
 * M元数据类型
 * T数据层
 * S编辑器层
 */
interface RichTextPlugin<M, T extends PluginBuild<M>, S extends PluginEditor<M>> {
  [key: string]: {
    build: T;
    editor: S;
  }
}
export interface RichTextConfig {
  dom: HTMLDivElement;

  metaInfo: RichTextMeta;

  plugins: RichTextPlugin<JSONObject, BaseBuild<JSONObject>, BaseEditor<JSONObject>>[];

  undoManage?: UndoManage;
}

/**
 * RichText类入口
 */
export class RichText {

  private workbench: Workbench;

  public constructor(config: RichTextConfig) {
    this.workbench = new Workbench({
      config
    });
    (window as any).workbench = this.workbench;
  }

  public load() {
    this.workbench.load();
  }

  public getWorkbench() {
    return this.workbench;
  }
}