/************
 * Problem 01:
 * Write a function `calculateStrikeRate` that takes in two parameters - the runs scored by a batsman and the
 * total number of balls they faced. The function should return the batsman's strike rate, which is calculated as
 * the number of runs scored per 100 balls faced.
 * For example, if the batsman scored 45 runs off 30 balls, their strike rate would be calculated as follows:
 * (45 / 30) * 100 = 150
 * The function should round the strike rate to two decimal places.
 * Example Input/Output:
 * - calculateStrikeRate(45, 30) should return 150.00
 * - calculateStrikeRate(100, 60) should return 166.67
 * - calculateStrikeRate(25, 40) should return 62.50
 ************/

function calculateStrikeRate(score, balls) {
    let strikeRate = (score / balls) * 100;
    return strikeRate;
}

console.log(calculateStrikeRate(45, 30));
console.log(calculateStrikeRate(100, 60));
console.log(calculateStrikeRate(25, 40));

/************
 * Problem 02
 * Have the function `CountPairs` take in a string of lowercase letters and digits. The function should return the
 * count of all pairs of characters in the string that add up to an even number.
 * For example, if the input string is "a1b2c3d4e5f6", there are 3 pairs that add up to an even number: "b2",
 * "d4", and "f6". So the function should return 3.
 * If there are no such pairs, the function should return 0.
 * Examples:
 * - `CountPairs("a1b2c3d4e5f6")` should return 3
 * - `CountPairs("x1y2z3")` should return 1
 * - `CountPairs("a2b2c2d2")` should return 4
 ************/

function countPairs(str) {
    let count = 0;
    for (let char of str) {
        if (char % 2 === 0) count++;
    }
    return count;
}

console.log(countPairs("a1b2c3d4e5f6"));
console.log(countPairs("x1y2z3"));
console.log(countPairs("a2b2c2d2"));
console.log(countPairs("a1b12c1d1"));

/************
 * Problem 03
 *  Write a function called `reverseString` that takes a string as input and returns the reverse of that *
 * string. Your function should not use the built-in `reverse()` method.
 *   Example Input/Output:
 *   - reverseString('hello') should return 'olleh'
 *   - reverseString('racecar') should return 'racecar'
 *   - reverseString('12345') should return '54321'
 ************/

function reverseString(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Example usage:
console.log(reverseString("hello"));
console.log(reverseString("racecar"));
console.log(reverseString("12345"));

/************
 * Problem 04
 * Write a function isPalindrome that takes in a string and returns true if the string is a palindrome*** * (reads
 * the same forwards and backwards) and false otherwise.
 * Example Input/Output:
 * isPalindrome("racecar") should return true
 * isPalindrome("hello") should return false
 * isPalindrome("rotator") should return true
 * isPalindrome("peep") should return true
 *************/

function isPalindrome(str) {
    const len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

function isPalindrome(str) {
    const charArray = str.split("");
    const reversedArray = charArray.reverse();
    const reversedStr = reversedArray.join("");
    return str === reversedStr;
}

// Example usage:
console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));
console.log(isPalindrome("rotator"));
console.log(isPalindrome("peep"));

/************
 * Problem 05
 * Write a function `mergeArrays` that takes in two arrays of integers and returns a new array that
 * contains all the elements from both arrays, sorted in ascending order.
 * For example, if the two input arrays are:
 * [1, 3, 5, 7, 9]
 * [2, 4, 6, 8, 10]
 * The function should return the following array:
 * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * Example Input/Output:
 * - mergeArrays([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]) should return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * - mergeArrays([2, 4, 6, 8, 10], [1, 3, 5, 7, 9]) should return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * - mergeArrays([1, 2, 3], [4, 5, 6]) should return [1, 2, 3, 4, 5, 6]
 ************/

function mergeArrays(arr1, arr2) {
    const mergedArray = arr1.concat(arr2);
    mergedArray.sort((a, b) => a - b);
    return mergedArray;
}

// Example usage:
console.log(mergeArrays([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]));
console.log(mergeArrays([2, 4, 6, 8, 10], [1, 3, 5, 7, 9]));
console.log(mergeArrays([1, 2, 3], [4, 5, 6]));

