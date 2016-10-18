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
  `person` bigint(20) NOT NULL,
  `enable` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_login` (`user_login`),
  KEY `person_id` (`person`),
  CONSTRAINT `person_id_fk` FOREIGN KEY (`person`) REFERENCES `persons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO credential (user_login, user_password, date_of_creation, person, enable)  VALUES
                        ('bigboss', '$2a$10$G7WNiS7VNgw7uhsKefRQJ.MfbXChLpsdNDeaPuAs/NZ./qIbuM6ri', NULL, 2, 1 );

CREATE TABLE `carwash` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `box_count` int(11) NOT NULL,
  `first_shift` time NOT NULL,
  `second_shift` time NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `date_of_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enable` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `person_id` (`created_by`),
  CONSTRAINT `person_id_fk1` FOREIGN KEY (`created_by`) REFERENCES `persons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8