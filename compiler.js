
function compile(stats) {
  var codes = [];
  var ruleSyntax = aterm.parse('Op(":",Id(<rn>),Op("->",<lhs>,<rhs>))');

  function cleanRuleName(name) {
    return name.replace(/\-/g, '_');
  }

  stats.children.forEach(function(stat) {
      var matches = {};
      if(ruleSyntax.match(stat, matches)) {
        codes.push('rules.' + cleanRuleName(matches.rn.s) + ' = function(t) {');
        codes.push('  var matches = {};');
        codes.push('  if(aterm.parse(\'' + gelly.gellyAtermToAterm(matches.lhs) + '\').match(t, matches)) {');
        codes.push('    return aterm.parse(\'' + gelly.gellyAtermToAterm(matches.rhs) + '\').build(matches);');
        codes.push('  } else {');
        codes.push('    return null;');
        codes.push('  }');
        codes.push('}');
      }
    });

  return codes.join("\n");
}
