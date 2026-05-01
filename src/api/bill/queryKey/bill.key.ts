const FEATURES_KEY = ['bill'];

export const billQueryKeys = {
  basic: FEATURES_KEY,
  history: (startDate: string, endDate?: string) => [...FEATURES_KEY, 'history', { startDate, endDate }],
};
