# Guía de Contribución

Bienvenido al proyecto frontend-novafit34. Esta guía establece los estándares de desarrollo para mantener la calidad del código y reducir errores.

## Estándares de Código

### TypeScript

- Usa tipos estrictos. Evita `any` y `unknown` a menos que sea necesario.
- Habilita todas las opciones de `strict` en `tsconfig.app.json`.
- Nombres de variables: camelCase.
- Nombres de componentes: PascalCase.
- Interfaces y tipos: PascalCase.

### ESLint y Prettier

- Ejecuta `pnpm run lint` y `pnpm run format` antes de commitear.
- Los hooks de pre-commit lo harán automáticamente.

### Pruebas

- Escribe pruebas para componentes y hooks críticos.
- Usa Vitest con Testing Library.
- Apunta a una cobertura del 70%+.

### Commits

- Usa Conventional Commits: `feat:`, `fix:`, `docs:`, etc.
- Mensajes en inglés o español consistente.

### Estructura de Archivos

- Componentes: `src/components/`
- Páginas: `src/pages/`
- Hooks: `src/hooks/`
- Utilidades: `src/utils/`

## Proceso de Contribución

1. Crea una rama desde `main`.
2. Implementa cambios.
3. Ejecuta tests y linting.
4. Crea PR con descripción.
5. Espera revisión.

## Herramientas

- Node.js con pnpm
- VSCode con extensiones de ESLint y Prettier
