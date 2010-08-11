/*
map fn [] = [];
map fn [a | k] = [fn a | map fn k];
*/ 

function parse(text, keywords) {
  var emptyTerm = new aterm.ApplTerm("Empty");
  var emptyList = new aterm.ListTerm([]);
  keywords = keywords || [];

  function opTerm(op, left, right) {
    return new aterm.ApplTerm("Op", [new aterm.StringTerm(op), left ? left : emptyTerm, right ? right : emptyTerm]);
  }

  function symbolTerm(sym) {
    return new aterm.ApplTerm("Sym", [new aterm.StringTerm(sym)]);
  }

  function groupTerm(delim, items) {
    return new aterm.ApplTerm("Group", [new aterm.StringTerm(delim), items]);
  }

  function arrayContains(ar, item) {
    for(var i = 0; i < ar.length; i++) {
      if(ar[i] === item) {
        return true;
      }
    }
    return false;
  }

  function valueOrEmpty(t) {
    if(t === null) {
      return emptyTerm;
    } else {
      return t;
    }
  }

  function valueOrEmptyList(t) {
    if(t === null) {
      return emptyList;
    } else {
      return t;
    }
  }

  var i = 0;
  var keywordLevel = 9;
  var followLevel = 0;

  var operators = [
    [".", "_"],
    ["*", "/", "%"],
    ["+", "-"],
    ["<", "<=", ">", ">="],
    ["!",  "=", "+=", "-=", "*=", ":=", "!="],
    ["&"],
    ["|"],
    ["?", ":", "$"],
    [","],
    ["keyword"]
  ];

  var noWhitespaceOps = [";", ",", ".", "_"];
  var allOps = ['!', '@', '#', '%', '^', '&', '*', '-', '+', '=', '|', '/', '\\', '<', '>', '.', '?'];
  var prefixOps = ["+", "-", "*", "<", ">", "?", "!", ":", "`", "$"];

  function acceptFactor() { 
    var int = acceptInt();
    if(int !== -1) {
      return new aterm.IntTerm(int);
    }
    var idn = acceptIdn();
    if(idn !== null && !arrayContains(keywords, idn)) {
      return symbolTerm(idn);
    } else if(idn !== null && arrayContains(keywords, idn)) {
      i = i - idn.length;
    }
    var s = acceptString();
    if(s !== null) {
      return new aterm.StringTerm(s);
    }
    var pe = acceptPrefixExp();
    if(pe != null) {
      return pe;
    }
    if(accept('(')) {
      acceptWhiteSpace();
      var exp = acceptExp();
      acceptWhiteSpace();
      expect(')');
      return groupTerm('(', valueOrEmptyList(exp));
    }
    if(accept('[')) {
      acceptWhiteSpace();
      var exp = acceptExp();
      acceptWhiteSpace();
      expect(']');
      return groupTerm('[', valueOrEmptyList(exp));
    }
    if(accept('{')) {
      acceptWhiteSpace();
      var exp = acceptStats();
      acceptWhiteSpace();
      expect('}');
      return groupTerm('{', valueOrEmptyList(exp));
    }
    return null;
  }

  function acceptPrefixExp() {
    var op = acceptOps(prefixOps);
    if(op === null) {
      return null;
    }
    var t = acceptFactor(); //acceptGeneric(0);
    if(t !== null) {
      return opTerm(op, null, t);
    } else {
      return null;
    }
  }

  function acceptGenericKeyword() {
    var oldI = i;
    acceptWhiteSpace();
    var kw = acceptKeyword();
    if(kw === null) {
      i = oldI;
      return acceptGeneric(keywordLevel - 1);
    } 
    acceptWhiteSpace();
    var t = acceptExp(); //acceptGeneric(keywordLevel - 1);
    if(t !== null) {
      return new aterm.ApplTerm(kw[0].toUpperCase()+kw.substring(1), [t]);
    } else {
      i = oldI;
      return null;
    }
  }

  function acceptGeneric(level) {
    var f = null;
    if(level === 0) {
      f = acceptFactor();
    } else if(level === keywordLevel) {
      f = acceptGenericKeyword();
    } else {
      f = acceptGeneric(level-1);
    }
    if(f === null) {
      return null;
    }
    var t = f;
    var oldI = i;
    var didAcceptWhitespace = acceptWhiteSpace();
    var op = acceptOps(operators[level]);
    if(!didAcceptWhitespace && op !== null && !arrayContains(noWhitespaceOps, op)) {
      t = opTerm(op, t, null);
      acceptWhiteSpace();
      oldI = i;
      op = acceptOps(operators[level]);
    }
    while(op !== null) {
      if(!acceptWhiteSpace() && !arrayContains(noWhitespaceOps, op)) {
        t = opTerm(op, t, null);
        acceptWhiteSpace();
        op = acceptOps(operators[level]);
      }
      var t2 = null;
      if(level === 0) {
        t2 = acceptFactor(); // One level lower to enforce left-recursive parsing
      } else {
        t2 = acceptGeneric(level);
      }
      if(t2 == null && op === "_") {
        i = oldI;
        return t;
      }
      t = opTerm(op, t, valueOrEmpty(t2));
      oldI = i;
      if(!acceptWhiteSpace() && !arrayContains(noWhitespaceOps, op)) {
        i = oldI;
        return t;
      }
      op = acceptOps(operators[level]);
    }
    i = oldI;
    return t;
  }

  function acceptStats() {
    var stats = []
    var t = null;
    acceptSemi();
    do {
      t = acceptGeneric(operators.length-1);
      if(t) {
        stats.push(t);
      }
    } while(t && acceptSemi());
    return new aterm.ListTerm(stats);
  }

  function acceptExp() {
    acceptWhiteSpace();
    return acceptGeneric(operators.length-1);
  }

  function acceptWhiteSpace() {
    var oldI = i;
    while(i < text.length && (text[i] == ' ' || text[i] == '\t' || lookAhead("//") || lookAhead("/*"))) { 
      if(lookAhead("//")) {
        while(i < text.length && text[i] != '\n' && text[i] != '\r') {
          i++;
        }
      } else if(lookAhead("/*")) {
        while(i < text.length && !lookAhead("*/")) {
          i++;
        }
        if(lookAhead("*/")) {
          i = i + 2;
        }
      } else {
        i++;
      }
    }
    return oldI !== i;
  }

  function acceptSemi() {
    var oldI = i;
    if(accept(';') || accept("\n") || accept("\r")) {
      while(accept(';') || accept("\n") || accept("\r"));
      acceptWhiteSpace();
      return true;
    } else {
      i = oldI;
      return false;
    }
  }

  function printRest() {
    console.log("Rest: " + text.substring(i));
  }

  function lookAhead(str) {
    var parsedSomething = false;
    for(var j = 0; j < str.length && i+j < text.length; j++) {
      if(text[j+i] != str[j]) {
        return false;
      }
      if(i+j+1 === text.length && j+1 < str.length) {
        return false;
      }
      parsedSomething = true;
    }
    return parsedSomething;
  }

  function acceptOps(ops) {
    var canBeWhiteSpace = false;
    for(var j = 0; j < ops.length; j++) {
      var op = ops[j];
      if(op === "_") {
        canBeWhiteSpace = true;
      } else if(lookAhead(op)) {
        var opstr = op
        var oldI = i;
        i = i + op.length;
        while(i < text.length && arrayContains(allOps, text[i])) {
          opstr += text[i];
          i++;
        }
        if(text[i-1] !== '=' || opstr === op) {
          return opstr;
        } else {
          i = oldI;
        }
      }
    }
    if(canBeWhiteSpace) {
      return "_";
    } else {
      return null;
    }
  }

  function acceptKeyword() {
    var oldI = i;
    var idn = acceptIdn();
    if(idn === null) {
      return null;
    } 
    if(arrayContains(keywords, idn)) {
      return idn;
    } else {
      i = oldI;
      return null;
    }
  }


  function acceptInt() {
    if(i === text.length) {
      return -1;
    }
    var s = "";
    if(text[i] >= '0' && text[i] <= '9') {
      while(i < text.length && text[i] >= '0' && text[i] <= '9') {
        s += text[i];
        i++;
      }
      return parseInt(s, 10);
    } else {
      return -1;
    }
  }

  function acceptString() {
    if(i === text.length) {
      return null;
    }
    var s = '';
    if(text[i] == '"') {
      i++;
      while(i < text.length && text[i] != '"' && text[i-1] != '\\') {
        if(!(text[i] == '\\' && i < (text.length + 1) && text[i+1] == '"')) {
          s += text[i];
        }
        i++;
      }
      i++;
      return s;
    } else {
      return null;
    }
  }

  function accept(c) {
    if(i == text.length) {
      return false;
    }
    if(text[i] == c) {
      i++;
      return true;
    } else {
      return false;
    }
  }

  function expect(c) {
    if(i === text.length) {
      console.error("Rest of the buffer: ");
      printRest();
      throw "Expected: " + c;
    }
    if(text[i] == c) {
      i++;
    } else {
      console.error("Rest of the buffer: ");
      printRest();
      throw "Expected: " + c;
    }
  }

  function acceptIdn() {
    if(i === text.length) {
      return null;
    }
    var oldI = i;
    var sym = '';
    if((text[i] >= 'a' && text[i] <= 'z') || 
      (text[i] >= 'A' && text[i] <= 'Z') ||
      (text[i] == '_')) {
      sym += text[i];
      i++;
    } else {
      return null;
    }
    // Read constructor
    while(i < text.length && ((text[i] >= 'a' && text[i] <= 'z') || 
        (text[i] >= 'A' && text[i] <= 'Z') ||
        (text[i] >= '0' && text[i] <= '9') ||
        (text[i] == '_') || (text[i] == '-'))) {
      sym += text[i];
      i++;
    }
    while(i > 1 && text[i-1] == '-') {
      i--;
      sym = sym.substring(0, sym.length-1); 
    }
    return sym;
  }

  return acceptStats();
}
