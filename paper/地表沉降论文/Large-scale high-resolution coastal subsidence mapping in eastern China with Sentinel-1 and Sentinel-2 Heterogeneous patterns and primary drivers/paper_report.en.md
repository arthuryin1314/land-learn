# Large-scale high-resolution coastal subsidence mapping in eastern China with Sentinel-1 and Sentinel-2: Heterogeneous patterns and primary drivers

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Peng Li (corresponding), Jianbo Bai, Lin Shen, Wei Tang, Cunren Liang, Bin Zhao, Zhenhong Li, Houjie Wang |
| Affiliation (corresponding) | Institute of Estuarine and Coastal Zone, College of Marine Geosciences, Ocean University of China (p.1) |
| Journal | International Journal of Applied Earth Observation and Geoinformation (Elsevier), Vol. 146, Article 105047, 2026; special issue “ESL & Coastal Hazards” (p.1) |
| DOI | 10.1016/j.jag.2025.105047 |
| Dates | Received 2025-07-20; revised 2025-11-21; accepted 2025-12-16; online 2026-01-06 (p.1) |
| Open access | CC BY-NC-ND (p.1) |
| Keywords | Coastal subsidence; Eastern China; TS-InSAR; Multi-frame mosaicking; Sentinel-1; Sentinel-2; Spatiotemporal analysis (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: TS-InSAR with Sentinel-1 yields 90 m vertical deformation for the Shandong and Jiangsu coasts, with a multi-frame mosaicking method for land–sea transition areas; Sentinel-2, time series, groundwater levels and PCA are used to analyse four typical zones, concluding that anthropogenic factors dominate and each zone is controlled mainly by a single factor. (p.1)

## 2. Study area

- Coastal Shandong and Jiangsu, eastern China (Fig. 1); the coastal zone is a 100 km landward buffer from the OSM coastline. (p.2, 7)
- Shandong: lower Yellow River, central mountains (Mount Tai 1532.7 m), Yellow River Delta <10 m; mainland coastline 3,505 km (1/6 of China); >100 million residents and GDP >9 trillion yuan at end-2023. (p.2)
- Jiangsu: lower Yangtze and Huai rivers, 107,200 km², mostly plain; coastline ~954 km; coastal wetlands 3819 km² (~1/4 of national total); 2023 GDP >12 trillion yuan, 85.26 million residents. (p.2)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1 | 7 tracks, 16 frames, March 2017–December 2023; 2,486 SLCs (~10 TB); 12-day revisit; mainly Sentinel-1A ascending because Sentinel-1B ended on 23 Dec 2021 and S1A had almost no descending data | p.2 |
| GNSS | Raw data from 9 CMONOC continuous stations, 2010–2023, processed with GAMIT/GLOBK 10.7; rate uncertainty better than 1 mm/yr | p.2–3 |
| Groundwater level | China Geological Environment Monitoring Groundwater Level Yearbook; only 2018–2021 used due to systematic offsets in station information before/after 2018; 5-day interval (72/yr), with gaps | p.3 |
| Sentinel-2 | 10 m multispectral, at both ends of the InSAR period plus extra scenes for changing areas | p.3 |
| Land use and geology | 30 m Landsat annual land cover (Yang & Huang); USGS 1:5,000,000 surface geology | p.3 |
| DEM | 30 m NASADEM for topography removal, co-registration and geocoding | p.3–4 |

## 4. Methods

1. **ISCE + MintPy SBAS**: ISCE interferograms per scene then stitched; 20×6 looks; each acquisition paired with five preceding and five following (>900 per frame); SNAPHU; resampled from 84 m to 90 m; MintPy SBAS: coherence 0.7 with MST network, bridging and phase-closure unwrapping corrections, solid earth tide, GACOS, residual troposphere/ionosphere/orbit and DEM error; noisy acquisitions excluded before linear velocity fit. (p.3–4)
2. **Vertical conversion**: Only part of the area has both geometries; horizontal motion derived where available (Fig. S4) is small and consistent with earlier GNSS/InSAR studies, so ascending LOS is converted with dv=dLOS/cosθ. (p.6)
3. **Coastal multi-frame mosaicking**: Uncontrolled block adjustment: each row of B is an overlap (+1/−1); generalised weighted least squares with the Moore–Penrose pseudoinverse gives per-frame corrections; the observation is the mean of medians of the five most frequent histogram bins (mode-like); weights from inverse variance adjusted for valid area and deformation; overlaps averaged. (p.4–7)
4. **PCA**: Centring, covariance and eigen-decomposition of zone time series; variance explained ratio (VER) describes temporal modes; the authors note PCs do not map one-to-one onto drivers. (p.7)
5. **Driver analysis**: ±10 mm/yr treated as stable; four zones >20 mm/yr analysed with Sentinel-2 interpretation and field survey, land cover, time series and PCA; InSAR averaged within 300 m of wells compared with GWL linear trends. (p.7–8, 15)
6. **Accuracy assessment**: 9 GNSS stations vs nearest high-coherence pixel; ascending–descending cross-comparison with robust statistics (median, MAD, NMAD, LE90). (p.7)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- A novel multi-frame mosaicking method tailored for coastal land–sea transition areas, yielding spatially consistent InSAR observations. (p.1, 2)
- Claims to reveal, for the first time, several rapid funnels >50 mm/yr on the Shandong and Jiangsu coasts, and that no prior case covers both provinces. (p.1, 15)
- Integrates Sentinel-2, time series, groundwater levels and PCA to analyse heterogeneous funnels. (p.1)

## 6. Main results

### Regional pattern and accuracy

- Large-scale subsidence lies mainly in north-western Shandong and eastern Jiangsu on Quaternary deposits; mountains and hills are relatively stable. (p.7)
- NW Shandong: the text gives 47.4% of area with rates “less than 20 mm/year”, 7.4% “less than 50” and 0.9% “less than 100”; 83.1% of the Jiangsu coastal plain lies within [−20, 20] mm/yr and ~16.6% exceeds 20 mm/yr. (p.7)
- RMS 1.3 mm/yr against 9 GNSS stations; two stations had interruptions; severe decorrelation near JSNT caused unwrapping outliers. (p.7)
- Ascending (P69F119) vs descending (P76F468), 968,498 pixels: r=0.97, mean diff 1.0, STD 6.9, RMS 7.0, median 0.8, MAD 4.3, NMAD 6.3, LE90 9.8 mm/yr; other pairs STD 6.9, 3.86, 6.14 mm/yr. (p.7)
- Conclusion: 23,653 km² (15.6% of the study area) subsides >20 mm/yr; maximum 344 mm/yr in the Yellow River Delta. (p.16)

### Four typical zones

- Zone A (Dongying, Yellow River Delta): max 340 mm/yr; 72.9% of area >20 mm/yr; 370 km² >50 mm/yr (39.7% of subsiding area); worst near salt fields and fish ponds; Z1 near-linear ongoing (except Aug 2019–Mar 2020), Z2 stabilising after 2020; PC1 VER 94.7%/98.4%; attributed to brine extraction for salt and aquaculture. (p.8–9)
- Zone B (Laizhou Bay, Guangrao County): max 245 mm/yr, max cumulative 161.7 cm; 5031 km² (57.5%) >20 mm/yr; >1,600 brine wells in 2019 at ~100 m³/day each, 3.20×10⁷ m³/yr (cited); PC1 VER 99.0%/98.6%; attributed to shallow brine and deep groundwater extraction for irrigation, industry and households. (p.9)
- Zone C (Yantai, Longkou Port–Yulong Island): 19.7% >20 mm/yr; max 92 mm/yr, cumulative 52.3 cm; reclamation since ~2011 for a petrochemical base; attributed to reclamation and facility loading; similar patterns at Tongzhou Bay and Maojia Port (Nantong), Shawan Port (Yancheng) and Lianyungang Port. (p.9–10)
- Zone D (near the Wanggang River, Yancheng): max 138 mm/yr for 2017–2023; 73.3% >20 mm/yr; max cumulative 118.9 cm; marked subsidence from ~May 2022, changing again after March 2023; max annual rate 630 mm/yr for 2 Apr 2022–23 Dec 2023 with 77.2% >50 mm/yr; 13.0 km² changed (73.4%); PC1 VER 85.9%; attributed to groundwater extraction for greenhouse Pacific white shrimp farming. (p.9–10, 14)
- Weak scattered uplift on new estuarine land, silty salt marshes and tidal flats, explained by rapid sediment trapping by salt-marsh vegetation. (p.10)

### Groundwater and subsidence

- PC2 and PC3 have VER <1%, PC4 mainly noise; greenhouse-pond construction in Zone D causes simultaneous fluctuations in several PCs. (p.15)
- Linear trends of InSAR (300 m around wells) and GWL are “highly consistent”; GWL covers only part of the InSAR period. (p.15–16)
- Significant subsidence (>20 mm/yr) is attributed mainly to extraction of brine and groundwater, consistent with 55% of published cases worldwide. (p.15)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- GNSS comparison uses the nearest high-coherence pixel, sensitive to single-pixel noise and assuming both measure the same deformation; GNSS stations are usually in stable areas. (p.7)
- Severely decorrelated areas show discrete outliers from unwrapping errors (e.g., JSNT). (p.7)
- GWL covers only part of the InSAR period (2018–2021), with systematic offsets in station information before/after 2018 and gaps. (p.3, 16)
- The number of PCs does not correspond directly to the number of drivers, nor does each PC necessarily represent a specific cause. (p.7)
- Only part of the area has both geometries; the small-horizontal-motion judgement rests on those areas and earlier studies. (p.6)
- The authors state it is unclear whether ICA assumptions hold over large, heterogeneous coastal areas (why ICA was not used). (p.15)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- Period stated inconsistently: 2017–2024 in the abstract and conclusion vs March 2017–December 2023 in the data section and 2017–2023 in the results. (p.1, 2, 7, 16)
- Location stated inconsistently: “northeastern Shandong” in the abstract and conclusion vs “northwestern part of Shandong” in the results. (p.1, 7, 16)
- Maximum rate differs: 340 mm/yr for Zone A (p.8) vs 344 mm/yr in the conclusion (p.16). (p.8, 16)
- Section 5.2 is titled “Correlation between groundwater and subsidence” and the conclusion claims “strong correlations”, but only linear trend lines are compared and no coefficient is reported; the Fig. 12 caption mentions six wells but lists panels (a)–(e). (p.15–16)
- NW Shandong area shares are worded “less than 20/50/100 mm/year”, ambiguous in context as subsidence-severity statistics. (p.7)
- No PCA/VER is given for Zone C (Fig. 7 covers A, B, D only), yet the abstract says patterns are controlled by a single factor “in each region”; the single-factor claim rests on PC1 VER, while the authors also say PCs need not correspond to causes. (p.1, 7, 10)
- Driver attribution relies on visual interpretation, field survey, land use and cited literature (e.g., brine-well counts), not on direct extraction measurements. (p.8–10)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| Journal given as “Article 105xxx; check DOI” | The PDF states Vol. 146, 105047, DOI 10.1016/j.jag.2025.105047; quartile not in the PDF, speculation removed. |
| “NE Shandong” and “344 mm/yr” given without noting contradictions | Inconsistencies flagged in 7.2. |
| Limits on “90 m mixing small facilities” and “tides/water surface effects” | Not in the paper; replaced by the authors’ own limits. |
| Generic research question, eight questions, “my assessment” | Removed or rewritten from the paper. |
| Chinese in English notes; broken toggle | Fully rebuilt. |

**Data/code availability (as stated)**: Coastal subsidence results are on Zenodo (records/17661835). (p.16)
