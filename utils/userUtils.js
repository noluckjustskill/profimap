const initials = (name = '') => {
  const [lastName, firstName] = name.split(/\s+/g);

  return `${lastName.charAt(0)} ${firstName ? firstName.charAt(0) : ''}`.trim().toUpperCase();
};

export {
  initials,
};
