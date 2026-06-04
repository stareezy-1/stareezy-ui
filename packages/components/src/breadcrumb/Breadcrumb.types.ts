/**
 * Breadcrumb.types.ts — enums and types for the Breadcrumb component.
 *
 * Kept separate so Breadcrumb.style.ts can import types without creating
 * a circular dependency with Breadcrumb.tsx.
 */

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}
