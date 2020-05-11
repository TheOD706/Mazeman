import os, shutil, math, codecs, binascii

#
#write byte file in hex format
#f0 = open("../Builds/maze1/Build/maze0.wasm", "rt");
#for x in range(0, 64):
    #print(f0.read(1)[0])

import gzip
f1=gzip.open('../Builds/maze1/Build/maze0.wasm','rb')
fd1 = f1.read()
for x in range(0, 64):
    #print(f1.read(1).hex())
    print(fd1[x * 16:(x + 1) * 16 - 1].hex())
#file_content=f1.read(32)
#print(file_content)
