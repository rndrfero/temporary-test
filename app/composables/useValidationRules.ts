export const useValidationRules = () => {
  return {
    required: (v: any) => !!v || "This field is required",

    minLength: (min: number) => (v: string) =>
      !v || v.length >= min || `Minimum ${min} characters required`,

    maxLength: (max: number) => (v: string) =>
      !v || v.length <= max || `Maximum ${max} characters allowed`,

    dateNotInPast: (v: string) => {
      if (!v) return true;
      const selectedDate = new Date(v);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today || "Date cannot be in the past";
    },
  };
};
