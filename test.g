o = Object new;
o set: "name" to: "Zef Hemel";
o set: "age" to: "25";
print: ("My age is: " concat: (o get: "age"));
str = "Hello";
str = str concat: " there";
str = str concat: " mister!";
print: str;
print: o describe;
