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

-- Company Exits Table
CREATE TABLE IF NOT EXISTS company_exits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id TEXT NOT NULL,
    employee_id UUID REFERENCES company_employees(id) ON DELETE CASCADE,
    notice_period_progress INTEGER DEFAULT 0,
    asset_return TEXT DEFAULT 'Pending',
    settlement_status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a Mock Employee to avoid total blank states
INSERT INTO company_employees (company_id, name, email, department, role, status, salary, joining_date)
VALUES ('COMP_001', 'Alice Johnson', 'alice@unaitech.com', 'Engineering', 'Lead Developer', 'Active', 120000, '2023-01-15')
ON CONFLICT DO NOTHING;

-- Enable Realtime for all tables
alter publication supabase_realtime add table company_employees;
alter publication supabase_realtime add table company_attendance;
alter publication supabase_realtime add table company_leaves;
alter publication supabase_realtime add table company_exits;
