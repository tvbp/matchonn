/** Builds a wa.me click-to-chat link to the advisor desk — see README for
 * why this doesn't need a WhatsApp Business API provider yet. */
export function getAdvisorWhatsappLink(message: string): {
  whatsappLink: string;
  advisorNumber: string;
} {
  const advisorNumber = process.env.NEXT_PUBLIC_ADVISOR_WHATSAPP_NUMBER || "910000000000";
  return {
    advisorNumber,
    whatsappLink: `https://wa.me/${advisorNumber}?text=${encodeURIComponent(message)}`,
  };
}
