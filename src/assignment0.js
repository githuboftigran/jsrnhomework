var count = prompt('Enter a natural number or "exit"');
while (count !== 'exit'){
    var primes = [];
    var number = 2;     //The first prime number is '2'
    var index = 0;      // index for new array with prime numbers
    if (count > 1) {
        while (primes.length < count) {
            var isPrime = true;
            for (var i = 2; i * i <= number; i++) {
                if (number % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
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

