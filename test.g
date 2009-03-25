// Simple test script
main[
  //rule bla-rule : [ 1 ] -> [ 2 ];
  //rule bla2rule : [ `x ] -> [ `y + 1 ] where { `y := ![ `x ]; };
  //strategy whatever_id {
    //id; debug
  //};
  //<(bla-rule; whatever_id)> ![ 1 ];
  ![ 7 * 8 ];
  where(debug);
  //bla2rule
]
