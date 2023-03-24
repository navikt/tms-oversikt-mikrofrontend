import React, { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageProvider";
import { text } from "../../language/text";
import dayjs from "dayjs";

const isMorgen = (hour) => hour >= 5 && hour < 10;
const isKveld = (hour) => hour >= 18;

export const getVelkomsthilsen = () => {
  const language = useContext(LanguageContext);
  const hour = dayjs().hour();

  if (isMorgen(hour)) {
    return text.sidetittelVelkomsthilsenMorgen[language];
  }

  if (isKveld(hour)) {
    return text.sidetittelVelkomsthilsenKveld[language];
  }

  return text.sidetittelVelkomsthilsen[language];
};
