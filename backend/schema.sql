-- Finekot Backend Schema
-- Run this once against your MySQL database

CREATE TABLE IF NOT EXISTS gallery_groups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS gallery_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  caption VARCHAR(255) NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_gallery_group FOREIGN KEY (group_id) REFERENCES gallery_groups(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  company_name VARCHAR(150),
  city VARCHAR(150),
  product VARCHAR(150),
  requirement TEXT NOT NULL,
  attachment_path VARCHAR(255),
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- If you already ran the old version of this schema, apply these instead:
-- ALTER TABLE contact_submissions ADD COLUMN city VARCHAR(150) AFTER company_name;
-- ALTER TABLE contact_submissions ADD COLUMN product VARCHAR(150) AFTER city;
-- ALTER TABLE contact_submissions ADD COLUMN attachment_path VARCHAR(255) AFTER requirement;

-- Seed the groups that match your current frontend gallery.js data.
-- Edit these to match your actual group names exactly.
INSERT INTO gallery_groups (name, sort_order) VALUES
  ('Manufacturing Facility', 1),
  ('Production Process', 2),
  ('Machinery & Infrastructure', 3),
  ('Completed Projects', 4);
