export type ExMetal = {
    name: string,
    tier: number,
    specific_heat_base: number,
    melt_temp: number,
    ingot_heat_capacity: number,
    specific_heat: number,
    color: string,
    hasToolArmor: boolean,
    hasParts: boolean
}

export type Ore = {
    name: string,
    isGraded: boolean,
    metal: string,
    metalTemp?: number
}

export type Stone = {
    category: string,
    name: string
}