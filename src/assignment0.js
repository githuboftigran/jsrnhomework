var number = prompt ('Enter a natural number or "exit"');   // this variable keeps the quantity of prime numbers  
var currentNumber;                                          // this is a variable for cuurent number is going to be checked
var flag;                                                   // flag keeps the primety for current number
var primeNumberQuantity = 1;                                // this is the quantity of prime numbers are already checked; it's initially 1, because we are not going to check number 2
var massive = [];                                           // a massive to collect prime numbers
var sortedMassive = [];                                     // a new massive to sort the prime numbers from massive
massive [0] = 2;                                            // number 2 is not going to be checked

while(number !== 'exit'){
    for(currentNumber = 3; primeNumberQuantity < number; currentNumber++){  // passing through every number to check untill we find enough prime numbers
        flag = true;                                                        // number is prime unless the next loop changes the answer 
        for(var i=2; i < currentNumber / 2; i++){                           // i is the divider
            if(currentNumber % i === 0){                                    // if a number completely divides to a number (2,number/2), it's not prime
                flag = false;
                break;
            }
        }
        if(flag){
            massive[primeNumberQuantity++] = currentNumber;
        }
    }

    //Now we have first "number" prime numbers in massive. Let's sort them.
    var k = 0;
    for(var i = 1; i <= 9 ; i++){
        for(var j = 0; j < number; j++){
            if(massive[j] % 10 === i){
                sortedMassive[k++] = massive[j];
            }
        }
    }
    console.log(sortedMassive);
    number = prompt ('Enter a natural number or "exit"');
}