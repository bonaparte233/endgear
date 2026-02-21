
import re
import requests
from bs4 import BeautifulSoup
from pathlib import Path

DATA_FILE = Path(__file__).resolve().parents[2] / "client/src/lib/data.ts"

# 定义数据结构
class Equipment:
    def __init__(self, name, set_name, type_name, main_stat, sub_stat1, sub_stat2, sub_stat3):
        self.name = name
        self.set_name = set_name
        self.type_name = type_name
        self.main_stat = main_stat
        self.sub_stat1 = sub_stat1
        self.sub_stat2 = sub_stat2
        self.sub_stat3 = sub_stat3

    def __repr__(self):
        return f"{self.name} ({self.set_name} - {self.type_name})"

def fetch_wiki_data():
    url = "https://wiki.biligame.com/zmd/%E8%A3%85%E5%A4%87%E5%9B%BE%E9%89%B4"
    print(f"Fetching data from {url}...")
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        equipments = []
        
        # 查找所有表格
        tables = soup.find_all('table', class_='wikitable')
        print(f"Found {len(tables)} tables")
        
        for table in tables:
            rows = table.find_all('tr')
            # 跳过表头
            for row in rows[1:]:
                cols = row.find_all('td')
                if len(cols) >= 5:
                    # 提取数据
                    name = cols[0].get_text(strip=True)
                    
                    # 只有金色装备才处理
                    rarity_col = cols[1]
                    # 检查是否为金色装备 (通常有特定的类名或样式，或者通过文字判断)
                    # 这里简单通过行内容判断，如果需要更精确可以分析class
                    
                    # 提取套装和部位
                    # 假设第二列是部位，第三列是套装，或者根据实际情况调整
                    # 根据之前的经验，Wiki结构可能比较复杂，这里先打印一些样本来调试
                    
                    # 重新观察Wiki结构
                    # 通常第一列是图标+名称，第二列是稀有度，第三列是部位，第四列是套装，第五列是属性
                    
                    # 尝试提取
                    try:
                        name_text = cols[0].get_text(strip=True)
                        type_text = cols[2].get_text(strip=True)
                        set_text = cols[3].get_text(strip=True)
                        
                        # 属性通常在后续列
                        # 这是一个简化版本，我们需要根据实际HTML结构调整
                        
                        equipments.append({
                            "name": name_text,
                            "type": type_text,
                            "set": set_text
                        })
                    except Exception as e:
                        print(f"Error parsing row: {e}")
                        continue
                        
        return equipments
    except Exception as e:
        print(f"Error fetching wiki data: {e}")
        return []

def read_local_data():
    try:
        with DATA_FILE.open("r", encoding="utf-8") as f:
            content = f.read()
            
        # 简单的正则提取，用于快速验证
        # 提取 GOLD_EQUIPMENTS 数组内容
        match = re.search(r'export const GOLD_EQUIPMENTS: Equipment\[\] = \[(.*?)\];', content, re.DOTALL)
        if match:
            json_str = match.group(1)
            # 转换为合法的JSON以便解析 (这一步可能比较困难，因为TS对象不是标准JSON)
            # 我们可以用正则提取每个对象的name字段
            names = re.findall(r'"name":\s*"(.*?)"', json_str)
            return names
        return []
    except Exception as e:
        print(f"Error reading local data: {e}")
        return []

if __name__ == "__main__":
    # 1. 读取本地数据
    local_names = read_local_data()
    print(f"Found {len(local_names)} equipments in local data.ts")
    
    # 2. 打印本地数据中的前10个和后10个，用于人工检查
    print("\nFirst 10 local equipments:")
    for name in local_names[:10]:
        print(f"- {name}")
        
    print("\nLast 10 local equipments:")
    for name in local_names[-10:]:
        print(f"- {name}")
        
    # 3. 检查是否有重复
    if len(local_names) != len(set(local_names)):
        print("\nWARNING: Duplicate equipment names found in local data!")
        from collections import Counter
        counts = Counter(local_names)
        for name, count in counts.items():
            if count > 1:
                print(f"  - {name}: {count} times")
    else:
        print("\nNo duplicate names found.")
        
    # 4. 检查是否有疑似错误的名称 (比如包含 'undefined' 或看起来像占位符)
    suspicious = [n for n in local_names if 'undefined' in n or 'Test' in n or len(n) < 2]
    if suspicious:
        print(f"\nSuspicious names found: {suspicious}")
    
    # 5. 检查特定套装 "动火用"
    donghuo = [n for n in local_names if '动火用' in n]
    print(f"\n'动火用' set equipments ({len(donghuo)}):")
    for name in donghuo:
        print(f"- {name}")
