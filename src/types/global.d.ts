declare module '*.png' {
    const value: string
    export = value
}

declare module '*.mp4' {
    const content: string
    export = content
}

declare module '*.css' {
    const content: string;
    export default content;
}

declare module '*.less' {
    const content: JSONObject;
    export default content;
}

interface Element {
    __build__: any;
}

interface JSONObject {
    [key: string]: any;
}

/**
 * 位置信息
 */
interface AppPosition {
    x: number;

    y: number;
}