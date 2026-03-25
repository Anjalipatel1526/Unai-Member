-- Run this SQL in Supabase Dashboard > SQL Editor
-- Creates tables for employee login and attendance tracking

-- 1. Employee Credentials (for employee login)
CREATE TABLE IF NOT EXISTS public.employee_credentials (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id text NOT NULL,
    employee_id text,
    employee_name text NOT NULL,
    work_email text NOT NULL UNIQUE,
    password text NOT NULL,
    department text DEFAULT '',
    designation text DEFAULT '',
    status text DEFAULT 'active',
    created_at timestamptz DEFAULT now()
);

ALTER TABLE public.employee_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on employee_credentials"
    ON public.employee_credentials
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 2. Company Attendance (for check-in/check-out tracking)
CREATE TABLE IF NOT EXISTS public.company_attendance (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id text NOT NULL,
    employee_id text,
    employee_name text NOT NULL,
    department text,
    date text NOT NULL,
    check_in text,
    check_out text,
    working_hours text,
    status text DEFAULT 'Present',
    is_late boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE public.company_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on company_attendance"
    ON public.company_attendance
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 3. Company Leaves (for leave request management)
CREATE TABLE IF NOT EXISTS public.company_leaves (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id text NOT NULL,
    employee_id text,
    employee_name text NOT NULL,
    leave_type text NOT NULL,
    from_date text NOT NULL,
    to_date text NOT NULL,
    reason text,
    status text DEFAULT 'Pending',
    days integer DEFAULT 1,
    applied_on timestamptz DEFAULT now(),
    approved_by text,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE public.company_leaves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on company_leaves"
    ON public.company_leaves
    FOR ALL
    USING (true)
    WITH CHECK (true);
