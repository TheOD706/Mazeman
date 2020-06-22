fld = input("Input project folder: ")
import os, shutil, math, codecs, json
from progress.bar import IncrementalBar

def oncedir(fld, fld0, fla):
    flist = os.listdir("../Builds/" + fld)
    critic_size = 10000000 #10mb
    for x in flist:
        if (os.path.isdir("../Builds/" + fld + "/" + x)):
            os.mkdir(os.getcwd() + "/" + fld + "/" + x)
            oncedir(fld + "/" + x, fld0, fla)
        elif(os.path.isfile("../Builds/" + fld + "/" + x)):
            if(x == "UnityLoader.js"):#add own comands to loader
                f0 = open("../Builds/" + fld + "/" + x, "r")
                t0 = f0.read()
                f0.close()
                j0 = -1
                try:
                    s0 = "function(){UnityLoader.Compression.decompress("
                    j0 = t0.index(s0)
                    #j0 += len("function(){")
                except ValueError:
                    print("code not found")
                    j0 = -1
                if j0 > 0:
                    f0 = open(fld + "/" + x, "w")
                    f0.write(t0[:j0 + len("function(){")])
                    f0.write("var cp1327r=window.CheckParted1327r(r);UnityLoader.Compression.decompress((cp1327r!==null)?cp1327r:")
                    f0.write(t0[j0 + len(s0):])
                    f0.close()
            elif(x in fla):
                s0 = x.replace("\\", "_").replace("/", "_").replace(",", "_").replace(".", "_")  # index value of GAOBH96
                f0 = open("../Builds/" + fld + "/" + x, "rb")
                s1 = f0.read(6)
                f0.close()
                isparted = True
                partedbytes = b'parted'
                for i0 in range(6):
                    if s1[i0] != partedbytes[i0]:
                        isparted = False
                        break
                s2 = fld[len(fld0) + 1:]
                if isparted:
                    j0 = 0
                    f0 = open("../Builds/" + fld + "/" + x, "r")
                    s1 = f0.read()
                    f0.close()
                    f0 = open(fld0 + "/index.html", "a")
                    f1.write("'." + s1.split()[2] + "." + s2 + "/" + s0 + "', ")
                    while os.path.exists("../Builds/" + fld + "/" + s0 + "_" + str(j0) + ".part.cs"):
                        f0.write("'" + s2 + "/" + s0 + "_" + str(j0) + ".part.cs', ")
                        j0 += 1
                    shutil.copy("../Builds/" + fld + "/" + x, fld + "/" + x)
                    f0.close()
                else:
                    fs0 = os.stat("../Builds/" + fld + "/" + x).st_size
                    #write same file that it is parted & id name general
                    f0 = open(fld + "/" + x, "w")
                    f0.write("parted\n" + s2 + "/" + s0 + "\n" + str(fs0) + "\n")
                    f0.close()
                    #write script src & coding parts of target file
                    part_max = math.ceil(fs0 / critic_size)
                    pb0 = IncrementalBar("parting " + s0, max = part_max)
                    f1 = open(fld0 + "/index.html", "a")
                    f1.write("'." + str(fs0) + "." + s2 + "/" + s0 + "', ")
                    j0 = 0 #index of subfiles
                    with open("../Builds/" + fld + "/" + x, "rb") as f0:
                        b0 = f0.read(critic_size)
                        while b0 != b"":
                            f1.write("'" + s2 + "/" + s0 + "_" + str(j0) + ".part.cs', ")
                            f2 = open(fld + "/" + s0 + "_" + str(j0) + ".part.cs", "wb")
                            f2.write(b0)
                            f2.close()
                            j0 += 1
                            b0 = f0.read(critic_size)
                            pb0.next()
                        f0.close()
                        pb0.finish()
                    f1.close()
            elif x == "style.css":
                f0 = open("../Builds/" + fld + "/" + x, "r")
                b0 = f0.read()
                f0.close()
                j0 = b0.index(".webgl-content {")
                b0 = b0[:j0] + "//" + b0[j0:]
                f0 = open(fld + "/" + x, "w")
                f0.write(b0)
                f0.close()
            elif x == "index.html":
                print("index passed")
            else:
                shutil.copy("../Builds/" + fld + "/" + x, fld + "/" + x)
                stat0 = os.stat("../Builds/" + fld + "/" + x)
                if(stat0.st_size >= critic_size):
                    print("WARNING: there is wery big file " + fld + "/" + x)

flist0 = os.listdir(os.getcwd())
if fld in flist0:
    shutil.rmtree(fld)
#start + create index.html
os.mkdir(os.getcwd() + "/" + fld)
f0 = open(fld + "/index.html", "w")
f1 = open("ind0_body_begin.txt", "r")
f0.write(f1.read())
f0.close()
f1.close()

#get wasm files from json
fla = []
with open("../Builds/" + fld + "/Build/" + fld + ".json") as f0:
    json0 = json.loads(f0.read())
    fla.append(json0["dataUrl"])
    fla.append(json0["wasmCodeUrl"])
    fla.append(json0["wasmFrameworkUrl"])
    f0.close()
#move files
oncedir(fld, fld, fla)


#end index.html
f0 = open(fld + "/index.html", "a")
f1 = open("ind0_body_end.txt", "r")
f0.write(f1.read())
f0.close()
f1.close()
#copy loadhelp file
shutil.copy("OutsideRandomer.js", fld + "/OutsideRandomer.js")
shutil.copy("PartedLoader.js", fld + "/PartedLoader.js")

print("Over build finished")
