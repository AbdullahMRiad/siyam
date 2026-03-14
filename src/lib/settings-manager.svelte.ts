import { TEXT_FONTS, TIME_FONTS } from "../constants";
import type { TextFont, TimeFont } from "../types";

export class SettingsManager {
    latitude: number | null = $state(null);
    longitude: number | null = $state(null);
    backgroundColor = $state("#ffffff");
    foregroundColor = $state("#ffffff");
    fontSize = $state(128);
    fontWeight = $state(400);
    textFontFamily = $state<TextFont>("Alexandria Variable");
    timeFontFamily = $state<TimeFont>("Bricolage Grotesque Variable");

    constructor() {
        if (typeof window === "undefined") return;

        const params = new URLSearchParams(window.location.search);

        this.latitude = params.get("latitude")
            ? parseFloat(params.get("latitude")!)
            : null;
        this.longitude = params.get("longitude")
            ? parseFloat(params.get("longitude")!)
            : null;

        this.backgroundColor = params.get("bg") ?? "#121212";
        this.foregroundColor = params.get("fg") ?? "#ececec";

        this.textFontFamily = TEXT_FONTS.includes(
            (params.get("text_font") as TextFont) ?? "",
        )
            ? (params.get("text_font") as TextFont)
            : "Alexandria Variable";
        this.timeFontFamily = TIME_FONTS.includes(
            (params.get("time_font") as TimeFont) ?? "",
        )
            ? (params.get("time_font") as TimeFont)
            : "Bricolage Grotesque Variable";
        this.fontSize = params.get("font_size")
            ? parseInt(params.get("font_size")!)
            : window.innerWidth > 780
              ? 128
              : 64;
        this.fontWeight = params.get("font_weight")
            ? parseFloat(params.get("font_weight")!)
            : 400;
    }

    get isCoordsAvailable() {
        return this.latitude !== null && this.longitude !== null;
    }
}

export const settings = new SettingsManager();
