import { TIngredients } from "../../services/types";

export type TGroupIngredientsByCount = {
    [key: string] : TIngredients & Required<Pick<TIngredients, 'count'>>;
};