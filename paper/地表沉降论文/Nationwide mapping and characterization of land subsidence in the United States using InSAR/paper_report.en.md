# Nationwide mapping and characterization of land subsidence in the United States using InSAR

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Zhiqiang Xiong, Guangcai Feng (corresponding), Zefa Yang, Hua Gao, Wenbin Xu, Lei Zhang, Xiaohua Xu, Zhong Lu, Jun Hu, Zhiwei Li, Jianjun Zhu |
| Affiliation (corresponding) | School of Geoscience and Info-physics, Central South University (p.1) |
| Journal | Remote Sensing of Environment (Elsevier), Vol. 333, Article 115134, 2026 (p.1) |
| DOI | 10.1016/j.rse.2025.115134 |
| Dates | Received 2025-03-10; revised 2025-10-04; accepted 2025-11-05; online 2025-11-14 (p.1) |
| Rights | © 2025 Elsevier Inc. All rights reserved (p.1) |
| Keywords | Land subsidence; United States; InSAR; Deep learning; Atmospheric delay (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: A nationwide strategy (average-rate calculation, InSAR mosaicking, deep-learning subsidence extraction) applied to 23,391 ascending Sentinel-1 images (2019–2021) yields the first high-resolution national subsidence map for the CONUS: all 48 states and DC are affected over ~45,666 km², ~73% in cultivated land and 10% in wetlands, with groundwater over-exploitation named as the predominant driver; 6.26 million people and 160,071 buildings are exposed. (p.1)

## 2. Study area

- The contiguous United States (CONUS): 48 states and the District of Columbia. (p.1–2)
- Background: prior work reports >44,000 km² across 45 states affected, with >$125 million annual losses (Galloway et al., 2008); earlier InSAR studies were local/regional (Table 1). (p.1–2)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1 (ascending) | January 2019–December 2021, 23,391 scenes from 28 paths; interferograms from ASF On Demand (≤36-day baselines), 10:2 looks, 40 m; 321 frames, ~87 TB | p.2, 5 |
| GNSS | Nevada Geodetic Laboratory: 5721 stations in CONUS, 4242 retained; 27 stations in CA_LS1 for time-series analysis | p.5, 11 |
| Deep-learning training data | InSAR rate maps from Sichuan, Guizhou, Ningxia, Qinghai, Gansu, Hebei, Shanxi and Guangdong (China), 224×224 crops augmented to 20,280 samples (80/20 split) | p.4 |
| Ancillary | Copernicus DEM (slopes >5° excluded); USGS earthquake catalogue; land cover, irrigated/rainfed cropland, population, precipitation, aquifers, groundwater from 48,341 wells (Jasechko et al., 2024); OpenStreetMap buildings and roads; oil and gas fields | p.4, 6–10 |

## 4. Methods

1. **Adaptive EDAD correction**: Polynomial ramp removal; interferograms split into 6 km×6 km patches with 50% overlap; phase–elevation fitted by IRLS; quality Q=σ/(kσh), patches with Q>10 set to zero (no correction); parameters interpolated from patch centres. (p.3)
2. **Iterative stacking and turbulent atmosphere**: Weighted stacking for mean rates; deforming pixels (|v| > SD) masked and dilated, ramp/EDAD re-estimated on stable pixels; turbulent atmosphere from low-pass filtering of stable pixels, then re-stacking; SBAS time series for AOIs. (p.3–4)
3. **Block-adjustment mosaicking**: A constant bias per frame estimated by least squares from homonymous pixels with |rate| <1 cm/yr, then removed for 321 frames; all results remain in LOS. (p.4)
4. **DeforNet extraction**: U-Net with attention and depth-wise separable convolutions; 40 epochs, batch 8, initial LR 0.0005 halved every 10 epochs, Adam; state by state: low-pass denoise → wrap to greyscale → 25% overlapping patches → detect → dilate/smooth → reassemble; slopes >5° and the earthquake catalogue exclude landslides and quakes. (p.4)
5. **Exposure and risk**: Overlay land cover, cropland type, population, buildings and roads; risk matrix from ~3-year differential settlement (angular distortion) and population density (Text S4). (p.8–9)
6. **Computation**: Eight Ubuntu 20.04 workstations (32 cores, 64 GB each), custom MATLAB/GAMMA pipeline; >1.2 TB processed data per frame. (p.5)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- Claims the first high-resolution nationwide LS map of the CONUS and the first comprehensive quantification. (p.1–2, 5)
- Proposes an adaptive EDAD correction applied only to affected pixels, to avoid removing deformation in flat areas. (p.3)
- Combines average-rate estimation, mosaicking and deep-learning detection into a national-scale strategy. (p.1)
- Makes the national deformation-rate map publicly available (insarclub website). (p.10)

## 6. Main results

### Accuracy and method checks

- 4242 GNSS stations: 87.5% within 8 mm/yr, 6.8% exceed 1 cm/yr, RMSE 5.2 mm/yr. (p.5)
- EDAD comparison (P137 F123, with large deformation masked): SDs of 11, 12 and 8 mm/yr for methods 1, 2 and 4; method 3 (multi-patch) removed most subsidence signal. (p.13–14)
- Per-frame mean rates relative to zero: SD from 2.9 to 1.4 mm/yr and MAD from 2.1 to 0.7 mm/yr after mosaicking. (p.14)
- At the test site 701 potential areas were detected, 91 judged false by visual interpretation (~87% accuracy); false pixels ~1% of LS pixels. (p.14–15)

### National pattern

- All 48 states and DC; mean and median −4.3 and −2.7 cm/yr; 10.2% in −1–0, 20.5% in −2–−1, 21.1% in −3–−2 cm/yr; total ~45,666 km², 62.5% in California. (p.5–6)
- Max LOS 47.5 cm/yr (Central Valley, ~58 cm/yr vertical); LOS quartiles 1.6, 2.7, 5.4 cm/yr; in California 24% in 2.7–5.4 and 38% >5.4 cm/yr. (p.6)
- Four reasons for likely underestimation: LA and Santa Ana basins inactive in the period; small or few-pixel areas indistinguishable from noise; very small rates not identified; steep-slope mining subsidence excluded by the slope filter. (p.6)

### Land cover and cropland

- Cultivated 73%, wetlands 10%, grassland 5%, artificial 4%, shrubs and forest 3% each; cultivated land largest in 33 states; >90% agricultural in Arkansas, Illinois, Iowa, Kansas, Ohio, Oklahoma; wetlands dominate in Florida, Louisiana and others; artificial surfaces dominate only in Wyoming. (p.6–7)
- Irrigated cropland is 24% of cropland but 67% of cropland subsidence; only ten states have more irrigated than rainfed cropland; CA_LS1 is 84.56% cropland. (p.8)

### Exposure and risk

- ~6.26 million exposed (California 96%; Arizona 87,099; Louisiana 28,429); 31 states exceed 1000 exposed people. (p.8–9)
- Very low–low risk covers 72.9% of subsiding area; high–very high only 1.6% but 9.6% of exposed people; 278,769 in very high, 321,266 in high, ~5.4 million in medium risk. (p.9)
- Buildings 160,071 (California 150,458); roads: railways 1753 km, motorways 1779, primary 1425, secondary 2766, trunk 692 km. (p.10)

### Drivers and management cases

- 91% of LS areas lie within aquifers; among 48,341 wells, depth-to-water change is higher in LS areas (median 11, mean 24 cm/yr) than elsewhere (2, 7 cm/yr). (p.10)
- Many California LS zones coincide with oil and gas fields, making contributions hard to separate; the authors stress the cases only demonstrate data use and do not establish causal mechanisms. (p.10)
- GNSS in CA_LS1: 4 no subsidence, 16 continuous, 11 reduced; the slowdown is linked to wet/dry years rather than SGMA; the Santa Ana Basin shows long-term uplift for Nov 2015–Aug 2024. (p.11)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- Results are referenced to local points, so long-wavelength signals (tectonics, GIA) are not preserved. (p.16)
- Time series were computed only for specific areas, limiting insight into dynamics. (p.16)
- Identified LS areas likely underestimate the true extent (four reasons in Results). (p.6)
- Angular distortion reflects only ~3 years, so cumulative distortion could be dozens of times larger and actual risk more severe. (p.9–10)
- Case studies do not establish causality, which needs field investigation and modelling; validating all LS areas nationally is challenging. (p.10, 15)
- Differences from Ohenhen et al. in exposed population and area are attributed to SAR periods, reference frames and identification methods. (p.15–16)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- GNSS count in CA_LS1 is inconsistent: 27 stations analysed, but the categories sum to 4 + 16 + 11 = 31. (p.11)
- All InSAR results are LOS (ascending only); subsidence rates and area statistics are LOS-based, with only the maximum converted to ~58 cm/yr vertical. (p.4, 6)
- DeforNet’s F1=0.96 comes from the 80/20 split of Chinese training data; US accuracy (~87%) was obtained in one test frame (P137 F123) by visual interpretation in Google Earth. (p.4, 14)
- The abstract and conclusion call groundwater over-exploitation the “predominant/primary driver”, while Section 4.1 states the cases “do not establish definitive causal mechanisms”. (p.1, 10, 16)
- Mosaicking models a constant bias per frame and estimates it only from pixels with |rate|<1 cm/yr. (p.4)
- Code is available only upon reasonable request; maps require a free account on the insarclub website. (p.16)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| Journal given as “2026 (no journal/DOI in the file)” | Incorrect: page 1 shows RSE 333, 115134, DOI 10.1016/j.rse.2025.115134; the quartile is indeed not stated. |
| Limits like “a national threshold may ignore regional noise” | Not in the paper; replaced by author limits and verifiable issues (27 vs 31 stations, LOS). |
| Generic research question, eight questions, “my assessment” | Removed or rewritten. |
| Chinese in English notes; broken toggle; wrong journal line | Fully rebuilt. |

**Data/code availability (as stated)**: Sentinel-1 and interferograms from ASF; buildings and roads from OpenStreetMap; ancillary sources in the supplement; code upon reasonable request; deformation maps on the insarclub website (free registration). (p.16)
