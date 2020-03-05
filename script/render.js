
function renderGame(){
    document.querySelector('#level-indicator').textContent = myGame.level + 1
    document.querySelector('#game-iteration').textContent = myGame.gameIteration + 1
    document.querySelector('#tries-indicator').textContent = myGame.numberOfTries
    
    myGame.update()
    
    requestAnimationFrame(renderGame)
}

renderGame()





