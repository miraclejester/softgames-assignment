export class ColorUtils {
    public static lerpColor(startColor: number, endColor: number, t: number): number {
        const start_red: number = (startColor >> 16) & 0xff;
        const start_green: number = (startColor >> 8) & 0xff;
        const start_blue: number = startColor & 0xff;

        const end_red: number = (endColor >> 16) & 0xff;
        const end_green: number = (endColor >> 8) & 0xff;
        const end_blue: number = endColor & 0xff;

        const red: number = Math.round(start_red + (end_red - start_red) * t);
        const green: number = Math.round(start_green + (end_green - start_green) * t);
        const blue: number = Math.round(start_blue + (end_blue - start_blue) * t);

        return (red << 16) | (green << 8) | blue;
    }
}