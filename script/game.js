class Game {
    constructor(){
        this.newGame = true   
        this.gameIteration = 0
        this.aim = false
        this.shoot = false
        this.aimx = 0
        this.aimy = 0

        this.easyMode = false

        this.hit = false
        this.gameOver = false

        this.numberOfTries = 0
        this.level = 0
        this.levels = [
            [[500,400,20]],
            [[400,400,20],[500,300,10]],
            [[300,400,20],[500,400,20]],
            [[300,300,10],[500,600,10],[700,300,25]],
            [[300,200,15],[500,400,30],[500,600,15],[700,400,10]],
            [[400,400,40],[750,400,40]],
            [[200,400,15],[400,400,15],[600,400,15]],
            [[300,400,5],[400,400,5],[500,400,5],[600,400,5], [500,300,5], [500,600,5], [500,200,5],[500,500,5],[700,400,5]],
            [[200,200,15], [300,400,10], [300,600,20], [700,300,20]],
            [[200,200,10],[200,500,10],[300,300,10],[600,600,10],[500,500,10],[700,300,10],[400,400,10],[600,200,10]], // 10
            [[500,400,30], [350,400,10]],
            [[500,400,20], [100,400,9], [50,400,1.2]]
        ]

        this.targets = [
            [900,400,30],
            [900,300,30],
            [900,500,30],
            [900,500,30],
            [900,500,30],
            [900,500,30],
            [900,500,30],
            [900,500,30],
            [900,500,30],
            [900,500,30], // 10
            [900,500,30],
            [900,500,30]

        ]
        this.target = {
            x:0,
            y:0,
            m:0
        }

        this.planets = []
    }
    makeNewGame(){
        this.aim = true
        this.aimx = 50
        this.aimy = 400
        this.shoot = false
        this.hit = false
        this.gameOver =false

        
        this.numberOfTries = 0
        this.level = 0
        this.planets = []

        asteroid.init()
        this.createLevel(this.level)
    }

    reset(){
        this.aim = true
        this.shoot = false
        this.gameOver = false
        asteroid.init()
        this.createLevel(this.level)
    }

    gameOver(){

    }

    createLevel(){
        this.planets = []
        for (let lvl of this.levels[this.level]){
            let nx = lvl[0]
            let ny = lvl[1]
            let nr = lvl[2]

            let newPlanet = new Planet(nx, ny, nr)
            this.planets.push(newPlanet)
        }

        if (this.level == 10){
            this.planets[1].vy = 5
        } else if (this.level == 11){
            this.planets[1].vy = 1.5
            this.planets[2].vy = 3.5
            this.planets[2].vx = 0.5
        }

        
        this.initTarget()
    }

    aiming(x,y){
        ctx.strokeStyle = 'white'
        ctx.beginPath()
        ctx.moveTo(asteroid.x,asteroid.y)
        ctx.lineTo(x,y)
        ctx.stroke()
    }

    shooting(){
        asteroid.vx = (this.aimx - asteroid.x) / 50
        asteroid.vy = (this.aimy - asteroid.y) / 50
    }

    levelHandler(){
    }

    asteroidHandler(){
        if (this.aim){
            this.aiming(this.aimx,this.aimy)
        }
        if (this.shoot){
            for (let planet of this.planets){
                asteroid.gravityTo(planet)
            }
            asteroid.move()
        }
        asteroid.draw()
    }

    initTarget(){
        this.target.x = this.targets[this.level][0]
        this.target.y = this.targets[this.level][1]
        this.target.m = this.targets[this.level][2] - (5 * this.gameIteration)
        console.log(this.target.m)
    }

    targetHandler(){
        ctx.strokeStyle='green'
        ctx.beginPath()
        ctx.arc(this.target.x,this.target.y,this.target.m,0,2*Math.PI)
        ctx.stroke()
        ctx.drawImage(earthImg,this.target.x-this.target.m,this.target.y-this.target.m,this.target.m * 2,this.target.m *2)
        
        

        let dx = asteroid.x - this.target.x
        let dy = asteroid.y - this.target.y
        let dist = Math.sqrt((dx*dx) + (dy*dy))
        if (dist < this.target.m && this.shoot){
            if (this.level < this.levels.length-1){
                this.level++
                this.reset()
            } else {
                
                this.level = 0
                this.makeNewGame()
                this.gameIteration++ 
            }
        }
    }

    planetHandler(){

        if (this.level == 10){

            this.planets[1].gravityTo(this.planets[0])
            this.planets[1].move()
        } else if (this.level == 11){
            this.planets[1].gravityTo(this.planets[0])
            this.planets[1].gravityTo(this.planets[2])
            this.planets[1].move()
            this.planets[2].gravityTo(this.planets[0])
            this.planets[2].gravityTo(this.planets[1])
            this.planets[2].move()
        }


        for (let p of this.planets){
            p.draw()
        }
        
    }

    clearScreen(){
        ctx.fillStyle = 'rgba(0,0,0,1)'
        ctx.fillRect(0,0,1000,800)
    }

    boundaryHandler(){
        //check out of bounds
        if (this.easyMode){
            if (asteroid.x > 1000 || asteroid.x < 0){
                asteroid.vx = -asteroid.vx
            }
            if (asteroid.y > 800 || asteroid.y < 0) {
                asteroid.vy = -asteroid.vy
            }
        } else {
            if (asteroid.x > 1000 || asteroid.x < 0){
                this.reset()
            }
            if (asteroid.y > 800 || asteroid.y < 0) {
                this.reset()
            }
        }


    }
    collisionHandler(){
        for (let p of this.planets){
            let dx = asteroid.x - p.x
            let dy = asteroid.y - p.y
            let dist = Math.sqrt((dx*dx) + (dy*dy))
            if (dist < p.m){
                this.reset()
            }
        }
    }

    update(){
        this.clearScreen()

        this.targetHandler()
        this.planetHandler()
        this.asteroidHandler()
        this.boundaryHandler()
        this.collisionHandler()
    }
}


let asteroid = new Asteroid
let myGame = new Game



