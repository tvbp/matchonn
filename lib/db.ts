import { promises as fs } from "fs";
import path from "path";
import { Lead } from "./types";

/**
 * Minimal file-backed lead store for the MVP. Good enough for a single
 * instance / early pilot; swap for Postgres (or the CRM you pick) once
 * you have more than one app instance or need concurrent-write safety.
 */
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureStore(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf-8");
  }
}

export async function listLeads(): Promise<Lead[]> {
  await ensureStore();
  const raw = await fs.readFile(LEADS_FILE, "utf-8");
  return JSON.parse(raw) as Lead[];
}

export async function saveLead(lead: Lead): Promise<void> {
  await ensureStore();
  const leads = await listLeads();
  leads.unshift(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
