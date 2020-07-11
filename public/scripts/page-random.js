let min = document.getElementById('min');
let max = document.getElementById('max');
let qtt = document.getElementById('times');
let results = document.getElementById('results');

const asc = document.getElementById('ascending');
const desc = document.getElementById('descending');
const norep = document.getElementById('norep');
const exclude = document.getElementById('exclcheck');
const btn = document.getElementById('generatebtn');

const generate = () => {
  /* decimal conversions */
  let minValue = Math.floor(min.valueAsNumber);
  let maxValue = Math.floor(max.valueAsNumber);
  let qttValue = Math.floor(qtt.valueAsNumber);
  min.value = minValue;
  max.value = maxValue;
  qtt.value = qttValue;
  /* end of decimal conversions */    

  let bannedList = [];
  if (exclude.checked) { 
    let exclusions = document.getElementById('exclinput').value
    bannedList = exclusions
    .split(',')                         // transform string into array
    .filter( i => i !== "" )            // return only values (not empty)          
    .filter( i => (i >= minValue && i <= maxValue) ) // only consider values within min-max range
    .map(Number);                       // transform into numbers
    bannedList = [... new Set(bannedList)]; // remove duplicates
    /* check if empty input */        
    if (exclusions.trim() == "" || bannedList.length === 0) { 
      results.className = "error";
      results.innerHTML = `Preencher os números que devem ser desconsiderados.`;
      return;
    }
  }

  /* errors handler */
  if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
    results.className = "error";
    results.innerHTML = `Mínimo e Máximo são obrigatórios.`;
    return;        
  }
  if (maxValue <= minValue) {
    results.className = "error";
    results.innerHTML = `Necessário intervalo entre mínimo e máximo.`;
    return;
  }
  if (norep.checked && qttValue > (maxValue - minValue - bannedList.length + 1)) {
    console.log('qtt',  maxValue - minValue - bannedList.length + 1);
    results.className = "error";
    results.innerHTML = `Quantidade maior do que o intervalo. Desmarcar opção 'sem repetição'.`;
    return;
  }
  if (Number.isNaN(qttValue) || qttValue <= 0) { 
    qttValue = 1;
    qtt.value = qttValue;    
  }
      
  let list = [];
  list = new Array(maxValue + 1 - minValue).fill().map((_, i) => i + minValue);
  // if exclude: remove numbers of banned list
  if (exclude.checked) {
    list = list.filter( i => !bannedList.includes(i));
    if (list.length === 0) {
      results.className = "error";
      results.innerHTML = `Todos os números possíveis foram desconsiderados.`;
      return;    
    }
  }
  /* end of errors handler */

  let numbers = [];
  for (let i = 0; i < qttValue; i++) {
    let random = Math.floor(Math.random() * list.length); // used as index
    if (norep.checked) {
      number = list.splice(random, 1); // remove from list and return the number at index [random]
    } else {
      number = list[random];
    }
    numbers.push(number); // add number to the numbers list
  } 

  if (asc.checked) { numbers.sort( (a,b) => a - b ); };
  if (desc.checked) { numbers.sort( (a,b) => b - a); };

  results.className = "default";
  results.innerHTML = numbers.join(' ');
}


const toggleinput = () => {
  let exclnput = document.getElementById('exclinput')
  if (exclude.checked) { exclnput.disabled = false; }
  else { 
    exclnput.value = "";
    exclnput.disabled = true;
  }
}

btn.addEventListener('click', generate);
exclude.addEventListener('change', toggleinput);