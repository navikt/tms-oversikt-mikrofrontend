import React from "react";
import { useIntl } from "react-intl";
import { Bell, Edit, Next } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import ContentLoader from "../loader/ContentLoader";
import style from "./Card.module.css";


type Props = {
    tittel: string, 
    ingress: string
    type: string
    url: string
}

const Card = ({tittel, ingress, type, url}: Props) => {
    
    const translate = useIntl();
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
                <a href={url} className={isLoading ? `${style.loading} ${style.text}`: style.text}>
                    {isLoading ? <span className={style.ingress}>{translate.formatMessage({ id: "loader.tekst" })}</span> :
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