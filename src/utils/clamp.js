// eslint-disable-next-line no-extend-native
export const clamp = (x, min, max) => {
    return Math.min(Math.max(x, min), max);
}