-- AlterTable
ALTER TABLE `Folder` ADD COLUMN `isFavorite` BOOLEAN NOT NULL DEFAULT false AFTER `name`;

-- AlterTable
ALTER TABLE `Jot` ADD COLUMN `isFavorite` BOOLEAN NOT NULL DEFAULT false AFTER `jot`;
