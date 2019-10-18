var num = parseInt(prompt('Enter a number please :)'));

var c = 1;
var numArr = [2];
var i = 3;

function number(k) {
    for (var j = 2; j < k; j++) {
        if (k % j === 0) {
            return false;
        }
    }
    return true;
}

while (c < num) {
    if (number(i)) {
        numArr[c] = i;
        c++;
    }
    i++;
}


for (let i = 0; i < numArr.length - 1; i++) {
    for (var j = 0; j < numArr.length - 1; j++) {
        if ((numArr[j] % 10) > (numArr[j + 1] % 10)) {
            let c = numArr[j];
            numArr[j] = numArr[j + 1];
            numArr[j + 1] = c;
        }
    }

}

console.log(numArr);