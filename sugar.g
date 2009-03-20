strategy rule_defs()[] {
  ?[ rule m_name : [ m_lh ] -> [ m_rh ] ]
  ; ![ strategy m_name()[] { 
         ?[ m_lh ]
         ; ![ m_rh ] 
       } ]
};

strategy simple_strategy()[] {
  ?[ strategy m_name { m_body } ]
  ; ![ strategy m_name()[] { m_body } ]
};

strategy str_appl()[] {
  ?[ <m_str> m_t ]
  ; ![ !m_t; m_str ]
};

strategy str_appl2()[] {
  ?[ <(m_str)> m_t ]
  ; ![ !m_t; m_str ]
};

strategy main()[:m_t] {
  ![ m_t ]
  ; innermost(rule_defs <+ str_appl <+ simple_strategy)
  ; eval[ id ]
};
