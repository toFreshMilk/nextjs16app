


5. uri가 진실의 원천, nuqs
6. 로그인 및 권한체크는 proxy.ts 에서. layout.tsx에서 처리함. 세션타이머를 레이아웃에서 임포트하면 됨.
7. 특정 고객사가 app/ 과 standard/ 에는 없는 페이지나 기능을 추가한다면 어떻게 대응해야하나? 슬러지로
8. ui kit 정리하기. 외부저장소로 올려도 되지 않나? pnpm에 올리기?
9. Parallel Routes (@top, @left, @right 개별적인 에러 바운더리) - 오버엔지니어링이라 유보함.
10. usecache 현재는 오버엔지니어링임.
11. ppr(부분 스테틱, 부분 다이나믹) -> 나중에 몰아서 정리하면 됨. 현재는 오버엔지니어링임

핵심파일들 살펴보고 정리한번하고 다음으로 넘어가면 될듯. 이거는 눈으로 봐야한다.

1. on/off 로직을 정형화 할 수 있는지, 여지가 있는지. 기능마다 좀 구조가 달라서. 언어별로 세분화하던지.

2. 서브도메인 변경되면 각자의 설정이 영향을 미치지 않는지 한번 더 확인하기



이후부터는 nuqs 정도가 남아있는데 이거 적용하면서 구체적인 화면 구현하면 될듯.? 기초컴포넌트 작업도.

nuqs를 어디까지 쓸건지를 좀 정해야함. 근데 로컬상태만 쓰고 나머지는 걍 새로 받아오는게 맞지.

디테일하게는 에디터, 차트, 그리드, 게시판, 엑셀, pdf 다운로드, 온니오피스 같은거 적용하는거 검토,





# src/scripts/reset-gemini.ps1
# WebStorm 내장 터미널(PowerShell)용 Gemini CLI 및 pnpm 캐시 강제 초기화 스크립트

Write-Host "1. 기존 Gemini CLI 프로세스 정리 중..."
# Windows 환경에서 WMI를 이용해 실행 명령줄(CommandLine)에 'gemini'가 포함된 node 프로세스만 정확히 타겟팅하여 종료합니다.
# (전체 node 프로세스를 끄면 Next.js 서버나 WebStorm 언어 서비스가 죽을 수 있으므로 주의해야 합니다)
$geminiProcesses = Get-WmiObject Win32_Process | Where-Object { $_.Name -match "node" -and $_.CommandLine -match "gemini" }

if ($geminiProcesses) {
foreach ($proc in $geminiProcesses) {
Stop-Process -Id $proc.ProcessId -Force
Write-Host "PID $($proc.ProcessId) (Gemini CLI) 프로세스를 강제 종료했습니다."
}
} else {
Write-Host "현재 실행 중인 Gemini CLI 좀비 프로세스가 없습니다."
}

Write-Host "2. pnpm 캐시 정리 중..."
# pnpm 환경 교착 상태 해소
pnpm store prune

Write-Host "3. 프로세스 초기화가 완료되었습니다. Gemini CLI를 다시 실행하세요."




# 1. Git 인덱스(캐시)에 있는 모든 파일의 추적 상태를 일괄 삭제합니다.
# (주의: 디스크의 실제 파일은 지워지지 않으니 안심하셔도 됩니다)
git rm -r --cached .

# 2. 현재 디렉토리의 모든 파일을 다시 Git에 추가합니다.
# (이때 방금 업데이트된 .gitignore의 규칙이 비로소 강력하게 적용되어, 무시할 파일들은 걸러집니다)
git add .

# 3. 캐시가 정리된 상태를 새로운 커밋으로 확정하여 저장소에 반영합니다.
git commit -m "chore: apply gitignore to already tracked files"


"먼저 mcp_next-devtools_init 도구를 실행해서 컨텍스트를 초기화해 줘. 그 다음 nextjs_index를 호출해서 현재 켜져 있는 내 로컬 개발 서버와 연동해 줘."
