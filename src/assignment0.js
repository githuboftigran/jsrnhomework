var num = prompt('Enter a natural number or "exit"');

while (num !== 'exit') {

    var count = 1;
    var primeArr = [2];
    var startPrimeNum = 3;

    while (count < parseInt(num)) {
        var isPrime = true;
        for (j = 2; j < startPrimeNum; j++) {
            if (startPrimeNum % j === 0) {
                isPrime = false;
            }
        }

        if (isPrime) {
            primeArr[count] = startPrimeNum;
            count++;
        }
        startPrimeNum++;
    }

    for (var i = 0; i < primeArr.length - 1; i++) {
        for (var j = 0; j < primeArr.length - 1; j++) {
            if ((primeArr[j] % 10) > (primeArr[j + 1] % 10)) {
                var sort = primeArr[j];
                primeArr[j] = primeArr[j + 1];
                primeArr[j + 1] = sort;
            }
        }
    }

    console.log(primeArr);
    num = prompt('Enter a natural number or "exit"');
}
