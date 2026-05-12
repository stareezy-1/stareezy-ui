/**
 * ApprovalRadio — positive/negative radio pair for approval workflows.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { ApprovalOption, EApprovalOptionState } from "../approval-option/ApprovalOption";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface IApprovalRadioProps {
  approvalData?: boolean;
  positiveOptionLabel: string;
  positiveOptionIsDisabled?: boolean;
  negativeOptionIsDisabled?: boolean;
  negativeOptionLabel: string;
  isDisabled?: boolean;
  onChange?(data: boolean | undefined): void;
}

export const ApprovalRadio: React.FC<IApprovalRadioProps> = ({
  approvalData,
  positiveOptionLabel,
  positiveOptionIsDisabled,
  negativeOptionIsDisabled,
  negativeOptionLabel,
  isDisabled,
  onChange,
}) => {
  const positiveState = (() => {
    if (isDisabled || positiveOptionIsDisabled) {
      return approvalData === true
        ? EApprovalOptionState.ApproveDisable
        : EApprovalOptionState.Default;
    }
    return approvalData === true ? EApprovalOptionState.Approve : EApprovalOptionState.Default;
  })();

  const negativeState = (() => {
    if (isDisabled || negativeOptionIsDisabled) {
      return approvalData === false
        ? EApprovalOptionState.DeclineDisable
        : EApprovalOptionState.Default;
    }
    return approvalData === false ? EApprovalOptionState.Decline : EApprovalOptionState.Default;
  })();

  const isPositiveDisabled = isDisabled || positiveOptionIsDisabled;
  const isNegativeDisabled = isDisabled || negativeOptionIsDisabled;

  if (isWeb) {
    return (
      <div
        role="radiogroup"
        aria-label="Approval options"
        style={{ display: "flex", flexDirection: "column", gap: spacing[8].value }}
      >
        <ApprovalOption
          text={positiveOptionLabel}
          value="positive"
          state={positiveState}
          onPress={() => {
            if (!isPositiveDisabled) {
              onChange?.(approvalData === true ? undefined : true);
            }
          }}
        />
        <ApprovalOption
          text={negativeOptionLabel}
          value="negative"
          state={negativeState}
          onPress={() => {
            if (!isNegativeDisabled) {
              onChange?.(approvalData === false ? undefined : false);
            }
          }}
        />
      </div>
    );
  }

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel="Approval options"
      style={{ gap: spacing[8].value }}
    >
      <ApprovalOption
        text={positiveOptionLabel}
        value="positive"
        state={positiveState}
        onPress={() => {
          if (!isPositiveDisabled) {
            onChange?.(approvalData === true ? undefined : true);
          }
        }}
      />
      <ApprovalOption
        text={negativeOptionLabel}
        value="negative"
        state={negativeState}
        onPress={() => {
          if (!isNegativeDisabled) {
            onChange?.(approvalData === false ? undefined : false);
          }
        }}
      />
    </View>
  );
};

ApprovalRadio.displayName = "ApprovalRadio";
export default ApprovalRadio;
