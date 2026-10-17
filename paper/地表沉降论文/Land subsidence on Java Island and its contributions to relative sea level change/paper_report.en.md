# Land subsidence on Java Island and its contributions to relative sea level change

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Leonard O. Ohenhen (corresponding), Manoochehr Shirzaei, Praveen Kumar, Arif Aditiya, Ashutosh Tiwari, James L. Davis, Folarin Kolawole, Estelle Chaussard, Nitheshnirmal Sadhasivam, Oluwaseyi Dasho, Wen Zhong, Roselyn H. James, Samuel Daramola, Robert J. Nicholls, Philip S. J. Minderhoud |
| Journal | Science Advances (AAAS), Vol. 12, Issue 15, eaec0172, 8 April 2026; Physical Sciences research article (p.1, 16) |
| DOI | 10.1126/sciadv.aec0172 |
| Dates | Submitted 2025-09-03; accepted 2026-02-27; published 2026-04-08 (p.15) |
| Open access | CC BY-NC 4.0 (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: Satellite radar gives a high-resolution assessment of subsidence across Java: 1–15 cm/yr in multiple coastal cities and temporally evolving; machine-learning spatiotemporal clustering with ancillary data attributes dominant mechanisms to resource extraction; virtual tide gauges every 5 km along the north coast show contemporary subsidence will dominate RSL budgets over the next 25 years along >75% of the coast. (p.1)

## 2. Study area

- Java Island, Indonesia, ~150 million people (~2% of the world); the low-lying northern coast (~1500 km) is the population and economic corridor. (p.1–2)
- Java Sea absolute sea-level rise ~5–6 mm/yr since 2000 (Jakarta, Semarang, Surabaya 5.0/5.3/5.5 mm/yr, Fig. 1); urban subsidence in Jakarta up to 15 cm/yr (citing earlier work). (p.2)
- The authors note Indonesia’s lack of representation in PSMSL stations used for AR6 and that earlier island-wide studies used a single orbit geometry. (p.2)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1 | ~4000 C-band images, 10 ascending + 11 descending frames, 2017–2023 | p.3, 9 |
| GNSS | VLM at 28 sites; 10 stations (~35%) used to tie to IGS14 (Nevada Geodetic Laboratory and prior studies); 26 used for validation (including frame-alignment stations) | p.3, 10 |
| ALOS-1 L-band | Chaussard et al. 2007–2010 VLM rates for long-term comparison | p.4, 10 |
| Sea level | CMEMS 0.25° monthly gridded altimetry (2001–2024); FACTS probabilistic projections for five SSPs (consistent with AR6) | p.2, 12 |
| Ancillary | WorldPop 2021; VIIRS annual flood extent (2012–2023); Indonesian geology shapefiles; ESA WorldCover and Google Earth; DeltaDTM v1.1; PSMSL Cilacap tide gauge (validation) | p.2, 4, 11–12, 15 |

## 4. Methods

1. **WabInSAR**: Multi-look 32×6 (~75 m); precise orbits + SRTM co-registration and ESD; >11,000 interferograms in GAMMA (≤150 m, ≤300 days); DS coherence >0.7, PS amplitude dispersion <0.35; 2D minimum cost flow; orbital, topo-correlated atmosphere and DEM corrections; reweighted least squares. (p.9–10)
2. **2D decomposition and reference frame**: Ascending/descending pixels co-located within 10 m; weighted least squares for east–west and vertical; affine transformation to IGS14; error propagation for formal uncertainty and temporal variability. (p.10)
3. **Multi-epoch trends**: Short term: quadratic fit + t test (P<0.05) classifies accelerating, decelerating or linear; long term: Sentinel-1 (2017–2023) minus ALOS-1 (2007–2010), split at ±0.5 cm/yr into intensifying/emergent, stable, slowing. (p.4, 10)
4. **Hybrid unsupervised clustering**: PCA (first two PCs, ≥90% variance) → k-means (elbow, K=7) → DBSCAN (5 km radius in Methods, 0.5 cm/yr threshold) → multivariate DTW on detrended vertical and east–west mean series with hierarchical clustering (threshold 200) → post hoc attribution with geology, land cover and prior studies. (p.4, 11–12)
5. **Virtual tide gauges and RSL**: Every 5 km along the north coast the nearest altimetry cell plus linear VLM gives RSL: ALOS-1 rate for 2001–2013, Sentinel-1 rate for 2014–2024; validated against the Cilacap gauge (south coast); FACTS projections to 2050 (workflows 1e/1f medium, 2e/2f low confidence, p-boxes) with a nonlinear-VLM sensitivity test. (p.6, 12)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- An island-wide subsidence assessment with its contribution to north-coast RSL, whereas earlier work focused on Jakarta or used single-orbit geometry. (p.2)
- Introduces a “process-based” approach to interpreting drivers, moving from static rate maps to dynamic hazard evolution (clustering + DTW + post hoc attribution). (p.2, 11)
- Virtual tide gauges at 5 km give historical, current and projected 21st-century RSL; the authors present this as applicable where gauges are lacking. (p.6, 8, 13)

## 6. Main results

### Spatial pattern

- Mean horizontal motion <0.1 cm/yr; local east–west motion up to ~1 cm/yr in Jakarta, Bekasi, Bandung and Semarang, correlated with high subsidence (>5 cm/yr). (p.3)
- Mean VLM −0.5 cm/yr, SD 1 cm/yr; hotspots >1 cm/yr in Jakarta, Bekasi, Bandung, Tegal, Semarang, Cilacap, Surabaya, Sidoarjo, Jember, plus Pekalongan, northern Subang, Brebes, Madiun, Demak, around the Lusi mud volcano and Pasi farmland. (p.3)
- In 9 of 12 major districts >20% of urban area sinks faster than 1 cm/yr; in Bandung, Pekalongan and Demak >30% exceeds 5 cm/yr; most cities have medians >0.5 cm/yr and peaks >10 cm/yr. (p.3)
- Exposure hotspots within ~1 km of shore: Jakarta (max 3.6 cm/yr, 100,000 people, mean 0.1 m), Cirebon (3.8, 12,000, 0 m), Pekalongan (10, 5000, −0.1 m), Semarang (8, 10,000, −0.1 m). (p.3)

### Temporal evolution

- In 2017–2023, 17% of subsiding areas accelerate significantly and 45% decelerate (Fig. 2C also shows 38% linear); acceleration in Cirebon (0.2–1.0 mm/yr²), Tegal (0.2–0.4), central Semarang (0.5–2.0); linear or decelerating in Jakarta, Demak, Surabaya, Sidoarjo. (p.3–4)
- Vs ALOS-1: ~13% shifted from moderate (<0.5 cm/yr) to rapid subsidence (Bekasi, Tegal, Pekalongan, Semarang, Bandung, Madiun, Pamanukan, Demak, Pasi; +1–7 cm/yr); 22% slowed or reversed (central Jakarta, Cirebon, Cilacap, Surabaya); 65% unchanged. (p.4)
- Areas with intensifying subsidence such as Madiun, Pekalongan, Demak and Pasi also show increasing flood frequency and extent (VIIRS, 2012–2023). (p.4)
- In parts of Jakarta 50% of land shifted from rapid subsidence (2007–2010) to near stability or uplift (2017–2023), coinciding with extraction bans, industrial relocation and piped water; ~2 mm/yr uplift east of Jakarta in the Ciliwung delta; new subsidence in Madiun, Jember and Pasi, termed a “balloon effect”. (p.7–8)

### Clustering and attribution

- k-means yields 7 temporal patterns, DBSCAN 30 spatial clusters; excluding background cluster 0, 29 clusters form 6 DTW groups. (p.4)
- Group 1 (clusters 1–4, 17, 21): central-Java coastal alluvium, sharp high-amplitude oscillations (−1.5 to +2 cm), attributed to heterogeneous anthropogenic stressors and extraction regimes; Group 2 (5, 11, 23): deltas and river channels (Pamanukan, Brantas delta in Sidoarjo), multiyear oscillations (−2.5 to +1.5 cm). (p.4–5)
- Group 3 (6, 8, 9, 15, 16, 25–27): residential, moderate amplitude (−1 to +1.3 cm), mainly domestic groundwater use (compaction not excluded); Group 4 (7, 10, 12–14, 24): industrial, least seasonal, monotonic decline, likely deep groundwater or hydrocarbon extraction; Group 5 (18–20, 22, 28): agricultural (Pasi, Madiun), large seasonal oscillation (−3 to +2 cm); Group 6 (29): Lusi mud volcano, complex nonlinear vertical and horizontal motion. (p.5–6)

### Relative sea level

- Historical (2001–2013) RSL rise 0.4–8.9 cm/yr (mean 1.5); current (2014–2024) 0.2–9.0 cm/yr (mean 1.7), highest in Jakarta, Cirebon, Tegal, Pekalongan, Semarang, Demak; reflects 5–100% higher subsidence despite 1–70% lower sea-level trends. (p.6)
- Under SSP2-4.5, 2050 RSL rates are 0.4–9.0 cm/yr (mean 1.8), 2–10× SLR alone; cumulative RSL since 2001 is 0.1–0.7 m; by 2050, 0.4–1.9 m across scenarios (17th–83rd), SSP2-4.5 likely 0.5–1.7 m; low-confidence SSP5-8.5 approaches 2.0 m in Jakarta, Cirebon, Semarang. (p.6)
- Under SSP5-8.5 (medium confidence), VLM accounts for 25–91% of RSL along 77% of the coast; by 2050 it remains dominant in >75% of segments (27–85%); sterodynamics and glaciers <25%, ice sheets <20%, land water storage <1%. (p.6)
- Including nonlinear VLM changes 2050 RSL rates by >1 cm/yr and RSL by 0.3–0.7 m; at some locations linear vs nonlinear projections diverge by >40 cm. (p.6, 8)
- Validation: VLM vs 26 GNSS correlation 0.83–0.96, difference mean 0.1, SD 0.4 cm/yr; virtual gauge vs Cilacap PSMSL ρ=0.9, rate difference 0.1 mm/yr. (p.10, 12)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- Some classes may mix groundwater withdrawal, shallow/deep compaction and tectonics that cannot be fully disentangled; attribution is post hoc from spatial patterns, temporal signatures and prior studies, designed for data-limited settings. (p.11–12)
- Virtual gauges treat VLM as a constant deterministic rate, neglecting variability (e.g., 0.1–0.2 cm/yr² acceleration in Pekalongan and Semarang), possibly underestimating RSL rise. (p.12)
- Altimetry is optimised for open ocean; nearshore shelf circulation, river input and tidal amplification add uncertainty. (p.12)
- Extrapolating contemporary VLM assumes stationarity, which the authors say is unlikely over multidecadal timescales. (p.12–13)
- The 26 validation GNSS include frame-alignment stations; the Cilacap gauge used to validate virtual gauges lies on the south coast, outside the main domain. (p.10, 12)
- Tide-gauge and GNSS networks are sparse point measurements (the authors’ motivation for the satellite approach). (p.1, 8)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- DBSCAN radius differs: 1 km in Results (p.4) vs 5 km in Methods (p.11). (p.4, 11)
- ALOS-1 period differs: 2007–2010 in text and Methods (p.4, 10) vs 2007–2011 in the Fig. 2 caption (p.3). (p.3, 4, 10)
- Java Sea ASL rate differs: 5–6 mm/yr since 2000 (introduction, p.2) vs 5–7 mm/yr for 2001–2024 (discussion, p.6). (p.2, 6)
- Group 1 attribution is inconsistent: the group description cites heterogeneous anthropogenic stressors and extraction (p.4), while the summary lumps groups 1 and 2 as “natural sediment compaction and loading in deltaic environments” with Pamanukan and Brantas (both group 2 sites) as examples (p.6). (p.4, 6)
- Historical RSL (2001–2013) applies the 2007–2010 ALOS-1 rate to the whole period (piecewise-constant, Eq. 12). (p.12)
- Attribution uses no direct extraction or groundwater-level observations, relying on temporal signatures, land cover/geology and prior studies (as the authors state). (p.11–12)
- The DTW threshold of 200 was chosen empirically and the groups were refined by contextual knowledge and ancillary data. (p.11)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| “Time-series clustering identifies accelerating/decelerating/linear trends” | Incorrect: acceleration classes come from quadratic regression + t test; clustering (PCA+k-means+DBSCAN+DTW) is for hotspot attribution. |
| “~13% accelerated, 22% slowed, 65% no trend change” | 13/22/65% are from the ALOS-1 comparison (intensifying/slowing/unchanged); 2017–2023 acceleration is 17% and deceleration 45%. Listed separately. |
| “Projected 2020–2050 RSL” | RSL projections are 2024–2050 (FACTS); 2020–2050 refers to the absolute sea-level projections in Fig. 1. |
| Limit “coastal InSAR affected by tides, vegetation, low coherence” | Not in the paper; replaced by the authors’ own limits. |
| Quartile, eight questions, “my assessment”; Chinese in English notes; broken toggle | Removed and rebuilt. |

**Data/code availability (as stated)**: VLM, horizontal motion and RSL projections on Zenodo (10.5281/zenodo.15786356); Sentinel-1, CMEMS, WorldPop and DeltaDTM are public; other data/code in the paper and supplement. (p.14–15)
