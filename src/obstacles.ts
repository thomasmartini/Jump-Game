import * as PIXI from 'pixi.js'

export class Obstacle extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = -200
        this.y = 670
    }
    update(){
      this.x +=3
    }
}