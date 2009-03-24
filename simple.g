strategy try(s)[] {
  s <+ id;
};

strategy where(s)[] {
  ?[ $t ];
  s;
  ![ $t ];
};

strategy not(s)[] {
  try(s; fail);
};
 
strategy alltd(s)[] {
  s <+ all(alltd(s));
};
 
strategy topdown(s)[] {
  s; all(topdown(s));
};
 
strategy bottomup(s)[] {
  all(bottomup(s)); s;
};
 
strategy oncebu(s)[] {
  one(oncebu(s)) <+ s;
};
 
strategy innermost(s)[] {
  bottomup(try(s; innermost(s)));
};

