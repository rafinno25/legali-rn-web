// Simple in-memory state for waiver acceptance
// Resets when app is closed/restarted
let waiverAccepted = false;

export const setWaiverAccepted = (accepted: boolean) => {
  waiverAccepted = accepted;
};

export const getWaiverAccepted = (): boolean => {
  return waiverAccepted;
};
