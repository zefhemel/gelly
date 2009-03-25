import "simple.g";

// rule somerule : [ 1 * `e ] -> [ `e ]
strategy gelly-sugar-rule-def()[] {
  ?[ rule `name : [ `lh ] -> [ `rh ] ];
  ![ strategy `name()[] { 
       ?[ `lh ]
       ; ![ `rh ] 
     } 
   ];
};

strategy gelly-sugar-rule-where-def()[] {
  ?[ rule `name : [ `lh ] -> [ `rh ] where { `where } ];
  ![ strategy `name()[] { 
       ?[ `lh ]
       ; where(`where)
       ; ![ `rh ] 
     } 
   ];
};

strategy gelly-sugar-strategy-simple()[] {
  ?[ strategy `name { `body } ]; 
  ![ strategy `name()[] { `body } ];
};

strategy gelly-sugar-strategy-application()[] {
  ?[ <`str> `t2 ];
  ![ `t2; `str ];
};

strategy gelly-sugar-strategy-application2()[] {
  ?[ <(`str)> `t ];
  ![ `t; `str ];
};

strategy gelly-sugar-binding()[] {
  ?[ `lhs := `rhs ];
  ![ `rhs; ?[ `lhs ] ];
};

unscoped strategy main()[:main-p] {
  ?[ `main-t ];
  ![ `main-p ];
  innermost(
       gelly-sugar-rule-where-def
    <+ gelly-sugar-rule-def
    <+ gelly-sugar-strategy-simple
    <+ gelly-sugar-binding
    <+ gelly-sugar-strategy-application
    <+ gelly-sugar-strategy-application2
  );
  ?[ `main-p2 ];
  ![ `main-t ];
  eval[ ![ `main-p2 ] ];
};
