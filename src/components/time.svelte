<script lang="ts">
    import type { AlAdhanTypes } from "@islamicnetwork/sdk";
    import {
        formatDuration,
        intervalToDuration,
        type Duration,
    } from "date-fns";

    let { duration }: { duration: Duration | null } = $props();
</script>

<div>
    {#if duration === null}
        <span class="duration">00:00:00</span>
    {:else}
        <span class="duration" dir="ltr">
            {#each [{ c: "hours", v: duration.hours }, { c: "minutes", v: duration.minutes }, { c: "seconds", v: duration.seconds }] as { c, v }}
                <span class={c}>
                    {v
                        ? v.toString().padStart(2, "0")
                        : "00"}{#if c !== "seconds"}:{/if}
                </span>
            {/each}
        </span>
    {/if}
</div>
