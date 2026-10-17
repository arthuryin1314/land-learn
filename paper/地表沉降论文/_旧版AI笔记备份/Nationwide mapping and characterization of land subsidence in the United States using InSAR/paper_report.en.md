# Deep reading: Nationwide mapping and characterization of land subsidence in the United States using InSAR

## 1. Identity

- **Journal/year**: 2026（论文文件未显示完整期刊/DOI 元数据；需以正式发表页面核对）
- **Quartile note**: 期刊分区无法从本地论文首页可靠核验。

## 2. Research question

The paper uses large-area InSAR observations to separate persistent subsidence, short-term hydrological response, anthropogenic drivers, or exposure risk, depending on the study design.

## 3. Data

2019–2021 年 23,391 景升轨 Sentinel-1；美国本土 48 州和 DC；土地覆盖、地下水、人口、建筑、铁路和道路。

## 4. Methods

平均形变计算、frame 拼接、误差校正；用深度学习从全国形变图提取沉降区域；土地覆盖/地下水驱动统计；暴露人口和基础设施空间叠加。

## 5. Innovation

在全国尺度把 InSAR 拼接与深度学习沉降区提取结合，给出面积、驱动和社会暴露的统一图谱。

## 6. Main results

沉降影响全部 48 州和 DC，面积约 45,666 km²；约 73% 发生在耕地、10% 在湿地；地下水超采为主导驱动；约 626 万人、160,071 座建筑以及大量道路铁路暴露；最大 LOS 沉降约 47.5 cm/yr。

## 7. Problems and limitations

全国统一阈值可能忽略区域噪声差异；仅升轨 LOS 难分离三维运动；深度学习标签和训练泛化需更多说明；社会暴露不等于实际损失或风险。

## 8. Eight questions

1. 动机：全国缺图且管理需求明确。
2. 方法：规模化策略有效，但黑箱提取需透明验证。
3. 实验：与公开区域结果对照，独立地面验证仍有限。
4. 局限：LOS、标签和时间窗。
5. 新意：全国 InSAR+深度学习+暴露分析。
6. 复现：训练样本、阈值、frame 基准和后处理要公开。
7. 迁移：可用于其他国家，但成像档案和标签决定效果。
8. 反向证据：若独立水准显示面积或速率偏差系统性较大，国家统计需修正。

## 9. Assessment

The strongest contribution is the conversion of wide-area InSAR observations into comparable spatial patterns or management indicators. Driver attribution, irreversibility estimates, and forecasting still require independent wells, pumping records, GNSS/leveling, and hydro-mechanical constraints.

## 10. Evidence boundary

Numbers and judgments are based on the supplied PDF. Quartile information not present in the PDF is explicitly marked as unverified rather than invented.
