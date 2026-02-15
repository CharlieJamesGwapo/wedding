-- Wedding Database Schema
-- Create tables for RSVP and Photo Share functionality

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- RSVP table to store wedding RSVP responses
CREATE TABLE IF NOT EXISTS rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    attending VARCHAR(10) NOT NULL CHECK (attending IN ('yes', 'no')),
    number_of_guests INTEGER DEFAULT 0 CHECK (number_of_guests >= 0 AND number_of_guests <= 10),
    meal_preference VARCHAR(50),
    dietary_restrictions TEXT,
    message TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Photo share table to store uploaded photos
CREATE TABLE IF NOT EXISTS photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uploader_name VARCHAR(255) NOT NULL,
    caption TEXT,
    image_url TEXT NOT NULL,
    image_data TEXT, -- Base64 encoded image data
    file_size INTEGER,
    file_type VARCHAR(50),
    likes INTEGER DEFAULT 0,
    approved BOOLEAN DEFAULT FALSE, -- For moderation if needed
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvps_submitted_at ON rsvps(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvps_attending ON rsvps(attending);
CREATE INDEX IF NOT EXISTS idx_photos_uploaded_at ON photos(uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_photos_approved ON photos(approved);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_rsvps_updated_at BEFORE UPDATE ON rsvps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_photos_updated_at BEFORE UPDATE ON photos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing (optional)
-- INSERT INTO rsvps (full_name, email, attending, number_of_guests, meal_preference, dietary_restrictions, message)
-- VALUES 
--     ('John Doe', 'john@example.com', 'yes', 2, 'chicken', 'None', 'Looking forward to the celebration!'),
--     ('Jane Smith', 'jane@example.com', 'no', 0, NULL, NULL, 'Sorry we cannot make it, but we wish you all the best!');

-- INSERT INTO photos (uploader_name, caption, image_url, likes, approved)
-- VALUES 
--     ('Sarah Johnson', 'Beautiful sunset at the venue!', 'https://example.com/photo1.jpg', 24, TRUE),
--     ('David Thompson', 'The couple looks amazing together!', 'https://example.com/photo2.jpg', 18, TRUE);
