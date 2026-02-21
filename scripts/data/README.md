# Data Scripts

此目录包含一次性或离线数据处理脚本，用于维护 `client/src/lib/data.ts`。

- `fix_equipment_names.py`: 根据映射表重建数据文件
- `recheck_data.py`: 基础完整性检查
- `recheck_data_v2.py`: 结构化字段检查
- `remove_purple_equipments.py`: 过滤紫装套装数据

所有脚本均使用相对项目根目录路径，不依赖机器上的绝对路径。
