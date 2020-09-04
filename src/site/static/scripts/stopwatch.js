let lapBtn = document.getElementById('lapbtn')
let stopBtn = document.getElementById('stopbtn')
let stopWatch = document.getElementById('stopwatch')

let lapMsg = document.getElementById('lapmsg')
let lapsList = document.getElementById('lapslist')

let lapper
let lapRunning = false
let lapStopped = false
let lapsArray = []
let m = 0, s = 0, ms = 0
let lastlapm = 0, lastlaps = 0, lastlapms = 0
let lapm = 0, laps = 0, lapms = 0

const startLap = () => {
  if (!lapRunning) {
    lapMsg.innerHTML = `R U N N I N G`
    lapRunning = true
    lapBtn.innerHTML = `LAP`
    stopBtn.innerHTML = `STOP`
    stopWatch.style.color = "#404040"
    stopBtn.disabled = false

    const lap = () => {
      ms++
      if (ms == 100) {
        ms = 0
        s++
      }
      if (s == 60) {
        s = 0
        m++
      }

      stopWatch.innerHTML = (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + ":" + (ms < 10 ? "0" + ms : ms)
    }

    lapper = setInterval(lap, 10)
  } else {
    lapPush()
  }
}

const stopReset = () => {
  if (lapRunning) {
    lapClear()
    lapStopped = true
    return
  }
  if (lapStopped) {
    lapReset()
  }
}

const lapClear = () => {
  clearInterval(lapper)
  lapMsg.innerHTML = `S T O P P E D`
  lapRunning = false
  lapbtn.innerHTML = `GO`
  stopBtn.innerHTML = `RESET`
}

const lapReset = () => {
  m = 0
  s = 0
  ms = 0
  lastlapm = 0
  lastlaps = 0
  lastlapms = 0
  stopWatch.innerHTML = `00:00:00`
  lapMsg.innerHTML = `R E S E T E D`
  lapStopped = false
  stopBtn.innerHTML = `STOP`
  stopBtn.disabled = true
  lapsArray = []
  lapsList.innerHTML = lapsArray
  stopWatch.style.color = "var(--hfb-color)"
}

const lapPush = () => {
  lapms = ms - lastlapms
  if (lapms < 0) {
    let dif = lastlapms - ms
    laps = s - lastlaps - 1
    lapms = 100 - dif
  } else {
    laps = s - lastlaps
  }
  if (laps < 0) {
    let dif = lastlaps - s
    lapm = m - lastlapm - 1
    laps = 60 - dif
  } else {
    lapm = m - lastlapm
  }

  lapms < 10 ? lapms = "0" + lapms : lapms
  laps < 10 ? laps = "0" + laps : laps
  lapm < 10 ? lapm = "0" + lapm : lapm

  lapsArray.push(lapm + ":" + laps + ":" + lapms)
  lastlapm = m
  lastlaps = s
  lastlapms = ms

  while(lapsList.firstChild) {
    lapsList.removeChild(lapsList.firstChild)
  }
  let reversedLaps = lapsArray.slice().reverse()
  reversedLaps.map((lap, index) => {
    li = document.createElement('li')
    li.innerHTML = `Lap ${lapsArray.length-index}: ${lap}`
    lapsList.appendChild(li)
  })
}

lapBtn.addEventListener("click", startLap)
stopBtn.addEventListener("click", stopReset)
