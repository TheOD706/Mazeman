import os, shutil, math, codecs, Huffman96, StringIO
fld = raw_input("Input project folder: ")

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
                s0 = f0.read()
                f0.close()
                j0 = s0.find("\"load\",function(){")
                j0 = s0.find(";", j0) + 1
                s1 = StringIO()
                s1.write(s0[:j0])
                s1.write("t=GAOBH96.checkandchange(t);")
                s1.write(s0[j0:])
                f0 = open(fld + "/" + x, "w")
                f0.write(s1.getvalue())
                f0.close()
            elif(x in fla):#file format is next:
                s0 = x.replace("\\", "_").replace("/", "_").replace(",", "_").replace(".", "_")  # index value of GAOBH96
                #write same file that it is parted & id name general
                f0 = open(fld + "/" + x, "w")
                f0.write("parted\n" + s0 + "\n")
                f0.close()
                #write script src & coding parts of target file
                f1 = open(fld0 + "/scripts.html", "a")
                j0 = 0 #index of subfiles
                h96 = Huffman96.Huffman96(None)
                with open("../Builds/" + fld + "/" + x, "rb") as f0:
                    b0 = f0.read(70000)
                    while b0 != b"":
                        f1.write("<script src='" + fld[len(fld0) + 1:] + "/" + x + "_" + str(j0) + "'")
                        f1.write(" id='GAOBH96" + s0 + "_" + str(j0) + "'></script>\n")
                        f2 = open(fld + "/" + s0 + "_" + j0 + ".js", "w")
                        f2.write("window.GAOBH96 = window.GAOBH96 || {}; window.GAOBH96.data" + s0 + "=\"")
                        f2.write(h96.Encode(b0).replace("\"", "\\\""))
                        f2.write("\";")
                        f2.close()
                        j0 += 1
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

#move files
fla = ["maze0.data.unityweb", "maze0.wasm", "maze0.wasm.framework.unityweb"]# each files from json call here
oncedir(fld, fld, fla)

#end scripts.html
f0 = open(fld + "/scripts.html", "a")
f1 = open("ob_body_end.txt", "r")
f0.write(f1.read())
f0.close()
f1.close()
#copy loadhelp file
shutil.copy("Huffman.js", fld + "/Huffman.js")
shutil.copy("OutsideRandomer.js", fld + "/OutsideRandomer.js")
