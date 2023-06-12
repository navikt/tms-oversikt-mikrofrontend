import React, { useContext } from "react";
import { BodyShort, Detail } from "@navikt/ds-react";
import { LanguageContext } from "../../language/LanguageProvider";
import style from "./LenkeListe.module.css";
import { logNavigereEvent } from "../../utils/amplitude";

const LenkeListe = ({liste, tittel}: {liste: Array<{ nb: string, nn: string, en: string, url: {nb: string, nn: string, en: string} }>, tittel: string}) => {

    const language = useContext(LanguageContext);

    return(
        <>
            <div className={style.listeContainer}>
                <Detail className={style.listeTittel}>{tittel}</Detail>
                <ul className={style.liste}>
                    {liste.map((link) => (
                    <li className={style.lenke}>
                        <BodyShort>
                            <a 
                                href={link.url[language]} 
                                className={style.color}
                                onClick={() => logNavigereEvent("Innloggede tjenester lenke", "lenke", "innloggede-tjenester", link["nb"])}
                            >
                                {link[language]}
                            </a>
                        </BodyShort>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default LenkeListe;