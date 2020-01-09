function decrypt_data(s0){
  var alphabet = { };
  var j0 = 0;
  for(var i0 = 0; i0 < 256; i0++){
    if(s0[j0] == '<' || s0[j0] == ">"){
      alphabet[s0.substr(j0, 2)] = i0;
      j0 += 2;
    }
    else {
      alphabet[s0.substr(j0, 1)] = i0;
      j0 += 1;
    }
  }
  var res0 = new Uint8Array();
  while(j0 < s0.length){
    if(s0[j0] == '<' || s0[j0] == ">"){
      res0.push(alphabet[s0.substr(j0, 2)]);
      j0 += 2;
    }
    else {
      res0.push(alphabet[s0.substr(j0, 1)]);
      j0 += 1;
    }
  }
  return res0;
}


function preloading211(callback, p) {
  window.preloaddata211 = {};
  if(window.UI8A == undefined) { callback(); return; }
  var gfl = window.UI8A["____general____fields____list____"].split(",");
  for(var i0 = 0; i0 < gfl.length; i0++){
    window.preloaddata211[gfl[i0]] = "";
    for(var i1 = 0; i1 < window.UI8A[gfl[i0]].length; i1++){
      window.preloaddata211[gfl[i0]] = window.preloaddata211[gfl[i0]].concat(window.UI8A[gfl[i0]][i1]);
    }
    window.preloaddata211[gfl[i0]] = decrypt_data(window.preloaddata211[gfl[i0]]);
  }
  window.UI8A = null;
  callback();
};
