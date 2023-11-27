/**
 * The function `useTextDirection` returns the text direction ("rtl" for right-to-left or "ltr" for
 * left-to-right) based on the given locale or the default locale if none is provided.
 * @returns The function `useTextDirection` returns either "rtl" or "ltr" based on the text direction
 * of the provided `locale` parameter. If the `locale` parameter is not provided, it uses the default
 * locale obtained from the `useLocale` hook.
 */
import { useLocale } from "next-intl";
import { isRtlLang } from "rtl-detect";

export default function useTextDirection(locale) {
    const defaultLocale = useLocale();
    if (!locale) locale = defaultLocale;
    return isRtlLang(locale) ? "rtl" : "ltr";
}
