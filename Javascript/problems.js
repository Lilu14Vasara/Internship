// function reverseString(str){

//     return str.split('').reverse().join('')
// }
// console.log(reverseString("Hemanshi"));

// function palidrom(str){
//     return str==str.split('').reverse().join('')
// }
// console.log(palidrom('Radha'));

// function checkPrimeNumber(num){
//     if(num % 2 !== 0){
//         return true;
//     }
//     else{
//         return false;
//     }
// }
// console.log(checkPrimeNumber(12));

function countVowels(str){
    let count = 0;
    let vowels='aeiouAEIOU'

    for (char of str) {
        if(vowels.includes(char)){
            count++;
        }
    
    }
    return count;
}
console.log(countVowels('AmanIlok'));

function sumOfArray(arr){
    return arr.reduce((a,b) => a+b,0)
}
console.log(sumOfArray([1,2,3,4,5]));

function removeDuplicate(arr){
    return [...new Set(arr)]
}
console.log(removeDuplicate([1,2,2,5,1,7,3,4]));
