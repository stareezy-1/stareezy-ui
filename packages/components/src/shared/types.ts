/**
 * Shared enums used across multiple components.
 * ELabelsType and EHintTextType are referenced by Input, Labels, and other form components.
 */

// ---------------------------------------------------------------------------
// ELabelsType — label display variants
// ---------------------------------------------------------------------------

export enum ELabelsType {
  Default = "Default",
  Error = "Error",
  Success = "Success",
  Warning = "Warning",
  Info = "Info",
  Disabled = "Disabled",
}

// ---------------------------------------------------------------------------
// EHintTextType — hint text display variants
// ---------------------------------------------------------------------------

export enum EHintTextType {
  Default = "Default",
  Error = "Error",
  Success = "Success",
  Warning = "Warning",
  Info = "Info",
}

// ---------------------------------------------------------------------------
// EApprovalOptionState — shared by ApprovalOption and CheckboxOption
// ---------------------------------------------------------------------------

export enum EApprovalOptionState {
  Default = "Default",
  Approve = "Approve",
  Decline = "Decline",
  ApproveDisable = "ApproveDisable",
  DeclineDisable = "DeclineDisable",
}
