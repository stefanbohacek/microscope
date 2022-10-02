import json
import codecs

ids = json.load(codecs.open('ids.json', 'r', 'utf-8-sig'))
social = json.load(codecs.open('social.json', 'r', 'utf-8-sig'))

data = []

for representative in social:
    for id in ids:
        if (representative["id"]["bioguide"] == id["bioguide"] and "opensecrets" in id):
            rep = representative
            rep["id"]["opensecrets"] = id["opensecrets"]
            rep["id"]["govtrack"] = id["govtrack"]
            data.append(rep)

with open('representatives.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
