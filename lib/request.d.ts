export interface IResponse {
    headers: any;
    data: string;
    statusCode: number;
}
declare const _default: {
    get: (options?: any) => Promise<IResponse>;
    post: (options: any, postData: string) => Promise<IResponse>;
};
export default _default;
//# sourceMappingURL=request.d.ts.map