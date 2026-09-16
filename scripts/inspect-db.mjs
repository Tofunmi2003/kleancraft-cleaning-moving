import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.join(process.cwd(), '.env.local');
const raw = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of raw.split(/\r?\n/)) {
  if (!line.trim() || line.trim().startsWith('#')) continue;
  const idx = line.indexOf('=');
  if (idx === -1) continue;
  const key = line.slice(0, idx).trim();
  const value = line.slice(idx + 1).trim();
  env[key] = value.replace(/^['"]|['"]$/g, '');
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const { data: rows, error: rowsError } = await supabase
  .from('bookings')
  .select('id,status,customer_id,service_id,property_type,bedrooms,location,date,time,preferred_day,preferred_time,notes,created_at')
  .order('created_at', { ascending: false })
  .limit(10);

console.log('ROWS_ERROR', JSON.stringify(rowsError, null, 2));
console.log('ROWS', JSON.stringify(rows, null, 2));

const { data: customers, error: customersError } = await supabase
  .from('customers')
  .select('id,name,email,phone,address')
  .order('created_at', { ascending: false })
  .limit(10);

console.log('CUSTOMERS_ERROR', JSON.stringify(customersError, null, 2));
console.log('CUSTOMERS', JSON.stringify(customers, null, 2));

const { data: services, error: servicesError } = await supabase
  .from('services')
  .select('id,name,description')
  .order('created_at', { ascending: false })
  .limit(10);

console.log('SERVICES_ERROR', JSON.stringify(servicesError, null, 2));
console.log('SERVICES', JSON.stringify(services, null, 2));

const { data: payments, error: paymentsError } = await supabase
  .from('payments')
  .select('id,booking_id,amount,status,reference')
  .order('created_at', { ascending: false })
  .limit(10);

console.log('PAYMENTS_ERROR', JSON.stringify(paymentsError, null, 2));
console.log('PAYMENTS', JSON.stringify(payments, null, 2));