/************
 * Problem 06
 * Write a function called `findShortestWord` that takes in a string as a parameter and returns the
 * shortest word in the string. If there are two or more words that are the same length and shortest,
 * return the first word from the string with that length. Ignore punctuation and assume the string will
 * not be empty. Words may also contain numbers.
 * For example, if the input string is "The quick brown fox jumps over the lazy dog", the function should
 * return "The".
 * Example Input/Output:
 * - findShortestWord("The quick brown fox jumps over the lazy dog") should return "The"
 * - findShortestWord("Hello world") should return "world"
 * - findShortestWord("Today is Monday") should return "is"
 ************/

function findShortestWord(str) {
    if (!str || str.trim() === "") return "";
    const words = str.split(" ");
    let shortestWord = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length < shortestWord.length) {
            shortestWord = words[i];
        }
    }
    return shortestWord;
}

// Example usage:
console.log(findShortestWord("The quick brown fox jumps over the lazy dog"));
console.log(findShortestWord("Hello world"));
console.log(findShortestWord("Today is Monday"));

/************
 * Problem 07
 * Suppose you are building a student database for your class that will track student’s names and their
 * marks. Your class has 40 students but now you are seeing that there are 41 entries in your database so
 * you decide to check the database. And you find out that you have mistakenly uploaded a student’s name
 * twice.

 * Task
 * Write a `removeDuplicates` function that takes in an array of names and returns a new array with any
 * duplicates removed.
 * Sample Input:
 * Student_names = [‘Zara’, ‘Sadia’ , ‘Mahin’ , ‘Adnan’ , ‘Maisha’, ‘Adnan’, ‘Faiyaz’]
 * Sample Output :
 * Student_names = [‘Zara’, ‘Sadia’ , ‘Mahin’ , ‘Adnan’ , ‘Maisha’, ‘Faiyaz’]
 ***********/

function removeDuplicates(names) {
    const uniqueNames = [];
    for (let i = 0; i < names.length; i++) {
        if (!uniqueNames.includes(names[i])) {
            uniqueNames.push(names[i]);
        }
    }
    return uniqueNames;
}

function removeDuplicates(names) {
    const uniqueNames = [];

    names.forEach((name) => {
        if (!uniqueNames.includes(name)) {
            uniqueNames.push(name);
        }
    });

    return uniqueNames;
}

function removeDuplicates(names) {
    return [...new Set(names)];
}

// Example usage:
const Student_names = [
    "Zara",
    "Sadia",
    "Mahin",
    "Adnan",
    "Maisha",
    "Adnan",
    "Faiyaz",
];
console.log(removeDuplicates(Student_names));

/************
 * Problem 08
 * You are giving a book stall at Dhaka International book fair and need to create a list of books to be
 * featured at the event.
 * Task:
 * Write a function `createBookList` that takes in three parameters: `bookTitles`, an array of book titles,
 * `authorNames`, an array of corresponding author names and ‘number of copies available’ , an array of
 * corresponding copies available for the book.
 * Write a function ‘Add Copies’ that takes two parameters : `bookTitle` and the number of copies you are
 * adding to that book. The function should add copies to that particular book.
 * Write a function ‘Sell Book’ that takes two parameters : `bookTitle` and the number of copies you are
 * selling of that book. The function should deduct copies of that particular book.
 * Write a function ‘GetDetails’ that takes no parameters and returns all the titles of the book in the
 * bookTitles array ,the author names of the book in the `authorNames’ array and the number of copies
 * available of the corresponding books, which should be updated after adding or selling a book.
.
 * Sample Input:
 * createBookList(‘Bohubrihi’ , ‘Humayun Ahmed’ , 10)
 * Add Copies(‘Bohubrihi’ , 5)
 * Updates number of copies available of Bohubrihi to 15)
 * ‘Sell Book’(‘Bohubrihi’ , 3)
 * Updates number of copies available of Bohubrihi to 12)
 * ‘GetDetails’()
 * Returns (“Bohubrihi” by “Humayun Ahmed” number of copies available 12)
 * Hint :Make 3 arrays of the same length.
************/

class BookStore {
    constructor() {
        this.bookTitles = [];
        this.authorNames = [];
        this.copiesAvailable = [];
    }

    createBookList = (bookTitle, authorName, numberOfCopies) => {
        this.bookTitles.push(bookTitle);
        this.authorNames.push(authorName);
        this.copiesAvailable.push(numberOfCopies);
    };

    addCopies = (bookTitle, numberOfCopiesToAdd) => {
        const index = this.bookTitles.indexOf(bookTitle);
        if (index !== -1) {
            this.copiesAvailable[index] += numberOfCopiesToAdd;
        }
    };

