for( ; ; ) {
    var num = prompt('Enter a natural number or "exit"');
    if(num === "exit") break;

    var primesArray = [[], [], [], [], [], []];
    var isCurrentNumberPrime;
    var foundPrimeNums = 0;
    for (var i = 2; foundPrimeNums < num; i++) {
        isCurrentNumberPrime = true;
        for (var j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isCurrentNumberPrime = false;
                break;
            }
        }
        if (isCurrentNumberPrime) {
            foundPrimeNums++;
            var arrayIndex = Math.floor(i % 10 <= 2 ? (i % 10) / 2 : (i % 10 + 1) / 2);
            var correctArray = primesArray[arrayIndex];
            correctArray[correctArray.length] = i;
        }
    }
    var result = '';
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < primesArray[i].length; j++) {
            result += primesArray[i][j] + " "
        }
    }
    console.log(result);
}