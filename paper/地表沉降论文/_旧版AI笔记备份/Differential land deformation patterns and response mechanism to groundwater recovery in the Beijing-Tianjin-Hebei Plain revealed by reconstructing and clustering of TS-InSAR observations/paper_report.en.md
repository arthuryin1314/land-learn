# Deep reading: Differential land deformation patterns and response mechanism to groundwater recovery in the Beijing-Tianjin-Hebei Plain revealed by reconstructing and clustering of TS-InSAR observations

## 1. Paper identity

- **Journal**: *International Journal of Applied Earth Observation and Geoinformation*, Elsevier, Vol. 147, Article 105196, 2026. DOI: [10.1016/j.jag.2026.105196](https://doi.org/10.1016/j.jag.2026.105196)
- **Authors**: Dexin Meng, Beibei Chen, Shubo Zhang, Huili Gong, Chaofan Zhou, Sidi Chen, Kunchao Lei, Haigang Wang.
- **Quartile**: JCR Q1; SCImago/Scopus 2025 Q1. Chinese Academy of Sciences quartiles vary by edition and institutional convention; public listings identify Earth Sciences as Tier 1. Verify against the edition used by your institution.
- **One-sentence summary**: The paper mosaics 2016–2024 Sentinel-1A TS-InSAR observations across the BTH Plain, separates seasonal and long-term deformation, clusters physically interpretable long-term features, and links four deformation regimes to groundwater-level lags and multi-year consolidation delay.

## 2. Question and positioning

The paper asks why surface deformation does not recover uniformly after groundwater conditions improve: where does subsidence continue, slow, stabilize, or rebound, and how do aquifer structure, clay interbeds, water-use structure, and faults shape the lag? Its main value is an integrated regional workflow. It does not provide a full 3-D groundwater-flow/consolidation inversion, so the mechanism claims are supported by spatial and temporal associations rather than causal identification.

## 3. Data

- Sentinel-1A ascending SAR on paths 40/142/69, 2016–2024, with 154/147/122 scenes.
- Monthly groundwater levels from the China Groundwater Statistics Yearbook, 2018–2024; shallow confined wells at 120–210 m and deep confined wells at 250–310 m.
- ERA5-Land hourly precipitation at about 0.1° resolution, aggregated to monthly totals.
- 30 m SRTMv3 DEM, leveling measurements for validation, water-resources bulletins for 2008–2024 groundwater-supply shares, and geological/fault/funnel references.
- The paper states that the authors do not have permission to share the source data, which materially limits replication.

## 4. Methods

1. IPTA TS-InSAR, multi-looking, SRTM topographic-phase removal, adaptive filtering, minimum-cost-flow unwrapping, SVD time-series inversion, and coherence/intensity screening.
2. LOS-to-vertical conversion, with path 142 as the leveling-validated reference. Overlapping pixels are matched and corrected using a double-layer Delaunay network and the median vertical deformation difference.
3. Seasonal reconstruction with an annual harmonic, $D_s(t)=A\cos(2\pi t)+B\sin(2\pi t)$, and long-term reconstruction with $D_l(t)=at^2+bt+c$. The clustering features are $(a,b,t_{vertex},slope_{end})$.
4. Z-score normalization and K-means; the elbow method selects $K=4$. The paper compares this with clustering the original high-dimensional time series.
5. Detrended STFT and phase analysis quantify periodic response and annual lag. An exponential decay model, $D(t)=M(1-e^{-Kt})$, quantifies delayed compaction; smaller $K$ means slower attenuation.

## 5. Main findings

- Deformation-rate quantiles narrow from −112.1–28.0 mm/yr in 2016–2018 to −98.4–26.5 mm/yr in 2018–2024, consistent with regional slowdown.
- Seasonal deformation amplitude is about 0–15 mm, larger in central/eastern plains and major funnels; deep-well seasonal groundwater fluctuations are often larger than shallow-well fluctuations.
- Four regimes: slight rebound (24.91%), stable deformation (46.09%), reduced subsidence (18.86%), and continuous subsidence (10.14%). The continuous and reduced-subsidence classes align with major groundwater-decline funnels.
- STFT shows dominant 12–36-month resonance. Annual lag is usually <2 months in elastic, permeable settings, including a reported 0.35-month example, and 4–6 months in clay-rich persistent-subsidence settings.
- Wet years such as 2021 and 2023 intensify short-term response. Cluster-4 has lower decay coefficients than cluster-3, consistent with thicker, more continuous clay. Low $K$ (<0.002 in highlighted areas) concentrates near faults at some funnel edges, whereas the Baoding–Shijiazhuang funnel shows a more radial center-to-edge recovery pattern.

## 6. Claimed innovation and assessment

The claimed contributions are regional three-track mosaicking, physically interpretable feature-constrained K-means, a unified treatment of monthly phase lag and multi-year delayed consolidation, and spatial use of the decay coefficient for risk zoning. My assessment is that K-means itself is standard; the contribution lies in the combination of feature design, regional correction, and multi-scale interpretation. Fault control remains a plausible, spatially supported hypothesis rather than a demonstrated causal effect.

## 7. Problems and limitations

1. Source data are unavailable, so pixel-level replication is difficult.
2. A single annual harmonic and a quadratic trend may misrepresent multi-frequency, abrupt, or regime-switching deformation.
3. Groundwater levels cover only 2018–2024 while deformation begins in 2016; a 9-year window is short for multi-decadal consolidation.
4. Neglecting horizontal motion can bias vertical conversion near faults or engineered areas.
5. The clustering evidence relies mainly on the elbow method; bootstrap stability, alternative clustering methods, and uncertainty intervals are not reported.
6. Clay thickness, faults, pumping, and groundwater funnels covary spatially, so overlap alone cannot establish fault causality.
7. The decay coefficient absorbs medium properties, boundary conditions, and past pumping history; it is not independently identifiable as a material constant.
8. Reported area shares depend on the observation period, quadratic model, feature standardization, and $K=4$ choice.

## 8. Eight questions

1. **Motivation**: Strong and tied to a real post-water-diversion management problem.
2. **Design trade-off**: Good for regional screening and interpretation; weaker for abrupt and multi-frequency processes.
3. **Fairness/reproducibility**: Leveling validation and reconstruction-error analysis help, but unavailable data and limited cluster-stability analysis make replication moderate at best.
4. **Failure boundary**: Short records, strong horizontal motion, intense local pumping, non-annual hydrology, and structurally complex zones.
5. **Contemporary novelty/cost**: Strong integration of remote sensing, clustering, spectral lag, and decay analysis; weaker causal strength than coupled hydro-mechanical modeling.
6. **Reproduction bottlenecks**: Monthly path correction, homologous-pixel matching, quality thresholds, representative-well selection, decay fitting, and unpublished source layers.
7. **Transfer**: Transferable to other over-pumped basins after recalibrating orbit correction, seasonal basis, aquifer depths, feature scaling, and water-level coverage.
8. **Falsification**: Independent GNSS/leveling contradicting the mosaic, unstable clusters, disappearance of fault-edge $K$ differences after controlling for clay and pumping, or longer observations showing rapid cessation would weaken the claims.

## 9. Takeaway

The robust empirical conclusion is that groundwater recovery produces spatially heterogeneous deformation: permeable/elastic areas respond quickly, while thick clay and fault-influenced areas retain seasonal lag and long-lived delayed consolidation. The fault-control interpretation should be treated as a testable hypothesis until supported by independent hydro-mechanical modeling and longer observations.
