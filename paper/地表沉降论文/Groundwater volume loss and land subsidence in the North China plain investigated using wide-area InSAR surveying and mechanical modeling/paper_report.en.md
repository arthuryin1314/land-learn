# Groundwater volume loss and land subsidence in the North China plain investigated using wide-area InSAR surveying and mechanical modeling

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Xing Zhang, Jun Hu (corresponding), Mahdi Motagh, Mingjia Li, Yuedong Wang, Qiuhong Yang, Guangli Su, Haigang Wang |
| Affiliation (corresponding) | School of Geosciences and Info-Physics, Central South University (p.1) |
| Journal | Remote Sensing of Environment (Elsevier), Vol. 333, Article 115164, 2026 (p.1) |
| DOI | 10.1016/j.rse.2025.115164 |
| Dates | Received 2025-03-24; revised 2025-10-28; accepted 2025-11-23; online 2025-12-02 (p.1) |
| Rights | © 2025 Elsevier Inc. All rights reserved (p.1) |
| Keywords | North China plain; Wide-area multi-track network adjustment model; InSAR-VSM; Groundwater storage loss (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: Using 2017–2023 Sentinel-1A data from two ascending tracks (T40, T142; 8 frames) and a spatially constrained wide-area multi-track network adjustment, the study builds a seamless NCP deformation series, derives the elastic skeletal storage coefficient Ske from cross-wavelet and seasonal amplitudes, inverts 2-km groundwater storage loss with InSAR-VSM, and analyses 63 years of subsidence with leveling, GNSS and InSAR. (p.1)

## 2. Study area

- The North China Plain, including Beijing, Tianjin, Hebei, Shandong and Henan; 300,000 km² (3.1% of China) and 339 million people (24.2%, as of December 2019). (p.2)
- Divided west–east into piedmont, flood and coastal plains; main aquifers are shallow piedmont and deep flood-plain aquifers; mean precipitation 560 mm, concentrated June–September. (p.2–3)
- Authors: piedmont plain dominated by elastic, flood plain by plastic (largely irreversible) deformation; irrigation up to 90% of groundwater use; water consumption rose 126% in 2013–2022. (p.3)
- Numerous faults/ground fissures (Table S1); the subsidence funnel area exceeded 48,500 km² during 1971–2015. (p.2–3)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1A SAR | Ascending T40 (frames 112/117/122/127, 188 scenes each, 2017-05-13–2023-09-27) and T142 (frames 111/116/121/126, 187 each, 2017-05-20–2023-09-22); 8 stacks, 1500 scenes, IW, 5.6 cm | p.4 表1 |
| GNSS | 4 CMONOC stations (2011–2022), 2 BJCORS (2015–2019), 2 deployed (2015–2023); aligned to ITRF2008 via seven-parameter Helmert, then Eurasia-fixed | p.4 |
| Leveling | Three epochs of second-order leveling (GB/T 12897-2006): 1960–1980, 1980–1990, 1990–2010; 8200 km network | p.4 |
| Groundwater level | Geo-Cloud (China Institute of Geo-Environment Monitoring), 15-day interval, Jan 2018–Jan 2023; 472 valid wells in the InSAR area, all in confined flood-plain aquifers, 250–400 m deep | p.4 |
| Other | AW3D30 DEM; faults (Deng et al., 2003); 1:5,000,000 geology; SNWDP middle-route allocation 2017–2022 (Table 3); Sentinel flood extents | p.5, 10, 16, 19 |

## 4. Methods

1. **SBAS-InSAR**: GAMMA interferometry + in-house MATLAB SBAS; BT=80 days, BP=250 m, each scene paired with the next two; ESD co-registration (~10⁻³ sample); 20×4 looks; AW3D30 topography removal; extended MCF unwrapping; phase-closure correction; elevation-dependent troposphere by linear regression; quadratic ramp removal; least-squares LOS rates and series. (p.5)
2. **Wide-area network adjustment**: Horizontal motion neglected, LOS/cosθ to vertical; homologous points with mean temporal coherence >0.85 in N=13 overlaps of M=8 frames; minimise the sum of absolute overlap differences via V=B·X+ε solved with the Moore–Penrose pseudoinverse; overlaps averaged and tied to one stable benchmark. (p.5–6)
3. **Aquifer parameter Ske**: Fit “linear + single sinusoid” models to InSAR and GWL (T=0 = 1 October); Ske=Δd_s/Δh_s from seasonal amplitudes; cross-wavelet transform (XWT) for phase relations. (p.6–7, 10–11)
4. **InSAR-VSM groundwater volume inversion**: Elastic half-space Green’s functions (homogeneous, isotropic; Poisson’s ratio 0.25); aquifer discretised into cells; weights σ²∝1/coherence²; Laplacian smoothing with L-curve; GWSL = n·h·l_c·w_c·Σdv. (p.7)
5. **Zone 1 inversion set-up**: Multi-layer aquifer approximated as single layer; Zone 1 downsampled to 1 km; 100×150 cells of 2 km (200 km × 300 km); 500 m thickness; porosity 0.2–0.4; forward-model residual check. (p.12–13)
6. **Long-term evolution and drivers**: Leveling + GNSS + InSAR give a 63-year (1960–2023) history; fault overlay; response to 2021 and 2023 extreme rainfall; exponential def(t)=M(e^{kt}−1), k∈[−1,0], fitted pointwise and compared with SNWDP allocation. (p.15–19)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- The authors claim the first comprehensive, quantitative assessment of GWSL and its dynamics across the entire NCP at unprecedented resolution. (p.2)
- Wide-area network adjustment with spatial constraints yields seamless, millimetre-level deformation series for the whole plain. (p.1)
- The authors claim a novel groundwater-loss inversion coupling InSAR with a volume strain model (InSAR-VSM), yielding the first 2-km GWSL dataset. (p.1)
- Places recent deformation in a 63-year (1960–2023) context and discusses combined human (over-extraction, SNWDP, bans) and natural (extreme rainfall, structures) factors. (p.1–2)

## 6. Main results

### Subsidence pattern

- Max LOS rates exceed −120 mm/yr on both P40 and P142, other local funnels exceed −100 mm/yr; points P1–P3 subside March–September and slow October–February, matching irrigation seasons. (p.7)
- Incidence angles differ by nearly 20°; co-located P2/P2′ rates differ by ~10%; after adjustment inter-track differences change from bimodal (mean −4.3 mm/yr) to near-Gaussian (mean −2.1 mm/yr), removing the step. (p.7–8)
- Three main zones form a SW–NE band: Zone 1, ~200 km × 500 km agricultural irrigation area (called by the authors the largest continuous funnel in the world); Zones 2 and 3 in the Tianjin and Beijing suburbs. (p.10)
- Abstract and conclusion: maximum vertical rate exceeds −150 mm/yr and cumulative subsidence reaches ~1 m over six years. (p.1, 20)

### Deformation–groundwater response

- At 12 typical wells (all >178 m deep), detrended deformation and GWL agree closely (r ≥0.94); XWT at W8 shows a one-year period with ~2° phase difference, i.e. a ~2-day lag. (p.10–11)
- Flood-plain seasonal GWL fluctuations reach 8–16 m with Ske mostly <0.01, interpreted as poor elastic recovery and plastic dominance; Ske is higher in the piedmont. (p.11–12)
- Flood-plain seasonal deformation peaks in January–March, matching irrigation-driven GWL (highest Jan–Mar, lowest Jun–Jul). (p.12)

### Groundwater storage loss

- Zone 1 maximum volumetric strain Dvmax is −9.4×10⁻⁸; forward residuals are random, max 20 mm. (p.13)
- Zone 1 (main irrigation area) annual groundwater volume change −4.346 to −8.692 ×10⁸ m³/yr (porosity 0.2–0.4), concentrated in the core funnel. (p.13)
- Comparable in order of magnitude with −1.26×10⁹ m³/yr from 1-D consolidation theory, which the authors treat as cross-validation and say tends to overestimate by neglecting horizontal displacement. (p.13)
- InSAR vs 8 GNSS points: RMSE 4.8–13.4 mm, R² 0.94–0.98. (p.13)

### Drivers and long-term evolution

- Funnels concentrate in a narrow N–S belt parallel to fault strike, bounded by the Taihang Mountain and BTK faults, which the authors suggest may act as hydraulic barriers; deformation gradients are high near the AY and ND faults. (p.15–16)
- During the “20210720” and “20230729” rainfall events subsidence slowed markedly or briefly rebounded; flood-plain GWL rose by 7.23 m on average then quickly returned; GWL declined 0.87 m/yr in 2019–2022. (p.16–17)
- In 1960–1980 subsidence was mainly urban (Tianjin, Cangzhou); farmland subsidence intensified in 1990–2010; by 2010 Tianjin’s centre reached ~3 m, Cangzhou 1.8 m, farmland funnels up to 2 m; Tianjin subsided linearly 1960–2019, stabilised 2019–2020 and rebounded after May 2020. (p.17)
- North of the Baoding–Cangzhou line (Beijing, Tianjin) deformation decreases; south (Shijiazhuang, Xingtai, Handan) it keeps increasing; the authors attribute this to SNWDP water going mainly to Beijing/Tianjin, with an allocation density of only 0.2 in Hebei’s farmland. (p.18–20)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- LOS-to-vertical relies on neglecting horizontal motion, which may add uncertainty near faults; summer crop growth lowers coherence and affects data quality in places. (p.13)
- InSAR-VSM approximates the multi-layer aquifer as a single layer and may miss inter-layer hydraulic connections and differing responses. (p.13, 15)
- Green’s functions assume a homogeneous elastic medium, an idealisation of the heterogeneous subsurface; inelastic behaviour or layering may cause unmodelled discrepancies. (p.15)
- Poisson’s ratio 0.25 is empirical; the porosity range 0.2–0.4 directly affects GWSL. (p.15)
- The 2 km grid trades computational feasibility against detail; coarse grids may smooth local features. (p.15)
- Historical data such as preconsolidation head needed for the 1-D method are extremely scarce across the NCP, so it was not used as the main method. (p.13)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- Spatial scope of GWSL: the abstract and conclusion present −4.346 to −8.692 ×10⁸ m³/yr as the NCP’s average loss, whereas Section 5.5 computes it only for Zone 1 (main irrigation area, 2 km grid of 200 km × 300 km). (p.1, 12–13, 20)
- Zone 1 size differs: ~200 km × 500 km in Section 5.2 vs a 200 km × 300 km inversion grid in Section 5.5. (p.10, 12)
- Well counts differ: 472 valid wells (Section 3.4) vs 300 wells (Section 5.3 and conclusion), plus 12 typical wells. (p.4, 10, 20)
- Section 3.4 says all wells are in confined flood-plain aquifers, yet Section 5.4/Fig. 12d maps Ske including the piedmont and reports higher piedmont values; the GWL source for piedmont Ske is not stated. (p.4, 11–12)
- Table 3 uses “billion cubic meters”; the listed 2022 city supplies sum to ~95.7, far above the 9.5 km³ annual middle-route diversion cited in Section 6.5; Hebi and Xinxiang have different allocation ratios (5.2% vs 9.1%) but identical yearly supplies. (p.18–19)
- Section 6.5 says 11 major cities were selected; the Fig. 20 caption says 12 typical city areas. (p.18–19)
- InSAR-VSM (−4.346 to −8.692 ×10⁸) and the 1-D estimate (−1.26×10⁹ m³/yr) differ by ~1.5–2.9×, which the authors interpret as “strong cross-validation”. (p.13)
- Minor: Section 5.4 refers to the method in “Section 4.2” (it is 4.3); Section 6.3 gives 19 July 2021 for the “20210720” event. (p.11, 16)
- Data availability: “Data will be made available on request.” (p.20)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| Generic “research question” | Rewritten from the paper. |
| Limit: “InSAR-VSM relies on a 1-D volume-strain assumption” | Incorrect: InSAR-VSM uses elastic half-space Green’s functions; 1-D consolidation is only the cross-check. |
| GWSL stated without its spatial scope | Now stated as Zone 1 only; the discrepancy with the abstract is listed in 7.2. |
| Limits like “cross-sensor consistency over 63 years needs more explanation” | Not in the paper; replaced by the authors’ own limits in Section 6.1. |
| Quartile: “RSE is usually JCR/Scopus Q1” | Not in the PDF; removed. |
| Eight questions, “my assessment”; Chinese in English notes; broken HTML toggle | Commentary removed; everything rebuilt. |

**Data/code availability (as stated)**: Data will be made available on request; groundwater data from the Geo-Cloud platform. (p.20)
