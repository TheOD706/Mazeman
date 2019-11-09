fld = input("Input project folder: ")
import os, shutil, math, codecs

def oncedir(dir):
    flist = os.listdir("..\\Builds\\" + dir)
    for x in flist:
        if (os.path.isdir("..\\Builds\\" + dir + "\\" + x)):
            os.mkdir(os.getcwd() + "\\" + dir + "\\" + x)
            oncedir(dir + "\\" + x)
        elif(os.path.isfile("..\\Builds\\" + dir + "\\" + x)):
            if (x == "UnityLoader.js"):#add own comands to loader
                f0 = open("..\\Builds\\" + dir + "\\" + x, "r")
                t0 = f0.read()
                j0 = t0.index("downloadJob: function(e, t) {")
                j1 = t0.index("scheduleBuildDownloadJob: function(e, t, r) {", j0)
                t1 = t0[j0:j1]
                f1 = open("ULdownloadjob.js", "r")
                t2 = f1.read()
                t0 = t0.replace(t1, t2)
                f2 = open(dir + "\\" + x, "w")
                f2.write(t0)
                f1 = open("ULappend1.js", "r")
                f2.write(f1.read())
                f2.close()
            else:
                stat0 = os.stat("..\\Builds\\" + dir + "\\" + x)
                if (stat0.st_size < 75000000):
                    shutil.copy("..\\Builds\\" + dir + "\\" + x, "..\\OverBuilds\\" + dir + "\\" + x)
                else:
                    number_of_files = math.ceil(stat0.st_size / 75000000)
                    f0 = open("..\\Builds\\" + dir + "\\" + x, "rb")
                    for i0 in range(number_of_files):
                        f1 = open(dir + "\\" + x + "--" + str(i0) + ".part.cs", "wb")
                        f1.write(f0.read(75000000))
                        f1.close()
                    f2 = open(dir + "\\" + x, "w")
                    f2.write("file are parted=" + str(number_of_files) + ";")
                    f2.close()
                    #with open("..\\Builds\\" + dir + "\\" + x) as infp:
                    #    files = [open(dir + "\\" + x + "--" + str(i) + ".part.cs", 'w') for i in range(number_of_files)]
                    #    for i, line in enumerate(infp):
                    #        files[i % number_of_files].write(line)
                    #    for f in files:
                    #        f.close()
        else:
            print(dir + "\\" + x + " unknown type object")

os.mkdir(os.getcwd() + "\\" + fld)
oncedir(fld)
