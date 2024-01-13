import List from "void-list";
import { JSObj } from "../lib/types.js";

export class Metal {
    public name: string;
    public tier: number;
    public types: string[];
    public heat_capacity_base: number;
    public melt_temperature: number;
    public color: string;
    public melt_into: string[];

    constructor(name: string, tier: number, types: string[], heat_capacity_base: number, melt_temp: number, color: string, melt_into: string[]= []) {
        this.name = name;
        this.tier = tier;
        this.types = types;
        this.heat_capacity_base = heat_capacity_base;
        this.melt_temperature = melt_temp;
        this.color = color;
        this.melt_into = melt_into;
    }

    get specific_heat_capacity(): number {
        return Math.round(300 / this.heat_capacity_base) / 100000;
    }

    get ingot_heat_capacity() {
        return 1 / this.heat_capacity_base;
    }
}

export class MetalItem {
    public type: string;
    public smelt_amount: number;
    public parent_model: string;
    public mold: boolean;
    public durability: boolean;
    public tag: string;

    constructor(type: string, smelt_amount: number, parent_model: string, tag: string, mold: boolean=false, durability: boolean=false) {
        this.type = type;
        this.smelt_amount = smelt_amount;
        this.parent_model = parent_model;
        this.tag = tag;
        this.mold = mold;
        this.durability = durability;
    }
}

export class Ore {
    name: string;
    graded: boolean;
    metal: string;

    constructor(name: string, graded: boolean=false, metal: string=null) {
        this.name = name;
        this.graded = graded;
        this.metal = metal;
    }
}

export class Rock {
    name: string
    category: RockCategory
    sand_type: string

    constructor(name: string, category: RockCategory, sand_type: string) {
        this.name = name;
        this.category = category;
        this.sand_type = sand_type;
    }
}

export enum RockCategory {
    igneous_intrusive='igneous_intrusive',
    igneous_extrusive='igneous_extrusive',
    sedimentary='sedimentary',
    metamorphic='metamorphic'
}

export const AllRocks: List<Rock> = List.from(
    new Rock('granite', RockCategory.igneous_intrusive, 'white'),
    new Rock('diorite', RockCategory.igneous_intrusive, 'white'),
    new Rock('gabbro', RockCategory.igneous_intrusive, 'black'),
    new Rock('shale', RockCategory.sedimentary, 'black'),
    new Rock('claystone', RockCategory.sedimentary, 'brown'),
    new Rock('limestone', RockCategory.sedimentary, 'white'),
    new Rock('conglomerate', RockCategory.sedimentary, 'green'),
    new Rock('dolomite', RockCategory.sedimentary, 'black'),
    new Rock('chert', RockCategory.sedimentary, 'yellow'),
    new Rock('chalk', RockCategory.sedimentary, 'white'),
    new Rock('rhyolite', RockCategory.igneous_extrusive, 'red'),
    new Rock('basalt', RockCategory.igneous_extrusive, 'red'),
    new Rock('andesite', RockCategory.igneous_extrusive, 'red'),
    new Rock('dacite', RockCategory.igneous_extrusive, 'red'),
    new Rock('quartzite', RockCategory.metamorphic, 'white'),
    new Rock('slate', RockCategory.metamorphic, 'brown'),
    new Rock('phyllite', RockCategory.metamorphic, 'brown'),
    new Rock('schist', RockCategory.metamorphic, 'green'),
    new Rock('gneiss', RockCategory.metamorphic, 'green'),
    new Rock('marble', RockCategory.metamorphic, 'yellow')
);

export const IgneousExtrusiveRocks: List<Rock> = AllRocks.filter(rock => rock.category == RockCategory.igneous_extrusive);
export const IgneousIntrusiveRocks: List<Rock> = AllRocks.filter(rock => rock.category == RockCategory.igneous_intrusive);
export const SedimentaryRocks: List<Rock> = AllRocks.filter(rock => rock.category == RockCategory.sedimentary);
export const MetamorphicRocks: List<Rock> = AllRocks.filter(rock => rock.category == RockCategory.metamorphic);

export const MetallumOres: List<Ore> = List.from(
    new Ore('bauxite', true, 'aluminum'),
    new Ore('bertrandite', true, 'beryllium'),
    new Ore('certus_quartz'),
    new Ore('cobaltite', true, 'cobalt'),
    new Ore('galena', true, 'lead'),
    new Ore('kernite', true, 'boron'),
    new Ore('native_iridium', true, 'iridium'),
    new Ore('native_platinum', true, 'platinum'),
    new Ore('native_osmium', true, 'osmium'),
    new Ore('monazite', true, 'thorium'),
    new Ore('rutile', true, 'titanium'),
    new Ore('stibnite', true, 'antimony'),
    new Ore('uraninite', true, 'uranium'),
    new Ore('wolframite', true, 'tungsten')
);

