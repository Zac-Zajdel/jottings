-- CreateTable
CREATE TABLE `labelables` (
    `id` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `labelableType` ENUM('Jot', 'JotTemplate') NOT NULL,
    `labelableId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `labelables_authorId_idx`(`authorId`),
    INDEX `labelables_labelableType_idx`(`labelableType`),
    INDEX `labelables_labelableId_idx`(`labelableId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
