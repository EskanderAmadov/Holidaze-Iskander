export const isValidEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const isNoroffStudentEmail = (email) => {
  return /@stud\.noroff\.no$/.test(email);
};
