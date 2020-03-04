
function renderGame(){
    document.querySelector('#level-indicator').textContent = myGame.level + 1
    document.querySelector('#tries-indicator').textContent = myGame.numberOfTries

    myGame.update()
    requestAnimationFrame(renderGame)
}

renderGame()





