# Deep reading: Mapping wide-area land subsidence from groundwater use in the North China Plain by machine learning-based InSAR adjustment

## 1. Identity

- **Journal/year**: Remote Sensing of Environment, 334, 115226, 2026
- **Quartile note**: RSE 通常为 JCR/Scopus Q1；论文正文未提供分区表。

## 2. Research question

The paper uses large-area InSAR observations to separate persistent subsidence, short-term hydrological response, anthropogenic drivers, or exposure risk, depending on the study design.

## 3. Data

2014 年末–2022 年 Sentinel-1 宽域数据；合成数据和真实 SAR；GNSS 独立验证；土地覆盖、含水层和地下水资料。

## 4. Methods

为每个 SAR frame 自适应选择机器学习调整模型，减少长波误差；重叠区结合 GNSS 和板块运动模型；与常数、线性、双线性、二次模型比较；面积、速度和地下水损失评估。

## 5. Innovation

不再给所有 frame 使用同一个误差模型，而是逐 frame 选择最优模型；同时把 GNSS 与板块运动纳入 overlap 调整。

## 6. Main results

GNSS RMSE 从 3.8–17.5 mm/yr 改善至 2.0 mm/yr；约 56,882 km² 沉降超过 20 mm/yr；最大累计沉降约 2 m；平均沉降速度 2018 年达到 38.5 mm/yr，2021 年后缓解；2014 末–2022 年封闭含水层地下水损失下限约 24.9 billion m³，其中 81% 发生在 2020 年前。

## 7. Problems and limitations

逐 frame 最优模型可能过拟合或失去物理可解释性；地下水损失是下限估计；GNSS 稀疏且 overlap 外边界约束不足；2022 后效果未评价。

## 8. Eight questions

1. 动机：解决宽域 InSAR 长波不一致的实际瓶颈。
2. 方法：自适应模型提高精度，但需防止过拟合。
3. 实验：独立 GNSS 和合成数据支持较好。
4. 局限：储量下限与参数假设。
5. 新意：逐 frame 机器学习调整。
6. 复现：训练特征、模型选择准则和 GNSS 权重必须完整。
7. 迁移：可用于其他宽域拼接，但板块模型需重建。
8. 反向证据：若密集 GNSS 下优势消失，机器学习调整的泛化性会下降。

## 9. Assessment

The strongest contribution is the conversion of wide-area InSAR observations into comparable spatial patterns or management indicators. Driver attribution, irreversibility estimates, and forecasting still require independent wells, pumping records, GNSS/leveling, and hydro-mechanical constraints.

## 10. Evidence boundary

Numbers and judgments are based on the supplied PDF. Quartile information not present in the PDF is explicitly marked as unverified rather than invented.