export const MetallumMetals: List<Metal> = List.from(
    new Metal('andesite_alloy', 2, ['part'], 0.25, 520, '0xC9CABA'),
    new Metal('antimony', 1, ['part'], 0.25, 630, '0xf4f4f'),
    new Metal('alnico', 3, ['part'], 0.35, 1500, '0xD87F36'),
    new Metal('aluminum', 3, ['part', 'tool'], 0.3, 660, '0xe3f7f'),
    new Metal('boron', 3, ['part', 'tool'], 0.3, 1535, '0x5c545'),
    new Metal('beryllium', 3, ['part'], 0.35, 1200, '0xf6ffc'),
    new Metal('beryllium_copper', 3, ['part', 'tool'], 0.35, 1500, '0xffa67'),
    new Metal('blutonium', 6, ['part'], 0.35, 1500, '0x58a1c'),
    new Metal('constantan', 2, ['part'], 0.5, 1200, '0xfce7b'),
    new Metal('cobalt', 3, ['part', 'tool'], 0.25, 1500, '0x59a6e'),
    new Metal('compressed_iron', 3, ['part', 'tool'], 0.35, 1535, '0xbdbdb'),
    new Metal('electrum', 2, ['part'], 0.5, 1200, '0xfbfbb'),
    new Metal('platinum', 5, ['part'], 0.35, 1730, '0x9CB8BF'),
    new Metal('enderium', 5, ['part', 'tool'], 0.35, 1700, '0x76f0e'),
    new Metal('ferroboron', 6, ['part', 'tool'], 0.3, 1535, '0x6f737'),
    new Metal('florentine_bronze', 3, ['part', 'tool'], 0.35, 400, '0xAA924C'),
    new Metal('graphite', 3, ['part'], 0.35, 500, '0x81808'),
    new Metal('invar', 3, ['part', 'tool'], 0.35, 1450, '0xdbdcc'),
    new Metal('iridium', 3, ['part'], 0.35, 1535, '0xe8f9f'),
    new Metal('lead', 1, ['part'], 0.22, 328, '0x72798'),
    new Metal('lumium', 4, ['part', 'tool'], 0.35, 1500, '0xfff1a'),
    new Metal('mithril', 2, ['part', 'tool'], 0.35, 940, '0x89d9f'),
    new Metal('nickel_silver', 2, ['part', 'tool'], 0.35, 1450, '0xa4a3a'),
    new Metal('osmium', 3, ['part', 'tool'], 0.35, 1535, '0xddeff'),
    new Metal('osmiridium', 3, ['part', 'tool'], 0.35, 1500, '0xb2c1c'),
    new Metal('pewter', 2, ['part', 'tool'], 0.35, 1500, '0xb0aba'),
    new Metal('pink_slime', 3, ['part'], 0.35, 1000, '0xC279B6'),
    new Metal('refined_glowstone', 4, ['part', 'tool'], 0.35, 1500, '0xfffdc'),
    new Metal('refined_obsidian', 4, ['part', 'tool'], 0.35, 1500, '0xbc92d'),
    new Metal('signalum', 4, ['part', 'tool'], 0.35, 1500, '0xffc78'),
    new Metal('solder', 3, ['part'], 0.35, 400, '0x888888'),
    new Metal('thorium', 3, ['part', 'tool'], 0.3, 1535, '0x787b7'),
    new Metal('titanium', 3, ['part', 'tool'], 0.3, 1535, '0xd8dae'),
    new Metal('tungsten', 3, ['part', 'tool'], 0.2, 1535, '0x97a3b'),
    new Metal('tungsten_steel', 4, ['part', 'tool'], 0.2, 1535, '0x555e6'),
    new Metal('tungsten_steel', 4, [], 0.2, 1535, '0x555e6'),
    new Metal('uranium', 3, ['part', 'tool'], 0.35, 1100, '0xf0f39')
);

