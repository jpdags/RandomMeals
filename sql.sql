CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  student_id VARCHAR(64),
  role ENUM('student','admin') NOT NULL DEFAULT 'student',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  avatar_url VARCHAR(512),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  category ENUM('electronics','documents','clothing','accessories','others') NOT NULL DEFAULT 'others',
  description TEXT NOT NULL,
  place VARCHAR(255) NOT NULL,
  date_lost_found DATE NOT NULL,
  status ENUM('lost','found','claimed') NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  reported_by INT NOT NULL,
  claimed_by INT NULL,
  image_url VARCHAR(512),
  image_base64 LONGTEXT,
  deleted_by_reporter BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_items_reported_by FOREIGN KEY (reported_by) REFERENCES users(id),
  CONSTRAINT fk_items_claimed_by FOREIGN KEY (claimed_by) REFERENCES users(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  item_id INT NULL,
  message TEXT,
  image_url VARCHAR(512),
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  reported_reason TEXT,
  reported_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_msg_sender FOREIGN KEY (sender_id) REFERENCES users(id),
  CONSTRAINT fk_msg_receiver FOREIGN KEY (receiver_id) REFERENCES users(id),
  CONSTRAINT fk_msg_item FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info','warning','success','message','claim','report') NOT NULL DEFAULT 'info',
  related_id INT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_reported_by ON items(reported_by);
CREATE INDEX idx_items_claimed_by ON items(claimed_by);
CREATE INDEX idx_messages_item ON messages(item_id);
CREATE INDEX idx_messages_reported ON messages(reported);
CREATE INDEX idx_notifications_user ON notifications(user_id);