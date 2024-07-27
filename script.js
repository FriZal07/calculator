let stage = 0;
let num1 = 0;
let oper = "";
let num2 = 0;
let temp = "";
let value = true;
let trueValue = 0;

const numberPad = document.querySelectorAll("#numberContainer button");
const operatorSigns = document.querySelectorAll("#functionContainer button");
const display = document.querySelector("#Display");
const smalldisplay = document.querySelector("#smallDisplay");
const cButton = document.querySelector("#c");
const deleteButton = document.querySelector("#delete");



cButton.addEventListener("click",() => {
    stage = 0;
    num1 = 0;
    oper = "";
    num2 = 0;
    temp = "";
    value = true;
    update();
})

deleteButton.addEventListener("click",() => {
    temp = (""+ temp).slice(0,-1);
    update();

    if(temp == ""){
        if (stage == 0);
        else if(stage == 1){
            stage--;
            if(num1.includes("-")) value = false;
            else value = true;

            temp = num1
            num1 = 0;
            update();
        }
        else if(stage == 2){
            stage--;
            if(oper.includes("-")) value = false;
            else value = true;

            temp = oper;
            oper = 0;
            update();
        }
        console.log("hello")
    }
        if(stage == 3){
            calmath();
            if(num1.includes("-")) value = false;

            stage = 0;
            oper = "";
            num2 = 0;

            update();
        }
})

//assigning events for the number buttons
numberPad.forEach(button => {
    button.addEventListener("click",function(e) {

    temp = "" + temp;

    //for the first number
    if (stage === 0) {
        addnum(e.target.textContent);
        
        update();
        console.log("it passed")
    }

    //for the second number
    if (stage === 1 && temp !== "") {
        if(e.target.textContent == ".") return;

        stage = 2;
        changevalue(temp,e.target.textContent,returnoper);

        update();
        console.log("it passed2")
    }
    else if (stage === 2) {
        addnum(e.target.textContent);
        
        update();
        console.log("it passed3")
    }
    else if(stage == 3){
        calmath();
        if(temp == 0) temp = "";
        if(num1.includes("-")) value = false;

        stage = 0;
        oper = "";
        num2 = 0;

        temp = temp + e.target.textContent;
        update();
    }
})});

//assigning events for the operator buttons
operatorSigns.forEach(button => {

    if (button.textContent == "+/-"){
        button.addEventListener("click",function() {

            temp = "" + temp;

            if (stage === 0 && temp.length == 0){
                    temp = temp + "-";
                    value = false;
                    
                    update();
                }
            else if (stage === 0 && temp.length > 0 && temp[0] == "-"){
                    temp = temp.slice(1);
                    value = true;
                    
                    update();
            }
            else if (stage === 0 && temp[0] != "-") {
                    temp = ("-").concat(temp);
                    value = false;
                    
                    update();
            }

            if (stage === 1 && temp != ""){
                stage = 2;
                changevalue(temp,"-",returnoper);

                value = false;
                
                update();
            }
            else if (stage === 2 && temp[0] == "-"){
                temp = temp.slice(1);
                value = true;
                
                update();
            }
            else if (stage === 2 && temp[0] != "-") {
                temp = ("-").concat(temp);
                value = false;
                
                update();
            }
            else if (stage === 3 && temp[0] != "-") {
                calmath();
                if(num1.includes("-")) value = false;
                if(temp == 0) temp = "";

                stage = 0;
                oper = "";
                num2 = 0;

                temp = ("-").concat(temp);
                value = false;
                
                update();
            }
            else if (stage === 3 && temp[0] == "-") {
                calmath();
                if(num1.includes("-")) value = false;
                if(temp == 0) temp = "";

                stage = 0;
                oper = "";
                num1 = 0;
                num2 = 0;

                temp = temp.slice(1);
                value = true;
                
                update();
            }
            return;
        })
        return;
    }

    //assign for equal operator
    if (button.textContent === "="){
        button.addEventListener("click",function() {
        calmath();
        })
    return;
    }

    //assign for normal operators
    button.addEventListener("click",function(e) {

    //for the operator value
    if (stage === 0 && temp !== ""){
        stage = 1;
        changevalue(temp,e.target.textContent, returnnum1);
        update();
    }
    else if (stage === 1) {
        temp = e.target.textContent;
        update();
    }

    //if user press sign instead of equal operator
    if (stage === 2 && oper !== "" && temp !== ""){
    
        calmath();
        num1 = "" + trueValue;
        if(num1.includes("-")) value = false;

        stage = 1;
        oper = "";
        num2 = 0;

        temp = e.target.textContent;
        update();
    }
    else if(stage == 3){
        calmath();
        num1 = "" + trueValue;
        if(num1.includes("-")) value = false;

        stage = 1;
        oper = "";
        num2 = 0;

        temp = e.target.textContent;
        update();
    }
    }
)});