export const TFCMetals: List<Metal> = List.from(
    new Metal('bismuth', 1, ['part'], 0.14, 270, '0x486B72'),
    new Metal('bismuth_bronze', 2, ['part', 'tool'], 0.35, 985, '0x418EAF'),
    new Metal('black_bronze', 2, ['part', 'tool'], 0.35, 1070, '0x418EAF'),
    new Metal('brass', 1, ['part'], 0.35, 930, '0x96892E'),
    new Metal('bronze', 2, ['part', 'tool'], 0.35, 950, '0x7C5E33'),
    new Metal('copper', 1, ['part', 'tool'], 0.35, 1080, '0xB64027'),
    new Metal('gold', 1, ['part'], 0.6, 1060, '0xDCBF1B'),
    new Metal('nickel', 1, ['part'], 0.48, 1453, '0x4E4E3C'),
    new Metal('rose_gold', 1, ['part'], 0.35, 960, '0xEB7137'),
    new Metal('silver', 1, ['part'], 0.48, 961, '0x949495'),
    new Metal('tin', 1, ['part'], 0.14, 230, '0x90A4BB'),
    new Metal('zinc', 1, ['part'], 0.21, 420, '0xBBB9C4'),
    new Metal('sterling_silver', 1, ['part'], 0.35, 900, '0xAC927B'),
    new Metal('wrought_iron', 3, ['part', 'tool'], 0.35, 1535, '0x989897'),
    new Metal('cast_iron', 1, ['part'], 0.35, 1535, '0x989897'),
    new Metal('pig_iron', 3, [], 0.35, 1535, '0x6A595C'),
    new Metal('steel', 4, ['part', 'tool'], 0.35, 1540, '0x5F5F5F'),
    new Metal('black_steel', 5, ['part', 'tool'], 0.35, 1485, '0x111111'),
    new Metal('blue_steel', 6, ['part', 'tool'], 0.35, 1540, '0x2D5596'),
    new Metal('red_steel', 6, ['part', 'tool'], 0.35, 1540, '0x700503'),
    new Metal('weak_steel', 4, [], 0.35, 1540, '0x111111'),
    new Metal('weak_blue_steel', 5, [], 0.35, 1540, '0x2D5596'),
    new Metal('weak_red_steel', 5, [], 0.35, 1540, '0x700503'),
    new Metal('high_carbon_steel', 3, [], 0.35, 1540, '0x111111'),
    new Metal('high_carbon_black_steel', 4, [], 0.35, 1540, '0x111111'),
    new Metal('high_carbon_blue_steel', 5, [], 0.35, 1540, '0x2D5596'),
    new Metal('high_carbon_red_steel', 5, [], 0.35, 1540, '0x700503'),
    new Metal('unknown', 6, [], 0.35, 1540, '0x2F2B27')
)

export const FirmalifeMetals: List<Metal> = List.from(
    new Metal('chromium', 4, ['part'], 0.35, 1250, ''),
    new Metal('stainless_steel', 4, ['part'], 0.35, 1540, '')
)

export const ALLMetals = {
    'tfc': TFCMetals,
    'tfc_metallum': MetallumMetals,
    'firmalife': FirmalifeMetals
}

export const TFC_Metal_Items = {
    'ingot': new MetalItem('all', 100, 'item/generated', 'forge:ingots', true, false),
    'double_ingot': new MetalItem('part', 200, 'item/generated', 'forge:double_ingots', false, false),
    'sheet': new MetalItem('part', 200, 'item/generated', 'forge:sheets', false, false),
    'double_sheet': new MetalItem('part', 400, 'item/generated', 'forge:double_sheets', false, false),
    'rod': new MetalItem('part', 50, 'item/generated', 'forge:rods', false, false),

    'tuyere': new MetalItem('tool', 400, 'item/generated', 'forge:tuyeres', false, true),
    'fish_hook': new MetalItem('tool', 200, 'item/generated', null, false, false),
    'fishing_rod': new MetalItem('tool', 200, 'item/generated', 'forge:fishing_rods', false, true),
    'pickaxe': new MetalItem('tool', 100, 'item/handheld', null, false, true),
    'pickaxe_head': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'shovel': new MetalItem('tool', 100, 'item/handheld', null, false, true),
    'shovel_head': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'axe': new MetalItem('tool', 100, 'item/handheld', null, false, true),
    'axe_head': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'hoe': new MetalItem('tool', 100, 'item/handheld', null, false, true),
    'hoe_head': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'chisel': new MetalItem('tool', 100, 'item/handheld', null, false, true),
    'chisel_head': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'sword': new MetalItem('tool', 200, 'item/handheld', null, false, true),
    'sword_blade': new MetalItem('tool', 200, 'item/generated', null, true, false),
    'mace': new MetalItem('tool', 200, 'item/handheld', null, false, true),
    'mace_head': new MetalItem('tool', 200, 'item/generated', null, true, false),
    'saw': new MetalItem('tool', 100, 'tfc:item/handheld_flipped', null, false, true),
    'saw_blade': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'javelin': new MetalItem('tool', 100, 'item/handheld', null, false, true),
    'javelin_head': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'hammer': new MetalItem('tool', 100, 'item/handheld', null, false, true),
    'hammer_head': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'propick': new MetalItem('tool', 100, 'item/handheld', null, false, true),
    'propick_head': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'knife': new MetalItem('tool', 100, 'tfc:item/handheld_flipped', null, false, true),
    'knife_blade': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'scythe': new MetalItem('tool', 100, 'item/handheld', null, false, true),
    'scythe_blade': new MetalItem('tool', 100, 'item/generated', null, true, false),
    'shears': new MetalItem('tool', 200, 'item/handheld', null, false, true),

    'unfinished_helmet': new MetalItem('armor', 400, 'item/generated', null, false, false),
    'helmet': new MetalItem('armor', 600, 'item/generated', null, false, true),
    'unfinished_chestplate': new MetalItem('armor', 400, 'item/generated', null, false, false),
    'chestplate': new MetalItem('armor', 800, 'item/generated', null, false, true),
    'unfinished_greaves': new MetalItem('armor', 400, 'item/generated', null, false, false),
    'greaves': new MetalItem('armor', 600, 'item/generated', null, false, true),
    'unfinished_boots': new MetalItem('armor', 200, 'item/generated', null, false, false),
    'boots': new MetalItem('armor', 400, 'item/generated', null, false, true),

    'shield': new MetalItem('shield', 400, 'item/handheld', null, false, true)
}

