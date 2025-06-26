-- Database schema for MinitaskManager
-- Run this script to create the required tables

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'done')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);

-- Insert sample data (optional)
INSERT INTO tasks (title, status) VALUES 
    ('Complete project setup', 'done'),
    ('Deploy to production', 'pending'),
    ('Write documentation', 'pending')
ON CONFLICT DO NOTHING; 