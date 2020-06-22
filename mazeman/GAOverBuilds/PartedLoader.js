window.CheckParted1327r = function(r) {
  if(r.responseType == "arraybuffer" && r.response !== undefined){
    var d = [112, 97, 114, 116, 101, 100];
    var j0 = 0;
    var rsp0 = new Uint8Array(r.response);
    while(j0 < 6 && d[j0] == rsp0[j0]) j0++;
    var s0 = "";
    if(j0 == 6){
      for(var i0 = 7; i0 < rsp0.length; i0++){
        if(rsp0[i0] == 10 || rsp0[i0] == 13) break;
        s0 += String.fromCharCode(rsp0[i0]);
      }
      return window.joineddata1327.dataContainer[s0];
    }
  }
  return null;
};
window.CheckParted1327d = function(d) {
  if(d.compressed !== undefined){
    var d = [112, 97, 114, 116, 101, 100];
    var j0 = 0;
    while(j0 < 6 && d[j0] == d.compressed[j0]) j0++;
    var s0 = "";
    if(j0 == 6){
      for(var i0 = 7; i0 < d.compressed.length; i0++){
        if(d.compressed[i0] == 10 || d.compressed[i0] == 13) break;
        s0 += String.fromCharCode(d.compressed[i0]);
      }
      d.compressed = window.joineddata1327.dataContainer[s0];
    }
  }
  return d;
};
window.PartedLoader1327 = function() {
  if(window.filesnamecontainer1327 !== undefined){
    while(window.filesnamecontainer1327[window.filesnamecontainer1327.length - 1] == '') window.filesnamecontainer1327.pop();
    var s0 = "___";
    var d0 = {___: {size: 0, data: [], progress: 0}};
    for(var i0 = 0; i0 < window.filesnamecontainer1327.length; i0++){
      if(window.filesnamecontainer1327[i0].startsWith(".")){
        var sa0 = window.filesnamecontainer1327[i0].split(".");
        s0 = sa0[2];
        d0[s0] = {size: parseInt(sa0[1]), data: []};
        d0["___"].data.push(s0);
      }
      else{
        d0[s0].data.push(window.filesnamecontainer1327[i0]);
        d0.___.size++;
      }
    }
    //indexes i0 - index by waypointlist["___"].data, i1 - index by waypoint[waypointlist["___"].data[i0]].data, pos - position by Uint8Array where set next part
    window.joineddata1327 = {waypointlist: d0, indexes: {i0: 0, i1: 0, pos: 0}, dataContainer: {}, free: true};
    window.joineddata1327.Joiner = function() {//parse loaded data inside inc indexes and run next
      var s0 = window.joineddata1327.waypointlist.___.data[window.joineddata1327.indexes.i0];
      if(window.joineddata1327.indexes.i1 == 0){
        window.joineddata1327.dataContainer[s0] = new Uint8Array(window.joineddata1327.waypointlist[s0].size);
      }
      if(this.response.byteLength + window.joineddata1327.indexes.pos > window.joineddata1327.dataContainer[s0].length){
        var tmp0 = new Uint8Array(this.response.byteLength + window.joineddata1327.indexes.pos)
        tmp.set(window.joineddata1327.dataContainer[s0]);
        tmp.set(new Uint8Array(this.response), window.joineddata1327.indexes.pos);
        window.joineddata1327.dataContainer[s0] = tmp0;
      }
      else{
        window.joineddata1327.dataContainer[s0].set(new Uint8Array(this.response), window.joineddata1327.indexes.pos);
      }
      window.joineddata1327.indexes.pos += this.response.byteLength;
      window.joineddata1327.indexes.i1++;
      if(window.joineddata1327.indexes.i1 >= window.joineddata1327.waypointlist[window.joineddata1327.waypointlist.___.data[window.joineddata1327.indexes.i0]].data.length){
        window.joineddata1327.indexes.i1 = 0;
        window.joineddata1327.indexes.pos = 0;
        window.joineddata1327.indexes.i0++;
      }
      if(window.joineddata1327.indexes.i0 < window.joineddata1327.waypointlist.___.data.length){
        window.joineddata1327.free = true;
      }
      else {
        clearInterval(window.joineddata1327.interval);
      }
      window.joineddata1327.waypointlist.___.progress++;
      console.log("progress " + (window.joineddata1327.waypointlist.___.progress / window.joineddata1327.waypointlist.___.size));
    };
    //next call XMLHttpRequest
    window.joineddata1327.Caller = function() {
      window.joineddata1327.free = false;
      var xhr = new XMLHttpRequest();
      var p0 = window.joineddata1327.waypointlist.___.data[window.joineddata1327.indexes.i0];
      xhr.open("GET", window.joineddata1327.waypointlist[p0].data[window.joineddata1327.indexes.i1], true);
      xhr.responseType = "arraybuffer";
      xhr.onload = window.joineddata1327.Joiner;
      xhr.send();
    };
    window.joineddata1327.Intervaler = function() {
      if(window.joineddata1327.free){
        window.joineddata1327.Caller();
      }
    }
    window.joineddata1327.CheckR = window.CheckParted1327r;
    window.joineddata1327.CheckD = window.CheckParted1327d;
    return window.joineddata1327.Intervaler;
  }
}
