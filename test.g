import "sugar.g";

main[
  rule bla-rule : [ 1 ] -> [ 2 ];
  rule bla2rule : [ 2 ] -> [ 3 ] where { id };
  strategy whatever_id {
    id; debug
  };
  <(bla-rule; whatever_id)> ![ 1 ];
  try(bla2rule);
]
