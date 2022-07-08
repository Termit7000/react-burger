export type TUser = {
    readonly email: string;
    readonly name: string;
}

export type TTokens = {
    accessToken: string;
    refreshToken: string;
}

export type TIngredients = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
    count?: number;
}

//Описывает ингредиент в конструкторе
export type TConstructorItem = {
    readonly id: string;
    readonly itemKey: string;
}

export type TOrderID = number;