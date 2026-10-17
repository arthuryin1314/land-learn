# Non-negative matrix factorization-assisted independent component analysis for land subsidence feature decomposition and attribution in Lubei Plain, and further integration with deep learning for subsidence prediction

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Yongkang Wang, Huili Gong (corresponding), Beibei Chen, Chaofan Zhou, Lin Guo, Haotong Wang, Qin Wang, Shuqi Hao, Yabin Yang |
| Affiliations | Capital Normal University (College of Resource Environment and Tourism; MOE Key Laboratory of Land Subsidence; Beijing Laboratory of Water Resources Security); Second Institute of Hydrogeology and Engineering Geology, Shandong Provincial Bureau of Geology & Mineral Resources (Dezhou) (p.1) |
| Journal | International Journal of Applied Earth Observation and Geoinformation (Elsevier), Vol. 146, Article 105097, 2026 (p.1) |
| DOI | 10.1016/j.jag.2026.105097 |
| Dates | Received 2025-07-16; revised 2025-12-30; accepted 2026-01-07; online 2026-01-12 (p.1) |
| Open access | CC BY-NC-ND (p.1) |
| Keywords | InSAR; Land subsidence; Independent Component Analysis; Non-negative matrix factorization; Attribution Analysis; CNN-LSTM-Attention (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: NMF-assisted ICA decomposes and attributes 2018–2023 InSAR subsidence in the Lubei Plain: NMF component directions fix the signs of three ICs; wells in high-score areas relate ICs to subsidence and groundwater; CNN-LSTM-Attention predicts each IC to reconstruct regional subsidence, with test RMSE 0.06–0.69 and R² 0.80–0.86. (p.1)

## 2. Study area

- The Lubei Plain (LBP) in the south-eastern North China Plain, with large-scale pumping since the 1970s; western Dezhou and Liaocheng use deep groundwater for irrigation (decline >100 m, rebounding after 2015); eastern Dongying extracts brine for salt and aquaculture and hosts the Shengli Oilfield. (p.2–3)
- Temperate monsoon climate, ~670 mm precipitation (mainly July–August), evaporation 1000–1300 mm; mainly Yellow River alluvial plain with marine plains along the coast. (p.2)
- The Decheng profile shows 8 aquifers and 9 compressible layers within 800 m; Dongying/Guangrao 7 and 8 within 600 m; land cover mainly winter wheat–summer maize farmland. (p.2–3)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1A (ascending IW, VV) | Track 69 frame 119: 153 scenes; track 142 frame 116: 179 scenes; ascending only owing to limited descending data and for consistency | p.4 |
| Precipitation | GPM IMERG Final L3, 0.1°, monthly | p.4 |
| Land cover | CLCD 30 m annual land cover (9 classes) | p.4 |
| Irrigation water use | County-level annual irrigation water use from prefectural water bureaus | p.4 |
| Groundwater wells | From the China Geological Environment Monitoring Institute, unconfined and confined wells, monthly; gaps not interpolated | p.4 |
| Sentinel-2 | Sentinel-2A/B median true-colour composite for January 2022 (<20% cloud) via GEE (10 m) | p.4 |
| Subsidence monitoring stations | Three land-subsidence monitoring stations (layered benchmarks) used to validate InSAR (Fig. 6) | p.9 |

## 4. Methods

1. **SBAS-InSAR**: HyP3 interferometry (36-day temporal, 200 m spatial baselines); MintPy time series with ERA-5 atmospheric correction, LOS to vertical; frame 142–116 as reference, global offsets from high-coherence overlap points to mosaic the two frames. (p.4)
2. **PCA for component number**: Choose the number of ICs as the fewest PCs retaining most information: 3 PCs hold 92.02%, 4 hold 94.55%; three chosen. (p.4, 7)
3. **NMF for direction**: Data standardised to be non-negative, then NMF; the direction of the similar NMF component is used as the IC direction. (p.4, 6)
4. **FastICA**: Negentropy-based FastICA maximising non-Gaussianity after centring and whitening; O=M×S, with M the IC time series and S the spatial scores. (p.4–5)
5. **CNN-LSTM-Attention prediction**: CNN (no pooling) + SE channel attention + LSTM; Adam, 70/30 train/test, LR 0.001, 500 epochs, ×0.9 after 400; IC1 and IC2 detrended with cubic fits before prediction and trends added back, IC3 not detrended; predicted ICs multiplied by the decomposition matrix to rebuild regional subsidence. (p.5–7)
6. **Attribution**: Wells in high-score areas of each IC; Pearson r between the IC and measured cumulative subsidence and GWL; combined with land cover, irrigation use, precipitation and Sentinel-2 interpretation. (p.6, 10–14)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- Addresses incomplete decomposition and direction ambiguity by using NMF component directions to fix three IC directions. (p.1)
- Selects wells in high-score areas to relate ICs, deformation and groundwater for attribution. (p.1)
- Combines ICA with CNN-LSTM-Attention: predict each IC then reconstruct with the decomposition matrix, achieving regional prediction without per-point forecasting. (p.1, 15)
- By reversing IC3, the periodic signal is further separated into irrigation-driven and precipitation-driven parts, offered as a new interpretive approach. (p.13–15)

## 6. Main results

### Synthetic test

- With three mixed synthetic signals: PCA performs poorly; ICA is more accurate than NMF but IC1 is reversed; NMF gets directions right but still mixes signals. (p.6)

### Monitoring and decomposition

- Subsidence centres in north-eastern coastal Dongying and parts of Liaocheng and Dezhou, max 275 mm/yr; uplift up to 90 mm/yr in places, attributed by the authors to extraction limits and the SNWDP. (p.6)
- NMF1: declining trend with periodic fluctuation, largest in the east coast and south-east; NMF2: rise then decline, central Binzhou/Zibo; NMF3: slow uplift, small area of southern Dezhou. (p.6–7)
- IC1: near-linear subsidence in NE coastal and southern Dongying and parts of Liaocheng/Dezhou; IC2: rise then decline turning in 2020, central Binzhou/Zibo; IC3: clear periodicity, central-western Liaocheng/Dezhou. (p.7)

### Prediction

- Test set: IC1 (detrended) RMSE 0.06, R² 0.86; IC2 RMSE 0.25, R² 0.84; IC3 RMSE 0.69, R² 0.80. (p.7)
- Reconstructed January, June and December 2023: errors highest in the south-west in January and June, south-west and north in December, attributed to poorer IC3 prediction. (p.7)

### Attribution

- IC1: 18 wells (4 confined, 14 unconfined), r 0.80–0.97 with subsidence; groundwater clearly rebounds while subsidence continues, explained by mismatched extraction/monitored layers, oil extraction and point-measurement limits; Sentinel-2 shows farmland, salt fields and aquaculture (A–C), a large petrochemical plant (D), farmland (E–G); attributed to deep confined pumping for irrigation, brine extraction and oil extraction/processing, in deep compressible layers. (p.10–11)
- IC2: 14 wells (8 confined, 6 unconfined), max r 0.72 with subsidence and 0.56 with GWL; consistent with interannual precipitation (2020 wettest and IC2 maximum), though high-score areas do not fully match high-precipitation areas; attributed to middle–shallow layers responding to precipitation totals. (p.12)
- IC3: 18 wells (17 unconfined, 1 confined), max r 0.63 with subsidence and 0.71 with GWL; in the original sign peaks fall in autumn–winter, lagging precipitation, with high scores in irrigation-heavy Liaocheng/Dezhou → seasonal irrigation (middle–shallow layers); reversed, peaks fall in spring–summer, correlate with precipitation, high scores in the urbanised, less-irrigated south-east → precipitation-driven surface micro-deformation. (p.12–14)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- SBAS-InSAR is less reliable than PS-InSAR but yields more points. (p.15)
- Compressible layers are not fully independent and hydraulic connections may produce similar signals, so attribution of ICs needs much a posteriori information. (p.15–16)
- Further decomposition by burial depth and soil type (sand/clay) has not been done. (p.16)
- Prediction assumes trends do not change dramatically in the short term (cubic trend and spatial scores remain valid); no covariates are used, so long-term forecasts may accumulate error. (p.15)
- Wells are point measurements with limits for regional evaluation; extracted and monitored aquifers may differ. (p.11)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- InSAR validation is described only in the Fig. 6 caption (three stations, one time point per month); no RMSE or other accuracy figures appear in the text. (p.9)
- Prediction RMSE (0.06–0.69) is given without units in the abstract, results and conclusion. (p.1, 7, 17)
- The spatial scores (decomposition matrix) used for reconstruction come from ICA of the full 2018–2023 series; the text does not state whether decomposition used only the training period (the test set is 30%; months of 2023 are shown from it). (p.5, 7)
- The same IC3, via sign reversal, yields two opposite-phase interpretations (irrigation vs precipitation), based on spatial correspondence of scores with land cover, irrigation and precipitation. (p.12–14)
- Assignment to deep vs middle–shallow compressible layers is inferred from temporal shape (“we believe”), without layer-specific deformation data. (p.11–14)
- IC1 correlates poorly or inversely with GWL (rebounding levels with continuing subsidence), as the conclusion also states. (p.11, 17)
- The paper says Sentinel-1B malfunctioned in “late 2022”; papers 7 and 11 in this collection both give December 2021. (p.4)
- Data availability: “The authors do not have permission to share data.” (p.18)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| Data listed as including “petroleum extraction information” | No petroleum data were used; oil-related attribution comes from Sentinel-2 interpretation and literature. Corrected. |
| Limits like “depends on scaling”, “needs external validation”, “too short” | Not the authors’ words; replaced by Sections 5.3–5.4 limits and verifiable issues. |
| Generic research question, eight questions, “my assessment” | Removed or rewritten. |
| Quartile: “usually Q1” | Not in the PDF; removed. |
| Chinese in English notes; broken toggle | Fully rebuilt. |

**Data/code availability (as stated)**: The authors do not have permission to share data. (p.18)
