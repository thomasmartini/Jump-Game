import * as PIXI from 'pixi.js'

export class Obstacle extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = -200
        this.y = 800
        this.width = 100
        this.height = 150
    }
    update(){
      this.x +=5
    }
}