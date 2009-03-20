import "simple.g";

strategy gelly-sugar-rule-def()[] {
  ?[ rule $name : [ $lh ] -> [ $rh ] ]
  ; ![ strategy $name()[] { 
         ?[ $lh ]
         ; ![ $rh ] 
       } 
     ]
};

strategy gelly-sugar-rule-where-def()[] {
  ?[ rule $name : [ $lh ] -> [ $rh ] where { $where } ]
  ; ![ strategy $name()[] { 
         ?[ $lh ]
         ; where($where)
         ; ![ $rh ] 
       } 
     ]
};

strategy gelly-sugar-strategy-simple()[] {
  ?[ strategy $name { $body } ]
  ; ![ strategy $name()[] { $body } ]
};

strategy gelly-sugar-strategy-application()[] {
  ?[ <$str> $t ]
  ; ![ $t; $str ]
};

strategy gelly-sugar-strategy-application2()[] {
  ?[ <($str)> $t ]
  ; ![ $t; $str ]
};

strategy gelly-sugar-binding()[] {
  ?[ $lhs := $rhs ]
  ; ![ $rhs; ?[ $lhs ] ]
};

strategy main()[:p] {
  ?[ $t ]
  ; ![ $p ]
  ; innermost(
         gelly-sugar-rule-where-def
      <+ gelly-sugar-rule-def
      <+ gelly-sugar-strategy-simple
      <+ gelly-sugar-binding
      <+ gelly-sugar-strategy-application
      <+ gelly-sugar-strategy-application2
    )
  ; ?[ $p2 ]
  ; ![ $t ]
  ; eval[ ![ $p2 ] ]
};
