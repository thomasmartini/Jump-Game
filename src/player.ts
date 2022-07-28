import * as PIXI from "pixi.js"

export class Player extends PIXI.Sprite {
    constructor(texture: PIXI.Texture){
        super(texture)
        this.width = 300
        this.height = 200
    }
}