import List from "void-list";
import { Builder } from "./builder-base.js";
import { Ingredient, JSObj } from "./types.js";

export abstract class RecipeBuilderBase<T> extends Builder {

    protected name: string;
    protected pattern: List<string> = new List();

    constructor(name: string) {
        super()
        this.name = name;
    }

    abstract setPattern(...pattern: string[]): T;
}

export class ShapedRecipeBuilder extends RecipeBuilderBase<ShapedRecipeBuilder> {

    private elementMap: JSObj

    constructor(name: string) {
        super(name)
        this.elementMap = {}
    }

    add(e: string, item: Ingredient): ShapedRecipeBuilder {
        if(this.pattern.isEmpty()) {
            throw new RangeError('pattern is empty! please run setPattern() first')
        }
        else if(!this.pattern.contain(e)) {
            throw new RangeError(`pattern does not contain string ${e}`)
        }

        this.elementMap[e] = item

        return this
    }

    setPattern(...pattern: string[]): ShapedRecipeBuilder {
        this.pattern = List.fromArray(pattern);
        return this
    }

    build(): object {
        return {};
    }
}