// "this" in global scope
this.table = 'window table';
this.garage = {
    table: 'garage table'
}
console.log(this);              /* The Global Object
In Browser -> window
In Terminal -> { table: 'window table', garage: { table: 'garage table' } } */

/* console.log(table);
In Browser -> window table
In Terminal -> ReferenceError: table is not defined */

console.log(this.table);        // window table

/* console.log(garage);    
In Browser -> {table: 'garage table'}
In Terminal -> ReferenceError: garage is not defined */

/* console.log(garage.table);
In Browser -> 'garage table'
In Terminal -> ReferenceError: garage is not defined */

console.log(this.garage);       // { table: 'garage table' }
console.log(this.garage.table); // garage table

// "this" inside an object
const johnsRoom = {
    table: "John's Table"
}
console.log(johnsRoom);         // { table: "John's Table" }

/* console.log(this.johnsRoom);    
In Browser -> { table: "John's Table" } (REASON: Because in browsers johnsRoom automatically becomes a part of the window object)
In Terminal -> undefined (REASON: Because in VSCODE johnsRoom will not be a part of the global object unless we prepend it with this.) */

console.log(johnsRoom.table);   // John's Table

/* console.log(this.johnsRoom.table);
In Browser -> John's Table (REASON: same as above)
In Terminal -> TypeError: Cannot read properties of undefined (REASON: same as above) */

// "this" inside a method
const jillsRoom = {
    name: 'Jill',
    table: "Jill's Table",
    message() {
        console.log(`welcome to ${this.name}'s room`);
    }
}
jillsRoom.message();     // welcome to Jill's room

// "this" inside a function
const cleanTable = function (soap) {
    console.log(`cleaning ${this.table} with ${soap}`);
};
cleanTable.call(this, 'rin');               // cleaning window table with rin
cleanTable.call(this.garage, 'surf excel'); // cleaning garage table with surf excel
cleanTable.call(johnsRoom, 'nirma');        // cleaning John's Table with nirma
cleanTable.call(jillsRoom, 'vim');          // cleaning Jill's Table with vim

// "this" inside an inner function
const polishTable = function (varnish) {
    /* [Solution-1] (Worst Method)
    let that = this;
    const innerFunction = function (x) {
        console.log(`polishing ${that.table} using ${x}`);
    };
    innerFunction(varnish); */

    /* [Solution-2] (Using Call Function)
    const innerFunction = function (x) {
        console.log(`polishing ${this.table} using ${x}`);
    };
    innerFunction.call(this, varnish); */

    /* [Solution-3] (Using Bind Function)
    const innerFunction = function (x) {
        console.log(`polishing ${this.table} using ${x}`);
    };
    innerFunction.bind(this)(varnish); */

    /* [Solution-4] (Using Arrow Function) (Best Solution) */
    const innerFunction = (x) => {
        console.log(`polishing ${this.table} using ${x}`);
    };
    innerFunction(varnish);
}
polishTable.call(this, 'polyurethane');     // polishing window table using polyurethane     
polishTable.call(this.garage, 'acrylic');   // polishing garage table using acrylic
polishTable.call(johnsRoom, 'oil');         // polishing John's Table using oil
polishTable.call(jillsRoom, 'spirit');      // polishing Jill's Table using spirit

// "this" inside functional constructors (already seen in OOPs)
// "this" inside classes (already seen in OOPs) - these are preferred over functional constructors after ES6 - so to demostrate them I will be using sharpener question below:
/* Design Pattern Problem
    1. How will you design a Student class which stores the name, age, phone number, board marks of each student. Make a constructor to initialize the values.
    2. Write a function to check whether the student is egligible or not for college. If board marks > 40 -> egligible , if less than 40 -> not egligible. Write a function to check this.
    3. Create 5 students with different names and age.
    4. Write a function which keep track of the number of students created. Have you heard of static variables. Leverage that now.
    5. Write a function called eligible for placements which basically takes the minimum board marks required by a candidate to sit for the company coming for placement and it returns a fat arrow function.The fat arrow function takes age as an argument and returns true if the given student has board marks greater than minimum board marks required by company and is above the required age set by the company.
    6. Run the code across all the students and print the names of egligible students.
*/
class Student {
    static count = 0;
    constructor(name, age, phno, marks) {
        this.name = name
        this.age = age
        this.phoneNumber = phno
        this.boardMarks = marks
        Student.count++;
    }
    static noOfStudents() {
        console.log(this.count);
    }
    eligibility() {
        return this.marks >= 40 ? true : false;
    }
    placementEligibility(minMarks) {
        return (minAge) => {
            return (this.boardMarks > minMarks) && (this.age > minAge) ? true : false;
        };
    }
}
Student.noOfStudents(); // 0
const tom = new Student('tom', 31, 123, 45);
Student.noOfStudents(); // 1
const jerry = new Student('jerry', 20, 234, 73);
Student.noOfStudents(); // 2
const dexter = new Student('dexter', 22, 345, 98);
Student.noOfStudents(); // 3
const jhonny = new Student('jhonny', 27, 456, 35);
Student.noOfStudents(); // 4
const pluto = new Student('pluto', 35, 567, 26);
Student.noOfStudents(); // 5
// Checking Eligibility for Placements (minMarks = 40) (minAge = 20)
console.log(tom.placementEligibility(40)(20));      // true
console.log(jerry.placementEligibility(40)(20));    // false
console.log(dexter.placementEligibility(40)(20));   // true
console.log(jhonny.placementEligibility(40)(20));   // false
console.log(pluto.placementEligibility(40)(20));    // false
// To print the name of eligible students I will do the following:
const students = [tom, jerry, dexter, jhonny, pluto];
let studentsEligibleForPlacements = [];
for (let key of students) {
    if (key.placementEligibility(40)(20)) {
        studentsEligibleForPlacements.push(key.name);
    }
}
console.log(studentsEligibleForPlacements); // [ 'tom', 'dexter' ]

/* NOTE: You can also declare a function outside the class (i.e. not as a class method) and then call/apply/bind it on individual objects as shown below:

function placementEligibility(minMarks) {
    return (minAge) => {
        return (this.boardMarks > minMarks) && (this.age > minAge) ? true : false;
    };
}
console.log(placementEligibility.call(tom, 40)(25));    // true
console.log(placementEligibility.call(jerry, 40)(25));  // false
console.log(placementEligibility.call(dexter, 40)(25)); // false
console.log(placementEligibility.call(jhonny, 40)(25)); // false
console.log(placementEligibility.call(pluto, 40)(25));  // false */

/* Arrow Functions, Arguements and Spread Operator */
const x = function () {
    console.log(arguments[1]);
}
x(1, 2, 3);   // 2
// Doing the same thing using Arrow Function and Spread Operator
/* NOTE: The thing below would not work
const y = () => {
    console.log(arguments[1]);
}
y(1, 2, 3); // ReferenceError: arguments is not defined at y */
// You would have to use Spread Operator as shown below:
const y = (...n) => {
    console.log(n[1]);
}
y(1, 2, 3); // 2