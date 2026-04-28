# Grass

Three.js로 만든 셰이더 기반 3D 자연 월드 프로젝트입니다.

잔디, 바닥, 유리 질감의 오브젝트를 조합해 작은 월드 느낌의 장면을 렌더링하며, 커스텀 셰이더와 GLTF 모델을 활용해 환경 표현을 실험합니다.

## 주요 기능

- Three.js 기반 3D 씬 렌더링
- 잔디와 바닥을 셰이더로 표현
- 유리/전송 계열 커스텀 머티리얼 적용
- GLTF 모델 및 텍스처 로딩
- OrbitControls를 이용한 카메라 회전 및 시점 조작
- 디바이스 기울기 값을 반영하는 인터랙션

## 기술 스택

- JavaScript
- Three.js
- Vite 스타일 모듈 구조
- lil-gui
- GLSL 셰이더

## 프로젝트 구조

```text
src/
├── assets/        # 텍스처, 모델
├── material/      # 커스텀 머티리얼
├── sample/        # 예제 씬
├── shader/        # 버텍스/프래그먼트 셰이더
├── Floor.js       # 바닥 메쉬
├── Glass.js       # 유리 오브젝트
├── Grass.js       # 잔디 지오메트리 및 셰이더
└── main.js        # 메인 엔트리
```

## 최근 수정 사항

브라우저에서 직접 열거나 GitHub Pages에서 배포할 때 `three` 모듈 해석 오류로 화면이 안 뜨는 문제가 있었습니다.

이번 수정으로 다음 내용을 정리했습니다.

- `three`와 `lil-gui`를 브라우저에서 읽을 수 있도록 import map 연결
- 로컬 `.glsl` 셰이더를 `fetch()`로 읽도록 변경
- 이미지와 GLB 같은 정적 자산을 `new URL(..., import.meta.url)` 방식으로 로드하도록 변경
- `three` addon import 경로를 브라우저 호환 형태로 정리

## 참고

- 이 프로젝트는 정식 게임이라기보다 3D 렌더링과 셰이더 실험용 구조에 가깝습니다.
- `file://`로 HTML을 직접 열면 일부 ES module 또는 asset 로딩이 제한될 수 있습니다.
- GitHub Pages 배포 시에는 빌드된 결과물을 서비스해야 합니다.
