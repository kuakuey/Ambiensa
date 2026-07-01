-- Base de datos: PruebaGF
-- Script de creación de tabla usuarios para la prueba técnica Ambiensa

CREATE DATABASE IF NOT EXISTS `PruebaGF`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `PruebaGF`;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `identificacion` varchar(20) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo_personal` varchar(150) NOT NULL,
  `estado_civil` varchar(20) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `direccion` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_identificacion_unique` (`identificacion`),
  UNIQUE KEY `usuarios_nombre_usuario_unique` (`nombre_usuario`),
  UNIQUE KEY `usuarios_correo_personal_unique` (`correo_personal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos de ejemplo (opcional)
INSERT INTO `usuarios` (
  `identificacion`,
  `nombre_usuario`,
  `apellidos`,
  `nombres`,
  `fecha_nacimiento`,
  `celular`,
  `telefono`,
  `correo_personal`,
  `estado_civil`,
  `sexo`,
  `direccion`,
  `created_at`,
  `updated_at`
) VALUES
(
  '1234567890',
  'jperez',
  'Pérez García',
  'Juan Carlos',
  '1990-05-15',
  '3001234567',
  '6012345678',
  'juan.perez@example.com',
  'Soltero',
  'Masculino',
  'Calle 123 #45-67, Bogotá',
  NOW(),
  NOW()
);
