import os, shutil, math, codecs, Huffman96, io, json
fld = input("Input project folder: ")

def oncedir(fld, fld0, fla):
    flist = os.listdir("../Builds/" + fld)
    critic_size = 10000000 #10mb
    for x in flist:
        if (os.path.isdir("../Builds/" + fld + "/" + x)):
            os.mkdir(os.getcwd() + "/" + fld + "/" + x)
            oncedir(fld + "/" + x, fld0, fla)
        elif(os.path.isfile("../Builds/" + fld + "/" + x)):
            if(x == "UnityLoader.js"):#add own comands to loader#"load",function(){         find next ; and put function with param t
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
                    f0.write("var candc96=window.GAOBH96.checkandchange(r);UnityLoader.Compression.decompress((candc96!==null)?candc96:")
                    f0.write(t0[j0 + len(s0):])
                    f0.close()
            elif(x in fla):#file format is next:
                s0 = x.replace("\\", "_").replace("/", "_").replace(",", "_").replace(".", "_")  # index value of GAOBH96
                f0 = open("../Builds/" + fld + "/" + x, "r")
                s1 = f0.read(6)
                f0.close()
                if s1 == "parted":
                    j0 = 0
                    s1 = fld[len(fld0) + 1:]
                    f0 = open(fld0 + "/scripts.html", "a")
                    while os.path.exists("../Builds/" + fld + "/" + s0 + "_" + str(j0) + ".js"):
                        f0.write("<script src='" + s1 + "/" + s0 + "_" + str(j0) + ".js' id='GAOBH96" + s0 + "_" + str(j0) + "'></script>\n")
                        j0 += 1
                    shutil.copy("../Builds/" + fld + "/" + x, fld + "/" + x)
                    f0.close()
                else:
                    fs0 = os.stat("../Builds/" + fld + "/" + x).st_size
                    #write same file that it is parted & id name general
                    f0 = open(fld + "/" + x, "w")
                    f0.write("parted\n" + s0 + "\n" + str(fs0) + "\n")
                    f0.close()
                    #write script src & coding parts of target file
                    part_of_file = 7000000
                    part_max = math.ceil(fs0 / part_of_file)
                    f1 = open(fld0 + "/scripts.html", "a")
                    j0 = 0 #index of subfiles
                    h96 = Huffman96.Huffman96(None)
                    with open("../Builds/" + fld + "/" + x, "rb") as f0:
                        b0 = f0.read(part_of_file)
                        while b0 != b"":
                            f1.write("<script src='" + fld[len(fld0) + 1:] + "/" + x + "_" + str(j0) + ".js'")
                            f1.write(" id='GAOBH96" + s0 + "_" + str(j0) + "'></script>\n")
                            f2 = open(fld + "/" + s0 + "_" + str(j0) + ".js", "w")
                            f2.write("window.GAOBH96 = window.GAOBH96 || {}; window.GAOBH96.data." + s0 + "_" + str(j0) + "=\"")
                            f2.write(h96.EncodeWithInfo(b0, x + " " + str(j0) + "/" + str(part_max)).replace("\\", "\\\\").replace("\"", "\\\""))
                            f2.write("\";")
                            f2.close()
                            j0 += 1
                            b0 = f0.read(part_of_file)
                        f0.close()
            else:
                shutil.copy("../Builds/" + fld + "/" + x, fld + "/" + x)
                stat0 = os.stat("../Builds/" + fld + "/" + x)
                if(stat0.st_size >= critic_size):
                    print("WARNING: there is wery big file " + fld + "/" + x)

flist0 = os.listdir(os.getcwd())
if fld in flist0:
    shutil.rmtree(fld)
#start + create scripts.html
os.mkdir(os.getcwd() + "/" + fld)
f0 = open(fld + "/scripts.html", "w")
f1 = open("ob_body_begin.txt", "r")
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

#end scripts.html
f0 = open(fld + "/scripts.html", "a")
f1 = open("ob_body_end.txt", "r")
f0.write(f1.read())
f0.close()
f1.close()
#copy loadhelp file
shutil.copy("Huffman96.js", fld + "/Huffman96.js")
shutil.copy("OutsideRandomer.js", fld + "/OutsideRandomer.js")

print("Over build finished")
