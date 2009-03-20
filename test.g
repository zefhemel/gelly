strategy hd()[] {
  ?[ [ m_x, m_rest ] ];
  ![ m_x ]
};
strategy tl()[] {
  ?[ [ m_x, m_rest ] ];
  ![ [ m_rest ] ]
};
strategy simplify()[] {
  ?[ 1 * m_x ];
  ![ m_x ]
};
strategy simplify2()[] {
  ?[ 0 + m_x ];
  ![ m_x ]
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
