// Bu dosya sadece buzdolabı kanıtının içerik tanımı
export const FRIDGE = {
  id: "fridge",
  main: "/evidence/photo1/fridge.jpeg",   // fit-content de olur; % koordinatla hizalanır
  hotspots: [
    // İki foto için yaklaşık koordinat; dev mode ile netleştirirsin
    { id: "detail1", x: 39, y: 18, img: "/evidence/photo1/detail1.jpeg", label: "Detay 1" },
    { id: "detail2", x: 39, y: 29, img: "/evidence/photo1/detail2.jpeg", label: "Detay 2" },
  ],
};
