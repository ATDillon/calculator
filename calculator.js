function calculator(){
    const numberButtons = document.querySelectorAll('.number'),
    operatorButtons = document.querySelectorAll('.operator'),
    display = document.querySelector('#display');
    let displayValue = undefined,
    storage = {operator: undefined,
    secondNum: undefined};


    changeDisplay();
    getInputs();



    function operate(firstNum = 0, secondNum = firstNum, operator = 'equals'){

        switch(operator){
            case 'add':
                console.log(`adding ${firstNum} + ${secondNum}`)
                return(Math.round((firstNum + secondNum)*1000)/1000);
            case 'subtract':
                console.log(`subtracting ${firstNum} - ${secondNum}`)
                return(Math.round((firstNum - secondNum)*1000)/1000);
            case 'multiply':
                return(Math.round((firstNum * secondNum)*1000)/1000);
            case 'divide':
                if(firstNum === 0 || secondNum === 0){
                    return("Error");
                }
                console.log(`dividing ${firstNum} / ${secondNum}`)
                return(Math.round((firstNum / secondNum)*1000)/1000);
            case 'equals':
                return firstNum;
        }
    }


    function changeDisplay(){
        const operatorPad = document.querySelectorAll('.operators > .operator');
        let newContent = "";

        numberButtons.forEach((button) => {
            
            button.addEventListener('click', () => {
                newContent += button.id;
                newContent = newContent.substring(0, 9);
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

       operatorPad.forEach((button) => {
            
            button.addEventListener('click', () => {

                operatorPad.forEach((button) => {
                    button.classList.remove('selected')
                })

                button.classList.add('selected');

            })
        }) 
    

        document.querySelector('#clear').addEventListener('click', () => {
            newContent = "";
            document.querySelector('#display').textContent = newContent;
            document.querySelector('.decimal').disabled = false;
            operatorPad.forEach((button) => {
                button.classList.remove('selected')
            })
        })

        document.querySelector('#backspace').addEventListener('click', () => {
            newContent = "";
            document.querySelector('#display').textContent = newContent;
            document.querySelector('.decimal').disabled = false;
        })

        document.querySelector('#percent').addEventListener('click', () => {
            newContent = `${displayValue/100}`;
            displayValue = Number(newContent);
            document.querySelector('#display').textContent = newContent;
            if(newContent.includes('.')){
                document.querySelector('.decimal').disabled = true;
            }
        })

        document.querySelector('#display').textContent = newContent;
    }


    function getInputs(){
        let result = null;

        //storage.secondNum works for consecutive calculations when displayValue gets changed by a
        //calculation, so 20+20 equals 40, then pressing = again gives 60 instead of 80.

        // In the event the second value isn't given, secondNum will take the value of firstNum for consecutive
        // calculations. so 10 + = will be interpreted as 10+10, then pressing = again will give 20+10.

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
                    storage.secondNum = (displayValue != undefined) ? displayValue : storage.firstNum;
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