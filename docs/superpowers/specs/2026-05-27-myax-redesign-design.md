# MyAX Redesign — Design Spec
Date: 2026-05-27

## Summary
DESIGN (1).md 토큰(Teal + Merriweather) 적용 + 발견 프레임 카피 유지.
풀스크린 scroll-snap 섹션, 히어로 MP4 배경, 기본 다크모드.

## Color System (Dark Mode Default)
- background: #0a1a1b
- card surface: #0e2426
- accent (teal): #95d1d3 (텍스트), #1c5d5f (버튼 배경)
- heading text: #f2f8f7
- body text: #cae1e2
- border: #1c3a3c
- muted text: #6b9a9c

## Typography
- Heading: Merriweather (serif, Google Fonts)
- UI/Body: Montserrat + Noto Sans KR fallback

## Sections (scroll-snap, 100vh each)
1. Hero — MP4 bg + 65% overlay + 페르소나 카피 + CTA
2. AX란 — 2단 레이아웃
3. 6대 영역 — 3×2 그리드
4. 성장 지도 — 2단 + 레벨 리스트
5. PDF 보고서 — 2단 + 목업
6. 진행 방식 — 3열
7. FAQ — 아코디언
8. 최종 CTA — 전면

## Hero Video
- 경로: /hero-video.mp4 (public/ 폴더)
- autoPlay muted loop playsInline
- 오버레이: rgba(0,0,0,0.65)

## Scroll Snap
- html: scroll-snap-type y mandatory
- section: scroll-snap-align start, height 100vh
