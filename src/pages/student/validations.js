export default (values) => {
    const errors = {};
    if (!values.studentFirstName) {
      errors.studentFirstName = "This field is required";
    }
  
    if (!values.studentLastName) {
      errors.studentLastName = "This field is required";
    }
  
    if (!values.studentEmail) {
      errors.studentEmail = "This field is required";
    }
  
    if (values.studentEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.studentEmail)) {
      errors.studentEmail = "Please enter a valid email";
    }
  
    if (values.studentEmail && values.studentEmail !== values.studentEmail2) {
      errors.studentEmail2 = "Does not match";
    }
  
    if (!values.studentCampus) {
      errors.studentCampus = "This field is required";
    }
  
    if (!values.studentIdentificationType) {
      errors.studentIdentificationType = "This field is required";
    }
  
    if (!values.studentIdentificationNumber) {
      errors.studentIdentificationNumber = "This field is required";
    }
  
    return errors;
  };