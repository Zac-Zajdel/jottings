-- AlterTable
ALTER TABLE `jots` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Draft' AFTER `content`,
    ADD COLUMN `priority` VARCHAR(191) NULL AFTER `status`;
