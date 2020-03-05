canvas = document.querySelector('canvas')
ctx = canvas.getContext('2d')
canvas.width = 1000
canvas.height = 800

var earthImg = document.querySelector('#earth-img')


class Asteroid {
    constructor(){
        this.mass = 0

        this.x = 0
        this.y = 0

        this.vx = 0
        this.vy = 0
        this.v = 0

        this.ax = 0
        this.ay = 0

        //parameters for behaviour
        this.maxSpeed = 50
        this.g = 5

        this.trail = []
        

    }
    init(){
        this.x = 20
        this.y = 400
        this.mass = 4
        this.vx = 0
        this.vy = 0
        this.v = 0
        this.ax = 0
        this.ay = 0
        this.trail = []
    }

    move(){
        //add acceleration
        this.vx += this.ax
        this.vy += this.ay
        this.ax = 0
        this.ay = 0

        //speed limiter
        if(this.vx > this.maxSpeed){
            this.vx = this.maxSpeed
        } else if (this.vx < -this.maxSpeed){
            this.vx = -this.maxSpeed
        }
        if(this.vy > this.maxSpeed){
            this.vy = this.maxSpeed
        } else if (this.vy < -this.maxSpeed){
            this.vy = -this.maxSpeed
        }

        //movement
        this.x += this.vx
        this.y += this.vy

        let trailPos = [this.x,this.y]
        this.trail.push(trailPos)

    }

    gravityTo(planet){
        let distx = this.x - planet.x
        let disty = this.y - planet.y
        let dist = Math.sqrt((distx * distx) + (disty * disty))
        let angle = Math.atan2(disty,distx)
        let force = (this.g * (Math.pow(planet.m,2) * this.mass)) / (dist * dist)
        let forcex = force * -Math.cos(angle)
        let forcey = force * -Math.sin(angle)
        this.ax += forcex / this.mass
        this.ay += forcey / this.mass
    }

    draw(){
        ctx.strokeStyle='yellow'
        ctx.beginPath()
        ctx.moveTo(20,400)
        for(let tPos of this.trail){
            ctx.lineTo(tPos[0],tPos[1])
        }
        ctx.stroke()

        ctx.strokeStyle = 'yellow'
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.mass, 0, 2 * Math.PI)
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.stroke()
        
        
    }

}



class Planet {
    constructor(x,y,mass){
        this.x = x
        this.y = y
        this.m = mass

        this.vx = 0
        this.vy = 0
        this.v = 0

        this.ax = 0
        this.ay = 0

        //parameters for behaviour
        this.maxSpeed = 50
        this.g = 4

    }

    move(){
        //add acceleration
        this.vx += this.ax
        this.vy += this.ay
        this.ax = 0
        this.ay = 0

        //speed limiter
        if(this.vx > this.maxSpeed){
            this.vx = this.maxSpeed
        } else if (this.vx < -this.maxSpeed){
            this.vx = -this.maxSpeed
        }
        if(this.vy > this.maxSpeed){
            this.vy = this.maxSpeed
        } else if (this.vy < -this.maxSpeed){
            this.vy = -this.maxSpeed
        }

        //movement
        this.x += this.vx
        this.y += this.vy


    }

    gravityTo(planet){
        let distx = this.x - planet.x
        let disty = this.y - planet.y
        let dist = Math.sqrt((distx * distx) + (disty * disty))
        let angle = Math.atan2(disty,distx)
        let force = (this.g * (Math.pow(planet.m,2) * this.m)) / (dist * dist)
        let forcex = force * -Math.cos(angle)
        let forcey = force * -Math.sin(angle)
        this.ax += forcex / this.m
        this.ay += forcey / this.m
    }

    draw(){
        ctx.strokeStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.m, 0, Math.PI * 2)
        ctx.stroke()
    }
}

