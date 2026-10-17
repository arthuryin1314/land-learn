# Differential land deformation patterns and response mechanism to groundwater recovery in the Beijing-Tianjin-Hebei Plain revealed by reconstructing and clustering of TS-InSAR observations

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Dexin Meng, Beibei Chen (corresponding), Shubo Zhang, Huili Gong, Chaofan Zhou, Sidi Chen, Kunchao Lei, Haigang Wang |
| Affiliations | Capital Normal University (College of Resource Environment and Tourism; MOE Key Laboratory of Land Subsidence Mechanism and Prevention); Beijing Institute of Geo-Environment Monitoring; China Institute of Geo-Environment Monitoring (p.1) |
| Journal | International Journal of Applied Earth Observation and Geoinformation (Elsevier), Vol. 147, Article 105196, 2026 (p.1) |
| DOI | 10.1016/j.jag.2026.105196 |
| Dates | Received 2025-12-15; revised 2026-02-07; accepted 2026-02-18; online 2026-02-21 (p.1) |
| Open access | CC BY-NC licence (p.1) |
| Keywords | TS-InSAR; K-means; Differential deformation patterns; Groundwater recovery; Beijing-Tianjin-Hebei (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: After mosaicking 2016–2024 TS-InSAR deformation from three Sentinel-1A paths, the study reconstructs seasonal and long-term components, classifies the BTH Plain into four deformation patterns with a long-term-feature-constrained K-means, and combines groundwater levels to separate annual lag from long-term delayed compaction. (p.1)

## 2. Study area

- The Beijing-Tianjin-Hebei (BTH) Plain, the main part of the North China Plain, bordered by the Yanshan and Taihang Mountains and the Bohai Sea; it covers the plain areas of Beijing, Tianjin and Hebei, about 87,836.67 km². (p.2)
- Geomorphically divided from mountain front to coast into piedmont plain (PP), central plain (CP) and eastern plain (EP); the Quaternary porous aquifer system is more than 100 m thick. (p.2)
- Single-layer sandy aquifers dominate the PP; multi-layer sand–clay structures occur at the bottom of each sub-plain; from PP to EP the aquifer thins, grain size decreases and permeability worsens. (p.2)
- Mean annual precipitation is about 550 mm, with over 75% in the flood season and marked interannual variability. (p.2)
- Context: the SNWDP Middle Route started in 2014 and had delivered more than 70 billion m³ by February 2025; groundwater levels in Beijing and Tianjin have recovered notably since 2016, while over-exploitation in parts of Hebei driven by irrigation has not been fully reversed. (p.1–2)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1A SAR (ascending) | Path 40: 2016-01-07–2024-12-02, 154 images, mean incidence 33.7700°; path 142: 2016-01-14–2024-12-21, 147 images, 33.7779°; path 69: 2016-01-09–2024-12-16, 122 images, 33.7318° | p.3 表1 |
| Groundwater level (GWL) | China Groundwater Statistics Yearbook (China Institute of Geo-environmental Monitoring), monthly 2018–2024; split by depth into shallow confined (120–210 m) and deep confined wells (250–310 m); locations in Supplement S1 | p.2 |
| Precipitation | ERA5-Land hourly precipitation, 0.1°×0.1° (~9 km), aggregated to monthly totals to match the 2018–2024 GWL record | p.2 |
| DEM | 30 m SRTMv3 for topographic phase removal | p.4 |
| Leveling | Leveling from 2017–2018, 2021–2022 and 2022–2023, used to validate path 142 and the corrected path 69 | p.6 |
| Water Resources Bulletins | Groundwater-supply proportions from the Beijing, Tianjin and Hebei Water Resources Bulletins, 2008–2024 | p.12 |
| Other | Historical confined groundwater funnels (Guo et al., 2021); hydrogeological profiles (Supplement S4); fault distribution (Fig. 15) | p.6, 14 |

## 4. Methods

1. **IPTA time-series InSAR**: Paths concatenated along azimuth; enhanced spectral diversity co-registration (<0.001 pixel); azimuth de-ramping; three-adjacent-scene network; 10×2 multi-looking; SRTM topographic removal; iterative adaptive filtering (64/32/16 px); minimum cost flow unwrapping; pixels with mean coherence >0.6, std <0.3, intensity ≥0.01; SVD time-series inversion; iterative removal of atmosphere and residual topography. (p.4)
2. **Inter-path correction and mosaicking**: Horizontal motion assumed negligible, d_ver = d_los/cosθ; leveling-validated path 142 as reference; homonymous pixels matched within 0.5 pixel in overlaps; double-layer Delaunay triangulation to test gradient consistency; the median vertical difference used as datum offset and applied month by month to paths 40 and 69. (p.4)
3. **Seasonal and long-term reconstruction**: Seasonal term uses only the annual harmonic Def(t)=A·cos(2πt)+B·sin(2πt), amplitude A_def=√(A²+B²); long-term term is a least-squares quadratic at²+bt+c, with derived turning time t_vertex=−b/(2a) and terminal slope slope_end. (p.5)
4. **Characteristic-constrained K-means**: Each point represented by (a, b, t_vertex, slope_end), z-score normalised, Euclidean distance, random initial centroids iterated to convergence; elbow method gives K=4; compared with clustering the raw time series (Supplement S3). (p.5–6, 8)
5. **Uncertainty assessment**: RMSE and NRMSE (normalised by cumulative deformation) assess reconstruction error. (p.11)
6. **Lag analysis: STFT**: Short-time Fourier transform (cross-power spectra, 95% confidence) of detrended deformation and GWL at representative wells; phase difference gives annual lag. (p.12–13)
7. **Long-term delayed compaction: exponential decay**: A time-dependent exponential decay model (Eq. 11) is fitted to the long-term trends of clusters 3 and 4; the decay coefficient K is compared spatially and with fault locations. (p.14)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- Corrects and mosaics three-path TS-InSAR into a continuous deformation field over the whole BTH Plain, whereas existing studies mostly focus on single cities or local areas (as the authors note). (p.2)
- Proposes a long-term-characteristic-constrained K-means that clusters physically interpretable quadratic parameters instead of high-dimensional raw time series, to reduce short-term noise and improve interpretability. (p.2, 5–6)
- Distinguishes, in one framework, the annual lag (STFT) and the long-term delayed response (exponential decay) of deformation to GWL change. (p.1, 15)
- The authors state that they establish an integrated framework combining TS-InSAR reconstruction, pattern recognition and groundwater–deformation response analysis. (p.15)

## 6. Main results

### Deformation rates and validation

- Against leveling, most path-142 errors fall within ±10 mm; after datum correction, path 69 agrees much better with leveling; monthly RMSE between adjacent paths decreases after correction (Supplement S5). (p.6)
- Two periods split at 2018 (2016–2018, 2018–2024): significant subsidence (≥40 mm/yr) is mainly in the central and eastern plains and coincides with historical confined-water funnels. (p.6)
- The 0.1%–99.9% range of deformation rate narrows from −112.1–28.0 mm/yr (2016–2018) to −98.4–26.5 mm/yr (2018–2024). (p.6)

### Seasonal deformation

- Annual amplitude A_def is 0–15 mm; generally <5 mm in the piedmont, markedly larger in the central and eastern plains and major funnels. (p.7)
- Seasonal GWL amplitudes in deep confined wells generally exceed those in shallow wells, especially around the Xingtai and Hengshui funnels. (p.8)

### Four long-term deformation patterns

- Elbow method gives K=4. Cluster-1 (24.91%): small a, near-zero or weakly negative b, mostly positive slope_end; stable to slightly uplifting; mainly in the western and northern piedmont. (p.8)
- Cluster-2 (46.09%): small magnitudes, slope_end centred near zero, moderate t_vertex, generally stabilising by the end (the paper names no specific locations for it). (p.8)
- Cluster-3 (18.86%) and cluster-4 (10.14%) are the most severely subsiding areas, in and around major funnels; cluster-4 has entirely negative slope_end; cluster-3 ranges from weakly negative to positive and lies in Beijing, western Tianjin, eastern Hengshui and northern Handan. (p.8)
- Compared with clustering raw time series, the constrained clustering is spatially more continuous; raw-series clustering often places several clusters within major funnels (Supplement S3). (p.8–9)
- Cluster-4 matches GWL decline cones at different depths: Baoding–Hengshui and Handan mainly shallow confined; Langfang and Xingtai mainly deep confined; coastal Tangshan both. (p.9)
- Representative wells (11 in Fig. 11): cluster-1 wells A and B generally r >0.65; cluster-2 well C and cluster-3 wells D, E slow down after 2023, partly rebounding; cluster-4 wells F, G, H show low correlation with GWL; well K shows strong positive correlation between continuous subsidence and declining GWL. (p.9)

### Reconstruction uncertainty and water-use structure

- RMSE is small in the piedmont and large in central–eastern funnels; NRMSE in typical cluster-3/4 funnels is all below 6%; clusters 1/2 include piedmont and coastal parts with a higher noise share. (p.11)
- Cluster-3 is split for interpretation by whether slope_end exceeds its upper quartile: 3a (subsidence to rebound) and 3b (subsidence stopping); this does not change the clustering. 3a is mainly in Tianjin (also Cangzhou, Hengshui); Beijing’s subsiding area is mainly 3b. (p.12)
- Groundwater-supply proportions in Beijing and Tianjin have declined since 2008, Tianjin being lowest; cluster-4 cities (Baoding, Xingtai, Handan, Tangshan) still had relatively high proportions around 2020. (p.12)

### Periodic and lagged response

- STFT shows dominant deformation–GWL resonance periods of 12–36 months (95% confidence), interpreted by the authors as a cumulative rather than instantaneous elastic response. (p.13)
- In anomalously wet years such as 2021 and 2023, STFT energy intensifies and several wells show GWL recovery with short-term rebound. (p.13)
- Annual lag is <2 months at cluster-1 wells A and B (0.35 months at well A) and 4–6 months at wells E, F, G, H in clusters 3/4. (p.13)

### Long-term delayed compaction and faults

- K of cluster-4 (Baoding–Xingtai) is generally lower than cluster-3 (Hengshui); profiles in Supplement S4 show thicker, more continuous clay for the former and thinner clay interbedded with silt aquifers for the latter. (p.14)
- Low K (<0.002) is not concentrated at funnel centres: in the Langfang, Xingtai and coastal Tangshan funnels it concentrates at fault-bearing edges; along Xingtai profile B–B′, both subsidence rate and K decrease from centre to edge. (p.14)
- In the Baoding–Shijiazhuang funnel without fault control (profile A–A′), low K concentrates at the centre and increases toward the edges. (p.14)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- Horizontal deformation in the BTH Plain is assumed small and negligible, so LOS is converted directly to vertical. (p.4)
- The seasonal model considers only the annual component. (p.5)
- Reconstruction uncertainty mainly stems from measurement noise and short-term variability (extreme hydrological events, abrupt pumping); these signals remain in the residuals and fall outside the seasonal model. (p.11)
- Parts of clusters 1 and 2 in piedmont and coastal areas have small deformation and a higher share of noise. (p.11)
- Continuous, regionally consistent GWL observations are only available for 2018–2024, which is why the authors split the periods at 2018. (p.6)
- The authors use “may be related to / likely influence”, marking the role of lithology and faults in decay behaviour as inference. (p.14)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- Data availability: “The authors do not have permission to share data.” (p.15)
- InSAR covers 2016–2024, whereas the GWL used for response analysis covers only 2018–2024. (p.2, 6)
- Leveling validation in the main text covers only path 142 and the corrected path 69; path 40 is assessed only via monthly RMSE against path 142 (Supplement S5). (p.6)
- Leveling validation is reported only qualitatively (“most errors within ±10 mm”, “significantly improved”); no RMSE or other figures are given in the main text. (p.6)
- Eq. (11) is printed as D(t)=M(1−e^{Kt}) (no minus sign in the exponent), while the text says K→0 means slow decay; that description matches e^{−Kt}, not the printed form. (p.14)
- The recovery pattern of fault-free funnels is worded inconsistently: “edge-to-center / edge to center” in the abstract (p.1) and conclusion (p.15) but “center to edge” in Section 5.4 (p.14). (p.1, 14, 15)
- Annual lag in elastic areas is “≤2 months” in the abstract but “<2 months” in the body and conclusion. (p.1, 13, 15)
- Strength of the fault claim varies: Section 5.4 says structures “likely influence” recovery, while the abstract and conclusion say recovery is “governed by / controlled by” structures; the evidence presented is the spatial correspondence between K and fault locations. (p.1, 14, 15)
- The number of clusters K=4 is chosen by the elbow method only. (p.6, 8)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| “Quartile: JCR Q1; SCImago 2025 Q1; CAS Tier 1” (from an external website) | Not stated in the PDF; outside information removed and noted. |
| Cluster-2 location given as “broad transition zone” | The paper does not locate cluster-2; the phrase is removed. |
| Eq. (11) written as M(1−e^{−Kt}) without comment | Now records the printed form e^{Kt} and notes the inconsistency in 7.2. |
| “My assessment”, the “eight questions”, and limits such as “no bootstrap / no GMM comparison / no error bounds” | These were reviewer opinions, not paper content; removed. Limits are now split into author-acknowledged and text-verifiable. |
| Positioning remarks such as “no full 3-D flow–consolidation model was built” | Note-writer inference; removed. |
| Internal inconsistencies not flagged (edge/centre wording, ≤2 vs <2 months, Eq. 11 sign) | Listed with page numbers in 7.2. |
| Evaluative “my assessment” text in the HTML | HTML rebuilt from the new notes with full bilingual parity. |

**Data/code availability (as stated)**: The authors do not have permission to share data; supplementary material is at the DOI page; GWL data come from the China Institute for Geo-Environmental Monitoring (geocloud.cgs.gov.cn). (p.15)
