import React from "react";
import Produktkort from "./Produktkort";
import style from "./ProduktkortListe.module.css";

const ProduktkortListe = () => {
  return (
    <div className={style.container}>
      <Produktkort produkt="aap" />
      <Produktkort produkt="dagpenger" />
      <Produktkort produkt="foreldrepenger" />
      <Produktkort produkt="hjelpemidler" />
      <Produktkort produkt="økonomiskSosialhjelp" />
      <Produktkort produkt="pensjon" />
      <Produktkort produkt="pleiepenger" />
      <Produktkort produkt="sykefravær" />
      <Produktkort produkt="uføretrygd" />
    </div>
  );
};

export default ProduktkortListe;
