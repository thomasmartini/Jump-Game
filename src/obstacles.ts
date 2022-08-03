import * as PIXI from 'pixi.js'

export class Obstacle extends PIXI.Sprite{
    public constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = -200
        this.y = 800
        this.width = 100
        this.height = 150
    }
    public update(){
      this.x +=5
    }
}