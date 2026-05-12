/**
 * BadgesStatus — maps 40+ status type strings to colored badge chips.
 * Status indicator colors use colors.* directly (don't change with theme).
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export enum EBadgesStatusType {
  // Approval / workflow
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending",
  PendingApproval = "PendingApproval",
  WaitingApproval = "WaitingApproval",
  NeedApproval = "NeedApproval",
  OnProgress = "OnProgress",
  InProgress = "InProgress",
  InReview = "InReview",
  Draft = "Draft",
  Submitted = "Submitted",
  Cancelled = "Cancelled",
  Canceled = "Canceled",
  Completed = "Completed",
  Done = "Done",
  Closed = "Closed",
  Open = "Open",
  Active = "Active",
  Inactive = "Inactive",
  Expired = "Expired",
  // Payment / financial
  Paid = "Paid",
  Unpaid = "Unpaid",
  PartiallyPaid = "PartiallyPaid",
  Overdue = "Overdue",
  Refunded = "Refunded",
  // Attendance / HR
  Present = "Present",
  Absent = "Absent",
  Late = "Late",
  Leave = "Leave",
  SickLeave = "SickLeave",
  AnnualLeave = "AnnualLeave",
  // Verification
  Verified = "Verified",
  Unverified = "Unverified",
  // Delivery / logistics
  Delivered = "Delivered",
  Shipped = "Shipped",
  Processing = "Processing",
  // General
  New = "New",
  Updated = "Updated",
  Deleted = "Deleted",
  Archived = "Archived",
  Published = "Published",
  Unpublished = "Unpublished",
  Scheduled = "Scheduled",
  Failed = "Failed",
  Success = "Success",
  Warning = "Warning",
  Info = "Info",
}

export interface IBadgesStatusProps {
  type: EBadgesStatusType;
  style?: React.CSSProperties | Record<string, unknown>;
  textStyle?: React.CSSProperties | Record<string, unknown>;
}

interface StatusConfig {
  bg: string;
  text: string;
  label: string;
}

function getStatusConfig(type: EBadgesStatusType): StatusConfig {
  switch (type) {
    // Green — success/positive
    case EBadgesStatusType.Approved:
    case EBadgesStatusType.Completed:
    case EBadgesStatusType.Done:
    case EBadgesStatusType.Paid:
    case EBadgesStatusType.Verified:
    case EBadgesStatusType.Delivered:
    case EBadgesStatusType.Present:
    case EBadgesStatusType.Active:
    case EBadgesStatusType.Published:
    case EBadgesStatusType.Success:
      return { bg: colors.success.surface.value, text: colors.success.main.value, label: type };

    // Red — danger/negative
    case EBadgesStatusType.Rejected:
    case EBadgesStatusType.Cancelled:
    case EBadgesStatusType.Canceled:
    case EBadgesStatusType.Absent:
    case EBadgesStatusType.Expired:
    case EBadgesStatusType.Overdue:
    case EBadgesStatusType.Unpaid:
    case EBadgesStatusType.Unverified:
    case EBadgesStatusType.Deleted:
    case EBadgesStatusType.Failed:
    case EBadgesStatusType.Closed:
      return { bg: colors.danger.surface.value, text: colors.danger.main.value, label: type };

    // Yellow — warning/caution
    case EBadgesStatusType.Pending:
    case EBadgesStatusType.PendingApproval:
    case EBadgesStatusType.WaitingApproval:
    case EBadgesStatusType.NeedApproval:
    case EBadgesStatusType.Late:
    case EBadgesStatusType.PartiallyPaid:
    case EBadgesStatusType.Warning:
    case EBadgesStatusType.Scheduled:
      return { bg: colors.caution.surface.value, text: colors.caution.main.value, label: type };

    // Blue — info/in-progress
    case EBadgesStatusType.OnProgress:
    case EBadgesStatusType.InProgress:
    case EBadgesStatusType.InReview:
    case EBadgesStatusType.Submitted:
    case EBadgesStatusType.Processing:
    case EBadgesStatusType.Shipped:
    case EBadgesStatusType.New:
    case EBadgesStatusType.Updated:
    case EBadgesStatusType.Info:
      return { bg: colors.celurenBlue[25].value, text: colors.celurenBlue[500].value, label: type };

    // Grey — neutral
    case EBadgesStatusType.Draft:
    case EBadgesStatusType.Inactive:
    case EBadgesStatusType.Open:
    case EBadgesStatusType.Leave:
    case EBadgesStatusType.SickLeave:
    case EBadgesStatusType.AnnualLeave:
    case EBadgesStatusType.Refunded:
    case EBadgesStatusType.Archived:
    case EBadgesStatusType.Unpublished:
    default:
      return { bg: colors.neutral[20].value, text: colors.neutral[70].value, label: type };
  }
}

export const BadgesStatus: React.FC<IBadgesStatusProps> = ({ type, style, textStyle }) => {
  const themed = useThemedColors();
  void themed;
  const config = getStatusConfig(type);

  if (isWeb) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          backgroundColor: config.bg,
          borderRadius: radius.full.value,
          paddingLeft: spacing[8].value,
          paddingRight: spacing[8].value,
          paddingTop: spacing[4].value,
          paddingBottom: spacing[4].value,
          ...(style as React.CSSProperties),
        }}
      >
        <span
          style={{
            fontSize: spacing[12].value,
            fontWeight: "500",
            color: config.text,
            ...(textStyle as React.CSSProperties),
          }}
        >
          {config.label}
        </span>
      </span>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: config.bg,
        borderRadius: radius.full.value,
        paddingHorizontal: spacing[8].value,
        paddingVertical: spacing[4].value,
        ...(style as Record<string, unknown>),
      }}
    >
      <RNText
        allowFontScaling={false}
        style={{
          fontSize: spacing[12].value,
          fontWeight: "500",
          color: config.text,
          ...(textStyle as Record<string, unknown>),
        }}
      >
        {config.label}
      </RNText>
    </View>
  );
};

BadgesStatus.displayName = "BadgesStatus";
export default BadgesStatus;
