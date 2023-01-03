import React from "react";
import Oppgaver from "../oppgaver/Oppgaver";
import Utkast from "../utkast/Utkast";
import style from "./MainPage.module.css";

const MainPage = () => {
    return(
        <section className={style.wrapper}> 
            <Oppgaver />
            <Utkast />
        </section>
    )
}

export default MainPage;