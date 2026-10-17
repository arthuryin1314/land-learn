# 地表沉降 InSAR Resources

## Knowledge

### 入门（雷达 / InSAR 基础）
- [NASA Earthdata: What is SAR](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/sar)
  官方科普，讲清振幅/相位、波段、穿透性。适用于：第一次建立 SAR 直觉。
- [NASA ARSET: Introduction to Synthetic Aperture Radar（4 节 × 1 小时）](https://www.earthdata.nasa.gov/learn/trainings/introduction-synthetic-aperture-radar)
  第 4 节专讲 InSAR，配幻灯片和视频。适用于：系统入门的首选视频课。
  - 第 4 节幻灯片本地版：materials/ARSET-SAR2017-part4-slides.pdf（2017 版，Eric Fielding, JPL），精读笔记见 reference/arset-insar-notes.html。第 2 节留到第 2 课时看，第 3 节（极化 SAR）跳过。
  - 第 2 节幻灯片本地版：materials/ARSET-SAR2017-part2-slides.pdf（33 页，Erika Podest）。主题是用 GRD 强度图分出水体和陆地，与 InSAR 主线关系不大。值得看的：第 5–6 页（S1 参数、IW 模式）、第 7、11–12 页（从 ASF 获取数据；第 12 页截图里 GRD 和 SLC 是并列的两个下载选项）、第 8 页（文件命名）、第 14 页（GRD 文件里的波段）、第 26 页（几何畸变名词）。第 8 页"选 GRD"只适用于强度分析，InSAR 必须用 SLC。纯操作步骤（第 13、15–17、19、21、23–25、27、29–32 页）跳过；第 20、22 页是定标概念，可选看。
- [The SAR Handbook — NASA SERVIR, 2019（免费）](https://servirglobal.net/resources/sar-handbook)
  每章分理论 + 实操教程。适用于：SAR 基础章节、SNAP 操作。
- [ESA TM-19: InSAR Principles — Ferretti et al., 2007](https://www.esa.int/About_Us/ESA_Publications/InSAR_Principles_Guidelines_for_SAR_Interferometry_Processing_and_Interpretation_br_ESA_TM-19)
  InSAR 经典教材，Part B 面向初学者。适用于：相位、失相干、大气误差、PS 原理的权威解释。

### 处理工具（开源 / 免费）
- [ASF HyP3 文档](https://hyp3-docs.asf.alaska.edu/)：云端按需生成 Sentinel-1 干涉图，每月 8000 免费额度，基于 GAMMA。适用于：不装商业软件也能得到干涉图。付费版 [HyP3+](https://hyp3-docs.asf.alaska.edu/about/hyp3_plus/)：每额度 0.05 美元，不受月度限制。
- [HyP3 + MintPy 时序分析教程 notebook](https://nbviewer.jupyter.org/github/ASFHyP3/hyp3-docs/blob/main/docs/tutorials/hyp3_insar_stack_for_ts_analysis.ipynb)：端到端流程。适用于：第一次跑出速率图。
- [MintPy 文档](https://mintpy.readthedocs.io/en/latest/) 和 [MintPy-tutorial](https://github.com/insarlab/MintPy-tutorial)：SBAS 时序分析主力工具。
- [LiCSBAS — Morishita et al., Remote Sensing 2020](https://www.mdpi.com/2072-4292/12/3/424)：基于 LiCSAR 免费干涉图的时序包，自带 GACOS 大气改正。适用于：备选流程。

### 沉降成因
- [USGS Circular 1182: Land Subsidence in the United States (1999)](https://pubs.usgs.gov/circ/circ1182)
  沉降成因的权威综述：含水层压密、采矿、有机土排水等，美国 80% 以上沉降由地下水开采造成。适用于：第三章成因分析的理论框架。

### 土地覆盖（第二章）
- [CLCD 中国 30 m 年度土地覆盖 — Yang & Huang, ESSD 2021](https://essd.copernicus.org/articles/13/3907/2021/)，[Zenodo 数据（1985–2023）](https://zenodo.org/records/12779975)
  总体精度 79.31%。适用于：给沉降像元标注农田/建设用地/水体。

### 用户本地文献（paper/地表沉降论文）
- 江苏全省 Sentinel-1 (2021)：同区域基准，需要对标
- 中国东部海岸 Sentinel-1+2 (2026)：三段式结构模板
- Xing et al., RSE 341 (2026) 115442，白鹤滩水库滑坡（导师 2026-10-14 发送）：研究对象是山区滑坡，不是平原沉降。可参考的部分：SBAS 优于 PS 的理由（§3.1）、相位分量公式 (2)、升降轨二维分解公式 (3)–(6)、Jenks 分级 + 列联矩阵融合（§3.5）、树模型 + SHAP 因子贡献（§3.4、§5.1）、用多时相影像排除施工开挖造成的人为形变（§4.3–4.4、图 14）

## Wisdom (Communities)
- [ESA STEP Forum](https://forum.step.esa.int/)：SNAP/InSAR 问答，ESA 官方人员活跃。适用于：处理报错、参数问题。
- [MintPy GitHub Discussions](https://github.com/insarlab/MintPy/discussions)：MintPy 作者亲自答疑。
- 导师 + 同门：地质灾害方向，用于判断成因解释是否合理。

## Gaps
- 中文的 InSAR 入门教材（廖明生等的《雷达干涉测量》待核实）
- 江苏地下水位、开采量数据的获取渠道（需问导师）
- LiCSAR 对江苏的覆盖情况（待核实）

## 自有数据
- data/asf_s1_slc_jiangsu_bbox_queried_2026-10-16.csv：ASF API 实查的江苏范围 Sentinel-1 IW SLC 全部影像（6037 景）。汇总见 reference/jiangsu-s1-data.html。适用于：数据方案设计、选时间段和轨道。
