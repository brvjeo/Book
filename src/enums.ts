export enum AVATAR_SIZE {
    S = 'avatar-size_S',
    M = 'avatar-size_M',
    L = 'avatar-size_L'
}

export enum BUTTON_SIZE {
    S = 'button-size_S',
    M = 'button-size_M',
    L = 'button-size_L'
}

export enum INPUT_SIZE {
    S = 'input-size_S',
    L = 'input-size_L'
}

export enum AUTH_ERRORS {
    wrongPassword = 'WRONG_PASSWORD',
    noSuchUser = 'USER_DOES_NOT_EXIST',
    userExists = 'USER_EXISTS'
}

export enum DATABASE_ERRORS{
    invalidArticle = "ARTICLE IS INVALID OR DOES NOT EXIST",
    invalidUser = "USER IS INVALID OR DOES NOT EXIST",
    accessDenied = "NO ACCESS TO WRITE IN DATABASE"
}

export enum DB_ROUTES {
    users = 'users',
    articles = 'articles',
    content = 'content'
}

export enum CONTENT_TYPE{
    paragraph,
    title
}