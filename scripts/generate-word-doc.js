const fs = require('fs');
const path = require('path');

// Read the markdown file
const markdownPath = path.join(__dirname, '../JIRA_ARCHITECTURE.md');
const markdownContent = fs.readFileSync(markdownPath, 'utf8');

// Convert markdown to HTML with Space Grotesk font
function markdownToHTML(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1 style="font-size: 2.5em; font-weight: 700; color: #0a0a0f; margin-top: 20px; margin-bottom: 15px; border-bottom: 3px solid #0a0a0f; padding-bottom: 10px;">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-size: 2em; font-weight: 600; color: #0a0a0f; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #e5e5e5; padding-bottom: 8px;">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 style="font-size: 1.5em; font-weight: 600; color: #333; margin-top: 25px; margin-bottom: 12px;">$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4 style="font-size: 1.2em; font-weight: 500; color: #444; margin-top: 20px; margin-bottom: 10px;">$1</h4>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600; color: #0a0a0f;">$1</strong>');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #0a0a0f; margin: 15px 0; font-family: \'Courier New\', monospace; overflow-x: auto;"><code>$1</code></pre>');
    html = html.replace(/`(.*?)`/g, '<code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-family: \'Courier New\', monospace;">$1</code>');
    
    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li style="margin-bottom: 8px;">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul style="margin-left: 30px; margin-bottom: 20px;">$1</ul>');
    
    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li style="margin-bottom: 8px;">$1</li>');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p style="margin-bottom: 15px;">');
    
    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr style="border: none; border-top: 2px solid #e5e5e5; margin: 30px 0;">');
    
    return html;
}

// Create Word-compatible HTML
const htmlContent = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="UTF-8">
    <meta name="ProgId" content="Word.Document">
    <meta name="Generator" content="Microsoft Word">
    <meta name="Originator" content="Microsoft Word">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        @page {
            size: A4;
            margin: 2.5cm;
        }
        
        body {
            font-family: 'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #ffffff;
            margin: 0;
            padding: 0;
        }
        
        h1 {
            font-size: 2.5em;
            font-weight: 700;
            color: #0a0a0f;
            margin-top: 20px;
            margin-bottom: 15px;
            border-bottom: 3px solid #0a0a0f;
            padding-bottom: 10px;
            page-break-after: avoid;
        }
        
        h2 {
            font-size: 2em;
            font-weight: 600;
            color: #0a0a0f;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 2px solid #e5e5e5;
            padding-bottom: 8px;
            page-break-after: avoid;
        }
        
        h3 {
            font-size: 1.5em;
            font-weight: 600;
            color: #333;
            margin-top: 25px;
            margin-bottom: 12px;
            page-break-after: avoid;
        }
        
        h4 {
            font-size: 1.2em;
            font-weight: 500;
            color: #444;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        
        p {
            margin-bottom: 15px;
            font-weight: 400;
            text-align: justify;
        }
        
        ul, ol {
            margin-left: 30px;
            margin-bottom: 20px;
        }
        
        li {
            margin-bottom: 8px;
            font-weight: 400;
        }
        
        code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        
        pre {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            margin-bottom: 20px;
            border-left: 4px solid #0a0a0f;
            page-break-inside: avoid;
        }
        
        pre code {
            background: none;
            padding: 0;
        }
        
        hr {
            border: none;
            border-top: 2px solid #e5e5e5;
            margin: 30px 0;
        }
        
        strong {
            font-weight: 600;
            color: #0a0a0f;
        }
        
        .status-done {
            color: #28a745;
            font-weight: 600;
        }
        
        .status-progress {
            color: #ffc107;
            font-weight: 600;
        }
        
        .status-backlog {
            color: #6c757d;
            font-weight: 600;
        }
    </style>
</head>
<body>
${markdownToHTML(markdownContent)}
</body>
</html>`;

// Save HTML file
const outputPath = path.join(__dirname, '../JIRA_ARCHITECTURE_WORD.html');
fs.writeFileSync(outputPath, htmlContent, 'utf8');

console.log('✅ Word-compatible HTML file generated!');
console.log(`📁 Location: ${outputPath}`);
console.log('\n📝 Instructions:');
console.log('1. Open JIRA_ARCHITECTURE_WORD.html in your browser');
console.log('2. Print to PDF or copy to Word');
console.log('3. Or open directly in Microsoft Word');
console.log('4. Word will preserve the Space Grotesk font if installed');
