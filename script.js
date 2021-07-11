const squares = document.querySelectorAll('.grid div');

const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
const logsRight = document.querySelectorAll('.log-right');
const logsLeft = document.querySelectorAll('.log-left');

const timer = document.getElementById('timer');
const result = document.getElementById('result');
const startBtn = document.getElementById('start-btn');

const WIDTH = 9;
let currentIndex = 76;
let currentTime = 20
let gameTimer;

const moveWithLogLeft = () => {
    if (currentIndex >= 27 && currentIndex < 35) {
      squares[currentIndex].classList.remove('frog')
      currentIndex += 1
      squares[currentIndex].classList.add('frog')
    }
}

const moveWithLogRight = () => {
    if (currentIndex > 18 && currentIndex <= 26) {
      squares[currentIndex].classList.remove('frog')
      currentIndex -= 1
      squares[currentIndex].classList.add('frog')
    }
}

const checkForLose = () => {
    if ((gameTimer === 0 || squares[currentIndex].classList.contains('c1'))
    || squares[currentIndex].classList.contains('l5')
    || squares[currentIndex].classList.contains('l4')) {
        squares[currentIndex].classList.remove('frog');
        result.classList.remove('hidden')
        result.classList.add('lost')
        result.innerHTML = 'GAME OVER';
        currentIndex = 76;
        clearInterval(gameTimer);
    }
}


const checkForWin = () => {
    if (squares[4].classList.contains('frog')) {
        result.classList.remove('hidden')
        result.classList.add('won')
        result.innerHTML = 'You WON'
        squares[currentIndex].classList.remove('frog')
        clearInterval(gameTimer)
        document.removeEventListener('keyup', moveFrog)
      }
}

const moveCarLeft = (carLeft) => {

    console.log(carLeft)
    if (carLeft.classList.contains('c1')) {
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
    } else if (carLeft.classList.contains('c2')) {
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
    } else if (carLeft.classList.contains('c3')) {
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
    }
}

const moveCarRight = (carRight) => {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
      }
}

const moveCars = () => {
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}

const moveLogLeft = (logLeft) => {
    switch (true) {
      case logLeft.classList.contains('l1'):
        logLeft.classList.remove('l1');
        logLeft.classList.add('l2');
        break
      case logLeft.classList.contains('l2'):
        logLeft.classList.remove('l2');
        logLeft.classList.add('l3');
        break
      case logLeft.classList.contains('l3'):
        logLeft.classList.remove('l3');
        logLeft.classList.add('l4');
        break
      case logLeft.classList.contains('l4'):
        logLeft.classList.remove('l4');
        logLeft.classList.add('l5');
        break
      case logLeft.classList.contains('l5'):
        logLeft.classList.remove('l5');
        logLeft.classList.add('l1');
        break;
    }
  }

  const moveLogRight = (logRight) => {
    switch (true) {
      case logRight.classList.contains('l1'):
        logRight.classList.remove('l1');
        logRight.classList.add('l5');
        break
      case logRight.classList.contains('l2'):
        logRight.classList.remove('l2');
        logRight.classList.add('l1');
        break;
      case logRight.classList.contains('l3'):
        logRight.classList.remove('l3');
        logRight.classList.add('l2');
        break;
      case logRight.classList.contains('l4'):
        logRight.classList.remove('l4');
        logRight.classList.add('l3');
        break
      case logRight.classList.contains('l5'):
        logRight.classList.remove('l5');
        logRight.classList.add('l4');
        break
    }
  }

const moveLogs = () => {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
}

const moveFrog = (e) => {
    squares[currentIndex].classList.remove('frog');

    switch(e.keyCode) {
        case 37: 
            if (currentIndex % WIDTH !== 0) {
                currentIndex -= 1;
            }
            break;
        case 38:
            if(currentIndex - WIDTH >= 0) {
                currentIndex -= WIDTH
            }
            break;
        case 39:
            if(currentIndex % WIDTH < WIDTH - 1) {
                currentIndex += 1
            }
            break;
        case 40:
            if (currentIndex + WIDTH < WIDTH * WIDTH) {
                currentIndex += WIDTH
            }
            break;
    }

    squares[currentIndex].classList.add('frog');

    checkForLose();
    checkForWin();
}

const playTurn = () => {
    moveCars()
    moveLogs()
    moveWithLogLeft()
    moveWithLogRight()
    checkForLose();

    currentTime--
    timer.textContent = currentTime
  }



startBtn.addEventListener('click', () => {

    currentIndex = 76;
    currentTime = 20
    gameTimer = null;

    squares[currentIndex].classList.add('frog');
    result.classList.add('hidden');
    result.classList.remove('won');
    result.classList.remove('lost');

    if(gameTimer) {
        clearInterval(gameTimer)
    } else {
        gameTimer = setInterval(playTurn, 1000)
        document.addEventListener('keyup', moveFrog)
    }
})