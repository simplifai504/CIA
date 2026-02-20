'use client';

import { useState, useRef, useCallback } from 'react';

const CRYPTICS_FILES = [
  'Crypti 4.png',
  'Crypti 5.png',
  'Crypti 6.png',
  'Crypti 7.png',
  'Crypti 8.png',
  'Crypti 9.png',
  'Crypti 10.png',
  'Crypti 11.png',
  'Crypti 12.png',
];

function TerminalLine({ children }: { children: React.ReactNode }) {
  return <div className="text-primary whitespace-pre-wrap break-words">{children}</div>;
}

function TerminalBlock({
  onCommand,
  lines,
}: {
  onCommand: (cmd: string) => void;
  lines: React.ReactNode[];
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onCommand(input);
        setInput('');
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' }), 80);
      }
    },
    [input, onCommand]
  );

  return (
    <div
      className="h-full flex flex-col overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-scroll flex-1 overflow-y-auto flex flex-col gap-0.5 text-[13px] sm:text-sm px-36 py-20 min-h-0">
        <TerminalLine>
          <span className="block text-center text-primary/95 text-[14px] sm:text-base font-bold">
            ---------- CIA Expedients: CLASIFIED ----------
          </span>
        </TerminalLine>
        <TerminalLine>/files</TerminalLine>
        <TerminalLine>/clear</TerminalLine>
        <TerminalLine>/ca</TerminalLine>
        <TerminalLine>/twitter</TerminalLine>
        {lines}
        <div className="flex items-center gap-0.5">
          <span className="text-primary">{input || '\u00A0'}</span>
          <span className="cursor-blink inline-block w-2 h-3 bg-primary rounded-sm" />
        </div>
      </div>
      <div ref={bottomRef} />
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        aria-label="Terminal input"
        autoFocus
      />
    </div>
  );
}

function FilesView({
  onBack,
  fileIndex,
  onNext,
}: {
  onBack: () => void;
  fileIndex: number;
  onNext: () => void;
}) {
  const total = CRYPTICS_FILES.length;
  const filename = CRYPTICS_FILES[fileIndex];
  const src = `/cryptics/${encodeURIComponent(filename)}`;
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 overflow-y-auto text-[13px] sm:text-sm px-36 py-20">
      <img
        src={src}
        alt={`Cryptic ${fileIndex + 1}`}
        className="max-w-full max-h-[85%] w-auto h-auto cursor-pointer object-contain"
        onClick={onNext}
      />
      <p className="text-primary text-center">
        {fileIndex + 1} / {total} — Click for next
      </p>
      <button
        type="button"
        className="flex items-center gap-1 text-primary bg-transparent border-none p-0 font-inherit cursor-pointer"
        onClick={onBack}
      >
        <span>/back</span>
        <span className="cursor-blink">█</span>
        <span className="ml-1 text-primary/80">back to menu</span>
      </button>
    </div>
  );
}

export default function Home() {
  const [showFiles, setShowFiles] = useState(false);
  const [fileIndex, setFileIndex] = useState(0);
  const [lines, setLines] = useState<React.ReactNode[]>([]);

  const handleCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (cmd === '/clear') {
      setLines([]);
      return;
    }
    if (cmd === '/files') {
      setLines([]);
      setShowFiles(true);
      return;
    }
    if (cmd === '/twitter') {
      setLines((prev) => [
        ...prev,
        <TerminalLine key={prev.length}>
          <a
            href="https://x.com/i/communities/2024716928275648873"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Twitter: https://x.com/i/communities/2024716928275648873
          </a>
        </TerminalLine>,
      ]);
      return;
    }
    if (cmd === '/ca') {
      setLines((prev) => [
        ...prev,
        <TerminalLine key={prev.length}>
          <span className="text-primary">CA: </span>
          <a
            href="https://pump.fun/coin/AnKUqTUHAwTTg8D59C9Z3nTchTyU1XMCNWt8pmxkcyN9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline break-all"
          >
            AnKUqTUHAwTTg8D59C9Z3nTchTyU1XMCNWt8pmxkcyN9
          </a>
        </TerminalLine>,
      ]);
      return;
    }
    if (cmd) {
      setLines((prev) => [
        ...prev,
        <TerminalLine key={prev.length}>
          <span className="text-[#a7c957]">{raw} not valid</span>
        </TerminalLine>,
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#3a5a40' }}>
      <div
        className="crt-screen absolute flex flex-col text-primary"
        style={{
          left: '21%',
          top: '5%',
          width: '44%',
          height: '62%',
          zIndex: 1,
        }}
      >
        {showFiles ? (
          <FilesView
            onBack={() => setShowFiles(false)}
            fileIndex={fileIndex}
            onNext={() => setFileIndex((i) => (i + 1) % CRYPTICS_FILES.length)}
          />
        ) : (
          <TerminalBlock onCommand={handleCommand} lines={lines} />
        )}
      </div>

      <img
        src="/background.png"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 5 }}
      />
      <img
        src="/Position.gif"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 6 }}
      />
      <img
        src="/Cow.gif"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 7 }}
      />
    </div>
  );
}
