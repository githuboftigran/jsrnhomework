var num = parseInt(prompt('Enter a natural number or "exit"'));

var c = 1;
var primeArr = [2];
var i = 3;

function isPrime(k) {
    for (var j = 2; j < k; j++) {
        if (k % j === 0) {
            return false;
        }
    }
    return true;
}

while (c < num) {
    if (isPrime(i)) {
        primeArr[c] = i;
        c++;
    }
    i++;
}

for (let i = 0; i < primeArr.length - 1; i++) {
    for (var j = 0; j < primeArr.length - 1; j++) {
        if ((primeArr[j] % 10) > (primeArr[j + 1] % 10)) {
            let c = primeArr[j];
            primeArr[j] = primeArr[j + 1];
            primeArr[j + 1] = c;
        }
    }

}

console.log(primeArr);
console.log(primeArr);