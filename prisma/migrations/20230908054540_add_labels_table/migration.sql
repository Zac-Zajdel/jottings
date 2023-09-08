-- CreateTable
CREATE TABLE `labels` (
    `id` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `jot_id` VARCHAR(191) NULL,
    `jot_template_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `labels_authorId_idx`(`authorId`),
    INDEX `labels_jot_id_idx`(`jot_id`),
    INDEX `labels_jot_template_id_idx`(`jot_template_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
