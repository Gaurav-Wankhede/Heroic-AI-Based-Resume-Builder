# 🚀 Heroic Resume Builder

A modern, AI-powered resume builder that helps you create professional resumes with ease. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 📝 Professional resume templates
- 🤖 AI-powered content suggestions
- 📱 Responsive design
- 🎨 Real-time preview
- 📄 PDF export
- 💾 Local storage persistence
- 🔗 Clickable contact links in PDF
- 📊 Job description optimization

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **PDF Generation:** jsPDF
- **State Management:** React Context
- **AI Integration:** Google Generative AI
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google AI API key (for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/heroic-resume-builder.git
cd heroic-resume-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Google AI API key:
```env
GOOGLE_AI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Usage

1. Fill in your personal information in the form sections
2. Use AI suggestions to enhance your content
3. Paste job descriptions to optimize your resume
4. Preview your resume in real-time
5. Download the final resume as a PDF

## 🎯 Key Features Explained

### AI Content Generation
- Smart suggestions for improving resume content
- Context-aware recommendations based on job descriptions
- Professional tone enhancement
- Automatic skill matching with job requirements
- Section-specific optimization (Summary, Experience, Projects, Skills)

### Job Description Optimization
- Paste job descriptions to optimize your resume
- AI analysis of job requirements
- Automatic content alignment with job needs
- Smart skill recommendations based on job context
- Real-time resume optimization suggestions

### Real-time Preview
- Live preview of your resume as you type
- Accurate representation of the final PDF output
- Responsive design for all screen sizes
- Section-by-section preview updates

### PDF Export
- Professional PDF generation with Arial/Helvetica font
- Clickable links for contact information
- Clean section dividers and consistent formatting
- Proper spacing and layout optimization
- Multiple page support with smart page breaks

### Data Persistence
- Automatic saving to local storage
- Resume data persistence across sessions
- Job description storage for reference
- No account required

## 🔧 Customization

The project supports various customization options:

- **Themes:** Modify the theme in `tailwind.config.js`
- **Resume Sections:** Add or modify sections in `types/resume.ts`
- **PDF Styling:** Adjust PDF generation in `utils/generate-pdf.ts`

## 📚 Project Structure

```
heroic-resume-builder/
├── app/                    # Next.js app directory
├── components/            # React components
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── public/               # Static assets
├── styles/               # Global styles
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation
- [Google AI](https://ai.google.dev/) for AI capabilities
- [Lucide](https://lucide.dev/) for the icons

## 📞 Contact

Gaurav Wankhede - [gauravanilwankhede2002@gmail.com](mailto:gauravanilwankhede2002@gmail.com)

Project Link: [https://github.com/Gaurav-Wankhede/heroic-resume-builder](https://github.com/Gaurav-Wankhede/Heroic-AI-Based-Resume-Builder)

---
Built with ❤️ by [Gaurav Wankhede](https://gaurav-wankhede.vercel.app/)
