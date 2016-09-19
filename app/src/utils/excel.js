/* http://www.cnblogs.com/lavezhang/archive/2012/05/14/2499000.html */ 
export function getCharCol(n) {
  var temCol = "",
    s = "",
    m = 0

  while (n > 0) {
    m = n % 26
    if (m === 0) m = 26
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}

// 1 <--> A

export function getNumCol(s) {
  if (!s) return 0
  var n = 0
  for (var i = s.length - 1, j = 1; i >= 0; i--, j *= 26) {
    var c = s[i].toUpperCase()
    if (c < 'A' || c > "Z") return 0
    n += (c.charCodeAt() - 64) * j
  }

  return n
}
