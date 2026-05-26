// 클라이언트 사이드 PDF 생성 (PRD §7)
// 보고서의 각 .pdf-page(A4 비율) 요소를 html2canvas로 캡처해 jsPDF로 합성한다.
// 한글은 웹폰트(Noto Sans KR)로 렌더된 화면을 이미지화하므로 별도 폰트 임베드가 필요 없다.

export interface PdfMeta {
  nickname: string;
  date: string; // YYYYMMDD
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function todayCompact(d = new Date()): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

export async function generateReportPdf(
  container: HTMLElement,
  meta: PdfMeta,
): Promise<void> {
  const [h2cModule, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  // Interop: html2canvas is CJS; bundlers expose it on `.default`, raw CJS as the module itself.
  const html2canvas = (h2cModule.default ??
    (h2cModule as unknown)) as typeof h2cModule.default;

  // 폰트 로딩 완료 후 캡처 (한글 깨짐 방지)
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const pages = Array.from(
    container.querySelectorAll<HTMLElement>(".pdf-page"),
  );
  if (pages.length === 0) throw new Error("렌더링된 보고서 페이지가 없습니다.");

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i], {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });
    const imgData = canvas.toDataURL("image/png");
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, 0, pageW, pageH, undefined, "FAST");
  }

  const safeName = (meta.nickname || "사용자").replace(/[\\/:*?"<>|\s]/g, "_");
  pdf.save(`MyAX_Report_${safeName}_${meta.date}.pdf`);
}
