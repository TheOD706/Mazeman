fld = input("Input project folder: ")
import os, shutil, math, codecs

#
#

#ingame load files write to component html
#structure of line: script id!file name!name for dictionary
#script id like "outupload" + <number> + "outupload"
def editindexscripts(p1, p2, p3, p4):
    f0 = open(p1 + "split.url", "a")
    f1 = open(p1 + p2 + p3, "rb")
    s0 = f1.read(16)
    b0 = True
    ba1 = [102, 105, 108, 101, 32, 97, 114, 101, 32, 112, 97, 114, 116, 101, 100, 61]
    for i0 in range(0, 16):
        if ba1[i0] != s0[i0]:
            b0 = False
            break
    if b0:
        s0 = f1.read(1)
        j0 = 0
        while s0[0] != 59:
            j0 = 10 * j0 + (s0[0] - 48)
            s0 = f1.read(1)
        #print(j0)
        for i0 in range(0, j0):
            f0.write("outupload" + str(p4) + "outupload!" + p2 + p3 + "--" + str(i0) + ".part.cs" + "!" + p2 + p3 + "\n")
            p4 = p4 + 1

    else:
        f0.write("outupload" + str(p4) + "outupload!" + p2 + p3 + "!" + p2 + p3 + "\n")
        p4 = p4 + 1
    f0.close()
    return p4

# each files from json call here
path0 = os.getcwd() + "\\" + fld + "\\"
index0 = 0
index0 = editindexscripts(path0, "Build\\", "maze0.data.unityweb", index0)
index0 = editindexscripts(path0, "Build\\", "maze0.wasm", index0)
index0 = editindexscripts(path0, "Build\\", "maze0.wasm.framework.unityweb", index0)
#write link count in file
f0 = open(path0  + url.number, "w")
f0.write(str(index0))
f0.close()
#write index-script block
f0 = open(path0 + "indexGAscripts.html", "w")
f0.write("<script src=\"TemplateData/UnityProgress.js\"></script>\n <script src=\"Build/UnityLoader.js\"></script>\n <script>\n     var lp = undefined;\n   function prog(x) {\n        if(lp === undefined) lp = document.getElementById(\"loadprogress\");\n  else lp.innerHTML = x.toFixed(2) + \" %\";\n    if (x >= 100) {\n       var d0 = document.getElementById(\"unityContainer\");\n     var d1 = document.getElementById(\"ucads\");\n      if (d0 !== undefined && d1 !== undefined) {\n       d0.removeChild(d1);\n    }\n    }\n}\n\nfunction inst() {\n  var unityInstance = UnityLoader.instantiate(\"unityContainer\", \"Build/maze0.json\", {\n    onProgress: UnityProgress\n  });\n}\npreloading211(inst, prog);\n</script>\n");
f0.write("<script id=\"outuploadnumberoutuploadnumber\" src=\"split.url\"></script>\n")
f1 = open("split.url", "r")
for i0 in range(0, index0):
    s0 = f1.readline().split("!")
    f0.write("<script id=\"" + s0[0] + "outupload\" src=\"" + s0[1] + "\"></script>\n")
#write script that merge all data and load in dictionary
f0.write("<script>\n

var n0 = parseInt(document.getElementById(\"outuploadnumberoutuploadnumber\").innerHTML);\n

###############################
for(var i0 = 0; i0 < ind; i0++){\n
    UI8A["foutupload" + i0 + "outupload"]();
}\n
