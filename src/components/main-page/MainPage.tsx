import React from "react";
import Oppgaver from "../oppgaver/Oppgaver";
import Sidetittel from "../sidetittel/Sidetittel";
import Utkast from "../utkast/Utkast";
import style from "./MainPage.module.css";

const MainPage = () => {
    return(
        <>
            <section className={style.pageWrapper}>
                <Sidetittel />
            </section>
            <section className={style.panelWrapper}> 
                <Oppgaver />
                <Utkast />
            </section>
        </>
    )
}

export default MainPage;