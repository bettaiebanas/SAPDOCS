---
moduleId: m02
slug: intro-materiaux
title: "Introduction aux données de base PP/MM"
order: 1
level: "débutant"
status: "draft"
labels: ["PP", "MM", "master-data"]
---

# Introduction aux données de base PP/MM

Ce module présente les principales données de base utilisées en production
et en approvisionnement dans SAP (vue PP/MM) :

- Fiche article / *Material master*
- Nomenclatures / *Bill of Materials*
- Gammes / *Routings*
- Postes de travail / *Work centers*
- Versions de fabrication / *Production versions*

```mermaid
flowchart LR
  MAT[Material] --> MRP
  BOM[BOM] --> MRP
  ROUT[Routing] --> MRP
  WC[Work Center] --> ROUT
```

> Ce contenu est un simple exemple de page de documentation.
> On va ensuite enrichir avec la vraie matière SAP.