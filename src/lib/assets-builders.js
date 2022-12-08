import List from "void-list";
import { Builder } from "./builder-base.js";
export class BlockModelBuilder extends Builder {
    parent;
    textureMap = new List();
    constructor() {
        super();
        this.parent = '';
    }
    setParent(parent) {
        this.parent = parent;
        return this;
    }
    setTexture(texture) {
        this.textureMap.add(texture);
        return this;
    }
    setTextures(textures) {
        this.textureMap = this.textureMap.fromArray(textures);
        return this;
    }
    build() {
        let obj = {};
        this.textureMap.forEach((value, i) => {
            obj[`layer${i}`] = value;
            return false;
        });
        return {
            parent: this.parent,
            textures: obj
        };
    }
}
export class ItemModelBuilder extends BlockModelBuilder {
    setParent(parent) {
        super.setParent(parent);
        return this;
    }
    setTexture(texture) {
        super.setTexture(texture);
        return this;
    }
    setTextures(textures) {
        super.setTextures(textures);
        return this;
    }
}
// use this one to add a item model to your block. use the ItemModelBuilder if you want the block to have the look of an item.
export class ItemBlockBuilder extends Builder {
    parent;
    constructor() {
        super();
        this.parent = '';
    }
    setParent(parent) {
        this.parent = parent;
        return this;
    }
    build() {
        return {
            parent: this.parent
        };
    }
}
