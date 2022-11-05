// A good example to understand closures (IMP)
function outer() {
    let b = 50;
    function x() {
        let a = 10;
        function y() {
            console.log(a, b);
        }
        return y;
    }
    return x;
}
const z = outer();
const p = z();
p();
// Study this along with Sharperner Assignment "Advance JavaScript" Task-8

// Understanding Call, Apply and Bind Methods
const cricketer1 = {
    firstName: 'Sachin',
    lastName: 'Tendulkar'
}
const cricketer2 = {
    firstName: 'Rahul',
    lastName: 'Dravid'
}
const display = function (city, state) {
    return `${this.firstName} ${this.lastName} is from ${city}, ${state}.`;
}

// Call Method is used to directly invoke a function (the arguments are passed directly)
console.log(display.call(cricketer1, 'Mumbai', 'Maharashtra'));
console.log(display.call(cricketer2, 'Indore', 'MP'));

// Apply Method is also used to directly invoke a function but the arguments are passed as array
console.log(display.apply(cricketer1, ['Mumbai', 'Maharashtra']));
console.log(display.apply(cricketer2, ['Indore', 'MP']));

// Bind Method generates a copy of the function which can be invoked later on when needed
console.log(display.bind(cricketer1, 'Mumbai', 'Maharashtra'));
console.log(display.bind(cricketer2, 'Indore', 'MP'));
// These can be stored in some variable which can be invoked later on when needed
const sachinInfo = display.bind(cricketer1, 'Mumbai', 'Maharashtra');
const dravidInfo = display.bind(cricketer2, 'Indore', 'MP');
// Now, invoking them
console.log(sachinInfo());
console.log(dravidInfo());
// Alternatively, we can just pass the object in bind method and provide arguments later on when the function is invoked
const sachinAltInfo = display.bind(cricketer1);
const dravidAltInfo = display.bind(cricketer2);
console.log(sachinAltInfo('Mumbai', 'Maharashtra'));
console.log(dravidAltInfo('Indore', 'MP'));

// Create a new object called Student with age 20 , write a function which prints the age of the student from the student object. Dont pass in args. Read from 'this' and use BIND
const student = {
    name: 'Ram',
    age: '20'
}

function studentAge() {
    return this.age;
}

const ageOfRam = studentAge.bind(student);
console.log(ageOfRam());    // 20

// Currying using Bind Method
function bindMultiply(x, y) {
    console.log(x * y);
}
const bindMultiplyByTwo = bindMultiply.bind(this, 2);
bindMultiplyByTwo(5);   // 10
const bindMultiplyByThree = bindMultiply.bind(this, 3);
bindMultiplyByThree(5); // 15

// Currying using Closures Concept
function closureMultiply(x) {
    return function (y) {
        console.log(x * y);
    }
}
const closureMultiplyByTwo = closureMultiply(2);
closureMultiplyByTwo(5);    // 10
const closureMultiplyByThree = closureMultiply(3);
closureMultiplyByThree(5);  // 15