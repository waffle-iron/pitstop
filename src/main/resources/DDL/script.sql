CREATE TABLE users (
  id BIGINT AUTO_INCREMENT NOT NULL,
  user_name VARCHAR(50) NOT NULL ,
  user_password VARCHAR(60) NOT NULL,
  enable BIT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (user_name, user_password, enable) VALUES ('bigboss', '$2a$10$G7WNiS7VNgw7uhsKefRQJ.MfbXChLpsdNDeaPuAs/NZ./qIbuM6ri', 1);

ALTER TABLE users ADD UNIQUE (user_name);
ALTER TABLE users CHANGE user_name user_login VARCHAR(50);
ALTER TABLE users MODIFY user_login VARCHAR(50) NOT NULL;
ALTER TABLE users ADD role VARCHAR(50) NOT NULL

