o = Object new
o set: "name" to: "Zef Hemel"
o set: "age" to: "25"
print: "My age is: " + (o get: "age")
str = "Hello"
str = str + " there"
str = str + " mister!"
print: str

defineMethods: {
   sayHello: name {
    say: "Hello" to: name
   }

   say: what to: whom {
     print: what + " " + whom
   }

   addOne: n {
     return: n + 1
   }
}

sayHello: "Zef"
counter = 0

Int defineInstanceMethods: {
  plusOne {
    return: self + 1
  }
}

counter = counter plusOne
counter = counter plusOne
counter = counter plusOne
print: counter

Object subClass: "User" withMethods: {
  init {
    set: "name" to: "unkown"
    set: "age" to: 0
  }
}

zef = User new init
print: (zef get: "name")
if: [ (zef get: "name") == "unkown" ] then: {
  print: "Default value still!"
} else: {
  print: "value has been changed!"
}

n = 10
while: [n != 0] do: {
  print: n
  n = n - 1
}

Int defineInstanceMethods: {
  fact {
    if: [ self == 0 ] then: {
      return: 1
    } else: {
      return: self * ((self - 1) fact)
    }
  }
}

print: "Factorial of 25:"
print: 25 fact
