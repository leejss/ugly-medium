"use client";

import { useEffect, useRef, useState, type KeyboardEventHandler } from "react";

const KEY_CODE = {
  BACKSPACE: "Backspace",
  ENTER: "Enter",
};

const createParagraph = () => {
  const p = document.createElement("p");
  p.className = "text-2xl mt-3";
  p.innerHTML = "<br>";
  p.setAttribute("data-label", "paragraph");
  return p;
};

export default function WriteForm() {
  const editorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [nNodes, setNNodes] = useState(0);
  const canPublish = nNodes > 0;

  useEffect(() => {
    if (!editorRef.current) return;

    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          console.log("Node added", node);
          setNNodes((prev) => prev + 1);
        });
        record.removedNodes.forEach((node) => {
          console.log("Node removed", node);
          setNNodes((prev) => prev - 1);
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

  const handleKeydown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === KEY_CODE.BACKSPACE) {
      // delete text node and paragraph node
      // but prevent deleting title node and cotent node
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const node = range.commonAncestorContainer;

      if (node === titleRef.current) {
        e.preventDefault();
      }
      if (node === contentRef.current) {
        e.preventDefault();
      }
    }

    if (e.key === KEY_CODE.ENTER) {
      e.preventDefault();
      const content = contentRef.current;
      if (!content) return;

      const newParapraph = createParagraph();
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const cur = range.commonAncestorContainer;
        let nextToInsertPosition: ChildNode | null = null;
        if (cur.nodeType !== Node.ELEMENT_NODE) {
          const parent = cur.parentElement as HTMLElement;
          nextToInsertPosition = parent.nextSibling;
        } else {
          nextToInsertPosition = cur.nextSibling;
        }

        if (nextToInsertPosition) {
          content.insertBefore(newParapraph, nextToInsertPosition);
        } else {
          content.appendChild(newParapraph);
        }
        range.setStart(newParapraph, 0);
        range.setEnd(newParapraph, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const handlePublish = async () => {};

  return (
    <section>
      <div className="flex justify-end">
        <button
          className="px-2 py-1 bg-green-600 text-white rounded-md"
          disabled={!canPublish}
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
      <div
        ref={editorRef}
        aria-label="WriteBlog"
        role="textbox"
        contentEditable
        onKeyDown={handleKeydown}
        className="outline-0"
      >
        <section ref={contentRef} aria-label="story-content-container">
          <h3
            className="text-4xl font-bold"
            ref={titleRef}
            aria-label="content-title"
          >
            Tell your story...
          </h3>
        </section>
      </div>
    </section>
  );
}
