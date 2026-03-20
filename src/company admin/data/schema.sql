-- HR SaaS Company Admin Supabase Schema
-- Paste this entire file into your Supabase SQL Editor and click "Run"

-- Company Employees Table
CREATE TABLE IF NOT EXISTS company_employees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    department TEXT,
    role TEXT,
    salary NUMERIC,
    status TEXT DEFAULT 'Active',
    joining_date DATE,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Attendance Table
CREATE TABLE IF NOT EXISTS company_attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id TEXT NOT NULL,
    employee_id UUID REFERENCES company_employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    check_in TEXT,
    check_out TEXT,
    status TEXT DEFAULT 'Present',
    is_late BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Leaves Table
CREATE TABLE IF NOT EXISTS company_leaves (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id TEXT NOT NULL,
    employee_id UUID REFERENCES company_employees(id) ON DELETE CASCADE,
    leave_type TEXT NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Performance Table
CREATE TABLE IF NOT EXISTS company_performance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id TEXT NOT NULL,
    employee_id UUID REFERENCES company_employees(id) ON DELETE CASCADE,
    goal_title TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    rating INTEGER DEFAULT 0,
    manager_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Documents Table
CREATE TABLE IF NOT EXISTS company_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id TEXT NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    url TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Exits Table
CREATE TABLE IF NOT EXISTS company_exits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id TEXT NOT NULL,
    employee_id UUID REFERENCES company_employees(id) ON DELETE CASCADE,
    employee_name TEXT, -- Optional denormalization for easier real-time view
    notice_period_progress INTEGER DEFAULT 0,
    asset_return TEXT DEFAULT 'Pending',
    settlement_status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for all tables
ALTER TABLE company_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_exits ENABLE ROW LEVEL SECURITY;

-- Create public access policies (For testing/demo purposes)
-- WARNING: In production, these should be restricted to authenticated users with matching company_id
CREATE POLICY "Public Employee Operations" ON company_employees FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Attendance Operations" ON company_attendance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Leave Operations" ON company_leaves FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Performance Operations" ON company_performance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Document Operations" ON company_documents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Exit Operations" ON company_exits FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE company_employees;
ALTER PUBLICATION supabase_realtime ADD TABLE company_attendance;
ALTER PUBLICATION supabase_realtime ADD TABLE company_leaves;
ALTER PUBLICATION supabase_realtime ADD TABLE company_performance;
ALTER PUBLICATION supabase_realtime ADD TABLE company_documents;
ALTER PUBLICATION supabase_realtime ADD TABLE company_exits;
