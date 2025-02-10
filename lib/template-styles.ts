export const templateStyles = {
  // Font sizes following standard resume guidelines
  text: {
    name: 'text-2xl font-bold', // ~16px
    sectionTitle: 'text-base font-semibold', // ~12px
    normal: 'text-[11px] leading-[1.5]', // 11px standard text
    small: 'text-[10px] leading-[1.4]', // 10px for less important text
    details: 'text-[11px] leading-[1.6]', // 11px for bullet points
  },

  // Section spacing
  spacing: {
    section: 'mb-4',
    item: 'mb-2',
    lastItem: 'mb-0',
  },

  // Container styles
  container: {
    a4: 'w-[210mm] min-h-[297mm] mx-auto bg-white shadow-sm',
    content: 'p-6 md:p-8',
  },

  // Common element styles
  elements: {
    sectionTitle: 'font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3',
    link: 'text-blue-600 hover:text-blue-800 transition-colors',
    bullet: 'text-gray-400 mr-2',
  },

  // Layout utilities
  layout: {
    row: 'flex items-center gap-2',
    col: 'flex flex-col',
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  }
} 