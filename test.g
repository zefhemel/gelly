:import "simple.g";
:import "sugar.g";
main[
  rule bla : [ 1 ] -> [ 2 ];
  strategy whatever_id {
    id; debug
  };
  <(bla; whatever_id)> [ 1 ]
]