    sellBook = (bookTitle, numberOfCopiesToSell) => {
        const index = this.bookTitles.indexOf(bookTitle);
        if (
            index !== -1 &&
            this.copiesAvailable[index] >= numberOfCopiesToSell
        ) {
            this.copiesAvailable[index] -= numberOfCopiesToSell;
        }
    };

    getDetails = () => {
        const details = [];
        for (let i = 0; i < this.bookTitles.length; i++) {
            details.push(
                `"${this.bookTitles[i]}" by "${this.authorNames[i]}" number of copies available ${this.copiesAvailable[i]}`
            );
        }

        return details;
    };
}

// Example usage:
const myBookStore = new BookStore();
myBookStore.createBookList("Bohubrihi", "Humayun Ahmed", 10);
myBookStore.createBookList("1984", "George Orwell", 8);
myBookStore.addCopies("Bohubrihi", 5);
myBookStore.sellBook("Bohubrihi", 3);
console.log(myBookStore.getDetails());

/************
 * Problem 09
 * Write a Javascript Program that takes String as a parameter and checks if the parameters are number or
 * text. If the parameters are numbers then it will return a summation of the numbers. If the parameters * are not
 * numbers then it will generate a text by concatenating the strings.
 * Sample Input:
 * parseString(“21” , “24’ , “40”)
 * parseString(“Hello” , “Alpha”)
 * parseString(“Summer” , “2022”)
 * Sample Output:
 * 85
 * Hello Alpha
 * Summer 2022
 ************/

function parseString(...args) {
    let allNumbers = true;
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        const num = Number(args[i]);
        if (!isNaN(num)) {
            sum += num;
        } else {
            allNumbers = false;
            break;
        }
    }

    if (allNumbers) {
        return sum;
    } else {
        return args.join(" ");
    }
}

// Example usage:
console.log(parseString("21", "24", "40"));
console.log(parseString("Hello", "Alpha"));
console.log(parseString("Summer", "2022"));

/************
 * Problem 10
 * Given an array exists that has integers, write a function called "getPositiveNumbers" that takes the
 * entire array as input and returns a new array containing only the positive numbers from the original
 * array.
 * Sample Input : [2, -5, 10, -3, 8, -1, 0, 7]
 * Sample Output: [2, 10, 8, 7]
 ************/

function getPositiveNumbers(arr) {
    const positiveNumbers = [];
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] > 0) {
    //       positiveNumbers.push(arr[i]);
    //     }
    //   }
    arr.forEach((num) => {
        if (num > 0) {
            positiveNumbers.push(num);
        }
    });
    return positiveNumbers;
}

// Example usage:
const inputArray = [2, -5, 10, -3, 8, -1, 0, 7];
console.log(getPositiveNumbers(inputArray));

/************
 * Problem 11
 * Write a function called "findMissingNumber" that takes an array of consecutive integers from 1 to n,
 * with one number missing, and returns the missing number.
 * For example
 * Input: [1, 2, 3, 5, 6, 7, 8]
 * Output: 4
 ************/

// function findMissingNumber(arr) {
//   const n = arr.length + 1; // Since one number is missing
//   const expectedSum = (n * (n + 1)) / 2;
//   let sumOfArray = 0;
//   for (let i = 0; i < n - 1; i++) {
//     sumOfArray = sumOfArray + arr[i];
//   }
//   return expectedSum - sumOfArray;
// }

function findMissingNumber(arr) {
    arr.sort((a, b) => a - b); // Ensure the array is sorted
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== i + 1) {
            return i + 1;
        }
    }
    return arr.length + 1; // If no missing number found in the loop
}

// Example usage:
const inputArray2 = [1, 2, 3, 5, 6, 7, 8];
console.log(findMissingNumber(inputArray2));

/************
 * Problem 12
 * Write a function called "getMaxProduct" that takes an array of integers as input and returns the
 * maximum product that can be obtained by multiplying any two distinct elements from the array.
 * Sample Input: [2, 3, 5, 6, 7]
 * Sample Output: 42 (obtained by multiplying 6 and 7)
 ***********/

function getMaxProduct(arr) {
    if (arr.length < 2) {
        return null; // Not enough elements to form a product
    }
    let max1 = -Infinity;
    let max2 = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max1) {
            max2 = max1;
            max1 = arr[i];
        } else if (arr[i] > max2) {
            max2 = arr[i];
        }
    }

    return max1 * max2;
}

// Example usage:
const inputArray3 = [2, 3, 5, 6, 7];
console.log(getMaxProduct(inputArray3));
