
import re
from pathlib import Path

DATA_FILE = Path(__file__).resolve().parents[2] / "client/src/lib/data.ts"

def parse_ts_data():
    try:
        with DATA_FILE.open("r", encoding="utf-8") as f:
            content = f.read()
            
        # 提取 GOLD_EQUIPMENTS 数组内容
        match = re.search(r'export const GOLD_EQUIPMENTS: Equipment\[\] = \[(.*?)\];', content, re.DOTALL)
        if not match:
            print("Could not find GOLD_EQUIPMENTS array")
            return []
            
        array_content = match.group(1)
        
        # 简单的状态机解析，提取每个对象的name属性
        # 因为之前的正则太简单，把属性名里的name也匹配进去了
        
        equipments = []
        # 分割成单个对象块
        # 假设每个对象以 { 开始，以 } 结束
        # 这是一个简化的解析，假设格式比较规范
        
        # 使用更精确的正则只匹配顶层的 name 字段
        # 对象的 name 字段通常紧跟在 "id" 字段之后，或者在对象开始处
        # 我们可以匹配 "name": "XXX", 且这行前面有缩进但不是太深（避免匹配到 mainStat 里的 name）
        
        lines = array_content.split('\n')
        current_equipment = None
        
        for i, line in enumerate(lines):
            line = line.strip()
            if '"id":' in line:
                current_equipment = {}
            
            if '"name":' in line and current_equipment is not None:
                # 提取值
                val_match = re.search(r'"name":\s*"(.*?)"', line)
                if val_match:
                    name = val_match.group(1)
                    # 如果是属性名（防御力等），则忽略
                    if name in ['防御力', 'Strength', 'Intelligence', 'Agility', 'Willpower']:
                        continue
                    # 如果已经有name了（说明匹配到了属性里的name），也不覆盖
                    if 'name' not in current_equipment:
                        current_equipment['name'] = name
            
            if '"set":' in line and current_equipment is not None:
                val_match = re.search(r'"set":\s*"(.*?)"', line)
                if val_match:
                    current_equipment['set'] = val_match.group(1)
                    
            if '"type":' in line and current_equipment is not None:
                val_match = re.search(r'"type":\s*"(.*?)"', line)
                if val_match:
                    current_equipment['type'] = val_match.group(1)
            
            if line.startswith('},') or (line.startswith('}') and i == len(lines)-1):
                if current_equipment and 'name' in current_equipment:
                    equipments.append(current_equipment)
                    current_equipment = None
                    
        return equipments
    except Exception as e:
        print(f"Error reading local data: {e}")
        return []

if __name__ == "__main__":
    equipments = parse_ts_data()
    print(f"Found {len(equipments)} equipments")
    
    print("\n--- Equipment List ---")
    for i, eq in enumerate(equipments):
        print(f"{i+1}. {eq.get('name')} [{eq.get('set')} - {eq.get('type')}]")
        
    # 检查是否有重复
    names = [e.get('name') for e in equipments]
    if len(names) != len(set(names)):
        print("\nWARNING: Duplicate names found!")
        from collections import Counter
        counts = Counter(names)
        for name, count in counts.items():
            if count > 1:
                print(f"  - {name}: {count} times")
    
    # 检查是否有动火用相关的问题
    donghuo = [e for e in equipments if '动火用' in e.get('set', '')]
    print(f"\n--- '动火用' Set ({len(donghuo)}) ---")
    for e in donghuo:
        print(f"- {e.get('name')} ({e.get('type')})")
