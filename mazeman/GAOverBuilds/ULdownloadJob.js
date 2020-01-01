downloadJob: function(e, t) {
  var r = t.parameters.objParameters ? new UnityLoader.UnityCache.XMLHttpRequest(t.parameters.objParameters) : new XMLHttpRequest;
  var url211 = t.parameters.url.replace("/", "_").replace("\\", "_").replace(",", "_").replace(".", "_");
  r.open("GET", t.parameters.url), r.responseType = "arraybuffer", r.onload = function() {
    if (window.preloaddata211 === undefined || window.preloaddata211[url211] === undefined) {
      UnityLoader.Compression.decompress(new Uint8Array(r.response), function(e) {
        t.complete(e)
      })
    } else {
      UnityLoader.Compression.decompress(window.preloaddata211[url211], function(e) {
        t.complete(e)
      })
    }
  }, t.parameters.onprogress && r.addEventListener("progress", t.parameters.onprogress), t.parameters.onload && r.addEventListener("load", t.parameters.onload), r.send()
},
