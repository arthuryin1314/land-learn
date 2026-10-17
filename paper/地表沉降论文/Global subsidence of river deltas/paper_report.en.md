# Global subsidence of river deltas

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | L. O. Ohenhen (corresponding), M. Shirzaei, J. L. Davis, A. Tiwari, R. Nicholls, O. Dasho, N. Sadhasivam, K. Seeger, S. Werth, A. J. Chadwick, F. Onyike, J. Lucy, C. Atkins, S. Daramola, A. Ankamah, P. S. J. Minderhoud, J. Oelsmann, G. C. Yemele |
| Affiliation (first author) | Department of Earth System Science, University of California, Irvine (p.1) |
| Journal | Nature, Vol. 649, pp. 894–900, 22 January 2026; Article (p.1) |
| DOI | 10.1038/s41586-025-09928-6 |
| Dates | Received 2025-03-13; accepted 2025-11-18; published online 2026-01-14 (p.1) |
| Open access | Open access, CC BY 4.0 (p.1, 8) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: InSAR reveals spatially variable surface-elevation change across 40 global deltas; of three anthropogenic drivers, groundwater storage has the strongest relative influence in 10 deltas; for most deltas, contemporary subsidence surpasses absolute (geocentric) sea-level rise as the dominant driver of 21st-century relative sea-level rise. (p.1)

## 2. Study area

- 40 deltas across 5 continents and 29 countries (Fig. 1: North America 4, South America 3, Africa 9, Europe 7, Asia 17). (p.2, 9)
- Selection: from 955 delta outlines (Edmonds et al.), DeltaDTM v1.1 (3″/100 m) and WorldPop 2020 identify the 35 deltas with the greatest area and population below sea level, plus 5 less-exposed deltas of regional importance (Brahmani, Mahanadi, Godavari, Parana, Fraser). (p.9)
- Globally ~42,000 km² of delta area lies below sea level with 10.2 million people; the 35 selected deltas account for 38,000 km² and 10.1 million. Danube, Orinoco and Shatt-el-Arab met the criteria but were excluded for SAR coverage/coherence reasons. (p.9)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1 SAR | 132 frames (Sentinel-1A/B, C-band), stated in Methods as September 2016–May 2023; 3,300 single-geometry images for 13 deltas and 10,700 ascending+descending images for 27 deltas | p.9 |
| GNSS | GNSS for 17 deltas (Nevada Geodetic Laboratory and regional studies) to tie to IGS14; validation with 122 stations (23 deltas, long-term) and 81 stations (15 deltas, ≥70% overlap) | p.10 |
| Global VLM / GIA models | Global VLM model (Hammond et al.) for deltas without GNSS; GIA from the Caron et al. 128,000-simulation ensemble (mean and SD) | p.10 |
| Groundwater storage (GWS) | JPL GRACE/GRACE-FO mascon RL06.3 (3°, ~300–400 km); GLDAS Noah (1/4°) removes soil moisture/snow and WGHM v2.2d removes surface water; stochastic-seasonal (Kalman) trends; compared with well trends in 18 deltas | p.10–11 |
| Sediment flux change | Percentage change between pristine and disturbed fluxes from Nienhuis et al. | p.11 |
| Urban expansion | 1/8° (~12.5 km) urban land fraction, change 2000–2020 | p.12 |
| Sea level | PSMSL tide gauges, 20 stations in 15 deltas (20th century); CMEMS multi-mission altimetry 1/8° monthly (2001–present); IPCC AR6 SSP2-4.5 and SSP5-8.5 median rates for 2050/2100 (no VLM) | p.13–14 |
| Adaptive capacity and population | ND-GAIN readiness (threshold 0.52); WorldPop 100 m (2020); DeltaDTM | p.6, 9 |

## 4. Methods

