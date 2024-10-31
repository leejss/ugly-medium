"use client";

import { useEffect, useRef, type KeyboardEventHandler } from "react";

// what is contenteditable ? and when to use it ?
// How to capture insertion of new dom node in contenteditable div ?

// when enter, it create p tag with attrs
// How to do this with contenteditable ?

// MutaitonObserver and intercept the key events

// Capture insertion of new node -> MutationObserver
// Insert custom node ->

// selection and range

export default function WriteForm() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          console.log("Node added", node);
        });
        record.removedNodes.forEach((node) => {
          console.log("Node removed", node);
        });
      });
    });

    observer.observe(editorRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const createParagraph = () => {
    const p = document.createElement("p");
    p.className = "text-2xl font-bold border rounded-md mt-3";
    p.innerHTML = "<br>";
    p.setAttribute("data-label", "paragraph");
    return p;
  };

  const handleKeydown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const editor = editorRef.current;
      if (!editor) return;
      const p = createParagraph();
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const cur = range.startContainer;
        let nextPosition: ChildNode | null = null;
        if (cur.nodeType !== Node.ELEMENT_NODE) {
          const parent = cur.parentElement as HTMLElement;
          nextPosition = parent.nextSibling;
        } else {
          nextPosition = cur.nextSibling;
        }
        if (nextPosition) {
          editor.insertBefore(p, nextPosition);
        } else {
          editor.appendChild(p);
        }

        // move caret to the new p node
        range.setStart(p, 0);
        range.setEnd(p, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };
  return (
    <div
      ref={editorRef}
      aria-label="WriteBlog"
      role="textbox"
      contentEditable
      onInput={(e) => console.log(e)}
      onKeyDown={handleKeydown}
      className="outline-0"
    ></div>
  );
}
