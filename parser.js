var gelly = {};

gelly.parse = function(text, config) {
  var emptyList = new aterm.ListTerm([]);
  config = config || {};

  var keywords = config.keywords || [];

  function opTerm(op, left, right, pos) {
    return new aterm.ApplTerm("Op", [new aterm.StringTerm(op), left, right], pos);
  }

  function prefixOpTerm(op, t, pos) {
    return new aterm.ApplTerm("PrefixOp", [new aterm.StringTerm(op), t], pos);
  }

  function postfixOpTerm(op, t, pos) {
    return new aterm.ApplTerm("PostfixOp", [new aterm.StringTerm(op), t], pos);
  }

  function symbolTerm(sym, pos) {
    return new aterm.ApplTerm("Sym", [new aterm.StringTerm(sym)], pos);
  }

  function groupTerm(delim, items, pos) {
    return new aterm.ApplTerm("Group", [new aterm.StringTerm(delim), items], pos);
  }

  function intTerm(n, pos) {
    return new aterm.ApplTerm("Int", [new aterm.IntTerm(n)], pos);
  }

  function singleQuoteStringTerm(s, pos) {
    return new aterm.ApplTerm("SQString", [new aterm.StringTerm(s)], pos);
  }

  function doubleQuoteStringTerm(s, pos) {
    return new aterm.ApplTerm("DQString", [new aterm.StringTerm(s)], pos);
  }

  function applTerm(cons, children, pos) {
    return new aterm.ApplTerm(cons, children, pos);
  }

  function listTerm(items, pos) {
    return new aterm.ListTerm(items, pos);
  }

  function arrayContains(ar, item) {
    for(var i = 0; i < ar.length; i++) {
      if(ar[i] === item) {
        return true;
      }
    }
    return false;
  }

  function valueOrEmptyList(t) {
    if(t === null) {
      return emptyList;
    } else {
      return t;
    }
  }

  var i = 0;
  var keywordLevel = 8;
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
    ["keyword"]
  ];

  var noWhitespaceOps = [";", ",", ".", "_", "=", ":", "|"]; // first characters only
  var allOps = ['!', '@', '#', '%', '^', '&', '*', '-', '+', '=', '|', '/', '\\', '<', '>', '.', '?', ':'];
  var prefixOps = ["+", "-", "*", "<", ">", "?", "!", ":", "`", "$"];

  function acceptFactor() { 
    var intT = acceptInt();
    if(intT !== null) {
      return intT;
    }
    var idn = acceptIdn();
    if(idn !== null && !arrayContains(keywords, idn)) {
      return symbolTerm(idn);
    } else if(idn !== null && arrayContains(keywords, idn)) {
      i = i - idn.length;
    }
    var st = acceptString();
    if(st !== null) {
      return st;
    }
    var pe = acceptPrefixExp();
    if(pe != null) {
      return pe;
    }
    if(accept('(')) {
      acceptWhiteSpace();
      var exps = acceptExps();
      if(!exps) {
        throw { message: "Expected expression list", pos: i };
      }
      acceptWhiteSpace();
      expect(')');
      return applTerm('ParList', [exps]);
    }
    if(accept('[')) {
      acceptWhiteSpace();
      var exps = acceptExps();
      if(!exps) {
        throw { message: "Expected expression list", pos: i };
      }
      acceptWhiteSpace();
      expect(']');
      return applTerm('BracketList', [exps]);
    }
    if(accept('{')) {
      acceptWhiteSpace();
      var stats = acceptStats();
      if(!stats) {
        throw { message: "Expected statement list", pos: i };
      }
      acceptWhiteSpace();
      expect('}');
      return applTerm('Block', [stats]);
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
      return prefixOpTerm(op, t);
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
      return applTerm("Keyword", [new aterm.StringTerm(kw), t]);
    } else {
      i = oldI;
      return null;
    }
  }

  function isNoWhitespaceOp(op) {
    if(!op) return false;
    return arrayContains(noWhitespaceOps, op[0]);
  }

  function acceptGeneric(level) {
    var pos = i;
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
    if(!didAcceptWhitespace && op !== null && !isNoWhitespaceOp(op)) {
      t = postfixOpTerm(op, t, pos);
      acceptWhiteSpace();
      oldI = i;
      op = acceptOps(operators[level]);
    }
    while(op !== null) {
      if(!acceptWhiteSpace() && !isNoWhitespaceOp(op)) {
        t = postfixOpTerm(op, t, pos);
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
      if(!t2) {
        throw { message: "Expected operand", pos: i };
      }
      t = opTerm(op, t, t2, pos);
      oldI = i;
      if(!acceptWhiteSpace() && !isNoWhitespaceOp(op)) {
        i = oldI;
        return t;
      }
      op = acceptOps(operators[level]);
    }
    i = oldI;
    return t;
  }

  function acceptStats() {
    var pos = i;
    var stats = [];
    var t = null;
    acceptSemi();
    do {
      t = acceptGeneric(operators.length-1);
      if(t) {
        stats.push(t);
      }
    } while(t && acceptSemi());
    return listTerm(stats, pos);
  }

  // comma-separated expressions
  function acceptExps() {
    var pos = i;
    var exps = []
    var t = null;
    var stop = false;
    do {
      t = acceptExp();
      if(t) {
        exps.push(t);
      }
      if(accept(',')) {
        acceptAnyWhiteSpace();
      } else {
        stop = true;
      }
    } while(t && !stop);
    return listTerm(exps, pos);
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

  function acceptAnyWhiteSpace() {
    var oldI = i;
    while(i < text.length && (text[i] == ' ' || text[i] == '\n' || text[i] == '\r' || text[i] == '\t' || lookAhead("//") || lookAhead("/*"))) { 
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
    acceptWhiteSpace();
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
    var pos = i;
    if(i === text.length) {
      return null;
    }
    var s = "";
    if(text[i] >= '0' && text[i] <= '9') {
      while(i < text.length && text[i] >= '0' && text[i] <= '9') {
        s += text[i];
        i++;
      }
      return intTerm(parseInt(s, 10), pos);
    } else {
      return null;
    }
  }

  function acceptString() {
    var pos = i;
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
      return doubleQuoteStringTerm(s, pos);
    } else if(text[i] == "'") {
      i++;
      while(i < text.length && text[i] != "'" && text[i-1] != '\\') {
        if(!(text[i] == '\\' && i < (text.length + 1) && text[i+1] == "'")) {
          s += text[i];
        }
        i++;
      }
      i++;
      return singleQuoteStringTerm(s, pos);
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
      throw { message: "Expected: " + c, pos: i };
    }
    if(text[i] == c) {
      i++;
    } else {
      console.error("Rest of the buffer: ");
      printRest();
      throw { message: "Expected: " + c, pos: i };
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
};

gelly.gellyAtermToAterm = function(t) {
  var pattern = aterm.parse('Op("_",Sym(<cons>),ParList(<args>))');
  var matches = {};
  if(pattern.match(t, matches)) {
    return new aterm.ApplTerm(matches.cons.s, matches.args.children.map(gelly.gellyAtermToAterm));
  } 

  var pattern = aterm.parse('Int(<n>)');
  if(pattern.match(t, matches)) {
    return new aterm.IntTerm(matches.n.n);
  }

  var pattern = aterm.parse('DQString(<s>)');
  if(pattern.match(t, matches)) {
    return new aterm.StringTerm(matches.s.s);
  }

  var pattern = aterm.parse('BracketList(<l>)');
  if(pattern.match(t, matches)) {
    return new aterm.ListTerm(matches.l.children.map(gelly.gellyAtermToAterm));
  }

  var pattern = aterm.parse('PostfixOp(">",PrefixOp("<",Sym(<mv>)))');
  if(pattern.match(t, matches)) {
    return new aterm.PlaceholderTerm(matches.mv.s);
  }

  return "Fail";
};
