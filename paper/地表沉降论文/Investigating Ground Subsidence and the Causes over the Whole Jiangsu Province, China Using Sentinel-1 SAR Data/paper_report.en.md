# Investigating Ground Subsidence and the Causes over the Whole Jiangsu Province, China Using Sentinel-1 SAR Data

> Verification note: these notes rely only on the paper PDF and add no outside information or judgement. “p.X” is the physical page X of the PDF file. “Author claim” marks statements made by the authors themselves, not an assessment by these notes.

## 1. Paper identity

| Item | Content |
|---|---|
| Authors | Yonghong Zhang (corresponding), Hongan Wu, Mingju Li, Yonghui Kang, Zhong Lu |
| Affiliations | Chinese Academy of Surveying and Mapping; Provincial Geomatics Center of Jiangsu; Southern Methodist University (p.1) |
| Journal | Remote Sensing (MDPI), 2021, Vol. 13, Article 179 (p.1) |
| DOI | 10.3390/rs13020179 |
| Dates | Received 2020-10-28; accepted 2021-01-04; published 2021-01-07 (p.1) |
| Open access | CC BY 4.0 (p.1) |
| Keywords | ground subsidence; InSAR; time series InSAR; Sentinel-1; Jiangsu province; subsidence causes (p.1) |
| Quartile | The PDF does not state a journal quartile. Following the text-only rule, no quartile is given here; check the JCR / CAS list your institution uses. |

**One-line summary (from the abstract)**: Time-series InSAR with six Sentinel-1 IW frames (2016–2018) over the whole of Jiangsu (107,200 km²), detailing three-level co-registration, mean subsidence velocity and time-series retrieval and multi-frame mosaicking; results for 9,276,214 coherent pixels with 3.9 mm/yr accuracy against leveling; causes analysed with historical optical images and fieldwork. (p.1)

## 2. Study area

- The whole of Jiangsu Province, 107,200 km², central eastern coast in the Yangtze River Delta region; over 80% plain below 50 m; 13 prefectures. (p.1, 3)
- Background: subsidence developed since the 1980s; by 2000, 5000 km² of the Suzhou–Wuxi–Changzhou area exceeded 0.2 m cumulative subsidence, max 2 m; a 10-year plan was issued in 2014. (p.1–2)

## 3. Data

| Data | Details | Page |
|---|---|---|
| Sentinel-1 IW (ascending) | Descending data were sparse, so ascending used; 6 frames, 3 tracks. F1 P142: 58 (2015-11-27–2018-12-05); F2/F3/F4 P69: 57/54/47 (2016-01-09–2018-12-12); F5/F6 P171: 65/52 (2015-11-29–2018-12-07) | p.2–3 表1 |
| DEM | 1-arcsec SRTM DEM for co-registration, geocoding and topographic phase removal | p.3 |
| Leveling | 688 leveling points from four campaigns in Changzhou, Nantong and Huai’an; 527 with a CP within 80 m used | p.8 表2 |
| Ancillary | Historical optical images (Google Earth); field campaign April–May 2019 (interviews, photos); coal working-panel parameters (Table 3) | p.7, 13 |

## 4. Methods

1. **GDEMSI / MCTSB-InSAR**: In-house GDEMSI software (CASM) based on Multiple-master Coherent Target Small-Baseline InSAR (MCTSB-InSAR). (p.4)
2. **Three-level coarse-to-fine co-registration**: (1) Look-up table from orbits and SRTM (~0.5 pixel); (2) amplitude cross-correlation offsets with linear refinement; (3) ESD from burst-overlap phase to reach 1/1000 pixel; joint weighted least squares over multiple pairs. (p.4)
3. **Interferogram screening**: Interferograms formed from summer (June–September) images were heavily affected by troposphere and discarded, together with unconnected acquisitions. (p.5–6)
4. **Vertical projection and mosaicking**: Assuming vertical-only motion (citing that subsidence/uplift dominate in Jiangsu), LOS rates divided by cosθ give MSV; six frames adjusted and mosaicked; nonlinear deformation from spatio-temporal filtering of residual phase, projected to vertical series. (p.6)
5. **Accuracy evaluation**: For each leveling point the nearest CP within 80 m is used; its rate over the leveling period is extracted and compared. (p.8)
6. **Cause analysis**: Causes in five zones inferred from CP series, historical optical images and fieldwork; in the mining area, 12/24-day interferograms in coherent October–March periods are least-squares combined. (p.9–18)

## 5. Innovations (author claims)

> These are contributions claimed by the authors; no extra assessment is added.

- The authors call this the “first of its kind” wide-area deformation mapping with Sentinel-1 in China. (p.19)
- Details the processing chain: three-level TOPS co-registration, MSV/time-series retrieval and multi-frame mosaicking. (p.1)
- Emphasises inferring causes by combining InSAR series, historical optical images and fieldwork, beyond mapping. (p.1, 19)

## 6. Main results

### Province-wide deformation

