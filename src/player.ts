import * as PIXI from "pixi.js"

export class Player extends PIXI.Sprite {
    fallSpeed = 0.1
    xspeed = 0
    keyPressed = false
    public constructor(texture: PIXI.Texture){
        super(texture)
        this.width = 300
        this.height = 200
        this.x = screen.width / 1.5  
        window.addEventListener("keydown", (e) => this.checkSpace(e))
        window.addEventListener("keyup", (e) => this.releaseSpace(e))
    }
    public update(collide: boolean) {
        this.x += this.xspeed
        this.y += this.fallSpeed
        
    if(collide){
        this.fallSpeed = 0
        if(collide && this.keyPressed){
        this.y -= 400
        }
    }else{
        this.fallSpeed += 0.05
    }
}
private checkSpace(e:KeyboardEvent) {
    if(e.key === " " && !this.keyPressed) {     
        this.keyPressed = true
    }
}
private releaseSpace(e: KeyboardEvent) {
    if (e.key === " ") {
        this.keyPressed = false
    }  
}
}