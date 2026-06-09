interface SplitResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

export function splitText(
  element: HTMLElement | HTMLElement[],
  options: {
    type?: string;
    linesClass?: string;
  } = {}
): SplitResult {
  const elements = Array.isArray(element) ? element : [element];
  const allChars: HTMLElement[] = [];
  const allWords: HTMLElement[] = [];
  const allLines: HTMLElement[] = [];
  const revertFns: (() => void)[] = [];

  const needChars = options.type?.includes("chars") ?? false;
  const needWords = options.type?.includes("words") || needChars;
  const needLines = options.type?.includes("lines") ?? false;

  elements.forEach((el) => {
    const originalHTML = el.innerHTML;

    const words: HTMLElement[] = [];
    const chars: HTMLElement[] = [];

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = originalHTML;

    const processNode = (node: Node, parent: HTMLElement) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        const wordTexts = text.split(/(\s+)/);

        wordTexts.forEach((wordText) => {
          if (!wordText) return;

          if (/^\s+$/.test(wordText)) {
            parent.appendChild(document.createTextNode(wordText));
            return;
          }

          const wordSpan = document.createElement("span");
          wordSpan.style.display = "inline-block";
          wordSpan.className = "split-word";

          if (needChars) {
            for (const char of wordText) {
              const charSpan = document.createElement("span");
              charSpan.style.display = "inline-block";
              charSpan.className = "split-char";
              charSpan.textContent = char === " " ? " " : char;
              wordSpan.appendChild(charSpan);
              chars.push(charSpan);
            }
          } else {
            wordSpan.textContent = wordText;
          }

          parent.appendChild(wordSpan);
          words.push(wordSpan);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elem = node as HTMLElement;
        const clone = elem.cloneNode(false) as HTMLElement;
        parent.appendChild(clone);
        Array.from(elem.childNodes).forEach((child) =>
          processNode(child, clone)
        );
      }
    };

    // Clear and rebuild
    el.innerHTML = "";
    Array.from(tempDiv.childNodes).forEach((node) => processNode(node, el));

    allChars.push(...chars);
    allWords.push(...words);

    revertFns.push(() => {
      el.innerHTML = originalHTML;
    });

    if (needLines) {
      // Group words by their vertical position to detect lines
      const lineMap = new Map<number, HTMLElement[]>();
      words.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const top = Math.round(rect.top);
        if (!lineMap.has(top)) {
          lineMap.set(top, []);
        }
        lineMap.get(top)!.push(word);
      });

      // Wrap each line in a div
      const lines: HTMLElement[] = [];
      const sortedTops = Array.from(lineMap.keys()).sort((a, b) => a - b);
      sortedTops.forEach((top) => {
        const lineWords = lineMap.get(top)!;
        const lineSpan = document.createElement("div");
        if (options.linesClass) {
          lineSpan.className = options.linesClass;
        }
        lineSpan.style.overflow = "hidden";
        lineWords.forEach((w) => lineSpan.appendChild(w));
        el.appendChild(lineSpan);
        lines.push(lineSpan);
        allLines.push(lineSpan);
      });
    }
  });

  return {
    chars: allChars,
    words: allWords,
    lines: allLines,
    revert: () => revertFns.forEach((fn) => fn()),
  };
}
