import type { Duration } from "date-fns";
import updateStatus from "../utils/updateStatus";
import { prayerTimesManager } from "./prayer-times.svelte";

export class StatusManager {
    isFasting: boolean | null = $state(null);
    timeUntilNextEvent: Duration | null = $state(null);

    constructor() {
        $effect.root(() => {
            $effect(() => {
                const update = () => {
                    if (prayerTimesManager.prayerTimesResponse) {
                        const status = updateStatus(
                            prayerTimesManager.prayerTimesResponse,
                        );
                        this.isFasting = status.isFasting;
                        this.timeUntilNextEvent = status.timeUntilNextEvent;
                    }
                };

                update();
                const timer = setInterval(update, 1000);
                return () => clearInterval(timer);
            });
        });
    }
}

export const status = new StatusManager();
