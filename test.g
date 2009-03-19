strategy simplify()[] {
  ?[ m_x * 1 ];
  ![ m_x ]
};
strategy try(s)[] {
  s <+ id
};
strategy repeat(s)[] {
  debug;
  try(s; repeat(s))
};
![ 8 * 3 * 1 * 1 * 1 * 1];
repeat(simplify)
