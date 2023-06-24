import AR from "./ar";
import BN from "./bn";
import CN from "./cn";
import EN from "./en";
import HI from "./hi";
import TW from "./tw";
import FR from "./fr";
import ES from "./es";
import IT from "./it";
import TR from "./tr";
import JP from "./jp";
import DE from "./de";
import VI from "./vi";
import RU from "./ru";
import CS from "./cs";
import KO from "./ko";
import PL from "./pl";
import CR from "./cr";
import PR from "./pr";
import CZ from "./cz";
import GR from "./gr";
import KZ from "./kz";
import DU from "./du";
import HR from "./hr";
import TG from "./tg";
import { merge } from "../utils/merge";

export type { LocaleType, RequiredLocaleType } from "./cn";

export const AllLangs = [
  "ar",
  "bn",
  "en",
  "cn",
  "hi",
  "tw",
  "fr",
  "es",
  "it",
  "tr",
  "jp",
  "de",
  "vi",
  "ru",
  "cs",
  "ko",
  "pl",
  "cr",
  "pr",
  "cz",
  "gr",
  "kz",
  "du",
  "hr",
  "tg",
] as const;
export type Lang = (typeof AllLangs)[number];

export const ALL_LANG_OPTIONS: Record<Lang, string> = {
  ar: "عربي",
  bn: "বাংলা",
  cn: "简体中文",
  en: "English",
  hi: "हिंदी",
  tw: "繁體中文",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  tr: "Türkçe",
  jp: "日本語",
  de: "Deutsch",
  vi: "Tiếng Việt",
  ru: "Русский",
  cs: "Čeština",
  ko: "한국어",
  pl: "Polski",
  cr: "Cornish",
  pr: "Portugêse",
  cz: "Czech",
  gr: "Greek",
  kz: "Kazakh",
  du: "Dutch",
  hr: "Hebrew",
  tg: "Tagalog",
};

const LANG_KEY = "lang";
const DEFAULT_LANG = "en";

function getItem(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function getLanguage() {
  try {
    return navigator.language.toLowerCase();
  } catch {
    return DEFAULT_LANG;
  }
}

export function getLang(): Lang {
  const savedLang = getItem(LANG_KEY);

  if (AllLangs.includes((savedLang ?? "") as Lang)) {
    return savedLang as Lang;
  }

  const lang = getLanguage();

  for (const option of AllLangs) {
    if (lang.includes(option)) {
      return option;
    }
  }

  return DEFAULT_LANG;
}

export function changeLang(lang: Lang) {
  setItem(LANG_KEY, lang);
  location.reload();
}

const fallbackLang = EN;
const targetLang = {
  ar: AR,
  bn: BN,
  en: EN,
  cn: CN,
  tw: TW,
  hi: HI
  fr: FR,
  es: ES,
  it: IT,
  tr: TR,
  jp: JP,
  de: DE,
  vi: VI,
  ru: RU,
  cs: CS,
  ko: KO,
  pl: PL,
  cr: CR,
  pr: PR,
  cz: CZ,
  gr: GR,
  kz: KZ,
  du: DU,
  hr: HR,
  tg: TG,
}[getLang()] as typeof CN;

// if target lang missing some fields, it will use fallback lang string
merge(fallbackLang, targetLang);

export default fallbackLang as typeof CN;
