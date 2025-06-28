
export const sendWhatsAppMessage = (phone: string, message: string) => {
  // Format the phone number (remove any non-digit characters)
  const formattedPhone = phone.replace(/\D/g, "+212 664-685824");
  
  // Create the WhatsApp URL with the phone number and message
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  // Open the URL in a new tab
  window.open(whatsappUrl, '_blank');
  
  return true;
};
