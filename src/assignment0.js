var count = prompt('Enter a natural number or "exit"');
while (count !== 'exit'){
    var primes = [];
    var number = 2;
    var index = 0;
    if (count > 1) {
        while (primes.length < count) {
            var isTrue = true;
            for (var i = 2; i * i <= number; i++) {
                if (number % i === 0) {
                    isTrue = false;
                    break;
                }
            }
            if (isTrue === true) {
                primes[index] = number;
                index++;
            }
            number += 1;
        }
        for (i = 0; i < primes.length - 1; i++) {
            for (var j = 0; j < primes.length - i; j++) {
                if (primes[j] % 10 > primes[j + 1] % 10) {
                    var temp = primes[j];
                    primes[j] = primes[j + 1];
                    primes[j + 1] = temp;
                }
            }
        }
    }
    console.log('primes',primes);
    count = prompt('Enter a natural number or "exit"');
}

