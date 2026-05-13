/**
 * Pagination — prev/next/page buttons.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export interface PaginationType {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginationProps {
  data: PaginationType;
  onChange?: (pagination: PaginationType) => void;
  leftComponent?: React.ReactNode;
  style?: React.CSSProperties | Record<string, unknown>;
  testID?: string;
}

export const Pagination: React.FC<IPaginationProps> = ({
  data, onChange, leftComponent, style, testID,
}) => {
  const themed = useThemedColors();
  const { page, limit, total, totalPages } = data;

  function goTo(p: number) {
    if (p < 1 || p > totalPages) return;
    onChange?.({ page: p, limit, total, totalPages });
  }

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page-1); i <= Math.min(totalPages-1, page+1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  if (isWeb) {
    const btnBase: React.CSSProperties = {
      minWidth: 32, height: 32, borderRadius: radius.sm.value, border: `1px solid ${themed.borderDefault}`,
      background: "none", cursor: "pointer", fontSize: spacing[14].value, display: "flex", alignItems: "center", justifyContent: "center",
    };
    return (
      <div style={{display:"flex",alignItems:"center",gap:spacing[8].value,...flattenStyle(style)}} data-testid={testID}>
        {leftComponent}
        <button type="button" onClick={()=>goTo(page-1)} disabled={page<=1} aria-label="Previous page"
          style={{...btnBase,color:page<=1?themed.textDisabled:themed.textPrimary,cursor:page<=1?"not-allowed":"pointer"}}>&#8249;</button>
        {pages.map((p, i) => (
          p === "..." ? (
            <span key={`dots-${i}`} style={{color:themed.textSecondary,padding:`0 ${spacing[4].value}px`}}>...</span>
          ) : (
            <button key={p} type="button" onClick={()=>goTo(p as number)} aria-label={`Page ${p}`} aria-current={p===page?"page":undefined}
              style={{...btnBase,backgroundColor:p===page?themed.surfaceDark:"transparent",color:p===page?themed.textInverse:themed.textPrimary,borderColor:p===page?themed.surfaceDark:themed.borderDefault}}>
              {p}
            </button>
          )
        ))}
        <button type="button" onClick={()=>goTo(page+1)} disabled={page>=totalPages} aria-label="Next page"
          style={{...btnBase,color:page>=totalPages?themed.textDisabled:themed.textPrimary,cursor:page>=totalPages?"not-allowed":"pointer"}}>&#8250;</button>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <View style={{flexDirection:"row",alignItems:"center",...flattenStyle(style)}} testID={testID}>
      {leftComponent}
      <TouchableOpacity onPress={()=>goTo(page-1)} disabled={page<=1} accessibilityLabel="Previous page" style={{padding:spacing[8].value}}>
        <Text style={{color:page<=1?themed.textDisabled:themed.textPrimary,fontSize:spacing[16].value}}>{"<"}</Text>
      </TouchableOpacity>
      {pages.map((p, i) => (
        p === "..." ? (
          <Text key={`dots-${i}`} style={{color:themed.textSecondary,paddingHorizontal:spacing[4].value}}>...</Text>
        ) : (
          <TouchableOpacity key={p} onPress={()=>goTo(p as number)} accessibilityLabel={`Page ${p}`}
            style={{minWidth:32,height:32,borderRadius:radius.sm.value,backgroundColor:p===page?themed.surfaceDark:"transparent",alignItems:"center",justifyContent:"center",marginHorizontal:2}}>
            <Text style={{color:p===page?themed.textInverse:themed.textPrimary,fontSize:spacing[14].value}}>{p}</Text>
          </TouchableOpacity>
        )
      ))}
      <TouchableOpacity onPress={()=>goTo(page+1)} disabled={page>=totalPages} accessibilityLabel="Next page" style={{padding:spacing[8].value}}>
        <Text style={{color:page>=totalPages?themed.textDisabled:themed.textPrimary,fontSize:spacing[16].value}}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

Pagination.displayName = "Pagination";
export default Pagination;
