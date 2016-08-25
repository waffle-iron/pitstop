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
ALTER TABLE users ADD role VARCHAR(50) NOT NULL;


CREATE TABLE `persons` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `second_name` varchar(50) NOT NULL,
  `father_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `date_of_birth` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` varchar(50) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `date_of_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO persons (first_name, second_name, father_name, phone_number, date_of_birth, role, created_by)  VALUES
                    ('Гриша', 'Аванесов', 'Игоревич', NULL, NULL, 'ROLE_OWNER', 0);

CREATE TABLE `credential` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_login` varchar(50) NOT NULL,
  `user_password` varchar(60) NOT NULL,
  `date_of_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `person_id` bigint(20) NOT NULL,
  `enable` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_login` (`user_login`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `credential_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8