- About 82% of CPs have MSV in [−5, 5]; 1,319,077 (14.22%) in [−30, −5]; 30,975 (0.33%) in [−50, −30]; 7934 (0.086%) in [−215, −50] mm/yr. (p.6–7)
- 313,005 CPs (3.37%) show uplift [5, 32] mm/yr, 80% within [5, 10]; causes of three uplift zones unclear—possibly rising groundwater inland (Huai’an), tides or atmospheric errors on the Yancheng coast. (p.7)
- Leveling: Changzhou 237 points SD 4.0, Nantong 223 points 4.0, Huai’an 22 points 3.4 and 45 points 3.3; overall 527 points 3.9 mm/yr. (p.8)

### Five major zones

- Zone A (Lianyungang dock road, reclamation): BC reclaimed Oct 2014–Jan 2016, MSV [−215, −100]; AB completed before Oct 2014, [−80, −8]; after 18 Sep 2018 P1 slows and P2 slightly rises; by Terzaghi theory BC is in late primary consolidation and AB in secondary compression. (p.9)
- Zone B (NW Xuzhou): Feng county urban area with dense wells, MSV [−89, −20], spatially related to wells and attributed to groundwater withdrawal; farmland mining area lacks CPs, but coherent-period interferograms show 670 mm cumulative deformation at WP 92,606. (p.9, 13)
- Mining deformation is strongly nonlinear; the time-series result (P1) is clearly smaller than the coherent-period estimate (P1*), so mining subsidence is spatially missed and underestimated. (p.13)
- Zone C (central-south Yancheng coast): paddy and mudflat (2003) became the Fengyuan power plant and Yancheng Steel Group (2017), MSV [−139, −21]; consolidation of soft layers is certainly a cause, groundwater withdrawal possibly (no pumping evidence found in the field). (p.14–15)
- Zone D (Rudong coast, Nantong): coastal belt MSV [−31, −20]; water towers pumping for laver cleaning plus domestic wells; subsidence Jan–Sep, uplift Sep–Jan; reduced rebound in late 2018, when residents said some laver sites were closed. (p.16)
- Zone E (Wujiang, Suzhou, south of Taihu): farmland/paddy/ponds converted to housing by 2017; P1 (pond→building) −41 mm/yr, P2 (farmland→building, ≥3 years earlier) −15 mm/yr; attributed to soft-soil consolidation with no excessive pumping. (p.17–18)
- Three scenarios summarised: soft-soil consolidation (Zones A, E), groundwater withdrawal (Zones B, D), underground mining (Zone B). (p.18–19)

## 7. Limitations and problems

### 7.1 Limitations / assumptions acknowledged by the authors

- In the Xuzhou mining area, frequent land-cover change leaves almost no CPs, so subsidence is spatially missed; strongly nonlinear mining deformation is underestimated by time-series analysis. (p.13, 19)
- Causes of uplift are unclear: possibly rising groundwater inland, tides or atmospheric errors on the coast. (p.7)
- Summer interferograms were discarded due to strong troposphere, so fewer images were used than archived. (p.5–6)
- Leveling campaigns are run by prefectures, not all of which survey; point density, frequency and dates vary. (p.8)
- No evidence of groundwater pumping was found in Zone C; withdrawal is only a “possible” contributor. (p.15)

### 7.2 Issues verifiable in the text (internal inconsistencies, unreported information)

> Every item can be checked on the cited page; only facts in the PDF are stated, without speculating about their effect.

- The abstract says 688 leveling measurements gave 3.9 mm/yr accuracy, but the text shows 527 points were used and 3.9 mm/yr is the standard deviation of differences. (p.1, 8)
- The conclusion says “around 82% of the territory is stable”, but the 82% in the results refers to coherent pixels; the text also notes CPs are missing over farmland. (p.6, 13, 19)
- The period is stated as 2016–2018, but Frames 1, 5 and 6 in Table 1 start in November 2015. (p.1, 3)
- Leveling validation covers only Changzhou, Nantong and Huai’an; the prefectures of Zones A (Lianyungang), B (Xuzhou), C (Yancheng) and E (Suzhou) are not included. (p.8)
- Only ascending data are used, with LOS converted to MSV under a vertical-only assumption justified by a cited reference. (p.2–3, 6)
- Causes are inferred qualitatively (series shape, imagery, interviews); Zone D’s “approximately one-month lag” is assumed from a Beijing Plain study. (p.16)
- Minor: the Fig. 4 caption says zones are discussed in Section 5; they are discussed in Section 4. (p.7)
- Data available from the corresponding author upon reasonable request. (p.20)

## 8. Corrections to the previous AI notes

| Previous content / problem | Correction |
|---|---|
| Generic “research question” | Rewritten from the paper. |
| “About 82% of the area is stable” | Changed to “about 82% of coherent pixels”; the conclusion wording is flagged in 7.2. |
| Causes given as “mining, groundwater, reclamation and construction” | Per the paper: underground mining, groundwater withdrawal, soft-soil consolidation from marine/lake reclamation and land-use transition (incl. building/equipment loads). |
| Limits like “single ascending view” and “only ~3 years”, plus eight questions | Kept verifiable facts (ascending only, 2015/2016–2018); removed evaluative content. |
| Quartile remark | Not in the PDF; removed. |
| Chinese in English notes; broken HTML toggle | Fully rebuilt. |

**Data/code availability (as stated)**: Available from the corresponding author upon reasonable request. (p.20)
