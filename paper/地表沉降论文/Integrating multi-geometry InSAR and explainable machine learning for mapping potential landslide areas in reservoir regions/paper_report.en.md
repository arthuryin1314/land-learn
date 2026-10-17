# Integrating multi-geometry InSAR and explainable machine learning for mapping potential landslide areas in reservoir regions

> Verification note: these notes rely only on the paper PDF (including figures, tables and captions) and add no outside information or judgement. “p.X” is the physical page X of the PDF file (identical to the journal page here). “Author claim” marks statements made by the authors themselves, not an assessment by these notes. Items marked “computed from the paper’s numbers” are plain arithmetic on reported values, not statements in the paper.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Ke Xing, Suju Li, Jie Dou (corresponding), Fang Chen, Lizhe Wang, Aonan Dong, Hamza Daud, Lele Zhang (p.1) |
| Affiliations | School of Future Technology, China University of Geosciences (Wuhan); National Disaster Reduction Center of China; Badong National Observation and Research Station of Geohazards, CUG; International Research Center of Big Data for Sustainable Development Goals; Key Laboratory of Digital Earth Science, AIR, CAS; University of Chinese Academy of Sciences; School of Computer Science, CUG (Wuhan) (p.1) |
| Journal | Remote Sensing of Environment (Elsevier), 2026, Vol. 341, Article 115442; edited by Jing M. Chen (p.1) |
| DOI | 10.1016/j.rse.2026.115442 (p.1) |
| Dates | Received 2025-12-19; revised 2026-04-11; accepted 2026-04-20; available online 2026-04-28 (p.1) |
| Copyright | © 2026 Elsevier Inc., all rights reserved, including text and data mining and AI training (p.1) |
| Keywords | Landslide susceptibility; Multi-geometry InSAR; Explainable machine learning; Negative sampling; 2D deformation; SHAP (p.1) |
| Funding | NSFC (42477170, 42090054); Natural Science Foundation of Hubei Province (2025AFD435, 2022CFA002, 2024AFD358) (p.22) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: In the Baihetan Reservoir region, SW China, dual-orbit Sentinel-1 SBAS-InSAR is decomposed into vertical and east–west components. Information-value (IVM) negative sampling, tree-based models and SHAP are used for susceptibility mapping and interpretation. A contingency matrix couples susceptibility with InSAR deformation to delineate potential landslide areas (PLAs). Compared with the threshold method, the area overlapping validated landslides increases more than fourfold (7.29 vs 1.76 km²), and localized vertical subsidence reaches 93 mm/yr. (p.1)

## 2. Study area

- Baihetan Reservoir region on the southeastern margin of the Tibetan Plateau, with intense Cenozoic tectonics and a plateau–mountain framework. The Jinsha River runs through steep V-shaped valleys. (p.3)
- Impoundment began in April 2021. Water levels oscillate between 765 and 825 m, forming a wide hydro-fluctuation zone. Drawdown cycles, water–rock interaction and toe erosion alter pore pressure and degrade slope materials. (p.3)
- Near N–S active faults, notably the Zemuhe and Xiaojiang Faults, run parallel to the river. (p.3)
- Weak lithological assemblages: fractured basalts, soft–hard interbeds (e.g., sandstone–mudstone) and thick Quaternary deposits. (p.3)
- Fig. 1 shows elevation 493–5046 m; ascending Track 26 and descending Track 62; Qiaojia County, Panzhihua City, Baihetan Dam and Yunnan Province; legend “Reservoir elevation: 812 m”. (p.2 Fig.1)
- The text does not state the study-area size. The five classes of each model in Table 2 sum to about 632.8 km² (computed from the paper’s numbers). (p.10 Table 2)

## 3. Data

