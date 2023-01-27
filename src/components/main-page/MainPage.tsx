import React from "react";
import Oppgaver from "../oppgaver/Oppgaver";
import Sidetittel from "../sidetittel/Sidetittel";
import Utkast from "../utkast/Utkast";
import style from "./MainPage.module.css";

const MainPage = () => {
    return(
        <>
            <div className={style.pageWrapper}>
                <Sidetittel />
            </div>
            <div className={style.panelWrapper}> 
                <Oppgaver />
                <Utkast />
            </div>
        </>
    )
}

export default MainPage;