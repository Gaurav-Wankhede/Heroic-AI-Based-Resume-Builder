import { StyleSheet } from '@react-pdf/renderer'

// Register fonts
export const fonts = {
  'Times-Roman': 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times New Roman.ttf',
  'Helvetica': {
    normal: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf',
    bold: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf',
  }
}

// Base styles that can be extended by template-specific styles
export const baseStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
    width: '100%',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Helvetica',
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica',
    color: '#374151',
  },
  link: {
    color: '#2563EB',
    textDecoration: 'none',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  bullet: {
    width: 2,
    height: 2,
    marginRight: 6,
    backgroundColor: '#9CA3AF',
  },
  contentWrapper: {
    width: '100%',
    flexGrow: 1,
  }
}) 