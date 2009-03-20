strategy try(s)[] {
  s <+ id
};

strategy alltd(s)[] {
  s <+ all(alltd(s))
};

strategy topdown(s)[] {
  s; all(topdown(s))
};

strategy bottomup(s)[] {
  all(bottomup(s)); s
};

strategy oncebu(s)[] {
  one(oncebu(s)) <+ s
};

strategy innermost(s)[] {
  bottomup(try(s; innermost(s)))
};

strategy replace2()[] {
  ?[ 2 ]
  ; ![ 1 ]
};

strategy replace3()[] {
  ?[ 3 ]
  ; ![ 2 ]
};

![ 3 *  2 + 2 ]
; innermost(replace2 <+ replace3)
