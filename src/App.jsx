import React from "react";
import Sidetittel from "./components/sidetittel/Sidetittel";
import Oppgaver from "./components/oppgaver/Oppgaver";
import Utkast from "./components/utkast/Utkast";
import style from "./App.module.css";
import "@navikt/ds-css";

function App() {
  return (
    <div className={style.app}>
      <div className={style.pageWrapper}>
        <Sidetittel />
      </div>
      <div className={style.panelWrapper}>
        <Oppgaver />
        <Utkast />
      </div>
    </div>
  );
}

export default App;
