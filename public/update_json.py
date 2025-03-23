import json

# Load the original China JSON file
china_json_path = "./china_prev.json"
with open(china_json_path, "r", encoding="utf-8") as file:
    china_data = json.load(file)

# Define additional information for each province
province_info = {
    "北京": {"capital": "Beijing", "landscape": "Plains and hills", "famous_for": "Forbidden City, Great Wall", "traditional_food": "Peking Duck"},
    "天津": {"capital": "Tianjin", "landscape": "Flat plains, coastline", "famous_for": "European-style architecture", "traditional_food": "Goubuli Baozi"},
    "上海": {"capital": "Shanghai", "landscape": "Coastal, Yangtze River Delta", "famous_for": "Financial hub, The Bund", "traditional_food": "Xiaolongbao"},
    "重庆": {"capital": "Chongqing", "landscape": "Mountains and rivers", "famous_for": "Yangtze River, Hotpot", "traditional_food": "Chongqing Hotpot"},
    "河北": {"capital": "Shijiazhuang", "landscape": "Mountains, plains", "famous_for": "Great Wall sections", "traditional_food": "Donkey Burger"},
    "山西": {"capital": "Taiyuan", "landscape": "Loess Plateau, mountains", "famous_for": "Ancient temples, coal mining", "traditional_food": "Knife-cut Noodles"},
    "辽宁": {"capital": "Shenyang", "landscape": "Coastal, plains", "famous_for": "Mukden Palace, Dalian beaches", "traditional_food": "Steamed Buns"},
    "吉林": {"capital": "Changchun", "landscape": "Forests, mountains", "famous_for": "Changbai Mountains", "traditional_food": "Jilin Cold Noodles"},
    "黑龙江": {"capital": "Harbin", "landscape": "Plains, rivers, forests", "famous_for": "Ice Festival, Russian influence", "traditional_food": "Harbin Sausages"},
    "江苏": {"capital": "Nanjing", "landscape": "Lakes, Yangtze River", "famous_for": "Ancient capital, Gardens", "traditional_food": "Salted Duck"},
    "浙江": {"capital": "Hangzhou", "landscape": "Hills, West Lake", "famous_for": "West Lake, Silk", "traditional_food": "Dongpo Pork"},
    "安徽": {"capital": "Hefei", "landscape": "Mountains, rivers", "famous_for": "Huangshan (Yellow Mountain)", "traditional_food": "Hairy Tofu"},
    "福建": {"capital": "Fuzhou", "landscape": "Mountains, coastline", "famous_for": "Tea culture, Tulou houses", "traditional_food": "Buddha Jumps Over the Wall"},
    "江西": {"capital": "Nanchang", "landscape": "Hills, Poyang Lake", "famous_for": "Revolutionary history", "traditional_food": "Jingdezhen Roast Duck"},
    "山东": {"capital": "Jinan", "landscape": "Mountains, coastline", "famous_for": "Mount Tai, Confucius' birthplace", "traditional_food": "Shandong Pancakes"},
    "河南": {"capital": "Zhengzhou", "landscape": "Plains, Yellow River", "famous_for": "Shaolin Temple", "traditional_food": "Steamed Bread (Mantou)"},
    "湖北": {"capital": "Wuhan", "landscape": "Lakes, Yangtze River", "famous_for": "Three Gorges Dam", "traditional_food": "Hot Dry Noodles"},
    "湖南": {"capital": "Changsha", "landscape": "Mountains, rivers", "famous_for": "Mao Zedong’s birthplace", "traditional_food": "Spicy Crayfish"},
    "广东": {"capital": "Guangzhou", "landscape": "Coastal, mountains", "famous_for": "Cantonese cuisine", "traditional_food": "Dim Sum"},
    "广西": {"capital": "Nanning", "landscape": "Karst mountains, rivers", "famous_for": "Guilin landscapes", "traditional_food": "Rice Noodles"},
    "海南": {"capital": "Haikou", "landscape": "Tropical island", "famous_for": "Beaches, tropical fruits", "traditional_food": "Wenchang Chicken"},
    "四川": {"capital": "Chengdu", "landscape": "Mountains, plains", "famous_for": "Pandas, Sichuan Opera", "traditional_food": "Mapo Tofu"},
    "贵州": {"capital": "Guiyang", "landscape": "Karst mountains", "famous_for": "Huangguoshu Waterfall", "traditional_food": "Sour Soup Fish"},
    "云南": {"capital": "Kunming", "landscape": "Mountains, plateaus", "famous_for": "Dali, Lijiang", "traditional_food": "Crossing Bridge Noodles"},
    "西藏": {"capital": "Lhasa", "landscape": "Himalayan Mountains", "famous_for": "Potala Palace", "traditional_food": "Yak Butter Tea"},
    "陕西": {"capital": "Xi’an", "landscape": "Mountains, plains", "famous_for": "Terracotta Warriors", "traditional_food": "Biang Biang Noodles"},
    "甘肃": {"capital": "Lanzhou", "landscape": "Gobi desert, mountains", "famous_for": "Dunhuang Mogao Caves", "traditional_food": "Lanzhou Beef Noodles"},
    "青海": {"capital": "Xining", "landscape": "Plateau, lakes", "famous_for": "Qinghai Lake", "traditional_food": "Yak Yogurt"},
    "宁夏": {"capital": "Yinchuan", "landscape": "Desert, Yellow River", "famous_for": "Muslim culture", "traditional_food": "Lamb Kebabs"},
    "新疆": {"capital": "Urumqi", "landscape": "Desert, mountains", "famous_for": "Silk Road, Uighur culture", "traditional_food": "Roasted Lamb"},
    "台湾": {"capital": "Taipei", "landscape": "Mountains, coast", "famous_for": "Night markets, technology", "traditional_food": "Beef Noodles"},
    "香港": {"capital": "Hong Kong", "landscape": "Islands, skyscrapers", "famous_for": "Victoria Harbour", "traditional_food": "Egg Tarts"},
    "澳门": {"capital": "Macau", "landscape": "Coastal, small islands", "famous_for": "Casinos, Portuguese heritage", "traditional_food": "Portuguese Egg Tart"},
}

# Add additional information to the JSON data
for feature in china_data["features"]:
    province_name = feature["properties"]["name"]
    if province_name in province_info:
        feature["properties"].update(province_info[province_name])

# Save the updated JSON file
updated_china_json_path = "./china.json"
with open(updated_china_json_path, "w", encoding="utf-8") as file:
    json.dump(china_data, file, ensure_ascii=False, indent=2)

# Provide the updated file
updated_china_json_path
