import os, shutil, math, codecs
print("size: " + str(os.stat("testui8array.wasm").st_size))
f0 = open("testui8array.wasm", "rb")
f0.read(64)
for x in range(0, 16):
    print(f0.read(1)[0])
#code for JavaScript
#var enc = new TextEncoder(); // always utf-8
#var s0 = UI8A.testui8array();
#console.log(enc.encode(s0));
# work good - closed dev
print(f0.read())
print(f0.read())
