import "simple.g";

strategy gelly-sugar-rule-def()[] {
  ?[ rule m_name : [ m_lh ] -> [ m_rh ] ]
  ; ![ strategy m_name()[] { 
         ?[ m_lh ]
         ; ![ m_rh ] 
       } 
     ]
};

strategy gelly-sugar-rule-where-def()[] {
  ?[ rule m_name : [ m_lh ] -> [ m_rh ] where { m_where } ]
  ; ![ strategy m_name()[] { 
         ?[ m_lh ]
         ; where(m_where)
         ; ![ m_rh ] 
       } 
     ]
};

strategy gelly-sugar-strategy-simple()[] {
  ?[ strategy m_name { m_body } ]
  ; ![ strategy m_name()[] { m_body } ]
};

strategy gelly-sugar-strategy-application()[] {
  ?[ <m_str> m_t ]
  ; ![ !m_t; m_str ]
};

strategy gelly-sugar-strategy-application2()[] {
  ?[ <(m_str)> m_t ]
  ; ![ !m_t; m_str ]
};

strategy main()[:m_p] {
  ?[ m_t ]
  ; ![ m_p ]
  ; innermost(
         gelly-sugar-rule-where-def
      <+ gelly-sugar-rule-def
      <+ gelly-sugar-strategy-simple
      <+ gelly-sugar-strategy-application
      <+ gelly-sugar-strategy-application2
    )
  ; ?[ m_p2 ]
  ; ![ m_t ]
  ; eval[ ![ m_p2 ] ]
};
