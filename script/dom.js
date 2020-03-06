
document.querySelector('#newgame-btn').addEventListener('click', function(){
    myGame.gameIteration = 0
    myGame.makeNewGame()
    if (document.querySelector('#dev-tools').value == 'helloworld'){
        document.querySelector('#next-level').style.display = 'block'
    }
})

document.querySelector('#next-level').addEventListener('click', function(){
    if (myGame.level == 13){
        myGame.level = 0
        myGame.gameIteration ++
        
    } else {
        myGame.level++
    }
    myGame.reset()
})

document.querySelector('#reset-btn').addEventListener('click', function(){
    myGame.reset()
})

document.querySelector('#easy-mode').addEventListener('click', function(){
    if(myGame.easyMode){
        myGame.easyMode = false
        document.querySelector('#easy-mode span').textContent = 'Off'
        document.querySelector('#easy-mode').style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
    } else {
        myGame.easyMode = true
        document.querySelector('#easy-mode span').textContent = 'On'
        document.querySelector('#easy-mode').style.backgroundColor = 'rgba(0,255,0,0.4'
    }
})


document.querySelector('canvas').addEventListener('click', function(event){
    
    let xAim = 30
    let yAim = 400
    if (event.offsetX > 220){
        xAim = 220
    } else if (event.offsetX < 20){
        xAim = 20
    } 
    else {
        xAim = event.offsetX
    }
    if (event.offsetY > 600){
        yAim = 600
    } else if (event.offsetY < 200){
        yAim = 200
    } else {
        yAim = event.offsetY
    }
    myGame.aimx = xAim
    myGame.aimy = yAim

    let aimAngle = 0
    let aimPower = 0 
    let distx = xAim - 20
    let disty = -(yAim - 400)
    aimPower = (Math.sqrt(distx * distx + disty * disty))/10
    aimAngle = Math.atan(disty / distx) * (180 / Math.PI)

    document.querySelector('#aim-angle').textContent = aimAngle.toFixed(0)
    document.querySelector('#aim-power').textContent = aimPower.toFixed(1)
})


document.querySelector('#fire-btn').addEventListener('click', function(){
    myGame.shooting()
    myGame.shoot = true
    myGame.aim = false
    myGame.numberOfTries++
})










