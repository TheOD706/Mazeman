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
  