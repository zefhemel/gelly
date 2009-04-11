StringBuilder = Object importNativeClass: "java.lang.StringBuilder"
print: "here"
s = StringBuilder new
print: "here"
s append: "Bla"
s append: "Bla"
s append: "Bla"
str = s toString
print: "It says: " + str
