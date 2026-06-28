---
title: "tmux 워크스페이스 플러그인"
category: projects
tags:
  - tmux-workspace-plugin
  - type/project
  - visibility/public
created: 2026-06-28
updated: 2026-06-28
draft: false
summary: "노트 앱의 버튼 하나로 WSL 안의 tmux 작업 세션을 통째로 띄우는 크로스-OS 생산성 플러그인. preflight 검사와 터미널 폴백, 디버그 로그로 '조용히 실패하지 않는' 자동화를 설계한 케이스."
---

리본 버튼 하나로 WSL 안의 tmux 작업 세션을 통째로 띄우는 크로스-OS 생산성 플러그인.

## 배경 / 문제

노트와 개발 작업이 한 화면에서 끊긴다. 노트 앱에서 글을 보다가 터미널을 열고, WSL에 들어가 tmux 세션을 만들고, 창과 pane을 배치하는 과정을 매번 손으로 반복해야 했다. 컨텍스트 전환 비용이 작업 흐름을 자주 끊었다.

## 접근 / 기술 스택

노트 앱의 리본 버튼 또는 명령 팔레트에서 워크스페이스를 한 번에 여는 플러그인으로 풀었다. 실행 전 preflight 단계가 WSL 환경과 세션 이름을 먼저 검사하고, 터미널은 `auto` 모드에서 Windows Terminal을 우선 시도한 뒤 실패하면 PowerShell로 폴백한다. 실제 창·pane 구성은 별도 셸 스크립트가 담당해 UI와 실행 로직을 분리했다. 스택은 Obsidian 플러그인 API(JavaScript), WSL2 Ubuntu, tmux, Windows Terminal.

## 상태 / 배운 점

개인용으로 동작하는 단계. 크로스-OS 자동화에서는 "조용히 실패하지 않게" 만드는 일이 핵심이라, JSONL 디버그 로그와 명령 미실행 smoke 테스트로 각 단계를 검증 가능하게 했다. 권한이 강한 실행은 기본을 낮추고 필요할 때만 환경변수로 올리도록 설계했다.

관련: [[obsidian-vault]]
