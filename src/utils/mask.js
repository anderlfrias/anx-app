export const maskPhoneNumber = (phone) => {
  if (!phone) return '';
  const phoneMask = phone.length === 10 ? phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') :
    phone.length === 11 ? phone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4') :
      phone;

  return phoneMask
}