import re
from pathlib import Path

# 定义需要移除的紫色套装名称（根据 Wiki 和之前的脚本）
purple_sets = [
    "蚀电防护",
    "巡行信使",
    "重装信使",
    "四号谷地",
    "集成重型"
]

data_file = Path(__file__).resolve().parents[2] / "client/src/lib/data.ts"

with data_file.open("r", encoding="utf-8") as f:
    content = f.read()

# 使用简单的字符串包含判断来过滤
# 假设每个装备对象以 { 开头，以 }, 结尾（在列表中）
# 正则匹配整个对象结构可能比较复杂，我们先解析出所有对象块
# 这里的结构比较规整，可以逐行读取并构建对象字符串，或者使用正则匹配

# 正则匹配数组中的每个对象
# 假设格式是:
#   {
#     id: '...',
#     ...
#   },
pattern = re.compile(r'  \{\n    id:.*?\n  \},', re.DOTALL)

def filter_equipments(match):
    block = match.group(0)
    for p_set in purple_sets:
        if f"set: '{p_set}'" in block:
            return "" # 移除该块
    return block

new_content = re.sub(pattern, filter_equipments, content)

# 清理可能产生的多余空行
new_content = re.sub(r'\n\s*\n', '\n', new_content)

with data_file.open("w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully removed purple equipments from data.ts")
