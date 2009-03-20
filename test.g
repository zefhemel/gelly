strategy simplify()[] {
  ?[ m_x * 1 ];
  ![ m_x ]
};
strategy simplify2()[] {
  ?[ m_x + 0 ];
  ![ m_x ]
};
strategy try(s)[] {
  s <+ id
};
strategy repeat(s)[] {
  try(s; repeat(s))
};
![ 8 * 3 * 1 * 1 * 1 * 1 + 0];
repeat(simplify <+ simplify2)
