import React, { useContext } from "react";
import { Bell, Edit, Next } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import ContentLoader from "../loader/ContentLoader";
import style from "./Card.module.css";
import { logNavigereEvent } from "../../utils/amplitude";

type Props = {
    tittel: string,
    ingress: string
    type: string
    url: string
}

const Card = ({tittel, ingress, type, url}: Props) => {
    const language = useContext(LanguageContext);
    const ikonBackgroundColor = "ikon" + type;
    const isUtkast = type === "utkast";
    const isLoading = ingress === "isLoading";

    return(
        <div className={`${style.card} ${style[type]}`}>
            <div className={style.container}>
                <div className={`${style.ikonWrapper} ${style[ikonBackgroundColor]}`}>
                    {isLoading ? <ContentLoader /> :
                    isUtkast ? <Edit fontSize="24px"/> : <Bell fontSize="24px"/>
                    }
                </div>
                <a 
                    href={url} 
                    className={isLoading ? `${style.loading} ${style.text}`: style.text} 
                    onClick={() => logNavigereEvent(isUtkast ? "Utkast inngang" : "Varsler inngang", "card", "alert-island", ingress)}>
                    {isLoading ? <span className={style.ingress}>{text.loaderTekst[language]}</span> :
                    <>
                        <Heading level="2" size="small" className={style.tittel}>{tittel}</Heading>
                        <span className={style.ingress}>{ingress}</span>
                    </>}
                </a>
            </div>
            <Next className={style.chevron} fontSize="24px"/>
        </div>
    )
}

export default Card;
