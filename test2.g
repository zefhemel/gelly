strategy hd()[] {
  ?[ [ `x, `rest ] ];
  ![ `x ]
};
strategy tl()[] {
  ?[ [ `x, `rest ] ];
  ![ [ `rest ] ]
};
strategy simplify()[] {
  ?[ 1 * `x ];
  ![ `x ]
};
strategy simplify2()[] {
  ?[ 0 + `x ];
  ![ `x ]
};
strategy try(s)[] {
  s <+ id
};
strategy repeat(s)[] {
  try(s; repeat(s))
};
![ 1 * 1 * 7 * 8 ];
repeat(simplify <+ simplify2);
debug["Simplification: "];
![ [1, 2, 3, 4, 5] ];
debug;
tl;
tl;
hd
