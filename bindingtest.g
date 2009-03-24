strategy addone(s)[] {
  ?[ `t ];
  s;
  ![ `t + 1 ]
};
![ 17 ];
addone(?[ `frits ]);
debug;
try(addone(?[ `frits ]));
debug;
