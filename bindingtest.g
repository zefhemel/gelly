![ 10 ];
?[ `something ];
strategy returnSomething()[] {
  ![ `something ]
};
strategy addone(s)[] {
  ?[ `t ];
  s;
  ![ `t + 1 ]
};
![ 17 ];
addone(?[ `frits ]);
debug;
returnSomething;
try(addone(?[ `frits ]));
debug;
