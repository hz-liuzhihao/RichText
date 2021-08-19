/**
 * undo管理器入参
 */
export interface UndoManagerArgs {
  /**
   * 数据层管理的顶层App,用来消费undoManage进行的undo/redo/用户操作等产生的数据
   */
  // app: UndoComp;

  /**
   * UI层管理的顶层应用,用来消费产生的undoItem进行局部渲染
   */
  editor?: UndoCompEditor;
}

/**
 * 基本操作类型
 */
export enum Operate {
  /**
   * 添加操作
   */
  Add = 1,
  /**
   * 修改操作
   */
  Modify = 2,
  /**
   * 删除操作
   */
  Remove = 3,
};

/**
 * 每一个操作产生的undoItem
 */
export interface UndoItem {

  /**
   * 操作属性
   */
  p?: string;

  /**
   * 操作值
   */
  v?: any;

  /**
   * 操作的undo组件,组件自己去处理undo操作
   */
  c: UndoCompBuild;

  /**
   * 操作类型
   */
  op: Operate;

  /**
   * 移除之后的索引
   */
  i?: number;

  /**
   * undo/redo携带的其他信息
   */
  otherInfo?: JSONObject;
}

/**
 * 需要进行undo/redo的时候调用undoItem
 */
export interface UndoCompBuild {
  /**
   * 每一个undo组件都应该去实现onChange方法,这样在undo时只需要让组件自己去处理undo操作
   */
  onChange: (item: UndoItem) => void;
}

/**
 * undoItem产生后交付给UI层进行自行消费
 */
export interface UndoCompEditor {
  onChange: (items: UndoItem[]) => void;
}

/**
 * undo管理器
 */
export class UndoManager<T extends UndoItem> {
  private undoItems: Array<T[]>;

  private redoItems: Array<T[]>;

  /**
   * 是否正在undo
   */
  private isUndo: boolean;

  /**
   * 操作计数器
   */
  private counter: number = 0;

  private currentItem: T[];

  private editor: UndoCompEditor;

  public constructor(args: UndoManagerArgs) {
    this.undoItems = [];
    this.redoItems = [];
    this.isUndo = false;
    args.editor && (this.editor = args.editor);
  }

  /**
   * 开始操作
   */
  public beginOperator() {
    // 在每次开始记录用户操作时,重置当前item记录列表
    if (this.counter === 0) {
      this.currentItem = [];
    }
    this.counter++;
  }

  /**
   * 结束操作
   */
  public endOperator() {
    if (this.counter > 0) {
      this.counter--;
    }
    // 当最后一个操作结束时,进行记载
    if (this.counter === 0) {
      if (this.isUndo) {
        // 如果正在undo则需要将当前操作项压入到redo栈中
        this.redoItems.push(this.currentItem);
      } else {
        this.undoItems.push(this.currentItem);
        // 每次用户进行操作时需要将redoItems置为空
        this.redoItems.length = 0;
      }
      // 当有UI层需要对数据层的修改做出变更时则处理
      this.editor && this.editor.onChange(this.currentItem);
      this.currentItem = [];
    }
  }

  /**
   * redo操作
   */
  public redo() {
    if (this.redoItems.length === 0) {
      return;
    }
    const items = this.redoItems.shift();
    if (items) {
      items.forEach(item => {
        const c = item.c;
        c.onChange(item);
      });
    }
  }

  /**
   * undo操作
   */
  public undo() {
    if (this.undoItems.length === 0) {
      return;
    }
    const items = this.undoItems.shift();
    if (items) {
      this.isUndo = true;
      items.forEach(item => {
        const c = item.c;
        c.onChange(item);
      });
      this.isUndo = false;
    }
  }

  /**
   * 是否可以重做
   */
  public canRedo() {
    return this.redoItems.length > 0;
  }

  /**
   * 是否正在undo/redo
   */
  public isUndoRedo() {
    return this.isUndo;
  }

  /**
   * 是佛可以撤销
   */
  public canUndo() {
    return this.undoItems.length > 0;
  }

  /**
   * 存储undoItem
   * @param item 
   */
  public storeUndoItem(item: T) {
    if (this.counter === 0) {
      console.warn('非法操作,记录用户的操作行为必须使用beginOperator和endOperator进行包裹');
      return;
    }
    this.currentItem.push(item);
  }

  /**
   * 设置需要根据数据层更新的UI
   * @param editor 
   */
  public setUndoCompEditor(editor: UndoCompEditor) {
    this.editor = editor
  }
}