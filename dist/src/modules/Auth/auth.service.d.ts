import { ILogin } from "./auth.interface";
declare const loginUser: (payload: ILogin) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
declare const refreshToken: (refreshToken: string) => Promise<{
    accessToken: string;
}>;
export declare const authService: {
    loginUser: typeof loginUser;
    refreshToken: typeof refreshToken;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map