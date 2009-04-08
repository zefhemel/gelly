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

];
sayHello: "Zef";
