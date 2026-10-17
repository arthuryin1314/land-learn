# Drought-Induced Land Subsidence in the Mekong Delta, Vietnam: Insights From SAR Interferometry

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Nils Dörr (corresponding), Long Vu Huu, Andreas Schenk, Stefan Hinz |
| Affiliations | Institute of Photogrammetry and Remote Sensing, Karlsruhe Institute of Technology (KIT); Vietnam National Space Center (VNSC), VAST (p.1) |
| Journal | Geophysical Research Letters (AGU/Wiley), Vol. 52, e2025GL117096, 2025; Research Letter (p.1); the download stamp shows issue 18 (p.2) |
| DOI | 10.1029/2025GL117096 |
| Dates | Received 2025-05-21; accepted 2025-09-13 (p.1) |
| Open access | CC BY licence (p.1) |
| Key Points | Severe 2020 drought caused up to 7 cm subsidence within months; permanent surface drop up to 3.5 cm, argued to be inelastic; magnitude spatially correlated with surface water management zones and land use (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: Using Sentinel-1 InSAR subsidence time series, the study finds that the severe 2020 drought caused up to 7 cm of subsidence within months, compensated by uplift in the following rainy season in some but not all regions; the magnitude correlates with surface water management zones and land use, largest in rain-fed rice areas; an uncompensated drop of up to 3.5 cm in two regions is argued to be inelastic. (p.1)

## 2. Study area

- The Vietnamese Mekong Delta; the study area lies south-west of the Hau River (opaque area in Fig. 1a). (p.2)
- Built from Miocene–Holocene marine and alluvial deposits forming seven confined aquifers and aquitards; average elevation about 0.8 m; affected by subsidence for more than 15 years at rates up to 7 cm/yr. (p.1–2)
- Tropical monsoon climate with a rainy season May–October; drought frequency has increased over 30 years, the most extreme in 2016 and 2020. (p.2)
- Land use is mainly rice, aquaculture and shrimp–rice rotation; following Wehrheim et al. (2023), three surface water management zones (SWMZs) are distinguished: I, freshwater connected to the Mekong and protected by sluice gates; II, managed rain-fed freshwater zones of the Lower and Upper U Minh forests (rice, cash crops); III, brackish/saline zones (aquaculture, shrimp–rice), disconnected from SWMZ I in dry seasons. (p.2–3)

## 3. Data

| Data | Details | Page |
|---|---|---|
| InSAR subsidence time series | Sentinel-1 (persistent scatterer) results described in Dörr et al. (2024a) and published in (2024b); descending stack, April 2017–April 2022 | p.3 |
| Keetch–Byram Drought Index (KBDI) | From Google Earth Engine; based on daily maximum temperature and cumulative rainfall; 0–800 = increasing moisture deficiency | p.3 |
| Precipitation | ERA-5 Land via Google Earth Engine; accumulated between InSAR acquisitions and divided by the interval to obtain a daily rate | p.3 |
| Land use and SWMZs | Land-use classification from Berchoux et al. (2023); SWMZs adapted from Wehrheim et al. (2023) | p.2 |

## 4. Methods

1. **Grid aggregation**: Median time series of measurement points within 1×1 km cells removes isolated movements and resamples to a regular grid. (p.3)
2. **Low-pass filtering**: Butterworth filter with a 2/yr cutoff removes spatially correlated high-frequency signals while retaining seasonal motion. (p.3)
3. **Background trend removal**: A piecewise linear model is estimated by iterative change-point detection; steps between segments are treated as seasonal signal, and the remaining adapted piecewise linear model is removed as the background trend. (p.3)
4. **Seasonal displacement prediction**: Linear regression with KBDI and/or precipitation rate predicts the instantaneous seasonal displacement rate, then integrated; strong multicollinearity led to separate regressions; precipitation consistently outperformed KBDI, so only precipitation results are shown; negative smoothed values set to 0; parameters estimated from the pre-2020 (undisturbed) period. (p.3–4)
5. **Segment evaluation**: Four segments predicted: before (Nov 2017–Nov 2019), during (May 2019–May 2021), after (May 2020–Apr 2022) and the whole series; evaluated with R² and against drops detected by the piecewise model. (p.4, 6–7)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- The authors state they reveal a “so far unknown driver” of subsidence in the delta—severe drought—adding to the long-term background trend. (p.1)
- Identifies and analyses the rapid 2020 drought subsidence event delta-wide and links its magnitude to surface water management zones and land use. (p.1–2)
- Uses precipitation-based seasonal prediction to test whether the hydrogeological system deviated from its normal state during the drought. (p.8)

## 6. Main results

### Drought index and seasonal subsidence

- Peak KBDI rose in the two preceding dry seasons; during the drought KBDI reached up to 780, e.g., in SWMZ II and the Hau estuaries; the 2020 rainy-season precipitation exceeded previous years and ended the drought. (p.4–5)
- Southern SWMZ II reached up to 70 mm of seasonal subsidence, with the affected boundary aligning precisely with the zone boundary; northern SWMZ II and the Hau estuary reached up to 36 and 40 mm. (p.5)
- Around northern SWMZ II (highest rainfall) the following uplift matched the subsidence; in southern SWMZ II and around the Hau estuary most pixels were not compensated. (p.5)
- Median seasonal subsidence: SWMZ II 23 mm, SWMZ I 7 mm, SWMZ III 8 mm; double rice in SWMZ II had 50%/95% percentiles of 26/47 mm; all SWMZ I classes <10 mm; double rice, fruits and shrimp–rice in SWMZ III slightly >10 mm. (p.5)

### Uncompensated surface drop

- Drought subsidence in SWMZs I and III was compensated on average; SWMZ II had a median rebound deficit of 10 mm (double rice 16 mm, forest 8 mm). (p.5)
- Ground drops detected by the piecewise model: up to 35 mm in SWMZ II and 27 mm in the Hau estuaries; median 17.5 mm in southern SWMZ II. (p.5, 8)
- Precipitation in the two post-drought rainy seasons exceeded the two pre-drought years, yet no uplift trend appeared; the authors therefore consider a permanently lowered water table unlikely and favour inelastic subsidence (aquifer–aquitard system or shallow soil moisture loss). (p.8)

### Prediction performance

- R² in the first segment varies widely (5%/95% percentiles 0.08/0.83); it decreases from first to last segment at most locations; southern SWMZ II is an exception, dropping in segment two and rising above 0.8 in the last. (p.6)
- The regression could not predict the full drop at most locations: mean predicted vs unpredicted drop in southern SWMZ II was 5.4 vs 18.1 mm; drops in strongly affected Hau-estuary cells could not be predicted either. (p.7)
- Two possible causes given by the authors: substantially increased groundwater extraction during the drought; exceptional drying and shrinkage of clayey surface soils; remote sensing cannot determine their contributions. (p.7–8)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- Measurement points lie mainly on man-made structures with different foundation depths, so they reflect varying shares of total subsidence and may include loading-induced subsidence. (p.7)
- 1×1 km aggregation may make cells reflect subsidence over different depth ranges; the authors assume shallow foundations in rural areas such as SWMZ II. (p.7)
- The remote-sensing approach cannot clarify how background and seasonal mechanisms are coupled, i.e., how much of the seasonal variation is elastic vs inelastic. (p.7)
- Cannot determine how much each mechanism (increased extraction, soil shrinkage) contributed to drought subsidence. (p.8)
- The precipitation-based prediction cannot decipher mechanisms; overall performance was inadequate in other regions with seasonal displacement. (p.8)
- The authors call for hydrogeological models with extraction rates, pressure heads, water-table depth and soil moisture, plus longer series spanning years with and without severe drought and depth-dependent monitoring stations. (p.8)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- “Inelastic deformation caused the permanent drop” is phrased as “we argue” in the abstract and key points; the evidence given is the absence of uplift despite higher rainfall (p.8), without measured groundwater levels or extraction data. (p.1, 8)
- The data comprise only InSAR, KBDI, precipitation, land use and SWMZs; no groundwater level, extraction or soil-moisture observations are used. (p.2–3)
- The background names 2016 and 2020 as the most extreme droughts, but the InSAR series starts in April 2017 and covers only the 2020 event. (p.2, 3)
- SWMZs are “roughly” distinguished; water management in SWMZ III “probably” depends on season and land use, and the authors “assume” pure-rice areas are closed off by sluice gates in dry seasons. (p.2–3)
- Precipitation source naming is not fully consistent: the methods say “ERA-5 Land archive”, the data statement links GEE “ECMWF_ERA5_DAILY”, and the reference is “ERA5-land post-processed daily-statistics”. (p.3, 8–9)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| “Research question” was a generic template | Rewritten from the paper: drought impact on subsidence and its relation to SWMZs/land use. |
| The English notes were mostly in Chinese | Fully rewritten in English. |
| “Linear regression with precipitation or KBDI” | Clarified: multicollinearity, separate regressions; precipitation consistently better, only precipitation shown. |
| Limit “short 2017–2022 window cannot separate drought from multi-year extraction” | The second half is not in the paper; replaced with the authors’ own statements (longer series needed; contributions undeterminable). |
| Quartile: “GRL is usually a high-impact geoscience journal” | Outside judgement; removed. |
| Eight questions and “my assessment” | Not from the paper; removed. |
| HTML language toggle did not work; metric cards had no labels | HTML rebuilt with a working bilingual toggle and labelled, page-cited metrics. |

**Data/code availability (as stated)**: InSAR data are public at the KIT repository (radar.kit.edu); KBDI and ERA-5 precipitation are available via Google Earth Engine. (p.8)
