import * as PIXI from 'pixi.js'
import monkeyImage from "./images/monkey.png"
import bgImage from "./images/background.jpg"
import ground from "./images/ground.png"
import obstacle from "./images/treetrunk.png"
import { Player } from './player'
import { Background } from './background'
import { Ground } from './ground'
import { Obstacle } from './obstacles'
import { UI } from './ui'

export class Game { 
    pixi: PIXI.Application 
    loader:PIXI.Loader
    player:Player
    background:Background
    ground: Ground
    obstacles: Obstacle[] = []
    collide: boolean
    obstacleTimer: number = 0
    interface: UI

    public constructor() {
        
        this.pixi = new PIXI.Application({ resizeTo: window })
        document.body.appendChild(this.pixi.view)
        this.collide = false

        this.loader = new PIXI.Loader()
        this.loader
        .add("backgroundTexture", bgImage)
        .add("monkeyTexture", monkeyImage)
        .add("groundTexture", ground)
        .add("obstacleTexture", obstacle)

        this.loader.load(() => this.loadCompleted())
    }

loadCompleted() {
    this.addBackground()

    this.player = new Player(this.loader.resources["monkeyTexture"].texture!)
    this.pixi.stage.addChild(this.player)
    
    this.ground = new Ground(this.loader.resources["groundTexture"].texture!)
    this.pixi.stage.addChild(this.ground)

    let obstacle = new Obstacle(this.loader.resources["obstacleTexture"].texture!)
    this.obstacles.push(obstacle)
    this.pixi.stage.addChild(obstacle)

    this.interface = new UI()
    this.pixi.stage.addChild(this.interface)

    this.pixi.ticker.add(() => this.update())
}

update() {  
    this.background.update()  
    this.ground.update()
    this.player.update(this.collide)
    for(let obstacle of this.obstacles ){
        obstacle.update()
        if(obstacle.x > screen.width){
            this.deleteObstacle(obstacle)
            console.log(this.obstacles)
        }
    }
    if(this.obstacleTimer == 400){
        this.createObstacle()
        this.obstacleTimer = 0
    }
    this.colissionChecker()
    this.obstacleTimer++
}

createObstacle(){
    let obstacle = new Obstacle(this.loader.resources["obstacleTexture"].texture!)
    this.obstacles.push(obstacle)
    this.pixi.stage.addChild(obstacle)
}

deleteObstacle(obstacle: Obstacle){
    this.obstacles = this.obstacles.filter(f => f != obstacle)
    obstacle.destroy()
}

addBackground() {
    this.background = new Background(this.loader.resources["backgroundTexture"].texture!, this.pixi.screen.width, this.pixi.screen.height)
    this.pixi.stage.addChild(this.background)
}

colissionChecker(){
    if(this.collision(this.ground, this.player)){
        this.collide = true
    }else{
        this.collide = false
    }
    for(let obstacle of this.obstacles){
        if(obstacle.x == this.player.x){
            this.interface.addScore(10)
        }
        if(this.collision(obstacle, this.player)){
            this.pixi.stop()
        }
    }
    
}

collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
    const bounds1 = sprite1.getBounds()
    const bounds2 = sprite2.getBounds()

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}
}
new Game()