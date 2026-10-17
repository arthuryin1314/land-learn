# Widespread Extent of Irrecoverable Aquifer Depletion Revealed by Country-Wide Analysis of Land Surface Subsidence Hazard in Iran

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Jessica A. Payne (corresponding), A. R. Watson, Y. Maghsoudi, S. K. Ebmeier, R. Rigby, M. Lazecký, M. Thomas, J. R. Elliott |
| Affiliations | COMET, University of Leeds; SatSense; University of Exeter; University of Leeds (p.1) |
| Journal | Journal of Geophysical Research: Solid Earth (AGU/Wiley), Vol. 130, e2024JB030367, 2025; download stamp shows issue 9; special collection “Solid Earth Geophysics as a means to address issues of global change” (p.1–2) |
| DOI | 10.1029/2024JB030367 |
| Dates | Received 2024-09-20; accepted 2025-08-11 (p.1) |
| Open access | CC BY licence (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: Groundwater depletion in Iran has produced 106 basin-scale subsidence regions covering 31,400 km² (>10 mm/yr, 1.9% of the country); vertical and east–west velocities are mapped for the first time there, with ~340 mm/yr vertical maximum in Rafsanjan and 77% on agricultural land; ~650,200 people face medium-or-higher differential-subsidence risk; nationwide ICA shows inelastic deformation contributes at least 60%, and the elastic/inelastic ratio fell from 41–44% to 31–36% during the 2020–2023 drought. (p.1)

## 2. Study area

- Iran nationwide; analysis within 106 rapidly subsiding regions meeting: >10 mm/yr average over the past decade, >4 km², human use (agriculture or settlement); northern marshy coastal areas (Babol, Rasht) and signals linked to Mw>4 earthquakes are excluded. (p.3–4)
- Background: groundwater supplies ~60% of Iran’s water, 90% for agriculture; extraction points rose ~85% in 2002–2015 while withdrawal fell 18% to 61.3 km³/yr; 77% of land area is in extreme overdraft. (p.1–2)
- Focus cities: 7 of Iran’s 10 most populous cities (Tehran, Mashhad, Isfahan, Karaj, Shiraz, Qom, Urmia) lie near subsiding regions. (p.12)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1 ascending and descending | COMET-LiCS interferograms (~100 m; four ~50 m frames downsampled), October 2014–December 2022 (~8 years); two Tehran frames also processed at ~50 m | p.3–5, 8 |
| Data for ICA | 1 km time series over whole LiCS frames (31 descending + 28 ascending), January 2016–December 2021 only; track 159A limited to March 2018–December 2021 | p.9–10, 21 |
| GNSS | Interpolated 2-D horizontal GNSS field (based on Khorrami et al., 2019) for referencing and the north component; no vertical GNSS used | p.5, 25 |
| Other | GACOS; ERA5 precipitation (monthly by climate zone; 12-day totals for the Tehran watershed); WorldPop density; Ghorbanian et al. (2020) land cover; fault maps (Hessami & Jamali 2006; Walker et al. 2010); Herrera-García et al. (2021) potential subsidence; Copernicus 30 m DEM; Sentinel-2 (2019) | p.4–11 |

## 4. Methods

1. **LiCSBAS time series**: GACOS per epoch; pixels with coherence <0.1 masked; interferograms with mean coherence <0.05 or <60% unwrapped discarded; pixels with any loop misclosure > |π| removed; reference = pixel with lowest loop-closure RMS; noise-index masking; re-unwrapping for persistent errors; phase bias tested at < ~5%. (p.3–4)
2. **Velocity decomposition**: Along-track frames merged; plate motion corrected in LoS; each track referenced to a Eurasia-fixed frame by a planar fit to the interpolated horizontal GNSS field (masking ±10 mm/yr); vertical and east–west velocities inverted jointly where regions overlap. (p.4–5)
3. **Differential-subsidence hazard and risk**: Vertical velocity × ~8 years gives displacement; 3×3 plane fits give the maximum gradient, divided by 100 m pixel width for angular distortion β; Skempton & MacDonald classes (low ≤1/3000, medium ≤1/1500, high ≤1/500, very high >1/500); risk = (3×SHG + Vsub)×Popden; horizontal strain ε likewise from east–west velocity. (p.7–9)
4. **Comparison with potential subsidence**: Observed vertical ≥10 mm/yr (>4 km²) compared with “Medium High” or higher potential subsidence from Herrera-García et al. (2021). (p.5–6)
5. **Temporal FastICA**: Per-frame temporal ICA with 3, 4 and 5 components on 1 km series (coherence <0.3 masked), best number chosen manually; inelastic component identified automatically (strong negative skew of pixel gradients); elastic component manually (extreme weights in subsidence basins + visual match with climate-zone precipitation). (p.9–11)
6. **Elastic/inelastic proportions**: Inelastic magnitude ÷ (LoS velocity × duration) gives the inelastic/mixed ratio; elastic and inelastic eigenvector series × mean weights give R_ed/id; additional ~100 m temporal ICA for Qazvin and the Western Tehran Plain. (p.11, 24)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- Claims the first vertical and east–west velocity maps for these Iranian regions (the previous nationwide study used descending LoS only). (p.1, 24)
- Uses angular distortion and horizontal strain to assess population risk and to help identify structures absent from existing fault maps. (p.1, 3)
- Claims the first near-country-scale ICA of InSAR time series, isolating inelastic (automatic) and elastic (manual) components. (p.21, 29)
- Shows the elastic/inelastic ratio declining during a regional drought, indicating reduced elastic recovery. (p.3, 28)

## 6. Main results

### Subsidence velocities

- 106 regions; fastest by 99th percentile: Rafsanjan −221, Bardsir 1 −166, Saveh −166 mm/yr; 24 regions >100 mm/yr by 99th percentile, 34 by maximum; Qazvin is largest (>2,400 km²); total >31,400 km². (p.11)
- Bowls lie in valleys between steep topography, shaped by Quaternary sediments; some mapped faults coincide with bowl margins. (p.11)
- In Rafsanjan–Bardsir 1, east–west velocities show the surface collapsing toward the centre, with the sign change at the vertical peak; elsewhere east–west motion is mostly regional tectonics. (p.12)
- ~77% (>24,300 km²) of >10 mm/yr subsidence is on farmland; kalut 11%, clay 8%, urban 3%, sand 0.4%; maxima farmland 338, clay 323, urban 254 mm/yr; real or apparent uplift near kalut/salty land. (p.12)
- Vs Herrera-García et al. (2021): ~11% of predicted potential subsidence is observed; 92% of observed >10 mm/yr subsidence lies in predicted areas. (p.12)
- ~21% smaller than the 40,000 km² of the previous nationwide study, mainly due to excluding the Persian Gulf region and coherence masking; the main Bardaskan bowl grew from 750–800 to ~1,110 km² (~40%). (p.24–25)

### Differential-subsidence risk

- Nationwide, 51,500 people over 242 km² are exposed to high angular distortion. (p.12)
- North-west Mashhad reaches 178 mm/yr vertical, with the largest medium (96 km²) and high (4 km²) distortion areas, risk ~12; Tehran and Karaj ~25, Isfahan ~8, Shiraz ~5, Qom ~2, Urmia ~1.4. (p.12)
- Karaj has the most people in high hazard (>23,600 in 6.8 km²) plus 118,800 (59 km²) medium; Tehran ~10,500 (4.3 km²) high, with risk >25 south-west of the centre. (p.12–13)
- Moving from ~100 m to ~50 m pixels raises Western Tehran Plain high-distortion exposure from 26,276 (8.26 km²) to 28,360 (10.7 km²), ~8% more people and ~30% more area, with more noise. (p.16)

### Structural clues

- Western Tehran Plain linear features: ~0.04% along the Kahrizak Fault and ~0.06% along a possible unmapped Eyvanekey extension, with horizontal-strain divergence; on profile B–B′ the 0.06% peak coincides with a ~4 m topographic step, which the authors call “strong evidence” for an unmapped fault. (p.16–17, 25–26)
- A ~0.08% linear peak on Shiraz’s western margin follows anticline strike; Bardaskan shows 10 linear peaks (6 near earlier locations, 4 new). (p.17–19, 26)

### ICA: inelastic and elastic

- An inelastic component is found in all 59 frames; an elastic component in 24. (p.21)
- Rafsanjan has the fastest vertical rate, 342 mm/yr (2014–2022), and the largest inelastic compaction, ~1,300 mm LoS in 2016–2021 (~216 mm/yr), consistent across four frames; in Neyshabour both look directions give the same inelastic displacement. (p.22)
- In the three regions with elastic components the inelastic/mixed ratio approaches 0.6 in places vs ~1 elsewhere; Varamin ~0.9 west vs ~0.5 east; Bardaskan and Mahoolat ~0.9 vs ~0.7 further north and east; margins lower than centres. (p.24)
- In Tehran’s ascending frame the elastic component tracks watershed precipitation; R_ed/id falls from 41–44% (2017–2018) to 31–36% (2019–2021); some frames show inelastic acceleration in 2018–2021 and elastic series changing form around 2020. (p.24, 28)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- Groundwater well data were hard to access, insufficiently deep and ended in 2019, so precipitation was used instead, with the caveat that it alone does not control groundwater levels. (p.11)
- Short-wavelength topography-correlated atmosphere not removed by GACOS appears as a seasonal ICA component. (p.10)
- East–west velocity noise reaches ~10 mm/yr in places; lacking high-resolution north–south observations, the interpolated GNSS field may let residual north–south motion bleed into east–west velocities. (p.27)
- The risk metric uses population density as the exposure proxy and excludes unpopulated infrastructure (e.g., railways and roads across the Qom bowl). (p.13)
- Some frames show no elastic component, perhaps because it is below noise or absent; the inelastic component retains minor seasonal signal (“ghosting” or a real 1–5% recoverable part). (p.29)
- Finer (~50 m) pixels propagate more noise; velocity-derivative noise floors are higher in low-coherence farmland. (p.16)
- The uplift mechanism over salty land/kalut is a hypothesis requiring further research. (p.25)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- Peak vertical rate north-west of Mashhad is inconsistent: 178 mm/yr in Sections 3.3.1 and 3.4.2 vs 157 mm/yr in Section 4.3.3 (citing Table S5). (p.12, 19, 26)
- Rafsanjan’s maximum appears as ~340 (abstract), 338 (Sections 3.1, 4.1) and 342 mm/yr (Sections 3.5.1, 4.3.3). (p.1, 12, 22, 25, 26)
- The abstract’s “~650,200 people exposed to medium or higher risk” has no corresponding figure in the main text (which gives 51,500 people at high distortion and city figures). (p.1, 12)
- Drought timing: the abstract cites a 2020–2023 drought and the discussion says it began in June 2020 (severe 2021–2023), yet the 31–36% R_ed/id refers to 2019–2021, partly before the stated onset. (p.1, 24, 28)
- No validation of vertical InSAR velocities against independent ground data (vertical GNSS, leveling) is reported; referencing used only horizontal GNSS (“no vertical GNSS used”), and accuracy discussion relies on comparison with earlier InSAR studies. (p.5, 25)
- Elastic components are identified manually where they “visually correlate” with precipitation. (p.11)
- The Tehran watershed analysis states a “minimum area of 360,000 km²”; given 31,400 km² ≈ 1.9% of Iran (abstract), this would be about one-fifth of the country, so the value looks doubtful (possibly a unit error). (p.1, 11)
- Popden is defined as “people per 100 m² pixel” while pixel width is 100 m, an ambiguous unit statement. (p.8–9)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| Generic research question | Rewritten from the paper. |
| “Ratio fell from 41–44% to 31–36% during the 2020–2023 drought” | Added the actual periods (2017–2018 vs 2019–2021) and flagged the onset mismatch in 7.2. |
| Limits like “drought and pumping co-vary”, “fault control indirect” | Not stated in the paper; replaced by the authors’ limits (no well data, E–W noise, missing N–S, etc.). |
| Quartile: “usually Q1 or Q2” | Not in the PDF; removed. |
| Eight questions, “my assessment”; Chinese in English notes; broken toggle | Removed and fully rebuilt. |

**Data/code availability (as stated)**: FastICA scripts in Payne et al. (2024a); regional time-series velocities on the COMET-LiCS Subsidence Portal (Payne et al., 2023); vertical/east–west velocities and 1σ uncertainties in Payne et al. (2024b). (p.29)
