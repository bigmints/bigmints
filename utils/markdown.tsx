
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let listBuffer: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer = "";

  lines.forEach((line, index) => {
    const key = `line-${index}`;
    const trimmedLine = line.trim();

    // Code Blocks
    if (trimmedLine.startsWith('```')) {
      if (inCodeBlock) {
        // End block
        elements.push(
          <pre key={key} className="bg-zinc-900 dark:bg-zinc-900 text-zinc-100 p-6 rounded-xl overflow-x-auto my-8 text-sm font-mono border border-zinc-800 shadow-xl">
            <code>{codeBuffer}</code>
          </pre>
        );
        codeBuffer = "";
        inCodeBlock = false;
      } else {
        // Start block
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer += line + "\n";
      return;
    }

    // Custom Components (::: type args)
    if (trimmedLine.startsWith(':::')) {
        const parts = trimmedLine.replace(':::', '').trim().split(' ');
        const type = parts[0];
        const args = parts.slice(1);

        if (type === 'video' && args.length > 0) {
            elements.push(
                <div key={key} className="my-10 rounded-xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 aspect-video">
                    <iframe 
                        src={args[0]} 
                        className="w-full h-full" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                        title="Embedded Video"
                    />
                </div>
            );
            return;
        }

        if (type === 'slideshow' && args.length > 0) {
            elements.push(
                <div key={key} className="my-10 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
                    {args.map((url, i) => (
                        <div key={i} className="snap-center shrink-0 w-[80%] md:w-[60%] aspect-[16/9] rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                             <img src={url} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            );
            return;
        }
        return; // Skip unknown custom blocks
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key} className="text-3xl md:text-5xl font-bold mt-16 mb-8 text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">{line.substring(2)}</h1>);
      return;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key} className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-zinc-900 dark:text-zinc-100 tracking-tight">{line.substring(3)}</h2>);
      return;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-200 tracking-tight">{line.substring(4)}</h3>);
      return;
    }

    // Blockquotes
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={key} className="border-l-4 border-zinc-900 dark:border-zinc-100 pl-6 my-10 italic">
            <p className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-300 font-serif leading-relaxed">{line.substring(2)}</p>
        </blockquote>
      );
      return;
    }

    // Images
    const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
    if (imgMatch) {
      elements.push(
        <figure key={key} className="my-12">
            <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full rounded-xl shadow-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800" />
            {imgMatch[1] && <figcaption className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-4 font-mono uppercase tracking-widest">{imgMatch[1]}</figcaption>}
        </figure>
      );
      return;
    }

    // Lists (Simple bullet)
    if (trimmedLine.startsWith('- ')) {
      listBuffer.push(<li key={`${key}-li`} className="ml-4 pl-2">{parseInline(line.substring(2))}</li>);
      return;
    } else {
      if (listBuffer.length > 0) {
        elements.push(<ul key={`${key}-ul`} className="list-disc list-outside mb-6 space-y-3 text-zinc-700 dark:text-zinc-300 ml-6 marker:text-zinc-300 dark:marker:text-zinc-600">{listBuffer}</ul>);
        listBuffer = [];
      }
    }

    // Paragraphs (ignore empty lines)
    if (trimmedLine !== '') {
      elements.push(<p key={key} className="mb-6 leading-8 text-zinc-700 dark:text-zinc-300 text-lg md:text-xl font-serif">{parseInline(line)}</p>);
    }
  });

  // Flush remaining lists
  if (listBuffer.length > 0) {
      elements.push(<ul key="final-ul" className="list-disc list-outside mb-6 space-y-3 text-zinc-700 dark:text-zinc-300 ml-6 marker:text-zinc-300 dark:marker:text-zinc-600">{listBuffer}</ul>);
  }

  return <div className="max-w-none">{elements}</div>;
};

// Helper for bold/italic/links
const parseInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-zinc-900 dark:text-zinc-100">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} className="italic text-zinc-800 dark:text-zinc-300">{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('[') && part.includes('](')) {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                const url = match[2];
                const isExternal = url.startsWith('http');
                return (
                    <a 
                        key={i} 
                        href={url} 
                        className="inline-flex items-center text-zinc-900 dark:text-zinc-100 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-600 hover:decoration-zinc-900 dark:hover:decoration-white hover:text-black dark:hover:text-white transition-all group" 
                        target={isExternal ? "_blank" : undefined} 
                        rel={isExternal ? "noreferrer" : undefined}
                    >
                        {match[1]}
                        {isExternal && <ExternalLink size={12} className="ml-1 opacity-50 group-hover:opacity-100" />}
                    </a>
                );
            }
        }
        return part;
    });
};
