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
  var res0 = [];
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
  return new Uint8Array(res0);
}

function parted_decrypt_data(pd, nm) {
  window.preloading211[nm] = new Uint8Array();
  var ar0 = [];
  //parse alphabet - then begining from content
  var alphabet = { };
  var j0 = 0;
  var prewlastchar = "";
  for(var i0 = 0; i0 < 256; i0++){
    if(pd[0][j0] == "<" || pd[0][j0] == ">"){
      alphabet[pd[0].substr(j0, 2)] = i0;
      j0 += 2;
    }
    else {
      alphabet[pd[0].substr(j0, 1)] = i0;
      j0 += 1;
    }
  }
  while(j0 < pd[0].length - 1){
    if(pd[0][j0] == "<" || pd[0][j0] == ">"){
      ar0.push(alphabet[pd[0].substr(j0, 2)]);
      j0 += 2;
    }
    else {
      ar0.push(alphabet[pd[0].substr(j0, 1)]);
      j0 += 1;
    }
  }
  //last char
  if(j0 == pd[0].length - 1){
    if(pd[0][j0] == "<" || pd[0][j0] == ">"){
      prewlastchar = pd[0][j0];
    }
    else {
      ar0.push(alphabet[pd[0].substr(j0, 1)]);
    }
  }
  //start from 1 becouse for 0 special decrypt - start from some character that mean alphabet
  for(var i0 = 1; i0 < pd.length; i0++){
    j0 = 0;
    if(prewlastchar != ""){
      ar0.push(alphabet[pd[i0].substr(0, 1)]);
      j0++;
      preloadads = "";
    }
    var n0 = pd[i0].length - 1;
    while(j0 < n0){
      if(pd[i0][j0] == "<" || pd[i0][j0] == ">"){
        ar0.push(alphabet[pd[i0].substr(j0, 2)]);
        j0 += 2;
      }
      else {
        ar0.push(alphabet[pd[i0].substr(j0, 1)]);
        j0 += 1;
      }
    }
    //last char
    if(j0 == n0){
      if(pd[i0][j0] == "<" || pd[i0][j0] == ">"){
        prewlastchar = pd[i0][j0];
      }
      else {
        ar0.push(alphabet[pd[i0].substr(j0, 1)]);
      }
    }
  }
  return new Uint8Array(ar0);
}


function preloading211(callback, p) {
  window.preloaddata211 = {};
  if(window.UI8A == undefined) { callback(); return; }
  var gfl = window.UI8A["____general____fields____list____"].split(",");
  for(var i0 = 0; i0 < gfl.length; i0++){
    window.preloaddata211[gfl[i0]] = parted_decrypt_data(window.UI8A[gfl[i0]], gfl[i0]);
    window.UI8A[gfl[i0]] = null;
  }
  window.UI8A = null;
  callback();
};