1. **WabInSAR multitemporal InSAR**: Multi-look 32:6 (~75 m); max temporal/perpendicular baselines 300 days/80 m; ~59,000 interferograms (GAMMA), ~55,000 (93%) retained after coherence-stability screening; pixels with DS coherence <0.7 or PS amplitude dispersion >0.35 removed; minimum cost flow unwrapping; wavelet filters for orbital, topography-correlated atmosphere and DEM errors; reweighted least squares for rates and SD. (p.9)
2. **Decomposition and reference frame**: For 27 deltas, ascending and descending LOS are jointly inverted for east–west and vertical; for 13 single-geometry deltas vertical motion is assumed and LOS/cosθ used; local rates tied to IGS14 via GNSS or a global VLM model with error propagation. (p.9–10)
3. **GIA correction**: The GIA ensemble mean is removed to isolate contemporary non-GIA VLM for driver analysis. (p.10)
4. **Driver regression**: First multilinear regression with interactions (MLR), then random forest (grid search with five-fold CV; Monte Carlo hold-outs 0.1–0.5 × 100 iterations); impurity-based feature importance. (p.4, 12)
5. **Local interpretability (LIME)**: Local linear surrogate per delta; deltas with LIME fidelity R²<0.5 excluded; normalised scores (nLIME) plotted on a ternary diagram. (p.5, 13)
6. **Subsidence vs sea level and adaptive capacity**: Compares subsidence with regional geocentric SLR and AR6 2050/2100 projections (maximum = median of the 50 highest rates); four quadrants by RSLR (4 mm/yr) and ND-GAIN (0.52), compared between the 20th and 21st centuries. (p.5–7)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- The authors present high-resolution (75 m), delta-wide subsidence observations for 40 deltas, addressing the lack of observations outside urban centres. (p.1)
- Quantifies the relative influence of three anthropogenic drivers (groundwater storage, sediment flux, urban expansion) with RF + LIME. (p.4–5)
- Directly compares contemporary subsidence with current and AR6-projected sea-level rise and builds an RSLR–adaptive-capacity impact matrix with ND-GAIN. (p.5–7)
- The authors argue that tying to a global frame (IGS14) should be standard practice in coastal InSAR. (p.10)

## 6. Main results

### Prevalence of subsidence

- Delta-average VLM indicates subsidence in all deltas; 12 average <2 mm/yr; more than half exceed 3 mm/yr; 13 exceed global SLR (~4 mm/yr), with Chao Phraya, Brantas and Yellow River more than twice that. (p.2)
- In 18/40 deltas mean subsidence exceeds regional geocentric SLR; in all but the Rio Grande at least 1% of the area subsides faster than both global and geocentric SLR. (p.2)
- At least 35% of area sinks in every delta; 38 (except Neva, Fraser) exceed 50%; 19 exceed 90%. >50% of area sinking faster than 5 mm/yr: Chao Phraya 94%, Nile 80%, Brahmani 77%, Po 74%, Mahanadi 69%, Brantas 66%, Vistula 57%, Yellow 53%, Mekong 51%. (p.2)
- Total subsiding delta area is 460,370 km², ~54–65% of a 710,000–855,000 km² global habitable delta area; South/East/Southeast Asia (17 deltas) 274,000 km², Africa 78,800, South America 39,800, North America 37,800, Europe 30,000 km²; seven large deltas contribute ~57% (265,000 km²). (p.2)
- Localised uplift of 0 to >5 mm/yr occurs; in Wouri, Zambezi, Indus, Ciliwung and Yellow River it correlates with horizontal motion. (p.3)

### Anthropogenic drivers

- MLR with interactions fits poorly (R²=0.2±0.1); RF gives R²=0.6±0.1, RMSE 1.9±0.1 mm/yr, MAE 1.4±0.2 mm/yr, underestimating rates >8 mm/yr. (p.4)
- RF importance: GWS 0.5±0.2 (text; Fig. 3a shows 0.5±0.3), sediment flux 0.3±0.2, urbanisation 0.3±0.1. (p.4)
- After excluding low-fidelity cases, 28 deltas remain (R²=0.7±0.1, RMSE 0.4±0.1, MAE 0.3 mm/yr); nLIME: GWS 0.6±0.3, sediment 0.3±0.1, urbanisation 0.1±0.1. (p.5)
- Of 28, 35% (Mekong, Ganges–Brahmaputra, Rhine–Meuse, Fraser, Cauvery, Irrawaddy, Red) fall in the GWS-dominated region (nLIME_GWS>0.7); Chao Phraya and Yellow plot near the centre; Saloum, Mississippi, Amazon and Rio Grande relate most to sediment flux; Nile, Po, Chikuma-gawa, Mahanadi, Kabani, Niger and Volta show mixed contributions. (p.5)
- GWS–subsidence linear R=0.5 (cubic R=0.6); sediment flux poorly correlated (R<0.4), with 25/40 (62%) showing reductions; urban expansion logarithmic fit R=0.38–0.51; inter-driver correlations R=0.1–0.3. (p.11–12)

### Comparison with sea-level rise

- The 18 deltas where subsidence exceeds geocentric SLR host ~236 million people, ~50% more than deltas where SLR dominates (156.9 million). (p.5)
- Below 1 m elevation, subsidence dominates RSLR in about two-thirds of deltas; of 76 million people below 1 m, 84% (63.7 million) live in rapidly sinking areas. (p.5)
- SSP2-4.5: through 2100 current maximum subsidence exceeds projected SLR in all 40 deltas; 95th-percentile subsidence exceeds 2050 projections in 29 deltas (1.1× Niger to 10.3× Yellow); with SLR reaching 0.9 cm/yr by 2100, 95th-percentile subsidence still dominates in 22 deltas (up to 7×). (p.5)
- SSP5-8.5: by 2050 maximum subsidence exceeds projections in all deltas and the 95th percentile in 23; by 2100 maximum in 38/40 and 95th percentile in 7 (Godavari, Chao Phraya, Mekong, Ciliwung, Brantas, Red, Yellow). (p.5)

