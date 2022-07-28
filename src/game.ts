import * as PIXI from 'pixi.js'
import monkeyImage from "./images/monkey.png"
import bgImage from "./images/background.jpg"
import { Player } from './player'
import { Background } from './background'

export class Game { 
    pixi: PIXI.Application 
    loader:PIXI.Loader
    player:Player
    background:Background

    public constructor() {
        this.pixi = new PIXI.Application({resizeTo: window})
        document.body.appendChild(this.pixi.view)
    
        this.loader = new PIXI.Loader()
        this.loader
            .add("monkeyTexture", monkeyImage)
            .add("backgroundTexture", bgImage)

        this.loader.load(() => this.loadCompleted())
    }

loadCompleted() {
    this.addBackground()
    this.player = new Player(this.loader.resources["monkeyTexture"].texture!)
    this.pixi.stage.addChild(this.player)
    this.pixi.ticker.add(() => this.update())
}

addBackground() {
    this.background = new Background(this.loader.resources["backgroundTexture"].texture!, this.pixi.screen.width, this.pixi.screen.height)
    this.pixi.stage.addChild(this.background)
    console.log(window.screen.width)
}

update() {  
        this.background.update()  
}
}
new Game()