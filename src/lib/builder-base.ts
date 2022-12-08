import { JSObj } from "./types.js";

export abstract class Builder {
    abstract build(): JSObj;
}