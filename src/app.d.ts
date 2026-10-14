// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Spec } from "vega";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      /** Chart specs compiled to Vega by the root layout. */
      chartSpecs: { yearly: Spec; monthly: Spec };
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
