CREATE TABLE `site` (
    `site_name` VARCHAR(100) NOT NULL,
    `site_real_name` VARCHAR(100),

    PRIMARY KEY (`site_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `line_prod` (
    `id_line_prod` INTEGER NOT NULL AUTO_INCREMENT,
    `prod_unit_minute` DOUBLE NOT NULL,
    `line_number` INTEGER NOT NULL,
    `id_site` VARCHAR(100),

    PRIMARY KEY (`id_line_prod`),
    CONSTRAINT fk_site FOREIGN KEY (`id_site`) REFERENCES site(site_name)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `address_site` (
    `site_name` VARCHAR(100) NOT NULL,
    `street` VARCHAR(150),
    `post_code` INTEGER,
    `town` VARCHAR(50),
    `country` VARCHAR(50),

    PRIMARY KEY (`site_name`),
    CONSTRAINT fk_site_name FOREIGN KEY (`site_name`) REFERENCES site(site_name)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table user
(
    id       int auto_increment primary key,
    email    varchar(70) not null,
    username varchar(50) null,
    password varchar(25) null,
    role     varchar(15) null,
    constraint user_pk unique (username)
);