import React from "react";
import { text } from "../../language/text";
import dayjs from "dayjs";

const isMorgen = (hour: number) => hour >= 5 && hour < 10;
const isKveld = (hour: number) => hour >= 18;

export const getVelkomsthilsen = (language: string) => {
  const hour = dayjs().hour();

  if (isMorgen(hour)) {
    return text.sidetittelVelkomsthilsenMorgen[language];
  }

  if (isKveld(hour)) {
    return text.sidetittelVelkomsthilsenKveld[language];
  }

  return text.sidetittelVelkomsthilsen[language];
};
