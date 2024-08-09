export const phoneValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value.replace(/[^0-9]/g, '');
  let formattedValue = '';
  if (rawValue.length <= 3) {
    formattedValue = rawValue;
  } else if (rawValue.length <= 7) {
    formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
  } else {
    formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(
      3,
      7,
    )}-${rawValue.slice(7, 11)}`;
  }

  return formattedValue;
};
