import { TIngredients, TOrder } from "../../services/types"

export type TOrderComponentsProps = {
    readonly ingredients: ReadonlyArray<string>;
}

export type TOrderItemProps = Pick<
    TOrder, 
    'ingredients' | 'name' | 'createdAt' | 'number' | 'status'>;