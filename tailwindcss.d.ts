/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "tailwindcss/lib/util/flattenColorPalette" {
  const flattenColorPalette: (colors: any) => any;
  export default flattenColorPalette;
}

declare module "tailwindcss-rtl" {
  const rtl: (options?: Record<string, unknown>) => unknown;
  export default rtl;
}