| Dataset | Source / format / resolution | Use and details | Page |
|---|---|---|---|
| Landslide inventory | Text: historical archives and field surveys; Table 1: Historical Archives and Remote Sensing Interpretation; vector | 74 events (incl. 12 bank collapses); positives identified by morphological and historical evidence only, independent of current deformation. Modelling set 59 landslides (11.4 km², 7:3 train–test); independent external validation set 15 | p.3 Table 1 |
| DEM | Copernicus Data Space Ecosystem; raster; 30 m | Topographic factors; SBAS topographic correction | p.3, 6 |
| Geology | China Geological Survey GeoCloud; vector; 1:200,000 | Lithology, faults | p.3 |
| Sentinel-1 | ASF; raster; 5 m × 20 m | 103 images (2020-01-09 to 2023-05-29), IW, VV+VH, incidence 39.17°; 60-day temporal and 200 m perpendicular baseline thresholds; 310 interferometric pairs | p.3, 6 |
| Vegetation index | Geospatial Data Cloud; raster; 30 m | NDVI | p.3 |
| Hydrology | NGCC; vector; 1:250,000 | Distance to river | p.3 |
| Roads | NGCC; vector; 1:250,000 | Road density | p.3 |
| Meteorology | CMA; vector (no resolution in Table 1) | Mean annual rainfall | p.3 |
| Orthophoto | UAV; raster; 0.03–0.05 m | Field validation | p.3, 17 |
| LiDAR | Airborne; point cloud; 0.05 m | Field validation (e.g., roadbed subsidence at Wulipo) | p.3, 17 |
| Monitoring series | Fig. 19 caption | GNSS displacement, rainfall and reservoir level for the Wangjiashan and Xiaomidi landslides | p.19 Fig.19 |

**Twelve conditioning factors** (Fig. 2): elevation, slope, aspect, plan curvature (Plan_c), profile curvature (Profile_c), TWI, mean annual rainfall, distance to river (Dis_River), road density (Den_Road), NDVI, lithology and distance to fault (Dis_Fault). (p.4 Fig.2)

## 4. Methods

The workflow has five core steps: factor collinearity analysis, optimized negative sampling, state-based hazard delineation, 2D kinematic decomposition, and SHAP interpretation and validation. (p.5–6, Fig.3)

1. **SBAS-InSAR**: Average coherence is below 0.8, so SBAS was chosen over PS-InSAR to exploit distributed scatterers. Processing was done in SARScape: 30 m DEM, Goldstein filtering, MCF unwrapping, orbit refinement and flattening, then SVD for the time series. (p.6)
2. **Dual-orbit 2D decomposition**: The ascending and descending LOS rates (Eqs. 3–4) are solved linearly for vertical Vv and horizontal Vh (Eqs. 5–6). Vh mainly represents east–west motion because N–S motion is weakly constrained by the SAR geometry. (p.6–7)
3. **Collinearity diagnosis**: VIF, TOL and Pearson correlation. (p.9, Fig.8)
4. **Negative sampling (1:1 with positives)**:
   - InSAR-based: high-deformation areas are excluded from the non-landslide pool; InSAR filters stable samples but does not define landslides.
   - IVM-based: a preliminary IVM susceptibility map is produced, and stable samples are taken only from very-low to moderate classes. (p.7, Fig.5)
5. **Susceptibility models**: DT, RF and GBDT in scikit-learn. Data were normalized and split 7:3 (17,716 training vs 7,640 testing samples), with Grid Search tuning. Each model was trained under both sampling strategies, giving six models. Metrics: ROC/AUC, accuracy, precision, recall and F1. (p.7–8, Fig.7)
6. **PLA delineation**: Jenks natural breaks discretize the outputs, and two fusion strategies are compared. (p.8–9)
   - Threshold intersection: decorrelated or low-quality pixels are masked, and a ±10 mm/yr stable LOS threshold is used. Active deformation combined with High/Very High susceptibility gives a PLA, followed by spatial clustering.
   - Contingency matrix: deformation classes V5 (−132 to −34), V4 (−34 to −16), V3 (−16 to −9), V2 (−9 to −3) mm/yr, with V1 as the remaining stable points; susceptibility classes S1–S5. Multi-geometry LOS rates are coupled directly with the susceptibility index.
   - Matrix values in Fig. 3 (rows S, columns V1→V5): S1: 1 1 1 2 3; S2: 1 2 2 3 4; S3: 1 2 3 4 5; S4: 2 3 4 4 5; S5: 3 4 5 5 5. (p.5 Fig.3)
7. **Post hoc kinematic diagnosis**: The vertical and E–W components of the identified PLAs are used to characterize deformation modes, such as subsidence-dominated bank collapse versus laterally dominated movement. (p.6, 9, 12)
8. **SHAP and validation**: SHAP summary, dependence and interaction plots are used for the RF-IVM model. Validation draws on field surveys, UAV, LiDAR, GNSS, rainfall and reservoir-level data. (p.13–19)