### Adaptive capacity

- 26/40 (65%) deltas are “Unprepared Divers” (high RSLR, low readiness); Yellow, Vistula, Po, Rhine–Meuse, Mississippi are “Rising Ready”; Saloum and Neva “Latent Threats”; Rioni and Fraser “Safe Havens”. (p.6–7)
- Of 15 deltas with 20th-century tide-gauge data, 10 moved from low- to high-RSLR quadrants; Nile RSLR rose from 1 to >10 mm/yr; Chao Phraya remains at 12.3 mm/yr. (p.7)

### Accuracy and GIA

- Of 20.5 million pixels, 99% have SD <0.5 mm/yr; correlation with independent GNSS 0.7–0.8, RMSE 1.4 mm/yr (long-term) and 1.2 mm/yr (coincident). (p.10)
- GIA exceeds total VLM in the Neva (540%) and Fraser (455%); 25–55% in Rio Grande, Mississippi, Volta, Rhine, Ogooué; under 10% in 55% of deltas. (p.10)
- GRACE trends agree in sign with well trends in 18 deltas (88.9% accuracy), R=0.7. (p.11)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- GRACE GWS trends (~300–400 km resolution) may suffer signal leakage from adjacent basins, especially for small deltas. (p.5)
- The sediment-flux dataset gives pristine-vs-disturbed percentage change, not contemporary absolute rates, possibly masking recent trends; potential errors in global sediment-flux datasets are acknowledged. (p.5, 11)
- Other natural processes (compaction, tectonics) and anthropogenic drivers (hydrocarbon extraction, peat drainage) are not explicitly separated. (p.5)
- RF results depend on input distributions and sample composition; adding deltas may shift feature rankings; RF underestimates rates >8 mm/yr. (p.4, 5, 13)
- The 40 deltas, though covering much of global delta area and population, are not globally representative. (p.5)
- The vertical-only assumption for 13 single-geometry deltas is called “tenuous” for most coasts (local horizontal motion up to 10 mm/yr seen in the 27 dual-geometry deltas). (p.10)
- Tide-gauge representativeness varies with site conditions (bedrock vs sediment, GNSS correction); altimetry is optimised for open ocean, with added nearshore complexity. (p.13–14)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- Observation period is stated inconsistently: “between 2014 and 2023” (p.2), “September 2016 to May 2023” (p.9), and “InSAR observation period (2014–2023)” (p.10). (p.2, 9, 10)
- Number of deltas retained for LIME differs: 28 in the text and Fig. 3b (p.4–5) vs 30 in Methods (p.13). (p.4–5, 13)
- MLR performance differs: R²=0.2±0.1 in the text (p.4) vs R=0.38, R²=0.15, RMSE=4.7 mm/yr in Methods (p.12). (p.4, 12)
- Uncertainties differ between text and figure: RF GWS importance 0.5±0.2 (text) vs 0.5±0.3 (Fig. 3a); nLIME sediment 0.3±0.1 (text) vs 0.3±0.3 (Fig. 3b). (p.4–5)
- The abstract’s “strongest influence in 10 of the 40 deltas” corresponds in the text to 35% of the 28 retained deltas (nLIME_GWS>0.7); 12 deltas were excluded for low LIME fidelity. (p.1, 5)
- Driver analysis is a cross-delta statistical association (RF/LIME) using predictors at resolutions different from the delta scale (GRACE ~300–400 km, urban fraction ~12.5 km). (p.4, 11–12)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| “Research question” was a generic template | Rewritten from the paper. |
| Data: “81 GNSS stations (15 deltas)” | Completed: GNSS for 17 deltas for the frame; validation 122 stations (23 deltas) + 81 stations (15 deltas). |
| “Driver regression R² ~0.7, RMSE ~0.4 mm/yr” | Those values refer to the 28 LIME-retained deltas; overall RF is R² 0.6±0.1, RMSE 1.9±0.1 mm/yr. |
| “2014–2023 full archive” without noting the Methods period | Inconsistency listed in 7.2. |
| Quartile: “Nature is JCR/Scopus Q1” | Not in the PDF; removed. |
| Limits such as “net elevation change cannot be split into deposition/erosion/crustal motion” | Kept only what the authors state (natural processes not separated); other commentary, eight questions and “my assessment” removed. |
| English notes and bilingual HTML problems | Fully rebuilt. |

**Data/code availability (as stated)**: VLM data on Zenodo (10.5281/zenodo.15015923); GRACE, Sentinel-1, CMEMS and WorldPop are public; WabInSAR v5.6 at eoivt.com; RF code (MATLAB 2024b) on Zenodo. (p.14)
