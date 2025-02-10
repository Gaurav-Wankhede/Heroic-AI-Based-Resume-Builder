declare module 'html2pdf.js' {
  interface Options {
    margin?: number
    filename?: string
    image?: { type: string; quality: number }
    enableLinks?: boolean
    html2canvas?: {
      scale?: number
      useCORS?: boolean
      allowTaint?: boolean
      scrollX?: number
      scrollY?: number
      width?: number
      height?: number
      windowWidth?: number
      windowHeight?: number
    }
    jsPDF?: {
      unit?: string
      format?: string
      orientation?: string
      compress?: boolean
    }
  }

  interface PDFObject {
    setProperties: (props: {
      title?: string
      subject?: string
      author?: string
      creator?: string
    }) => void
  }

  interface Html2Pdf {
    set: (options: Options) => Html2Pdf
    from: (element: HTMLElement) => Html2Pdf
    save: () => Promise<void>
    toPdf: () => Html2Pdf
    get: (type: 'pdf') => Promise<PDFObject>
  }

  function html2pdf(): Html2Pdf
  export default html2pdf
} 