## 5. Innovations (author claims)

> Contributions claimed by the authors; no extra assessment is added.

- A negative-sample optimization strategy that reduces noise and improves predictive reliability in deformation-prone reservoir terrain. (p.3)
- A multi-geometry InSAR kinematic reconstruction framework that resolves 2D deformation patterns. (p.3)
- A state-based hazard delineation using a contingency matrix that identifies PLAs more effectively than threshold methods. (p.3)
- Unlike approaches that treat InSAR as an auxiliary weight or posterior adjustment, the framework couples static susceptibility (predisposition) with dynamic deformation (state indicator) through a “physically constrained contingency matrix”. (p.14)
- Susceptibility and deformation should be treated as complementary indicators of spatial predisposition and kinematic state, not as interchangeable outputs. (p.22)

## 6. Main results

### 6.1 Factor diagnosis

- Maximum VIF is 3.38, minimum TOL 0.30 and maximum Pearson r 0.78; Fig. 8 shows the 0.78 is between elevation and Dis_River. All 12 factors were retained, covering four domains. (p.8–9 Fig.8)

### 6.2 Susceptibility mapping (Table 2)

- IVM sampling outperformed InSAR sampling, especially for ensemble classifiers. The authors attribute higher false negatives under InSAR sampling to shadowing and layover. (p.11)
- RF-IVM captured 90.52% of the validated landslide area in the High and Very High classes, with a high-risk zone of 152.39 km². (p.11)
- GBDT’s high-risk area grew from about 61 to about 85 km² when IVM sampling was used. (p.11)

### 6.3 Model performance (Fig. 10c)

| Model | AUC | Accuracy | Precision | Recall | F1 |
|---|---|---|---|---|---|
| DT-InSAR | 0.780 | 0.749 | 0.783 | 0.689 | 0.733 |
| RF-InSAR | 0.814 | 0.703 | 0.784 | 0.561 | 0.654 |
| GBDT-InSAR | 0.813 | 0.570 | 0.872 | 0.163 | 0.274 |
| DT-IVM | 0.779 | 0.713 | 0.850 | 0.518 | 0.644 |
| RF-IVM | 0.866 | 0.755 | 0.858 | 0.612 | 0.714 |
| GBDT-IVM | 0.853 | 0.625 | 0.947 | 0.265 | 0.414 |

(p.10 Fig.10c; the figure labels models “DT-SAR” etc.)

- Moving from InSAR to IVM sampling: ΔAUC_RF = +0.052 and ΔAUC_GBDT = +0.040; DT is almost insensitive. (p.11)
- GBDT has high precision but very low recall, which the authors consider unsuitable for regional screening; RF is the most balanced. (p.11, 16)
- IVM filtering reduced false positives by 3.1% and false negatives by 2.5%. (p.16)

### 6.4 PLA delineation (Tables 3–4)

| Method | Identified, development set (/59) | Identified, independent set (/15) | PLA area km² | Overlap with mapped landslides km² | Overlap in independent set km² |
|---|---|---|---|---|---|
| Susceptibility | 59 | 15 | — | — | — |
| InSAR rate | 20 | 5 | — | — | — |
| Threshold | 33 | 11 | 7.91 | 1.76 | 0.63 |
| Contingency matrix | 52 | 15 | 76.39 | 7.29 | 4.68 |

(p.11 Tables 3–4)

- Threshold method: recall 59.40% (44/74) and spatial overlap 15.44%. Matrix: recall 90.50% (67/74) and overlap 63.95%, so the overlap area grows more than fourfold. The delineations match the boundaries of the Huangping and Wulipo landslides. (p.11, Fig.11)
- Three coupling scenarios:
  - I: high susceptibility with low deformation (possibly intermittent or geometrically masked) is classed as PLA.
  - II: low susceptibility with high deformation (construction, −39 mm/yr) is rejected.
  - III: high susceptibility with high deformation (toe erosion, −40 mm/yr) receives the highest level. (p.11)

### 6.5 2D kinematics

