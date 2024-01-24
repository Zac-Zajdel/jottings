/*
  Warnings:

  - Added the required column `workspaceId` to the `jot_templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `jots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `labels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jot_templates` ADD COLUMN `workspaceId` VARCHAR(191) NOT NULL AFTER `id`;

-- AlterTable
ALTER TABLE `jots` ADD COLUMN `workspaceId` VARCHAR(191) NOT NULL AFTER `id`;

-- AlterTable
ALTER TABLE `labels` ADD COLUMN `workspaceId` VARCHAR(191) NOT NULL AFTER `authorId`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `activeWorkspaceId` VARCHAR(191) NULL AFTER `id`;

-- CreateTable
CREATE TABLE `workspaces` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `workspaces_ownerId_idx`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workspace_user` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `workspaceId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `workspace_user_userId_idx`(`userId`),
    INDEX `workspace_user_workspaceId_idx`(`workspaceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `jot_templates_workspaceId_idx` ON `jot_templates`(`workspaceId`);

-- CreateIndex
CREATE INDEX `jots_workspaceId_idx` ON `jots`(`workspaceId`);

-- CreateIndex
CREATE INDEX `labels_workspaceId_idx` ON `labels`(`workspaceId`);

-- CreateIndex
CREATE INDEX `users_activeWorkspaceId_idx` ON `users`(`activeWorkspaceId`);