function update(){
    let showedtemp = ""
    if (("" + temp).includes("e") && temp.length > 9){
        showedtemp = temp.split("e")
        showedtemp = +showedtemp[0] * 2.71828 
    }
    else{
        showedtemp = temp;
    }

    display.textContent = FinalValueFilter(showedtemp);
    if (stage === 0) smalldisplay.textContent = temp;
    else if (stage === 1) smalldisplay.textContent = temp;
    else if (stage === 2) smalldisplay.textContent = temp;
    else if (stage === 3) smalldisplay.textContent = temp;
}

//the functions return the assign numbers manually
function returnnum1(input){
    num1 = input;
}
function returnoper(input){
    oper = input;
}
function returnnum2(input){
    num2 = input;
}

//this function put value for the operator
function changevalue(input, target, returnnum){
    returnnum(input);
    temp = "";
    value = true;
    
    temp = temp + target;
}

function calmath(){
    if (stage === 2 && oper !== "" && temp !== "" && temp !== "-"){
        stage = 3;
        changevalue(temp,"",returnnum2);
        coreMath();

        if (temp < 0.000001) temp = 0;
        trueValue = temp; //true value results

        update();
    }
}

//the function to do math
function coreMath(){

    if (num1.includes("e")){
        num1 = num1.split("e")
        num1 = +num1[0] * 2.71828 
    }
    if (num2.includes("e")){
        num2 = num2.split("e")
        num2 = +num2[0] * 2.71828 
    }

    switch(oper){
        case "/": temp = (+num1) / (+num2); break; 
        case "*": temp = (+num1) * (+num2); break; 
        case "+": temp = (+num1) + (+num2); break; 
        case "-": temp = (+num1) - (+num2); break; 
        case "^": temp = (+num1) ** (+num2); break; 
    }
}

//this function do regex but not regex for input number of the first value
function addnum(input){

    if (("" + temp).includes(".") && temp.length > 8){  
        return;
    }
    if (input == "." && temp.length > 9){  
        return;
    }

    if (temp[0] === "0" && temp.length == 1 && input != ".")return;
    if (temp[0] === "-" && temp[1] === "0" && temp.length == 2 && input == 0)return;
    if (temp.length == 0 && input == ".")return;

    if (Number.isInteger(+input) && !temp.includes("e")) temp = temp + input;
    else if (input === "e" && !temp.includes("e") && temp[temp.length-1] !== ".") temp = temp + input;
    else if (input === "." && !temp.includes(".") && Number.isInteger(+temp[temp.length-1])) temp = temp + input;
}

function FinalValueFilter(input){
    console.log(input)
    input = "" + input;
    if((input).includes("+") && (input).includes("e")) {
        temp = '' + eToNumber(+input);
        input = '' + eToNumber(+input);
    }
    if (input.length > 9) return roundUpToE(input);
    return input;
}

