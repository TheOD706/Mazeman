fld = input("Input project folder: ")
import os, shutil, math, codecs

def oncedir(dir, pff):
    flist = os.listdir("..\\Builds\\" + dir)
    for x in flist:
        if (os.path.isdir("..\\Builds\\" + dir + "\\" + x)):
            os.mkdir(os.getcwd() + "\\" + dir + "\\" + x)
            oncedir(dir + "\\" + x, pff)
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
            else:
                stat0 = os.stat("..\\Builds\\" + dir + "\\" + x)
                critic_size = 10000000
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

def doublecopyfromhome(fld, fil):
    f0 = open("..\\OverBuilds\\" + fil, "r")
    c0 = f0.read()
    f0.open("..OverBuilds\\" + fld + "\\" + fil, "w");
    f0.write(c0);
    f0.close()
    f0.open("..Builds\\" + fld + "\\" + fil, "w");
    f0.write(c0);
    f0.close()

os.mkdir(os.getcwd() + "\\" + fld)
oncedir(fld, fld)
shutil.copy("..\\OverBuilds\\" + fld + "\\splitted.urls", "..\\Builds\\" + fld + "\\splitted.urls")
#doublecopyfromhome(fld, "GAindex.html")
