const useValidations = (value, fieldId) => {

    if (!value || (Array.isArray(value) && value.length === 0)) {
      return "This field is required";
    }

    switch (fieldId) {
      case "name":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Name should only contain alphabets and spaces";
        }
        if (value.length < 3) {
          return "Name must be at least 3 characters long";
        }
        break;
  
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        break;
  
      case "dob":
        const inputDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison
        if (inputDate >= today) {
          return "Date of birth must be in the past";
        }
        break;
      case "phone":
        if (!/^[0-9]+$/.test(value)) {
          return "Phone number should only contain digits";
        }
  
      default:
        break;
    }
  
    return undefined;
  };
  
  export default useValidations;