- VU reaches −93 mm/yr and VE ranges from −55 to +102 mm/yr. Fig. 13 legends: ascending LOS −132 to 41 and descending LOS −80 to 31 mm/yr. (p.12, 14 Fig.13)
- Points 12 (excavation) and 17 (road construction) exceed −40 mm/yr LOS but are classed low hazard because they lack geological predisposition. (p.13, Fig.14)
- Point 21 is dominated by vertical subsidence (max VU −55.14 mm/yr), consistent with a bank-collapse or subsidence-dominated mode, possibly linked to fluvial toe erosion. (p.13)
- Wulipo (Point 24) has VE −51.85 and VU −38.86 mm/yr, a rotational–translational pattern directed NW toward the river; Point 28 also shows multidirectional motion. (p.13)
- Deformation hotspots concentrate near an elevation band around 835 m, adjacent to the fluctuation zone, which the authors link to hydro-mechanical forcing. (p.13)
- Field and UAV validation (p.13–14, Fig.16):
  - Xiaomidi (Point 1): max LOS −131 mm/yr.
  - Wanliang Tunnel (Point 19): −40 mm/yr, with tensile cracks up to 18 cm.
  - Wangjiashan (Point 23): −53 mm/yr, with protection nets and monitoring instruments.
  - Wulipo (Point 24): max LOS −60 mm/yr.

### 6.6 SHAP (Figs. 17–18)

- Mean |SHAP| ranking: Dis_River 0.1235 > Slope 0.1071 > Lithology 0.086 > Aspect 0.077 > Dis_Fault 0.0709 > Elevation 0.0592 > Rainfall 0.0494 > NDVI 0.0376 > Plan_c 0.0072 > TWI 0.007 > Profile_c 0.0058 > Den_Road 0.0039. (p.18 Fig.17b)
- RF intrinsic importance: Slope 0.181 > Dis_River 0.171 > Dis_Fault 0.123 > Lithology 0.115 > Aspect 0.111 > Elevation 0.094 > Rainfall 0.091 > NDVI 0.052 > TWI 0.018 > Profile_c 0.017 = Plan_c 0.017 > Den_Road 0.009. The authors note that RF ranks slope first while SHAP ranks Dis_River first. (p.14, 18 Fig.17b)
- High SHAP values for river proximity below 500 m act as a proxy for the fluctuation belt, through toe erosion and transient gradients during rapid drawdown. (p.14)
- Dis_Fault shows a negative SHAP trend (interpreted as tectonic damage zones), and low NDVI is positively associated with failure. (p.14–15)
- Interactions: risk is amplified at low elevation (< 800 m) near the river, and soft rocks near faults show high SHAP values. (p.15)
- Profile_c and TWI contribute weakly, which the authors attribute to the dominant reservoir boundary condition. (p.15)
- From a digital-twin perspective, the authors suggest using the 500 m river-distance threshold to guide piezometer and GNSS deployment. (p.15)

## 7. Limitations and problems

### 7.1 Acknowledged by the authors

- Optimized (IVM and InSAR) sampling introduces a spatial prior toward clearly stable settings. This may under-represent non-landslide variability and cause boundary overfitting. Hybrid strategies (optimized plus random background samples) were not compared. (p.7, 17)
- InSAR-constrained sampling suffers higher false negatives from shadowing and layover. (p.11)
- SHAP gives a static snapshot at a fixed mapping stage. A state-dependent interpretation would need temporally segmented data (e.g., impoundment vs drawdown) and recalibrated models. (p.14, 22)
- The 30 m grid and strong spatial clustering may blur boundaries or omit micro-landslides below the detection limit; Fig. 21 shows a missed detection and a partial coverage. (p.20–21 Fig.21)
- C-band decorrelation in densely vegetated gullies, insensitivity to strictly N–S motion and slow creep below the detection threshold. L-band missions (e.g., NISAR) are suggested. (p.22)
- Applicability to other slope hazards or reservoirs “remains to be tested”. (p.21)
- Parameter robustness is supported only by a “qualitative comparison”. (p.18, 21)
- GBDT’s low recall makes it less suitable for regional screening. (p.11)

### 7.2 Issues verifiable in the text

> Each item can be checked on the cited page; facts only, no speculation.

