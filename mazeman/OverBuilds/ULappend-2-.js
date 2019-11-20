
function preloading211(callback, p) {
  window.preloaddata211 = {};
  var xhr0 = new XMLHttpRequest();
  xhr0.open("GET", "splitted.urls", true);
  xhr0.onload = function() {
    var s0 = xhr0.response.split(";");

    var loader = {
      splittedarray: s0,
      index: -3,
      range: -4,
      name: "",
      url: "",
      outurl: "",
      step: -1,
      count: -2,
      endcall: callback,
      data: new Uint8Array(0),
      nextouturl: function(ll) {},
      loadaction: function(k0, ab0) {
        var concat = new Uint8Array(k0.data.length + ab0.length);
        concat.set(k0.data);
        concat.set(ab0, k0.data.length);
        k0.data = concat;
        k0.step++;
        p(100 * (k0.index + k0.step / k0.count) / k0.range);
        if (k0.step < k0.count) {
          k0.askaction(k0);
        } else {
          window.preloaddata211[k0.name] = k0.data;
          k0.index++;
          console.log("loading " + (100 * k0.index / k0.range) + "%");
          if(k0.index < k0.range){
            k0.nextouturl(k0);
          } else {
            k0.endcall();
          }
        }
      },
      askaction: function(l0) {
        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", this.outurl + "--" + l0.step + ".part.cs", true);
        xhr2.responseType = "arraybuffer";
        xhr2.onload = function() {
          l0.loadaction(l0, new Uint8Array(xhr2.response));
        };
        xhr2.send();
      },
      loadouturl: function(l1) {
        var s1 = l1.splittedarray[l1.index].split("=");
        l1.name = s1[0];
        l1.url = s1[1];
        var xhr1 = new XMLHttpRequest();
        xhr1.open("GET", l1.url, true);
        xhr1.onload = function() {
          var j1 = xhr1.response.indexOf("=");
          var j2 = xhr1.response.indexOf(";", j1);
          l1.count = parseInt(xhr1.response.substring(j1 + 1, j2));
          l1.step = 0;
          j1 = j2 + 1;
          j2 = xhr1.response.indexOf("!", j1);
          l1.outurl = xhr1.response.substring(j1, j2);
          l1.askaction(l1);
        };
        xhr1.send();
      }
    };
    loader.nextouturl = function(l2) {
      if(l2.splittedarray[l2.index].length > 3){
        l2.loadouturl(l2);
      } else {
        l2.index++;
        console.log("loading " + (100 * l2.index / l2.range) + "%");
        if(l2.index < l2.range){
          l2.nextouturl(l2);
        } else {
          l2.endcall();
        }
      }
    };
    loader.index = 0;
    loader.range = s0.length;
    loader.nextouturl(loader);
  };
  xhr0.send();
};
