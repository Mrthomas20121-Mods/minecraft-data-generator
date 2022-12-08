import List from "void-list";
import { Builder } from "./builder-base.js";
export class RecipeBuilderBase extends Builder {
    name;
    pattern = new List();
    constructor(name) {
        super();
        this.name = name;
    }
}
export class ShapedRecipeBuilder extends RecipeBuilderBase {
    elementMap;
    constructor(name) {
        super(name);
        this.elementMap = {};
    }
    add(e, item) {
        if (this.pattern.isEmpty()) {
            throw new RangeError('pattern is empty! please run setPattern() first');
        }
        else if (!this.pattern.contain(e)) {
            throw new RangeError(`pattern does not contain string ${e}`);
        }
        this.elementMap[e] = item;
        return this;
    }
    setPattern(...pattern) {
        this.pattern = List.fromArray(pattern);
        return this;
    }
    build() {
        return {};
    }
}
