fld = input("Input project folder: ")
import os, shutil, math, codecs

#ingame load files write to component html
#structure of line: script id!file name!name for dictionary . In file split.url
#script id like "outupload" + <number> + "outupload"
def editindexscripts(pff, dir, fx, csl, ind):
    f0 = open(pff + "\\split.url", "a")
    stat0 = os.stat("..\\Builds\\" + dir + "\\" + fx)
    if (stat0.st_size < csl):
        #write to log
        f0.write("outupload" + str(ind) + "outupload!" + dir + "\\" + "outupload" + str(ind) + "outupload.split.js!" + fx)
        #create js file with content
        f1 = open("..\\Builds\\" + dir + "\\" + fx, "rb")
        f2 = open("..\\OverBuilds\\" + pff + "\\Parts\\outupload" + str(ind) + "outupload.split.js", "w")
        f2.write("var UI8A = UI8A || {};\nUI8A.testui8array = function() {\n return \"")
        f2.write(f1.read())
        f2.write("\";}")
        f2.close()
        ind = ind + 1
    else:
        j0 = math.floor(stat0.st_size / csl)#split big file parts number - 1(not full)
        f1 = open("..\\Builds\\" + dir + "\\" + fx, "rb")
        for i0 in range(0, j0):
            #write to log
            f0.write("outupload" + str(ind) + "outupload!" + dir + "\\" + "outupload" + str(ind) + "outupload.split.js!" + fx)
            #create js file with content
            f2 = open("..\\OverBuilds\\" + pff + "\\Parts\\outupload" + str(ind) + "outupload.split.js", "w")
            f2.write("var UI8A = UI8A || {};\nUI8A.testui8array = function() {\n return \"")
            f2.write(f1.read(csl))
            f2.write("\";}")
            f2.close()
            ind = ind + 1
        #write last part
        f0.write("outupload" + str(ind) + "outupload!" + dir + "\\" + "outupload" + str(ind) + "outupload.split.js!" + fx)
        f2 = open("..\\OverBuilds\\" + pff + "\\Parts\\outupload" + str(ind) + "outupload.split.js", "w")
        f2.write("var UI8A = UI8A || {};\nUI8A.testui8array = function() {\n return \"")
        f2.write(f1.read(csl))
        f2.write("\";}")
        f2.close()
        ind = ind + 1
    return ind

def oncedir(dir, pff, fla, ind):
    flist = os.listdir("..\\Builds\\" + dir)
    critic_size = 10000000 #10mb
    for x in flist:
        if (os.path.isdir("..\\Builds\\" + dir + "\\" + x)):
            os.mkdir(os.getcwd() + "\\" + dir + "\\" + x)
            ind = oncedir(dir + "\\" + x, pff, fla, ind)
        elif(os.path.isfile("..\\Builds\\" + dir + "\\" + x)):
            if (x == "UnityLoader.js"):#add own comands to loader
                f0 = open("..\\Builds\\" + dir + "\\" + x, "r")
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
                f2 = open(dir + "\\" + x, "w")
                f2.write(t0)
                f1 = open("ULappend1.js", "r")
                f2.write(f1.read())
                f1 = open("ULappend2.js", "r")
                f2.write(f1.read())
                f2.close()
            elif x in fla:#make file content of in-ran loading as javascript called content
                ind = ind + editindexscripts(pff, dir, x, critic_size, ind)
            else:
                stat0 = os.stat("..\\Builds\\" + dir + "\\" + x)
                if (stat0.st_size < critic_size):
                    shutil.copy("..\\Builds\\" + dir + "\\" + x, "..\\OverBuilds\\" + dir + "\\" + x)
                else:
                    number_of_files = math.ceil(stat0.st_size / critic_size)
                    f0 = open("..\\Builds\\" + dir + "\\" + x, "rb")
                    for i0 in range(number_of_files):
                        f1 = open(dir + "\\" + x + "--" + str(i0) + ".part.cs", "wb")
                        f1.write(f0.read(critic_size))
                        f1.close()
                    f2 = open(dir + "\\" + x, "w")
                    f2.write("file are parted=" + str(number_of_files) + ";")
                    f2.close()
                    print("splited file " + dir + "\\" + x)
                    f0 = open(os.getcwd() + "\\" + pff + "\\splitted.urls", "a")
                    f0.write(x + ";")
                    f0.close()
        else:
            print(dir + "\\" + x + " unknown type object")
    return ind


os.mkdir(os.getcwd() + "\\" + fld)
os.mkdir(os.getcwd() + "\\" + fld + "\\Parts")
fla = ["maze0.data.unityweb", "maze0.wasm", "maze0.wasm.framework.unityweb"]# each files from json call here
i0 = oncedir(fld, fld, fla, 0)

def makeindexpart(ind, fld):
    #write index-script block
    f0 = open(fld + "\\indexGAscripts.html", "w")
    f0.write("<script src=\"TemplateData/UnityProgress.js\"></script>\n <script src=\"Build/UnityLoader.js\"></script>\n <script>\n     var lp = undefined;\n   function prog(x) {\n        if(lp === undefined) lp = document.getElementById(\"loadprogress\");\n  else lp.innerHTML = x.toFixed(2) + \" %\";\n    if (x >= 100) {\n       var d0 = document.getElementById(\"unityContainer\");\n     var d1 = document.getElementById(\"ucads\");\n      if (d0 !== undefined && d1 !== undefined) {\n       d0.removeChild(d1);\n    }\n    }\n}\n\nfunction inst() {\n  var unityInstance = UnityLoader.instantiate(\"unityContainer\", \"Build/maze0.json\", {\n    onProgress: UnityProgress\n  });\n}\npreloading211(inst, prog);\n</script>\n")
    #write parted scripts
    for i0 in range(0, ind):
        f0.write("<script src=\"" + fld + "/Parts/outupload" + str(i0) + "outupload.split.js\">\n")
    #write called data from scripts to dictionary(memory)
    f0.write("")


makeindexpart(i0, fld)
