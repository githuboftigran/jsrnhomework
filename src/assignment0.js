for (; ;) {
    var num = prompt('Enter a natural number or "exit"');
    if (num === "exit") {
        break;
    }
    if (num < 1) {
        continue;
    }
    var array = [[], [2], [], [], [], []];
    var isPrime = true;
    var lastNumber = 2;
    var count = 1;
    for (var i = lastNumber + 1; count < num; i++) {
        isPrime = true;
        for (var j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            var arrayPlace = Math.floor((i % 10) / 2) + Math.sign(i % 10 - 1);
            array[arrayPlace][array[arrayPlace].length] = i;
            lastNumber = i;
            count++;
        }
    }
    var answer = "";
    for (var k = 0; k < array.length; k++) {
        for (var l = 0; l < array[k].length; l++) {
            answer += array[k][l] + " ";
        }
    }
    console.log(answer);
}
