main[
  rule addone : [ `x ] -> [ `x + 1 ];
  strategy elem-to-code {
    rule text-to-code : [ text(`txt) `next ] -> [ echo `txt; `next-code ] 
      where { `next-code := <elem-to-code> ![ `next ] };

    rule hr-to-code : [ hr() `next ] -> [ echo "<hr/>"; `next-code ]
      where { `next-code := <elem-to-code> ![ `next ] };

    strategy single-to-code {
      ?[ `s(`a) ];
      ![ `s(`a) ingore ];
      elem-to-code;
    };

    text-to-code <+ hr-to-code <+ single-to-code <+ ![  ]
  };

];
strategy webdsl()[:webdsl-p] {
  ![ `webdsl-p ];
  elem-to-code
};
