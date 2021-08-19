import '../global.css';

export interface ComponentArgs {

  /**
   * 父元素
   */
  domParent?: HTMLElement;

  /**
   * 分组组件,常用于组件嵌套时的查找
   */
  group?: string;

  /**
   * 是否禁用
   */
  disabled?: boolean;
}

/**
 * 所有组件的基类
 * 1. 数据驱动组件的基类;
 * 2. 普通组件的基类;
 * 3. 组件基类不处理任何数据逻辑,只处理整个渲染的前后逻辑;
 * 4. 主元素的__comp__属性会绑定当前组件对象,便于查找和调试;
 */
export abstract class Component {
  /**
   * 组件的主dom
   */
  protected mainDom: HTMLElement;

  /**
   * 组件的父元素
   */
  protected domParent: HTMLElement;

  /**
   * 渲染promise
   */
  protected renderPromise: Promise<void>;

  /**
   * 组件分组
   */
  protected group: string;

  /**
   * 是否禁用
   */
  private disabled: boolean;

  public constructor(args: ComponentArgs) {
    this.domParent = args.domParent;
    this.group = args.group;
    this.disabled = args.disabled;
    this.initData(args);
    this.initEvent(args);
    this.createMainDom(args);
    this.initDom(args);
    this.mainDom.__comp__ = this;
  }

  /**
   * 等待组件渲染
   */
  public waitRender(): Promise<void> {
    return this.renderPromise || Promise.resolve();
  }

  /**
   *  请求渲染
   */
  public requestRender(): Promise<void> {
    // 在下次重绘前进行渲染
    if (this.renderPromise) {
      return this.renderPromise;
    }
    let promiseResolve: () => void;
    this.renderPromise = new Promise((resolve) => {
      promiseResolve = resolve;
    });
    requestAnimationFrame(() => {
      this.render();
      if (!this.mainDom.parentElement) {
        this.domParent.appendChild(this.mainDom);
      }
      promiseResolve();
      this.renderPromise = null;
    });
    return this.renderPromise;
  }

  /**
   * 添加样式类
   * @param name 
   */
  public addClass(name: string): void {
    const { mainDom } = this;
    if (!mainDom.classList.contains(name)) {
      this.mainDom.classList.add(name);
    }
  }

  /**
   * 移除样式类
   * @param name 
   */
  public removeClass(name: string): void {
    const { mainDom } = this;
    if (mainDom.classList.contains(name)) {
      this.mainDom.classList.remove(name);
    }
  }

  /**
   * 转换样式类
   * @param name 
   */
  public toggleClass(name: string): void {
    const { mainDom } = this;
    mainDom.classList.toggle(name);
  }

  /**
   * 设置组件是否隐藏
   * @param visible 
   */
  public setVisible(visible: boolean) {
    const { mainDom } = this;
    const style = getComputedStyle(mainDom);
    if (style.display === 'none') {
      visible && (mainDom.style.display = '');
    } else {
      !visible && (mainDom.style.display = 'none');
    }
  }

  /**
   * 设置组件是否禁用
   * @param disabled 
   */
  public setDisabled(disabled: boolean) {
    const {mainDom} = this;
    if (disabled) {
      mainDom.classList.add('disabled');
    } else {
      mainDom.classList.remove('disabled');
    }
    this.disabled = disabled;
  }

  /**
   * 获取禁用状态
   */
  public getDisabled() {
    return this.disabled;
  }

  /**
   * 获取组件分组
   */
  public getGroup() {
    return this.group;
  }

  /**
   * 组件是否隐藏
   */
  public isVisible() {
    const { mainDom } = this;
    return mainDom.style.display !== 'none';
  }

  /**
   * 销毁
   * 1. 在当前组件进行销毁时，需要将引用dom的指针置为空,否则dom可能不会被浏览器的GC进行垃圾收回;
   * 2. 子类在执行destory方法时,必须先将子类的相关事件和应用进行处理,再调用父类的destory方法,否则会出现空指针的问题
   */
  public destory() {
    if (this.mainDom) {
      this.domParent = null;
      this.mainDom = null;
    }
  }

  public getMainDom() {
    return this.mainDom;
  }

  /**
   * 默认创建主dom的逻辑
   */
  protected createMainDom(args: ComponentArgs): void {
    this.mainDom = document.createElement('div');
    this.mainDom.classList.add(this.constructor.name.toLowerCase() + '-main');
  }

  protected abstract initData(args: ComponentArgs): void;

  /**
   * 初始化事件,将对象中的事件绑定到当前对象bind(this)
   */
  protected abstract initEvent(args: ComponentArgs): void;

  protected abstract initDom(args: ComponentArgs): void;

  protected abstract render(): void;

  /**
   * 更换父元素
   * @param dom 
   */
  protected setDomParent(dom: HTMLElement): void {
    const { mainDom } = this;
    if (mainDom.parentElement !== dom) {
      dom.appendChild(mainDom);
    }
  }
}