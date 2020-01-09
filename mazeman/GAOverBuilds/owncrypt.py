import sys

class CNode:
    """docstring for CNode."""

    def __init__(self, v0):
        self.value = v0
        self.next = None
        self.index = -1
        self.code = ""

class CH101bm:
    """docstring for CH101bm."""

    def __init__(self):
        self.alphabete = "\0\'\"\\\n\r\v\t\b\f`1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:|ZXCVBNM?<>" #len=101 symbol '<' and '>' are special mean double symbol value
        self.symbols_rank = CNode(-1)
        self.isab = False
        self.alphabet_array = []

    def add(self, ind, val):
        nb0 = CNode(val)
        nb0.index = ind
        if(nb0.value >= self.symbols_rank.value):
            nb0.next = self.symbols_rank
            self.symbols_rank = nb0
        else:
            current = self.symbols_rank
            while nb0.value < current.next.value:
                current = current.next
            nb0.next = current.next
            current.next = nb0

    def alphabet(self):
        self.isab = True
        print("\rset alphabet")
        current = self.symbols_rank
        for i0 in range(0, 99):
            current.code = self.alphabete[i0:i0 + 1]
            current = current.next
        for i0 in range(0, 81):
            current.code = self.alphabete[99:100] + self.alphabete[i0:i0 + 1]
            current = current.next
        for i0 in range(0, 76):
            current.code = self.alphabete[100:] + self.alphabete[i0:i0 + 1]
            current = current.next
        res0 = ""
        print("\rfill alphabet")
        self.alphabet_array = []
        for i0 in range(0, 256):
            current = self.symbols_rank
            while i0 != current.index and current != None:
                current = current.next
            res0 += current.code
            if current == None:
                print("BIG FAIL in list no index " + str(i0))
                print("fail")
            else:
                self.alphabet_array.append(current.code)
        return res0

    def content(self, text):
        if not self.isab:
            self.alphabet()
        res0 = ""
        print("\rrecode")
        n0 = len(text)
        for i0 in range(0, n0):
            res0 += self.alphabet_array[int(text[i0])]
            if i0 % 100 == 0:
                sys.stdout.write("\rprogress: " + str(i0 / n0))
                sys.stdout.flush()
        return res0

def owncrypt(ba):#my own chyper algorithm
    numbers = []
    print("\rzeros")
    for i0 in range(0, 256):
        numbers.append(0)
    print("\ranalyze input data")
    for i0 in ba:
        numbers[int(i0)] = 1 + numbers[int(i0)]
    ch101 = CH101bm()
    print("\rsort main result")
    for i0 in range(0, 256):
        ch101.add(i0, numbers[i0])
    print("\rending write file")
    return ch101.alphabet() + ch101.content(ba)

import gzip
print("decrypted data")
f0 = gzip.open("..\\Builds\\maze1\\Build\\maze0.data.unityweb", "rb")
f1 = open("toc.txt", "w")
f1.write(owncrypt(f0.read()))
f1.close()
f0.close()

print("encrypted data")
f0 = open("..\\Builds\\maze1\\Build\\maze0.data.unityweb", "rb")
f1 = open("soc.txt", "w")
f1.write(owncrypt(f0.read()))
f1.close()
f0.close()
