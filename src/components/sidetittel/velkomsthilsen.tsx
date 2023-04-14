import React from "react";
import { text } from "../../language/text";
import dayjs from "dayjs";

const isMorgen = (hour) => hour >= 5 && hour < 10;
const isKveld = (hour) => hour >= 18;

export const getVelkomsthilsen = (language) => {
  const hour = dayjs().hour();

  if (isMorgen(hour)) {
    return text.sidetittelVelkomsthilsenMorgen[language];
  }

  if (isKveld(hour)) {
    return text.sidetittelVelkomsthilsenKveld[language];
  }

  return text.sidetittelVelkomsthilsen[language];
};
