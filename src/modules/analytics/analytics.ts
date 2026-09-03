export const analyticsEvents = [
  "landing_view",
  "pricing_view",
  "trial_cta_clicked",
  "trial_started",
  "onboarding_completed",
] as const;

export type AnalyticsEventName = (typeof analyticsEvents)[number];

export interface AnalyticsAdapter {
  track(event: AnalyticsEventName): Promise<void>;
}

/**
 * PRE_LAUNCH deliberately uses a no-op adapter. A real provider must not be
 * wired until the consent model and retention policy receive privacy approval.
 */
export const disabledAnalyticsAdapter: AnalyticsAdapter = {
  async track(): Promise<void> {
    return Promise.resolve();
  },
};