- **Matrix rule vs text**: Section 5.3 says the highest level is assigned “only where very high susceptibility coincides with high deformation” (p.21). In Fig. 3, however, S3–V5, S4–V5, S5–V3 and S5–V4 are also assigned 5. (p.5 Fig.3)
- **PLA cut-off not stated**: The text does not say which matrix levels count as PLA. S5–V1 is 3 in Fig. 3, and Scenario I (high susceptibility, low deformation) is classed as PLA. (p.5, 11)
- **How the two LOS rates form one V class is not described**: Section 3.5 only says that multi-geometry LOS rates are coupled directly. V1–V5 give only negative intervals, and the handling of positive LOS values (up to +41 ascending and +31 descending in Fig. 13) is not stated. (p.9, 14)
- **Orbits not reported separately**: The 103 images and 310 pairs are not split by orbit, and a single incidence angle (39.17°) is given. Track numbers (26, 62) appear only in Fig. 1. (p.2, 6)
- **Fig. 13 caption vs panels**: The caption reads “(c) horizontal and (d) vertical”, while the panel titles are “(c) Vertical decomposition” and “(d) Horizontal decomposition”. (p.14)
- **Fig. 18 caption vs panels**: The caption lists (e–h) as interactions of elevation with distance to river, slope, rainfall and NDVI. The figure has panels (e)–(i), with (f) being Dis_Fault and Lithology, and the text cites “Fig. 18e–i”. (p.15, 18)
- **Factor names**: Figs. 2 and 17 use Plan_c and Profile_c. Fig. 8 (collinearity) uses SOA and SOS and has no Plan_c or Profile_c, and the SHAP thumbnail in Fig. 3 also shows SOS and SOA. SOA and SOS are not defined in the text. (p.4, 5, 8, 18)
- **“Secondary importance” vs figure**: The text calls Lithology and Dis_Fault secondary (p.14). Fig. 17b ranks Slope 2nd, Lithology 3rd, Aspect 4th (0.077) and Dis_Fault 5th (0.0709). (p.18)
- **Roads**: Section 4.1 notes proximity between high-risk zones and roads (p.10–11). Den_Road has the lowest mean |SHAP| (0.0039) and RF importance (0.009) of all 12 factors (p.18). The text does not discuss this.
- **Recall decimals**: 44/74 = 59.46% (reported 59.40%) and 67/74 = 90.54% (reported 90.50%) (computed from the paper’s numbers). (p.11)
- **Denominator of overlap percentages not stated**: 15.44% and 63.95% equal 1.76/11.4 and 7.29/11.4, where 11.4 km² is the modelling-set area (computed from the paper’s numbers). The text, however, describes the benchmark as the development plus independent sets, and the independent-set area is not reported. (p.3, 11)
- **Table 3 “Landslide susceptibility” row**: The values 59 and 15 equal the two inventory totals; the row is not explained. (p.11)
- **PLA area vs overlap**: The matrix PLA area is 76.39 km² against 7.91 km² for the threshold method, about 9.7 times larger (computed from the paper’s numbers). The comparison relies on the fourfold overlap gain and detection counts, and no area-based false-alarm metric is reported. (p.11 Table 4)
- **“Significantly outperformed” without a test**: Section 4.1 uses this wording, but no statistical significance test is reported. (p.11)
- **F1 comparison**: The text calls RF’s F1 (0.714) the highest under IVM (p.11). Across all six models, DT-InSAR’s F1 (0.733) is numerically higher. (p.10 Fig.10c)
- **Fig. 10 axes**: The ROC y-axis is labelled “Specificity” and the x-axis “1-Specificity”. Fig. 10c also names the models “DT-SAR” etc. rather than “DT-InSAR”. (p.10)
- **Inventory source wording**: The text says “historical archives and field surveys”, while Table 1 says “Historical Archives and Remote Sensing Interpretation”. (p.3)
- **Observation period vs impoundment**: The Sentinel-1 series starts on 2020-01-09, before impoundment in April 2021. Rates are not separated into pre- and post-impoundment periods. (p.3)
- **Reservoir level labels**: The text gives 765–825 m (p.3) and “approx. 825 m” (p.15). Figs. 1, 11 and 13 label 812 m without stating a date. (p.2, 12, 14)

## 8. Data and code availability (as stated)

- Sentinel-1 data are from ASF and the Copernicus DEM from the Copernicus Data Space Ecosystem. Geological, hydrological, road and meteorological data are from the providers listed in Table 1. (p.22)
- The landslide inventory and field data are available from the corresponding author on reasonable request, subject to data-sharing restrictions. (p.22)
- Supplementary data are online (doi:10.1016/j.rse.2026.115442). (p.22)
- No code availability statement is given.
