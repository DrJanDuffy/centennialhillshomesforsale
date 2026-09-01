const FAIR_HOUSING_PROXIES =
  /safe neighborhood|good schools|family-friendly|established community|exclusive (area|community)|private (enclave|community)/i;

/** Returns true if client-facing draft text uses protected-class proxies. */
export function failsFairHousing(text: string): boolean {
  return FAIR_HOUSING_PROXIES.test(text);
}
