USE `arsu`;

CREATE TABLE `arsu`.`Users` ( `id` INT NOT NULL AUTO_INCREMENT ,
`username` VARCHAR(255) NOT NULL UNIQUE,
`password` VARCHAR(255) NOT NULL ,
`email` VARCHAR(255) NOT NULL ,
`is_admin` TINYINT(1) DEFAULT NULL ,
`date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `arsu`.`Interests` ( `id` INT NOT NULL AUTO_INCREMENT ,
`tags` VARCHAR(255) NOT NULL ,
`user_id` INT NOT NULL ,
PRIMARY KEY (`id`) ,
FOREIGN KEY (`user_id`) REFERENCES Users(`id`)) ENGINE = InnoDB;

CREATE TABLE `arsu`.`Playlists` ( `id` INT NOT NULL AUTO_INCREMENT ,
`playlist_name` VARCHAR(255) NOT NULL ,
`user_id` INT NOT NULL ,
PRIMARY KEY (`id`) ,
FOREIGN KEY (`user_id`) REFERENCES Users(`id`)) ENGINE = InnoDB;

CREATE TABLE `arsu`.`PlaylistContent` ( `id` INT NOT NULL AUTO_INCREMENT ,
`podcast_id` INT NOT NULL ,
`playlist_id` INT NOT NULL ,
PRIMARY KEY (`id`) ,
FOREIGN KEY (`playlist_id`) REFERENCES Playlists(`id`)) ENGINE = InnoDB;

CREATE TABLE `arsu`.`History` ( `id` INT NOT NULL AUTO_INCREMENT ,
`podcast_id` INT NOT NULL ,
`user_id` INT NOT NULL ,
PRIMARY KEY (`id`) ,
FOREIGN KEY (`user_id`) REFERENCES Users(`id`)) ENGINE = InnoDB;

CREATE TABLE `arsu`.`Favourites` ( `id` INT NOT NULL AUTO_INCREMENT ,
`podcast_id` INT NOT NULL ,
`user_id` INT NOT NULL ,
PRIMARY KEY (`id`) ,
FOREIGN KEY (`user_id`) REFERENCES Users(`id`)) ENGINE = InnoDB;

CREATE TABLE `arsu`.`Unfinished` ( `id` INT NOT NULL AUTO_INCREMENT ,
`podcast_id` INT NOT NULL ,
`user_id` INT NOT NULL ,
`timestamp` TIMESTAMP NOT NULL ,
PRIMARY KEY (`id`) ,
FOREIGN KEY (`user_id`) REFERENCES Users(`id`)) ENGINE = InnoDB;
