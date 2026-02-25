class BannerManager {
    current = $state<{
        message: string | null;
        type?: "info" | "warning" | "error";
    }>({ message: null });

    set(message: string | null, type?: "info" | "warning" | "error") {
        this.current = { message, type };
    }
}

export const banner = new BannerManager();
