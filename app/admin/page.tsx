import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidAdminToken } from "@/lib/adminAuth";
import { listLeads } from "@/lib/db";
import { Lead } from "@/lib/types";
import AdminLogin from "@/components/AdminLogin";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

function companyLabel(lead: Lead): string {
  if (lead.groupMedicalEnquiry) {
    return `${lead.groupMedicalEnquiry.companyName} (${lead.groupMedicalEnquiry.employeeCount} employees)`;
  }
  if (lead.commercialEnquiry) {
    return `${lead.commercialEnquiry.companyName} (${lead.commercialEnquiry.lineType})`;
  }
  return "—";
}

export default async function AdminPage() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidAdminToken(token)) {
    return (
      <main className="min-h-screen bg-stone-50">
        <AdminLogin />
      </main>
    );
  }

  const leads = await listLeads();

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-stone-900">Leads ({leads.length})</h1>
          <AdminLogoutButton />
        </div>
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 text-xs uppercase text-stone-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Interested in</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-stone-100 last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-stone-500">
                    {new Date(lead.createdAt).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 font-medium text-stone-900">{lead.name}</td>
                  <td className="px-4 py-3 text-stone-600">{companyLabel(lead)}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.city}</td>
                  <td className="px-4 py-3">
                    {[...(lead.interestedIn ?? []), ...(lead.waitlistProducts ?? [])].join(", ")}
                  </td>
                  <td className="px-4 py-3 text-stone-600">{lead.advisorSummary ?? "—"}</td>
                  <td className="px-4 py-3 text-stone-500">{lead.source}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-stone-400">
                    No leads yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
