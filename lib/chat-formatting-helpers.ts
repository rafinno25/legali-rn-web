/**
 * Chat formatting helper functions (mobile)
 */

export function getFileIcon(mimeType: string): string {
  if (!mimeType) return "📄";
  if (mimeType.includes("pdf")) return "📄";
  if (mimeType.includes("image")) return "🖼️";
  if (mimeType.includes("text")) return "📝";
  if (mimeType.includes("word") || mimeType.includes("document")) return "📄";
  if (mimeType.includes("excel") || mimeType.includes("spreadsheet")) return "📊";
  if (mimeType.includes("powerpoint") || mimeType.includes("presentation")) return "📊";
  return "📎";
}

export function getFileTypeLabel(mimeType: string): string {
  if (!mimeType) return "File";
  if (mimeType.includes("pdf")) return "PDF Document";
  if (mimeType.includes("image")) return "Image";
  if (mimeType.includes("text")) return "Text Document";
  if (mimeType.includes("word") || mimeType.includes("document")) return "Word Document";
  if (mimeType.includes("excel") || mimeType.includes("spreadsheet")) return "Excel Spreadsheet";
  if (mimeType.includes("powerpoint") || mimeType.includes("presentation")) return "PowerPoint Presentation";
  return "File";
}

export function formatFileSize(bytes: number): string {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
}

export function formatDossierFileName(fileName: string, generatedAt?: string): string {
  if (!fileName) return "Legal Dossier";
  if (generatedAt) {
    const date = new Date(generatedAt);
    const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `Legal Dossier - ${formattedDate}`;
  }
  return fileName.replace(/\.pdf$/i, "").replace(/^legal_dossier_/, "Legal Dossier - ").replace(/_/g, " ");
}

export function formatTimestamp(timestamp: string | Date): string {
  if (!timestamp) return "Invalid Date";
  const dateObj = timestamp instanceof Date ? timestamp : new Date(timestamp);
  if (Number.isNaN(dateObj.getTime())) return "Invalid Date";
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const dateOnly = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  if (dateOnly.getTime() === today.getTime()) {
    return dateObj.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }
  if (dateOnly.getTime() === yesterday.getTime()) return "Yesterday";
  if (dateOnly.getTime() > sevenDaysAgo.getTime()) return dateObj.toLocaleDateString(undefined, { weekday: "long" });
  return dateObj.toLocaleDateString(undefined, { day: "numeric", month: "numeric", year: "2-digit" });
}