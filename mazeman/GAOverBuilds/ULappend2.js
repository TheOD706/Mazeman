
function preloading211(callback, p) {
  window.preloaddata211 = {};
  if(window.UI8A == undefined) { callback(); return; }
  var gfl = window.UI8A["____general____fields____list____"].split(",");
  for(var i0 = 0; i0 < gfl.length; i0++){
    window.preloaddata211[gfl[i0]] = new Uint8Array();
    for(var i1 = 0; i1 < window.UI8A[gfl[i0]].length; i1++){
      var tmp = window.preloaddata211[gfl[i0]];
      var tm2 = window.UI8A[gfl[i0]][i1]();
      window.preloaddata211[gfl[i0]] = new Uint8Array(tmp.length + tm2.length);
      window.preloaddata211[gfl[i0]].set(tmp);
      window.preloaddata211[gfl[i0]].set(tm2, tmp.length);
    }
  }
  callback();
};
