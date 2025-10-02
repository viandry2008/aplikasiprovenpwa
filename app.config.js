export default {
    expo: {
        name: "SHRM RFID",
        slug: "shrm-rfid",
        version: "1.0.0",
        orientation: "portrait",
        platforms: ["ios", "android", "web"],
        icon: "./assets/images/icon.png",
        splash: {
            image: "./assets/images/icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        web: {
            favicon: "./icons/icon-192.png",
            bundler: "metro",
            name: "SHRM RFID",
            shortName: "SHRM RFID",
            themeColor: "#000000",
            backgroundColor: "#ffffff"
        },
        assetBundlePatterns: [
            "assets/fonts/*",   // ⬅️ pastikan font ikut dibundle
            "assets/images/*",
            "icons/*"
        ],
        extra: {
            baseUrl: "./"
        }
    }
};
