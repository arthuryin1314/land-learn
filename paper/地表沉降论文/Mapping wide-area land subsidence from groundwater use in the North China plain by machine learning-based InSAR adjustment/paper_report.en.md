# Mapping wide-area land subsidence from groundwater use in the North China plain by machine learning-based InSAR adjustment

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Mi Jiang, Zhou Wu, Xudong Wang, Lin Bai, Zhiwei Li (corresponding), Zhong Lu |
| Affiliations | Central South University; Sun Yat-sen University; Chang’an University; China University of Mining and Technology (p.1) |
| Journal | Remote Sensing of Environment (Elsevier), Vol. 334, Article 115226, 2026 (p.1) |
| DOI | 10.1016/j.rse.2025.115226 |
| Dates | Received 2025-07-07; revised 2025-12-24; accepted 2025-12-29; online 2026-01-06 (p.1) |
| Rights | © 2026 Elsevier Inc. All rights reserved (p.1) |
| Keywords | Land subsidence; Groundwater; InSAR; Adjustment; Machine learning; North China plain (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: A machine-learning InSAR adjustment that adaptively selects the optimal bias model per SAR frame (K-fold cross-validation), with GNSS and a plate-motion model to reduce incidence-angle effects between tracks; applied to the NCP from end-2014 to 2022, it improves independent-GNSS accuracy from 3.8–17.5 to 2.0 mm/yr and gives a 24.9 billion m³ lower bound of confined groundwater loss. (p.1)

## 2. Study area

- The NCP east of the Taihang, south of the Yanshan, north of the Yellow River and west of Bohai Gulf, ~140,000 km², including Beijing, Tianjin and northern Shandong/Henan plains; SAR coverage ~300,000 km². (p.2, 12)
- Semi-humid to semi-arid monsoon climate, precipitation 500–600 mm and evaporation 1100–1800 mm; gridded data show 640 mm/yr in 2014–2022. (p.2)
- Piedmont, central alluvial and coastal plains; Quaternary 200–600 m thick; aquifers at 10–50 m (Holocene), 110–170 m (Late Pleistocene), 250–310 m (Middle) and 350–550 m (Early); central and coastal plains have an overlying brackish aquifer, so pumping targets Middle and Early Pleistocene aquifers. (p.2–3)
- By 2010 the head had fallen by up to 75 m; seven local cones merged into a 72,787 km² compound cone; by end-2013 ~42.3% (48,500 km²) subsided >20 mm/yr. (p.2–3)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1 (ascending IW) | 3 tracks, 11 frames, 2251 images; P40: 2015.06–2022.12, 615; P142: 2015.07–2022.12, 800; P69: 2014.10–2022.12, 836 | p.3–4 表1 |
| GNSS | 20 CMONOC CORS (2014–2022, daily): 12 for constraints, 8 for validation; 305 horizontal secular velocities (Wang & Shen 2020, 1995–2016) to invert the Euler vector | p.3–4, 10 |
| Hydrology | Groundwater Level Yearbook: 1284 unconfined and 569 confined wells (Table 1: 2015–2021; text: 2014–2021); 0.1° daily precipitation (Han et al., 2023); brackish-water distribution (GeoCloud); groundwater yield and SNWD volumes from MWR bulletins | p.4 |
| Other | TanDEM-X 90 m DEM; GACOS troposphere products; Copernicus 100 m land cover | p.4, 12 |

## 4. Methods

1. **Pre-processing and time series**: Geometric co-registration with precise orbits and TanDEM-X DEM; ESD azimuth co-registration (60-day network, better than 1/1000 pixel); 20×4 looks (~100 m); Goldstein filter; MCF unwrapping; GACOS; LiCSBAS per-frame velocities. (p.4)
2. **Plate-motion-constrained vertical projection**: A regional Euler vector inverted from CORS and Wang & Shen velocities gives east/north tectonic velocities (relative to each frame’s reference), inserted into the LOS equation to solve vertical velocity instead of assuming zero horizontal motion. (p.5–6)
3. **Candidate bias models**: Per-frame long-wavelength bias may be constant, linear, bilinear or quadratic; tie points and GNSS control points form the system, solved by weighted least squares using InSAR and GNSS uncertainties (p/q balances the two). (p.6)
4. **K-fold model selection**: K-fold (K=10) cross-validation over sub-model combinations, choosing the minimum mean rmse; the allowed order is limited by the angular spread of tie points around each frame (eight π/4 sectors): B≤π/2 constant only, ≤π add linear, ≤3π/2 add bilinear, >3π/2 any. (p.6–8)
5. **Synthetic and real tests**: Synthetic: 3 tracks × 3 frames, 1 km, 98 epochs with vertical, local and regional horizontal motion, [−20, 20] mm long-wavelength bias and [−5, 5] mm noise, 50 Monte Carlo runs; real: 12 CORS constraints, 8 independent validation CORS, compared with four uniform models. (p.8–10)
6. **Uncertainty and storage loss**: Corrected-velocity uncertainty from parameter covariance via error propagation; following Smith & Majumdar (2020), confined storage loss ΔS≈A·Δb, i.e. subsidence × pixel area; elastic loading <1.3 mm/yr is considered negligible. (p.12–14)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- The authors’ stated novelty is adaptively selecting the optimal model per frame to minimise varying long-wavelength errors, rather than one unified model for all frames. (p.1, 12, 15)
- GNSS and a plate-motion model reduce overlap differences caused by varying incidence angles between tracks. (p.1)
- Restricting candidates by tie-point distribution reduces 4¹¹ (>4 million) combinations to 62,208, a 67.4-fold gain. (p.12)
- Claims the first regional estimate of confined groundwater storage loss (24.9 billion m³, 2014–2022) with city-level comparison. (p.15)

## 6. Main results

### Method tests

- Synthetic: constant/linear models do well overall but poorly in overlaps; bilinear/quadratic best in overlaps but overfit at edges; the ML adjustment gives the best overall rmse, ~1.6 mm/yr. (p.8–10)
- Real data: removing horizontal tectonic components lowers the SD of vertical-velocity dispersion in overlaps from 14.3 to 12.7 mm/yr. (p.10)
- Against 8 independent GNSS: K-fold 2.0 mm/yr; constant, linear, bilinear, quadratic 3.8, 4.4, 4.3, 17.5 mm/yr. (p.10)
- Corrected-velocity uncertainty: linear/bilinear/quadratic 1.8/1.9/2.3 mm/yr, ML 1.4 mm/yr; cross-validation ~279.93 s (0.0045 s per candidate, i9-13900K). (p.12, 14)

### Subsidence pattern (Oct 2014–Dec 2022)

- >63% (~88,200 km²) subsides >10 mm/yr; >56,882 km² >20 mm/yr, mostly within the compound cone; >30 mm/yr covers 28%. (p.10–11)
- City means: Hengshui 58.2, Langfang 35.5, Xingtai 29.6, Cangzhou 28.5, Handan 26.7; Tianjin 20.0, Puyang 19.1, Dongying 17.6; Beijing 6.2, Dezhou 8.8 mm/yr. (p.12)
- Within the compound funnel, max cumulative subsidence is 1.2 m (Hengshui) and 1.1 m (Xingtai); the overall maximum of 2 m is in Dongying, attributed to local underground mining. (p.12)
- Mean subsidence: cropland 24.4, built-up 19.3, other 17.8 mm/yr; areas over brackish aquifers 29.0 vs 12.3 mm/yr elsewhere. (p.12)
- Compared with local Sentinel-1 studies (Table 2), differences in max, median and mean rates are at the millimetre level, the largest being 6.4 mm/yr for Beijing’s maximum. (p.14–15)

### Temporal evolution and storage loss

- Brackish-covered areas peaked at 38.5 mm/yr in 2018; from 2021 subsidence eased plain-wide, by 2022 ~3 mm/yr in the piedmont and 18.8 mm/yr (2015 level) in brackish central/coastal plains. (p.14)
- After Dec 2020 groundwater withdrawals were ~11.7 billion m³/yr (declining) and transfers ~6.4 billion m³/yr; precipitation 569 vs 832 mm/yr before/after Dec 2020; the authors “speculate” the slowdown mainly reflects long-term withdrawal restrictions, with heavy rainfall indirectly reducing irrigation demand. (p.14)
- Confined storage loss 24.9 billion m³ (~3.11 billion m³/yr): 20.2 billion (81%) in Oct 2014–Dec 2020 and 4.7 billion (19%) in Jan 2021–Dec 2022. (p.14)
- Before Dec 2020, Hengshui and Cangzhou lost 0.58 and 0.51 billion m³/yr (28% together); Baoding, Xingtai, Handan 25%; per-area losses Hengshui 55,000, Langfang 33,000, Cangzhou 30,000 m³/km²/yr; in 2021–2022, 13 cities <0.15 billion m³/yr, Beijing 0.000016 and Tianjin 0.07 billion m³/yr. (p.14–15)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- The storage loss is presented by the authors as a lower bound (“at least”). (p.1, 15)
- The cause of the slowdown in central/coastal plains is explicitly “speculated”. (p.14)
- K-fold cross-validation adds computational overhead (memory said to be lower than high-order polynomials). (p.12)
- The introduction notes that neglecting horizontal motion is common without both geometries; sparse GNSS and ascending-only full coverage motivate the method. (p.2)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- The abstract says “average subsidence velocity peaked in 2018 at 38.5 mm/yr”; Section 7.3 assigns this peak to brackish-aquifer areas, and the conclusion to the central alluvial and coastal plains. (p.1, 14, 15)
- The period is “end of 2014 to 2022”, but in Table 1 only P69 starts in 2014.10; P40 and P142 start in 2015.06 and 2015.07. (p.1, 4)
- Hydrology period differs: 2014–2021 in the text vs 2015–2021 in Table 1. (p.4)
- ΔS=A·Δb counts all pixel subsidence as confined storage loss; the text attributes Dongying’s 2 m maximum to underground mining but does not state whether non-groundwater subsidence was excluded from the 24.9 billion m³. (p.12, 14)
- Independent validation on real data rests on 8 CORS. (p.10)
- Data availability: “Data will be made available on request.” (p.15)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| Generic research question | Rewritten from the paper. |
| “Average velocity peaked at 38.5 mm/yr in 2018” | Clarified as brackish-aquifer areas; the abstract wording is flagged in 7.2. |
| Limits “per-frame models may overfit” and “post-2022 not evaluated” | Not from the paper (which argues the method reduces overfitting); removed. |
| Eight questions incl. reproduction advice | Not from the paper; removed. |
| Quartile: “RSE usually Q1” | Not in the PDF; removed. |
| Chinese in English notes; broken toggle | Fully rebuilt. |

**Data/code availability (as stated)**: Data will be made available on request. (p.15)