export const Metalwork_Items = {
    'dust': new MetalItem('part', 100, 'item/generated', 'forge:dusts', false),
    'plate': new MetalItem('part', 100, 'item/generated', 'forge:plates', false),
    'large_plate': new MetalItem('part', 200, 'item/generated', 'forge:large_plates', false),
    'small_gear': new MetalItem('part', 200, 'item/generated', 'forge:gears', false),
    'large_gear': new MetalItem('part', 600, 'item/generated', 'forge:large_gears', false),
    'large_rod': new MetalItem('part', 150, 'item/generated', 'forge:large_rods', false)
}

export const Metalwork_Blocks = {
    'block': new MetalItem('part', 400, 'item/generated', 'forge:storage_blocks', false),
    'cut': new MetalItem('part', 400, 'item/generated', 'tfc_metalwork:cut', false),
    'oxidized': new MetalItem('part', 400, 'item/generated', 'forge:storage_blocks', false),
    'oxidized_cut': new MetalItem('part', 400, 'item/generated', 'tfc_metalwork:cut', false),
    'ladder': new MetalItem('part', 200, 'item/generated', 'tfc_metalwork:metal_ladders', false) 
}

export enum Rules {
    hit_any = 'hit_any',
    hit_not_last = 'hit_not_last',
    hit_last = 'hit_last',
    hit_second_last = 'hit_second_last',
    hit_third_last = 'hit_third_last',
    draw_any = 'draw_any',
    draw_last = 'draw_last',
    draw_not_last = 'draw_not_last',
    draw_second_last = 'draw_second_last',
    draw_third_last = 'draw_third_last',
    punch_any = 'punch_any',
    punch_last = 'punch_last',
    punch_not_last = 'punch_not_last',
    punch_second_last = 'punch_second_last',
    punch_third_last = 'punch_third_last',
    bend_any = 'bend_any',
    bend_last = 'bend_last',
    bend_not_last = 'bend_not_last',
    bend_second_last = 'bend_second_last',
    bend_third_last = 'bend_third_last',
    upset_any = 'upset_any',
    upset_last = 'upset_last',
    upset_not_last = 'upset_not_last',
    upset_second_last = 'upset_second_last',
    upset_third_last = 'upset_third_last',
    shrink_any = 'shrink_any',
    shrink_last = 'shrink_last',
    shrink_not_last = 'shrink_not_last',
    shrink_second_last = 'shrink_second_last',
    shrink_third_last = 'shrink_third_last'
}

export enum Wood {
    acacia='acacia',
    ash='ash',
    aspen='aspen',
    birch='birch',
    blackwood='blackwood',
    chestnut='chestnut',
    douglas_fir='douglas_fir',
    hickory='hickory',
    kapok='kapok',
    maple='maple',
    mangrove='mangrove',
    oak='oak',
    palm='palm',
    pine='pine',
    rosewood='rosewood',
    sequoia='sequoia',
    spruce='spruce',
    sycamore='sycamore',
    white_cedar='white_cedar',
    willow='willow'
}

export const WoodTypes:List<Wood> = List.from(
    Wood.acacia, 
    Wood.ash, 
    Wood.aspen, 
    Wood.birch, 
    Wood.blackwood,
    Wood.chestnut, 
    Wood.douglas_fir, 
    Wood.hickory, 
    Wood.kapok, 
    Wood.maple,
    Wood.mangrove,
    Wood.oak,
    Wood.palm,
    Wood.pine,
    Wood.rosewood,
    Wood.sequoia,
    Wood.spruce,
    Wood.sycamore,
    Wood.white_cedar,
    Wood.willow
); 