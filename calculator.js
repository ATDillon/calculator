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

calculator();