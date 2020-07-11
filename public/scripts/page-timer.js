let hrs = document.getElementById('hours');
let min = document.getElementById('minutes');
let sec = document.getElementById('seconds');
let msg = document.getElementById('msg');

let startBtn = document.getElementById('startbtn');
let resetBtn = document.getElementById('resetbtn');

let timer;
let running = false;

const startStop = () => {
  if (!running) { 
    /* conversions */
    let hrsValue = Math.floor(hrs.valueAsNumber);
    let minValue = Math.floor(min.valueAsNumber);
    let secValue = Math.floor(sec.valueAsNumber);

    msg.innerHTML = ``;
    /* end of conversions */

    /* errors handler */
    if (Number.isNaN(hrsValue) && Number.isNaN(minValue) && Number.isNaN(secValue) ) {
      msg.className = "error";
      msg.innerHTML = `Ao menos 1 valor é necessário.`;
      return;        
    }

    if (hrsValue < 0 || minValue < 0 || secValue < 0) {
      msg.className = "error";
      msg.innerHTML = `Valores devem ser positivos.`;
      return;         
    }

    if (hrsValue === 0 && minValue === 0 && secValue === 0) {
      msg.className = "error";
      msg.innerHTML = `Definir tempo.`;
      return; 
    }
    
    if (Number.isNaN(hrsValue)) { 
      hrsValue = '00';
      hrs.value = hrsValue;    
    }
    if (Number.isNaN(minValue)) { 
      minValue = '00';
      min.value = minValue;    
    }
    if (Number.isNaN(secValue)) { 
      secValue = '00';
      sec.value = secValue;    
    } 
    /* end of errors handler */

    startBtn.innerHTML = `STOP`;
    running = true;

    /* transform in seconds */
    let total = Number(hrsValue) * 3600 + Number(minValue) * 60 + Number(secValue);
    console.log('total', total);

    resetBtn.disabled = false;
    const time = () => {
      hrs.disabled = true;
      min.disabled = true;
      sec.disabled = true;
      total--;
      hrs.value = Math.floor(total / 3600);
      if (hrs.value < 10) { hrs.value = "0" + hrs.value };
      min.value = Math.floor( (total - (hrs.value*3600)) / 60) ;
      if (min.value < 10) { min.value = "0" + min.value };
      sec.value = total % 60; 
      if (sec.value < 10) { sec.value = "0" + sec.value }; 
      if (total < 1) {
        clear();
        msg.innerHTML = `F I N I S H E D`;
      } 
    }

    timer = setInterval(time, 1000);
  } else {
    startBtn.innerHTML = `START`
    running = false;
    clearInterval(timer);
  }
}

const reset = () => {
  clear();
  msg.innerHTML = `TIMER RESETED`;
}

const clear = () => {
  hrs.value = '';
  min.value = '';
  sec.value = '';
  hrs.disabled = false;
  min.disabled = false;
  sec.disabled = false;
  clearInterval(timer); 
  running = false; 
  startBtn.innerHTML = `START`;
  resetBtn.disabled = true;
  msg.className = "default";
}

startBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
