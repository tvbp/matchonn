/** "919876543210" -> "+91 98765 43210" (falls back to a "+" prefix for
 * unrecognized lengths, e.g. non-Indian numbers). */
export function formatPhoneDisplay(number: string): string {
  if (number.length === 12 && number.startsWith("91")) {
    return `+91 ${number.slice(2, 7)} ${number.slice(7)}`;
  }
  return `+${number}`;
}

export default function HandoffDone({
  whatsappLink,
  advisorNumber,
  heading = "You're all set!",
  description,
}: {
  whatsappLink: string;
  advisorNumber: string;
  heading?: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <p className="mt-4 text-lg font-semibold text-stone-900">{heading}</p>
      <p className="mt-2 text-sm text-stone-600">{description}</p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          Continue on WhatsApp
        </a>
        <a
          href={`tel:+${advisorNumber}`}
          className="inline-block rounded-lg border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 hover:border-stone-400"
        >
          Call instead
        </a>
      </div>
      <p className="mt-4 text-xs text-stone-500">
        WhatsApp link not opening? Message or call us directly at{" "}
        <span className="font-medium text-stone-700">{formatPhoneDisplay(advisorNumber)}</span>. We also
        have your details already — an advisor may reach out to you first.
      </p>
    </div>
  );
}
