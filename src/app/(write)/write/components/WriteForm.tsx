"use client"

import { useCallback, useEffect, useRef, useState, type KeyboardEventHandler } from "react"
import BaseButton from "@/components/base-button"

// Enter 클릭 시, 캐럿의 위치를 어떻게 이동시킬 것인가?
// 현재 노드의 다음 위치로 이동

// 키보드 이벤트 관련 상수
const KEY_CODE = {
  BACKSPACE: "Backspace",
  ENTER: "Enter",
  A: "a", // cmd + a 를 위한 키코드 추가
  DELETE: "Delete", // delete 키를 위한 키코드 추가
} as const

// 블로그 컨텐츠 타입 정의
interface BlogContent {
  title: string
  content: string[]
}

/**
 * 새로운 단락 요소(<p>)를 생성하고 기본 스타일과 속성을 설정
 */
const createParagraph = () => {
  const p = document.createElement("p") // 새로운 p 태그 생성
  p.className = "text-2xl mt-3" // 기본 스타일 적용
  p.innerHTML = "<br>" // 빈 줄 생성
  p.setAttribute("data-label", "paragraph") // 단락 식별을 위한 속성 추가
  return p
}

export default function WriteForm() {
  // DOM 요소 참조를 위한 refs
  const editorRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // 상태 관리
  const [nNodes, setNNodes] = useState(0) // 전체 노드 수 추적
  const [hasTitle, setHasTitle] = useState(false) // 제목 유효성 상태
  const [isAllSelected, setIsAllSelected] = useState(false) // 전체 선택 상태 추가

  // 발행 가능 여부 확인
  const canPublish = nNodes > 0 && hasTitle

  /**
   * 제목 변경을 감지하고 유효성을 검사하는 핸들러
   */
  const handleTitleChange = useCallback(() => {
    if (!titleRef.current) return
    const titleText = titleRef.current.textContent // 현재 제목 텍스트 가져오기
    // 제목이 비어있지 않고 기본값이 아닌 경우 유효한 제목으로 설정
    setHasTitle(titleText !== null && titleText.trim() !== "" && titleText !== "Tell your story...")
  }, [])

  /**
   * 에디터 내용 변경을 감지하고 노드 수를 업데이트하는 옵저버 설정
   */
  useEffect(() => {
    if (!editorRef.current) return

    const observer = new MutationObserver((records) => {
      let nodeChange = 0 // 노드 변경 수 초기화
      records.forEach((record) => {
        nodeChange += record.addedNodes.length // 추가된 노드 수 계산
        nodeChange -= record.removedNodes.length // 제거된 노드 수 계산
      })
      setNNodes((prev) => Math.max(0, prev + nodeChange)) // 전체 노드 수 업데이트
      handleTitleChange() // 제목 변경 감지
    })

    // 옵저버 설정 및 시작
    observer.observe(editorRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => observer.disconnect() // 컴포넌트 언마운트 시 옵저버 해제
  }, [handleTitleChange])

  /**
   * 키보드 입력을 처리하는 핸들러
   * - 전체 선택(cmd/ctrl + a)
   * - 전체 삭제(전체 선택 상태에서 delete/backspace)
   * - 일반 삭제(backspace)
   * - 새 단락 생성(enter)
   */
  const handleKeydown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    // cmd/ctrl + a 처리
    if ((e.metaKey || e.ctrlKey) && e.key === KEY_CODE.A) {
      e.preventDefault() // 기본 동작 방지
      const selection = window.getSelection()
      const range = document.createRange()

      if (editorRef.current && selection) {
        range.selectNodeContents(editorRef.current) // 에디터 전체 내용 선택
        selection.removeAllRanges() // 기존 선택 영역 제거
        selection.addRange(range) // 새로운 선택 영역 추가
        setIsAllSelected(true) // 전체 선택 상태로 설정
      }
      return
    }

    // 전체 선택 상태에서의 삭제 처리
    if (isAllSelected && (e.key === KEY_CODE.DELETE || e.key === KEY_CODE.BACKSPACE)) {
      e.preventDefault()
      if (contentRef.current && titleRef.current) {
        titleRef.current.textContent = "Tell your story..." // 제목 초기화
        setHasTitle(false)

        // 모든 단락 삭제
        const paragraphs = contentRef.current.querySelectorAll('[data-label="paragraph"]')
        paragraphs.forEach((p) => p.remove())

        // 상태 초기화
        setIsAllSelected(false)
        setNNodes(0)
      }
      return
    }

    // 일반적인 Backspace 처리
    if (e.key === KEY_CODE.BACKSPACE) {
      const selection = window.getSelection()
      if (!selection?.rangeCount) return

      const range = selection.getRangeAt(0)
      const node = range.commonAncestorContainer

      if (node === titleRef.current || node === contentRef.current) {
        e.preventDefault()
      }

      if (titleRef.current?.textContent === "") {
        titleRef.current.textContent = "Tell your story..."
        setHasTitle(false)
        e.preventDefault()
      }
    }

    // Enter 키 처리
    if (e.key === KEY_CODE.ENTER) {
      e.preventDefault()
      setIsAllSelected(false) // 전체 선택 상태 해제

      const content = contentRef.current
      if (!content) return

      const newParagraph = createParagraph()
      const selection = window.getSelection()

      // 선택 범위가 있는 경우 처리
      if (selection?.rangeCount) {
        // 첫 번째 선택 범위 가져오기
        const range = selection.getRangeAt(0)
        // 공통 조상 컨테이너 가져오기
        const cur = range.commonAncestorContainer

        // 현재 노드가 제목인 경우 첫 번째 단락으로 이동
        if (cur === titleRef.current || cur.parentElement === titleRef.current) {
          const firstChild = content.querySelector('[data-label="paragraph"]')
          if (firstChild) {
            content.insertBefore(newParagraph, firstChild)
          } else {
            content.appendChild(newParagraph)
          }
        } else {
          // 현재 위치 다음에 새 단락 삽입
          let nextToInsertPosition: ChildNode | null = null
          if (cur.nodeType !== Node.ELEMENT_NODE) {
            const parent = cur.parentElement as HTMLElement
            nextToInsertPosition = parent.nextSibling
          } else {
            nextToInsertPosition = cur.nextSibling
          }

          if (nextToInsertPosition) {
            content.insertBefore(newParagraph, nextToInsertPosition)
          } else {
            content.appendChild(newParagraph)
          }
        }

        // 새로 생성된 단락으로 캐럿 이동
        range.setStart(newParagraph, 0)
        range.setEnd(newParagraph, 0)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  /**
   * 마우스 클릭 시 전체 선택 상태를 해제하는 핸들러
   */
  const handleClick = () => {
    setIsAllSelected(false) // 전체 선택 상태 해제
  }

  /**
   * 현재 에디터 내용을 BlogContent 형식으로 변환하는 함수
   */
  const getBlogContent = useCallback((): BlogContent => {
    const title = titleRef.current?.textContent || "" // 제목 텍스트 추출
    const paragraphs = contentRef.current?.querySelectorAll('[data-label="paragraph"]') || [] // 모든 단락 요소 선택
    const content = Array.from(paragraphs)
      .map((p) => p.textContent || "") // 각 단락의 텍스트 추출
      .filter(Boolean) // 빈 단락 제외

    return { title, content }
  }, [])

  /**
   * 글 발행을 처리하는 핸들러
   */
  const handlePublish = async () => {
    if (!canPublish) return // 발행 가능 여부 확인

    const blogContent = getBlogContent() // 현재 컨텐츠 가져오기
    // TODO: API 호출하여 컨텐츠 저장
    console.log("Publishing:", blogContent)
  }

  return (
    <section className="min-h-[calc(100vh-4rem)]">
      <div className="sticky top-0 z-10 flex justify-end bg-white py-4">
        <BaseButton disabled={!canPublish} onClick={handlePublish} variant="primary">
          Publish
        </BaseButton>
      </div>
      <div
        ref={editorRef}
        aria-label="WriteBlog"
        role="textbox"
        contentEditable
        onKeyDown={handleKeydown}
        onClick={handleClick}
        className="outline-0"
      >
        <section ref={contentRef} aria-label="story-content-container">
          <h3
            className="text-4xl font-bold focus:outline-none"
            ref={titleRef}
            aria-label="content-title"
          >
            Tell your story...
          </h3>
        </section>
      </div>
    </section>
  )
}
