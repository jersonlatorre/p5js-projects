// let font
let sound
let number = 0
let step = 20

function preload() {
  sound = loadSound('assets/sound.mp3')
}

function setup() {
  noCanvas()
}

function draw() {
  background('#00ff00')
}

function keyPressed() {
  if (key == 'k' || key == 'K') {
    sound.play()
    number += step
    document.getElementById('number').innerText = format(number)
    gsap.to('#container', {
      scale: '1.3',
      duration: 0.25,
      onComplete: () => {
        gsap.to('#container', { scale: '1', duration: 0.15 })
      },
    })
  }

  if (key == 'q' || key == 'Q') {
    number -= step
    if (number < 0) number = 0
    document.getElementById('number').innerText = format(number)
  }

  if (key == 'w' || key == 'W') {
    number += step
    document.getElementById('number').innerText = format(number)
  }
}

function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
