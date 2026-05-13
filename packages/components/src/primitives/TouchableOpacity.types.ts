/**
 * TouchableOpacity.types.ts — enums for the TouchableOpacity component.
 *
 * Kept separate so TouchableOpacity.presets.ts can import enums without
 * creating a circular dependency with TouchableOpacity.tsx.
 */

export enum ETouchableType {
  Card = "card",
  NavItem = "nav-item",
  IconButton = "icon-button",
}
