-- ==========================================
-- SUPER ADMIN DASHBOARD - SUPABASE SCHEMA
-- ==========================================

-- Clean up existing tables (fixes the "cannot drop table" dependency errors)
DROP TABLE IF EXISTS public.invoices CASCADE;
DROP TABLE IF EXISTS public.tickets CASCADE;
DROP TABLE IF EXISTS public.system_logs CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;

-- 1. Create Clients Table
CREATE TABLE public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT,
    plan TEXT NOT NULL DEFAULT 'Basic',
    used_employees INT DEFAULT 0,
    limit_employees INT DEFAULT 50,
    admin_email TEXT UNIQUE,
    password TEXT,
    status TEXT DEFAULT 'Active', -- 'Active', 'Suspended', 'Trial'
    payment_status TEXT DEFAULT 'Paid', -- 'Paid', 'Pending', 'Failed', 'Overdue'
    joined_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Billing/Invoices Table
CREATE TABLE public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_number TEXT NOT NULL UNIQUE,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'Paid', -- 'Paid', 'Overdue', 'Failed', 'Pending'
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Support Tickets Table
CREATE TABLE public.tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_number TEXT NOT NULL UNIQUE,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Critical'
    status TEXT DEFAULT 'Open', -- 'Open', 'In Progress', 'Escalated', 'Resolved'
    assignee TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create System Logs Table
CREATE TABLE public.system_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL, -- 'info', 'warning', 'error'
    message TEXT NOT NULL,
    service TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- REALTIME SUBSCRIPTIONS (Optional)
-- ==========================================
-- Enable Replication so changes instantly update the dashboard UI 
alter publication supabase_realtime add table public.clients;
alter publication supabase_realtime add table public.tickets;
alter publication supabase_realtime add table public.invoices;

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
-- Enable security policies on tables to prevent unauthorized access
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- 💡 PUBLIC ACCESS FOR TESTING:
-- Since you are currently testing the app without a login system, 
-- these policies allow anyone (the "anon" key) to Read, Insert, Update, and Delete.
-- (Make sure to change these before going to production!)
CREATE POLICY "Enable public access for testing" ON public.clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access for testing" ON public.invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access for testing" ON public.tickets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access for testing" ON public.system_logs FOR ALL USING (true) WITH CHECK (true);
