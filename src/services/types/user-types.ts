export type TUser = {
    readonly email: string;
    readonly name: string;
}

export type TTokens = {
    accessToken: string;
    refreshToken: string;
}

export type TUserInfo = TUser & {
    password: string
}

export type TLogin = {
    email: string,
    password: string
}

export type TUserWitnTokens = TTokens & {
    user: TUser;
}

export type TEmail = {
    email: string;
}

export type TResetPass = {
    password: string,
    token: string
}