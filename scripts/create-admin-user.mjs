import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal(rootDir) {
  const envPath = join(rootDir, ".env.local");
  const contents = readFileSync(envPath, "utf8");
  const values = {};

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    values[key] = value.replace(/^['"]|['"]$/g, "");
  }

  return values;
}

const rootDir = process.cwd();
const env = loadEnvLocal(rootDir);
const url = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
}

const email = process.env.ADMIN_EMAIL || "onyekatofunmi@gmail.com";
const password = process.env.ADMIN_PASSWORD || "AsterOakAdmin2026!";

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
if (listError) {
  throw listError;
}

const userMatch = existingUsers.users.find((user) => user.email?.toLowerCase() === email.toLowerCase());

if (userMatch) {
  const { data, error } = await supabase.auth.admin.updateUserById(userMatch.id, {
    app_metadata: { role: "admin" },
    user_metadata: { role: "admin" },
  });

  if (error) throw error;

  console.log(`Admin role ensured for existing user: ${data.user.email}`);
  process.exit(0);
}

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  app_metadata: { role: "admin" },
  user_metadata: { role: "admin" },
});

if (error) {
  throw error;
}

console.log(`Created admin user: ${data.user.email}`);
