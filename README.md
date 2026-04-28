# Grass

Three.js 기반의 실험용 3D 장면입니다. 잔디, 유리 재질, 바닥 셰이더를 조합해서 간단한 월드 렌더링을 구성합니다.

## What this project does

- `three.js`로 WebGL 장면을 렌더링합니다.
- 잔디 메시와 셰이더 기반 바닥을 생성합니다.
- 전송/굴절 계열 커스텀 머티리얼을 사용합니다.
- `lil-gui`로 디바이스 기울기 값을 확인할 수 있습니다.

## Recent fix

GitHub Pages 또는 브라우저 직접 실행 환경에서 `three` 모듈을 찾지 못해 화면이 안 뜨는 문제가 있었습니다.

이번 수정으로 다음을 정리했습니다.

- 브라우저가 직접 읽을 수 있도록 `three`와 `lil-gui`를 import map으로 연결
- 로컬 `.glsl` 셰이더를 `fetch()`로 읽도록 변경
- 이미지와 GLB 같은 정적 자산을 `new URL(..., import.meta.url)` 방식으로 로드하도록 변경
- 일부 `three` addon import 경로를 브라우저 호환 형태로 정리

## Run locally

이 프로젝트는 Vite 스타일의 모듈 구조를 사용합니다. 기존 개발 환경이 있다면 그 설정으로 실행하면 됩니다.

## Notes

- `file://`로 HTML을 직접 열면 일부 ES module/asset 로딩이 제한될 수 있습니다.
- GitHub Pages 배포 시에는 빌드 결과물을 서비스해야 합니다.
