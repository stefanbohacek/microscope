import json
import codecs

ids = json.load(codecs.open('ids.json', 'r', 'utf-8-sig'))
social = json.load(codecs.open('social.json', 'r', 'utf-8-sig'))

data = []

for representative in social:
    if ("govtrack" in representative["id"]):
        for id in ids:
            if (representative["id"]["govtrack"] == id["govtrack"]):
                rep = representative
                rep["id"]["opensecrets"] = id["opensecrets"]
                data.append(rep)

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
