export interface ProgressStep {
  id: string;
  label: string;
  status: "pending" | "active" | "complete" | "error";
}
