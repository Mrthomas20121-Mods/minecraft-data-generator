import List from "void-list";
import { Builder } from "./builder-base.js";
import { JSObj } from "./types.js";

export class BlockModelBuilder extends Builder {
    private parent: string;
    private textureMap: List<string> = new List<string>();

    constructor() {
        super()
        this.parent = ''
    }

    setParent(parent: string): BlockModelBuilder {
        this.parent = parent;
        return this;
    }

    setTexture(texture: string): BlockModelBuilder {
        this.textureMap.add(texture);
        return this;
    }

    setTextures(textures: string[]): BlockModelBuilder {
        this.textureMap = this.textureMap.fromArray(textures);
        return this;
    }

    build(): JSObj {
        let obj: JSObj = {}
        this.textureMap.forEach((value, i) => {
            obj[`layer${i}`] = value;
            return false;
        })
        return {
            parent:this.parent,
            textures: obj
        };
    }
}

export class ItemModelBuilder extends BlockModelBuilder {

    setParent(parent: string): ItemModelBuilder {
        super.setParent(parent);
        return this;
    }

    setTexture(texture: string): ItemModelBuilder {
        super.setTexture(texture);
        return this;
    }

    setTextures(textures: string[]): ItemModelBuilder {
        super.setTextures(textures);
        return this;
    }
}

// use this one to add a item model to your block. use the ItemModelBuilder if you want the block to have the look of an item.
export class ItemBlockBuilder extends Builder {
    private parent: string;

    constructor() {
        super()
        this.parent = ''
    }

    setParent(parent: string): ItemBlockBuilder {
        this.parent = parent;
        return this;
    }

    build(): object {
        return {
            parent:this.parent
        };
    }
}