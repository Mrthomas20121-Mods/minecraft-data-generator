export type ItemStack = {
    item: string,
    count?: number
};

export type Ingredient = ItemStack | {
    tag: string,
    count?: number
};

export type JSObj = {
    [any: string]: any
}