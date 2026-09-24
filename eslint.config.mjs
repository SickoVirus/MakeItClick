import coreWebVitals from "eslint-config-next/core-web-vitals";
import next from "eslint-config-next";
import typescript from "eslint-config-next/typescript";

/* eslint-config-next 16 ships native flat configs, so these are spread
   directly — no FlatCompat shim. */
const eslintConfig = [
  // .claude/ holds vendored tooling (minified skill scripts), not app code.
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", ".claude/**"] },
  ...next,
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
