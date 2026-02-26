import { banner } from "../lib/banner-manager.svelte";
import { settings } from "../lib/settings-manager.svelte";

export default function detectLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                settings.latitude = position.coords.latitude;
                settings.longitude = position.coords.longitude;
            },
            (error) => {
                banner.set(
                    "حدث خطأ عند محاولة تحديد الموقع. حاول مرة أخرى أو أدخل الموقع يدويًا.",
                    "error",
                );
                console.error("Geolocation error:", error);
            },
        );
    } else {
        banner.set("خدمة تحديد الموقع غير متوفرة", "error");
        console.error("Geolocation is not available");
    }
}
