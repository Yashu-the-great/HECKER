import hashlib
# sentence = input("Enter The sentence to hash")

def hashit(sentence:str) -> str:
    sentence = sentence.encode("utf-8")
    return hashlib.sha1(sentence).hexdigest()

print(hashit("A"))