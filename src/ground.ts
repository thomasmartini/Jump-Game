import * as PIXI from 'pixi.js'

export class Ground extends PIXI.TilingSprite{
    public constructor(texture: PIXI.Texture) {
        super(texture)
        this.width =  window.screen.width
        this.height = 160
        this.y = window.screen.height - this.height
    }
    public update(){
        this.tilePosition.x += 5
    }
}