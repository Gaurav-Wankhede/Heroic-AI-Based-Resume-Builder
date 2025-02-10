import { Font } from '@react-pdf/renderer'
import { fonts } from './base-styles'

export const registerFonts = () => {
  // Register Times Roman
  Font.register({
    family: 'Times-Roman',
    src: fonts['Times-Roman']
  })

  // Register Helvetica with variants
  Font.register({
    family: 'Helvetica',
    fonts: [
      {
        src: fonts['Helvetica'].normal,
        fontWeight: 'normal'
      },
      {
        src: fonts['Helvetica'].bold,
        fontWeight: 'bold'
      }
    ]
  })
}

export const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

export const parseUrl = (url: string) => {
  try {
    return new URL(url).toString()
  } catch (error) {
    return url
  }
}

export const sanitizeText = (text: string) => {
  return text?.replace(/[^\x20-\x7E]/g, '') || ''
} 