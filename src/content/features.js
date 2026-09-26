/**
 * Launch feature switches.
 *
 * A flag set to `false` hides that module everywhere it appears — guest site and
 * admin dashboard alike — without deleting the underlying content or engine
 * logic. Flip it back to `true` to restore the feature; no other change needed.
 */
export const FEATURES = {
  /**
   * Non-vegetarian meal supplements.
   *
   * Owner decision (21 Sep 2026, OWNER_QUESTIONS.md item 11): hidden for now on
   * both the guest site and the admin dashboard. The pricing engine and the
   * `nonVeg*Paise` unit fields still work, so this is a display switch only.
   */
  nonVegSupplements: false,

  /**
   * School Excursions & Nature Camps (Group & Educational Experiences).
   *
   * Hidden for now — owner decision (26 Sep 2026). The package bundles a lunch
   * and two snacks, which the locked meal rule permits only for 24-hour cottage
   * stays and overnight camping; it is also absent from SPEC.md. Content and
   * tariffs are retained, so this is a display switch only.
   */
  schoolExcursions: false
};
