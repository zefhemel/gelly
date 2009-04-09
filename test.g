o = Object new;
o set: "name" to: "Zef Hemel";
o set: "age" to: "25";
print: ("My age is: " + (o get: "age"));
str = "Hello";
str = str + " there";
str = str + " mister!";
print: str;
defineMethods: [
   sayHello: name [
    say: "Hello" to: name;
   ]

   say: what to: whom [
     print: what + " " + whom;
   ]

   addOne: n [
     return: n + 1;
   ]
];
sayHello: "Zef";
counter = 0;
Int defineInstanceMethods: [
  plusOne [
    return: self + 1;
  ]
];
counter = counter plusOne;
counter = counter plusOne;
counter = counter plusOne;
print: counter;
Object subClass: "User" withMethods: [
  init [
    set: "name" to: "unkown";
    set: "age" to: 0;
  ]
];
zef = User new init;
print: (zef get: "name");
