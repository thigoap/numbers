const exclude = document.getElementById('exclcheck');
exclude.addEventListener('change', function() {
    if (this.checked) { document.getElementById('exclinput').disabled = false; }
    else { 
        document.getElementById('exclinput').disabled = true;
        document.getElementById('exclinput').required = true;
    }
});

let generate = () => {
    let min = document.getElementById('min').valueAsNumber;
    let max = document.getElementById('max').valueAsNumber;
    let qtt = document.getElementById('times').valueAsNumber;
    let results = document.getElementById('results');

    const asc = document.getElementById('ascending');
    const desc = document.getElementById('descending');
    const norep = document.getElementById('norep');

    /* convertig numbers to integers */
    min = Math.floor(min);
    document.getElementById('min').value = min;
    max = Math.floor(max);
    document.getElementById('max').value = max;
    
    /* errors handler */
    if (max <= min) {
        results.style.color = "red";
        results.style.fontSize = "12px";
        results.innerHTML = `Necessário intervalo entre mínimo e máximo.`;
        return;
    }
    if (norep.checked && qtt > (max - min + 1)) {
        results.style.color = "red";
        results.style.fontSize = "12px";
        results.innerHTML = `Quantidade maior do que o intervalo. Desmarcar opção 'sem repetição'`;
        return;
    }
    if (Number.isNaN(min) || Number.isNaN(max)) {
        results.style.color = "red";
        results.style.fontSize = "12px";
        results.innerHTML = `Mínimo e Máximo são obrigatórios.`;
        return;        
    }
    if (Number.isNaN(qtt) || qtt <= 0) { 
        qtt = 1;
        document.getElementById('times').value =`01`;    
    }
    /* end of errors handler */

    if (exclude.checked) { 
        let exclusions = document.getElementById('exclinput').value
        if (exclusions.trim() == "") { 
            results.style.color = "red";
            results.style.fontSize = "12px";
            results.innerHTML = `Preencher números que devem ser desconsiderados.`;
            return;
        }
        let excllist = exclusions.split(',').map(Number);
        console.log(excllist);
     }

        
    let numbers = [];

    // generates a list to be used with 'no repetition'
    let list = new Array(max + 1 - min).fill().map((_, i) => i + min);
    
    for (let i = 0; i < qtt; i++) {
        if (norep.checked) {
            let random = Math.floor(Math.random() * list.length); // used as index
            number = list.splice(random,1); // remove from list and return the number at index [random]
            numbers.push(' ' + number); // add number to the numbers list
        }
        else {
            let random = Math.floor(Math.random() * (max - min + 1)) + min; // generates random number between min and max  
            numbers.push(' ' + random); // add number to the numbers list
        }
    } 

    if (asc.checked) { numbers.sort((a,b)=>a-b); };
    if (desc.checked) { numbers.sort((a,b)=>b-a); };

    results.style.color = "inherit";
    results.style.fontSize = "24px";
    results.innerHTML = numbers;
}

let btn = document.getElementById('generatebtn');
btn.addEventListener('click', generate);