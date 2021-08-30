function calculator(){

    console.log(operate(1, 2, 'Divide'));

}

function operate(firstNum, secondNum, operator){

    switch(operator){
        case 'Add':
            return(firstNum + secondNum);
        case 'Subtract':
            return(firstNum - secondNum);
        case 'Multiply':
            return(firstNum * secondNumm);
        case 'Divide':
            return(firstNum / secondNum);
    }
}

function changeDisplay(){
    const numberButtons = document.querySelectorAll('.number');
    let newContent = "";

    numberButtons.forEach((button) => {
        
        button.addEventListener('click', () => {
            newContent += button.id;
            document.querySelector('#display').textContent = newContent;
        })
    })

    document.querySelector('#display').textContent = newContent;
}

calculator();
changeDisplay();