import { useLocale } from "next-intl";
import { isRtlLang } from "rtl-detect";

export default function useTextDirection(locale) {
    const defaultLocale = useLocale();
    if (!locale) locale = defaultLocale;
    return isRtlLang(locale) ? "rtl" : "ltr";
}
