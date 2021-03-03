/**
 
s = "3[a]2[bc]", 返回 "aaabcbc".
s = "3[a2[c]]", 返回 "accaccacc".
s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".

 * @param {string} s
 * @return {string}
 */
var decodeString = function(str) {
  for(let i = str.length-1; i >= 0 ; i--){
    let w = str[i]
    switch(w){
      case '[':
        break;
      case ']':
        break;
      default:
        break;
    }
  }
};

decodeString('3[a]2[bc]')