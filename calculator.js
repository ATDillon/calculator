function calculator(){
    let displayValue = undefined,
    storage = {operator: undefined,
    secondNum: undefined};


    changeDisplay();
    getInputs();



    function operate(firstNum = 0, secondNum = firstNum, operator = 'equals'){

        switch(operator){
            case 'add':
                console.log(`adding ${firstNum} + ${secondNum}`)
                return(firstNum + secondNum);
            case 'subtract':
                console.log(`subtracting ${firstNum} - ${secondNum}`)
                return(firstNum - secondNum);
            case 'multiply':
                return(firstNum * secondNum);
            case 'divide':
                return(firstNum / secondNum);
            case 'equals':
                return firstNum;
        }
    }

    function changeDisplay(){
        const numberButtons = document.querySelectorAll('.number'),
        operatorButtons = document.querySelectorAll('.operators > .operator');
        let newContent = "";

        numberButtons.forEach((button) => {
            
            button.addEventListener('click', () => {
                newContent += button.id;
                displayValue = Number(newContent);
                document.querySelector('#display').textContent = newContent;

                if(newContent.includes('.')){
                    document.querySelector('.decimal').disabled = true;
                }
                else{
                    document.querySelector('.decimal').disabled = false;
                }
            })

        })
    
        operatorButtons.forEach((button) => {

            button.addEventListener('click', () => {
                newContent = '';
            })
        })
    

        document.querySelector('#clear').addEventListener('click', () => {
            newContent = "";
            document.querySelector('#display').textContent = newContent;
        })

        



        document.querySelector('#display').textContent = newContent;
    }

    function getInputs(){
        const numberButtons = document.querySelectorAll('.number'),
        operatorButtons = document.querySelectorAll('.operator');
        let display = document.querySelector('#display'),
        result = null;


        /*numberButtons.forEach((button) => {
            button.addEventListener('click', () => {

                if(button.classList.contains('clear-all')){

                }

            })
        }) */

        //secondNum works for repeating consecutive calculations when displayValue gets changed by a
        //calculation, so 20+20 equals 40, then pressing = again gives 60 instead of 80.

        operatorButtons.forEach((button) => {
            button.addEventListener('click', () => {

                if(!('firstNum' in storage)){
                    storage.firstNum = displayValue;
                    displayValue = undefined;
                    
                    if(button.id === 'equals'){
                        result = operate(storage.firstNum, storage.secondNum, storage.operator);
                        displayValue = result;
                        display.textContent = result;

                        delete storage.firstNum;

                    } 
                    else{
                        storage.operator = button.id;
                    }

                } 
                else if(button.id === 'equals'){
                    result = operate(storage.firstNum, displayValue, storage.operator);
                    storage.secondNum = displayValue;
                    displayValue = result;
                    display.textContent = result;

                    delete storage.firstNum;
                } 
                else{
                    result = operate(storage.firstNum, displayValue, storage.operator);
                    storage.operator = button.id;
                    storage.firstNum = result;
                    display.textContent = result;

                }
            })
        })


        document.querySelector('#clear').addEventListener('click', () => {
            storage = {operator: undefined,
            secondNum: undefined};
            displayValue = undefined;
        })
    }
}

calculator();