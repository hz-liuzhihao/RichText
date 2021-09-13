import { BaseBuild, IWorkBench, UndoItem } from '../flow/UndoManager';
export interface BaseEditorArgs {
  build: BaseBuild<any>;

  workbench: IWorkBench;

  domParent?: HTMLElement;

  type?: keyof HTMLElementTagNameMap;
}

export default abstract class BaseEditor<T> {

  protected build: BaseBuild<T>;

  protected workbench: IWorkBench;

  protected mainDom: HTMLElement;

  protected parentDom: HTMLElement;

  protected mainClassName: string;

  protected renderPromise: Promise<void>;

  protected renderUndoPromise: Promise<void>;

  protected needRenderUndoItems: UndoItem[];

  public constructor(args: BaseEditorArgs) {
    this.initData(args);
    this.initMainDom(args.type);
    this.initDom();
    if (args.domParent) {
      args.domParent.appendChild(this.mainDom);
    }
  }

  /**
   * 子类实现渲染方法,只有在元素还未插入到dom中时才能使用
   * @deprecated
   */
  public abstract render(): void;

  /**
   * 请求全量渲染
   * @returns 
   */
   public requestRender(): Promise<void> {
    if (this.renderPromise) {
      return this.renderPromise;
    }
    return this.renderPromise = new Promise(resolve => {
      requestAnimationFrame(() => {
        this.render();
        this.renderPromise = null;
        resolve();
      });
    });
  }

  /**
   * 请求渲染undoItem
   * @param undoItem 
   * @returns 
   */
  public requestRenderUndoItem(undoItem: UndoItem) {
    this.requestRenderChildrenUndoItem(undoItem);
    // 只渲染当前数据层有修改的
    if (typeof this.renderBuild == 'function') {
      this.renderBuild(undoItem);
    } else {
      if (undoItem.c !== this.build) {
        return;
      }
      this.needRenderUndoItems.push(undoItem);
    }
    if (this.renderPromise) {
      return this.renderPromise;
    }
    return this.renderUndoPromise = new Promise(resolve => {
      requestAnimationFrame(() => {
        this.renderUndoItem();
        this.renderUndoPromise = null;
        this.needRenderUndoItems = [];
        resolve();
      });
    });
  }

  /**
   * 获取主元素
   * @returns 
   */
   public getMainDom(): HTMLElement {
    return this.mainDom;
  }

  /**
   * 对元素进行销毁
   */
  public destroy(): void {
    this.mainDom.remove();
  }

  protected initData(args: BaseEditorArgs) {
    this.workbench = args.workbench;
    this.build = args.build;
    this.parentDom = args.domParent;
  }

  protected initMainDom(type = "div") {
    const mainDom = document.createElement(type);
    mainDom.__build__ = this.build;
    mainDom.classList.add(`${this.mainClassName.toLocaleLowerCase()}_main`);
  }

  protected abstract initDom(): void;

  protected abstract renderUndoItem(): void;

  

  /**
   * 渲染数据层
   * @param undoItem 
   */
  protected renderBuild?(undoItem: UndoItem): void;

  /**
   * 请求渲染子编辑器
   * 如果编辑器包含了子编辑器需要向下传递则调用此方法
   */
  // tslint:disable-next-line: no-empty
  protected requestRenderChildrenUndoItem(undoItem: UndoItem) {
  }
}