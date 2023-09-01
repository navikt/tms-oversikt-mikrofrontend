import dayjs from "dayjs";
import { HovedYtelse, Trekk, UnderYtelse } from "./utbetalingTypes";

export const hasUtbetalinger = (utbetalteUtbetalinger: HovedYtelse[] | []) => utbetalteUtbetalinger.length > 0;

function sum(numbers: number[]): number {
  return numbers.reduce(
    (a, b) => a + b,
    0
  );
}

export function summerTrekk(trekk: Trekk[]): number {
  return sum(trekk.map(trekkbelop => trekkbelop.trekk_belop));
}

export function summerYtelser(ytelse: UnderYtelse[], trekk: Trekk[]): number {
  return summerTrekk(trekk) + summerBruttoYtelser(ytelse);
}

export function summerBruttoYtelser(ytelse: UnderYtelse[]): number {
  return sum(ytelse.map(underytelse => underytelse.belop));
}

export const formatToReadableDate = (date: string) => {
  return dayjs(date).format("D. MMMM ");
};
