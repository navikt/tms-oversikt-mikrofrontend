import React, { useContext } from "react";
import { BodyShort } from "@navikt/ds-react";
import { LanguageContext } from "../../language/LanguageProvider";
import style from "./LenkeListe.module.css";

const LenkeListe = ({liste, tittel}: {liste: Array<{ nb: string, nn: string, en: string, url: {nb: string, nn: string, en: string} }>, tittel: string}) => {

    const language = useContext(LanguageContext);

    return(
        <>
            <div className={style.listeContainer}>
                <p className={style.listeTittel}>{tittel}</p>
                <ul className={style.liste}>
                    {liste.map((link) => (
                    <li className={style.lenke}>
                        <BodyShort><a href={link.url[language]} className={style.color}>{link[language]}</a></BodyShort>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default LenkeListe;