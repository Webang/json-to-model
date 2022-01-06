interface InputType {
    [index: string]: any;
}
interface CustomType {
    path: string;
    name: string;
    inject: boolean;
    extract: boolean;
}
export declare function jsonToModel(obj: InputType, customPath?: CustomType[]): string;
export {};
