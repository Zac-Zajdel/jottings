-- CreateTable
CREATE TABLE `labels` (
    `id` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `labels_authorId_idx`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `label_associations` (
    `id` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `labelId` VARCHAR(191) NOT NULL,
    `jotId` VARCHAR(191) NULL,
    `jotTemplateId` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `label_associations_authorId_idx`(`authorId`),
    INDEX `label_associations_labelId_idx`(`labelId`),
    INDEX `label_associations_jotId_idx`(`jotId`),
    INDEX `label_associations_jotTemplateId_idx`(`jotTemplateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
