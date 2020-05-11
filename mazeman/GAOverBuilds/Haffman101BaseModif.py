import sys, gzip

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
        self.alphabete = "`1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:|ZXCVBNM?<>" #len=91 symbol '<' and '>' are special mean double symbol value
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
        current = self.symbols_rank
        for i0 in range(0, 89):
            current.code = self.alphabete[i0:i0 + 1]
            current = current.next
        for i0 in range(0, 81):
            current.code = self.alphabete[89:90] + self.alphabete[i0:i0 + 1]
            current = current.next
        for i0 in range(0, 86):
            current.code = self.alphabete[90:] + self.alphabete[i0:i0 + 1]
            current = current.next
        res0 = ""
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

    def writecontent(self, text, abt):
        if not self.isab:
            abt = self.alphabet()
        cnt = abt
        n0 = len(text)
        for i0 in range(0, n0):
            cnt += self.alphabet_array[int(text[i0])]
            if i0 % 100 == 0:
                sys.stdout.write("\rprogress: " + str(i0 / n0))
                sys.stdout.flush()
        sys.stdout.write("end writing")
        sys.stdout.flush()
        return cnt

def crypt2file(ba):#my own chyper algorithm
    numbers = []
    for i0 in range(0, 256):
        numbers.append(0)
    for i0 in ba:
        numbers[int(i0)] = 1 + numbers[int(i0)]
    ch101 = CH101bm()
    print("\rsort main result")
    for i0 in range(0, 256):
        ch101.add(i0, numbers[i0])
    sys.stdout.write("\rending write file")
    sys.stdout.flush()
    return ch101.writecontent(ba, ch101.alphabet())

def decryptdata(ffrom):
    print("read from file")
    #f0 = gzip.open(ffrom, "rb")
    f0 = open(ffrom, "rb")
    cnt = crypt2file(f0.read())
    f0.close()
    return cnt

#import gzip
#print("decrypted data")
#f0 = gzip.open("..\\Builds\\maze1\\Build\\maze0.data.unityweb", "rb")
#f1 = open("toc.txt", "w")
#f1.write(owncrypt(f0.read()))
#f1.close()
#f0.close()
#
#print("encrypted data")
#f0 = open("..\\Builds\\maze1\\Build\\maze0.data.unityweb", "rb")
#f1 = open("soc.txt", "w")
#f1.write(owncrypt(f0.read()))
#f1.close()
#f0.close()
