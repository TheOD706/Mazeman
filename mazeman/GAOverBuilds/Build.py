fld = input("Input project folder: ")
import os, shutil, math, codecs, gzip

def oncedir(fld, fld0, fla):
    flist = os.listdir("..\\Builds\\" + fld)
    critic_size = 10000000 #10mb
    for x in flist:
        if (os.path.isdir("..\\Builds\\" + fld + "\\" + x)):
            os.mkdir(os.getcwd() + "\\" + fld + "\\" + x)
            oncedir(fld + "\\" + x, fld0, fla)
        elif(os.path.isfile("..\\Builds\\" + fld + "\\" + x)):
            if(x == "UnityLoader.js"):#add own comands to loader
                f0 = open("..\\Builds\\" + fld + "\\" + x, "r")
                t0 = f0.read()
                j0 = -1
                try:
                    j0 = t0.index("downloadJob: function(e, t) {")
                except ValueError:
                    j0 = -1
                if j0 < 0:
                    try:
                        j0 = t0.index("downloadJob:function(e,t){")
                    except ValueError:
                        return
                j1 = -1
                try:
                    j1 = t0.index("scheduleBuildDownloadJob: function(e, t, r) {", j0)
                except ValueError:
                    j1 = -1
                if j1 < 0:
                    try:
                        j1 = t0.index("scheduleBuildDownloadJob:function(e,t,r){", j0)
                    except ValueError:
                        return
                t1 = t0[j0:j1]
                f1 = open("ULdownloadjob.js", "r")
                t2 = f1.read()
                t0 = t0.replace(t1, t2)
                f2 = open(fld + "\\" + x, "w")
                f2.write(t0)
                f1 = open("ULappend1.js", "r")
                f2.write(f1.read())
                f1 = open("ULappend2.js", "r")
                f2.write(f1.read())
                f2.close()
            elif(x in fla):
                apppath = fld[len(fld0) + 2:] + "\\" + x#original path to file
                s0 = apppath.replace("\\", "_").replace("/", "_").replace(",", "_").replace(".", "_")  # index value of UI8A
                f0 = gzip.open("..\\Builds\\" + fld + "\\" + x, "rb")
                fd0 = f0.read().hex()
                f0.close()
                f0 = open("temporaty0.txt", "a")
                f0.write("," + s0)
                f0.close()
                f0 = open(fld + "\\" + x, "w")
                f0.write("parted")
                f0.close()
                n0 = math.ceil(len(fd0) / critic_size)
                for i0 in range(0, n0):
                    f0 = open(fld0 + "\\scripts.html", "a")
                    f0.write("<script class='overbuildscript' src='" + fld + "\\" + x + "_" + str(i0) + ".js'></script>\n")
                    f0.close()
                    f1 = open(fld + "\\" + x + "_" + str(i0) + ".js", "w")
                    f1.write("window.UI8A = window.UI8A || {}; window.UI8A." + s0 + "=window.UI8A." + s0 + " || []; window.UI8A." + s0 + "[" + str(i0) + "] = new Uint8Array([0x")
                    f1.write(",0x".join(fd0[critic_size * i0:critic_size * (i0 + 1):2]))
                    f1.write("]);")
                    f1.close()
                    print(x + " = " + str(i0) + "/" + str(len(fd0) / critic_size))
            else:
                shutil.copy("..\\Builds\\" + fld + "\\" + x, fld + "\\" + x)
                stat0 = os.stat("..\\Builds\\" + fld + "\\" + x)
                if(stat0.st_size >= critic_size):
                    print("WARNING: there is wery big file " + fld + "\\" + x)

os.mkdir(os.getcwd() + "\\" + fld)
fla = ["maze0.data.unityweb", "maze0.wasm", "maze0.wasm.framework.unityweb"]# each files from json call here
f0 = open("temporaty0.txt", "w")
f0.close()#filefor save array with general fields list
f0 = open("preloadads.txt", "r")
pla = f0.read()
f0.close()
f0 = open(fld + "\\scripts.html", "w");
f0.write('  <div class="webgl-content">    <div id="unityContainer" style="width: 960px; height: 600px"></div>    <div class="footer">      <div class="webgl-logo"></div>      <div class="fullscreen" onclick="unityInstance.SetFullscreen(1)"></div>      <div class="title">mazeman<br />        <a href="https://www.free-stock-music.com/">music from here</a></div>    </div>  </div>\n")')
f0.write('<script class="overbuildscript"> var e1 = document.getElementById("unityContainer"); if (e1 !== undefined) { var e0 = document.createElement("div"); var attr0 = document.createAttribute("id"); attr0.value = "ucads"; e0.setAttributeNode(attr0); e1.appendChild(e0); var e2 = document.getElementById("ucads"); if(e2 !== undefined){   e2.style.width = e1.style.width;   e2.style.height = e1.style.height;   e2.innerHTML = \'')
f0.write(pla)
f0.write('\';} }')
f0.close()
oncedir(fld, fld, fla)
f0 = open(fld + "\\scripts.html", "a")
#merge parted script data in single arrays
f1 = open("temporaty0.txt", "r")
gfl = f1.read()[1:]
f1.close()
f0.write("<script>window.UI8A[\"____general____fields____list____\"]=\"")
f0.write(gfl)
f0.write("\"; var lp = undefined; function prog(x) {  if(lp === undefined) lp = document.getElementById(\"loadprogress\");  else lp.innerHTML = x.toFixed(2) + \" %\";  if (x >= 100) {    var d0 = document.getElementById(\"unityContainer\");    var d1 = document.getElementById(\"ucads\");    if (d0 !== undefined && d1 !== undefined) {      d0.removeChild(d1);    }  } }\n function inst() {  var unityInstance = UnityLoader.instantiate(\"unityContainer\", \"Build/maze0.json\", {    onProgress: UnityProgress  }); }\n preloading211(inst, prog);</script>")
f0.close()
print("\nfinish")