function roundUpToE(input){

    let requiredcut = (input.length - 9)
    let status = false;
    let firstvalue = ""
    let secondvalue = ""

    if (!input.includes(".")){
        if (input > 0){
            secondvalue = "e" + (input.length - 1);
            firstvalue = roundupFirst(input, status, firstvalue, secondvalue);
        }
        else{
            let tempinput = input.slice(1);
            secondvalue = "e" + (tempinput.length - 1);
            firstvalue = "-" + roundupFirst(tempinput, status, firstvalue, secondvalue);
        }
    }

    else if (input.includes(".")){
        if (input > 0){
            let tempinput = input.split(".");

            //when non decimal value length greater than 1
            if (tempinput[0].length > 9){
                secondvalue = "e" + (tempinput[0].length - 1);
                firstvalue = roundupFirst(tempinput[0], status, firstvalue, secondvalue);
            }
            //when non decimal value 0
            else if (tempinput[0] == "0"){

                let i = 0;
                Array.from(tempinput[1]).forEach(element => {
                    if (element == "0" && !status) i++;
                    else status = true;
                });
                status = false;
            
                tempinput[1] = tempinput[1].slice(i);
                secondvalue = "e" + "-" + (i+1);

                firstvalue = roundupFirst(tempinput[1], status, firstvalue, secondvalue);
            }
            //when non decimal value's length not 0 or greater than 9
            else {
                let cut = 10**(tempinput[1].length - requiredcut);
                return Math.round(input * cut) / cut;
            }
        }

        else{
            let tempinput = input.split(".");

            //neg when non decimal value length greater than 1
            if (tempinput[0].length > 9){

                let tempinput = input.slice(1);
                secondvalue = "e" + (tempinput.length - 1);
                firstvalue = "-" + roundupFirst(tempinput, status, firstvalue, secondvalue);
            }
            //neg when non decimal value length greater than 1
            else if (tempinput[0] == "0" || (tempinput[0].includes("-") && tempinput[0].includes("0"))){
                let i = 0;

                Array.from(tempinput[1]).forEach(element => {
                    if (element == "0" && !status) i++;
                    else status = true;
                });
                status = false;
            
                tempinput[1] = tempinput[1].slice(i);
                secondvalue = "e" + "-" + (i+1);

                firstvalue = "-" + roundupFirst(tempinput[1], status, firstvalue, secondvalue);
            }
            //neg when non decimal value length greater than 1
            else {
                let cut = 10**(tempinput[1].length - requiredcut);
                return Math.round(input * cut) / cut;
            }
        }
    }

    //remove unecessary zeros from the rouned up numbers
    for (let x = firstvalue.length - 1; x >= 0; x--){
        if(firstvalue[x] != 0 && firstvalue[x] != ".") break;
        else firstvalue = firstvalue.slice(0, firstvalue.length - 1);
    }
    console.log(secondvalue)
    return input = firstvalue + secondvalue;

}

function roundupFirst(input, status, firstvalue, secondvalue){
    let i = 0;
    Array.from(input).forEach(element => {
        if (element != 0 || status){
            if(i < 9 - (secondvalue.length + 1)){
                if(firstvalue.length == 1) {
                    firstvalue = firstvalue + ".";
                    firstvalue = firstvalue + element
                    i++;
                }
                else{
                firstvalue = firstvalue + element
                i++;
                }
            }
            status = true;
        }
    });
    return firstvalue;
}












function eToNumber(num) {
    let sign = "";
    (num += "").charAt(0) == "-" && (num = num.substring(1), sign = "-");
    let arr = num.split(/[e]/ig);
    if (arr.length < 2) return sign + num;
    let dot = (.1).toLocaleString().substr(1, 1), n = arr[0], exp = +arr[1],
        w = (n = n.replace(/^0+/, '')).replace(dot, ''),
      pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
      L   = pos - w.length, s = "" + BigInt(w);
      w   = exp >= 0 ? (L >= 0 ? s + "0".repeat(L) : r()) : (pos <= 0 ? "0" + dot + "0".repeat(Math.abs(pos)) + s : r());
    L= w.split(dot); if (L[0]==0 && L[1]==0 || (+w==0 && +s==0) ) w = 0; //** added 9/10/2021
    return sign + w;
    function r() {return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`)}
  }