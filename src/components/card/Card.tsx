import React from "react";
import { Bell, Edit } from "@navikt/ds-icons";
import { BodyShort, Heading, Label } from "@navikt/ds-react";
import style from "./Card.module.css"

type Props = {
    tittel: string, 
    ingress: string
    type: string
    url: string
}

const Card = ({tittel, ingress, type, url}: Props) => {
    
    const ikonBackgroundColor = "ikon" + type;
    const isUtkast = type === "utkast";

    return(
        <div className={`${style.card} ${style[type]}`}>
            <div className={`${style.ikonWrapper} ${style[ikonBackgroundColor]}`}> 
                {isUtkast ? <Edit fontSize="24px"/> : <Bell fontSize="24px"/>}
            </div>
            <a href={url} className={style.text}>
                <Heading level="2" size="small" className={style.tittel}>{tittel}</Heading>
                <span className={style.ingress}>{ingress}</span>
            </a>
        </div>
    )
}

export default Card;