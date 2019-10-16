var number = prompt ('Enter a natural number or "exit"'); // this variable keeps the quantity of prime numbers  
var current_number = 2; // the current number is going to be checked
var massive = [number]; // an array to keep the prime numbers
var sorted_massive = [number]; // a new array to sort our prime numbers
var flag = false;  // flag says whether the current number prime or not
for(var i = 0; i < number;){
    if(current_number === 2){  
        flag = true;
    }
    else if(current_number > 1){
        for(var j = 2; j < current_number; j++){
            if(current_number % j !== 0){
                flag = true;
            }
            else if(current_number === j * j){
                flag = false;
                break;
            }
            else{
                flag = false;
                break;
            }
        }
    }
    else{
        flag = false;
    }
    if(flag === true){
        massive[i] = current_number;
        i++;
    }
    current_number++;
}

//Now we have first "number" prime numbers in massive. Let's sort them.
var k = 0;
for(var i = 1; i <= 9 ; i++){
    for(var j = 0; j < number; j++){
        if(massive[j] % 10 === i){
            sorted_massive[k] = massive[j];
            k++;
        }
    }
}

for(var i = 0; i < number; i++){
    console.log(sorted_massive[i]);
}