### training_note.conf
- (O) logs 작성할 때 기존 내용 지우기
- (O) input path 절대경로 변경(리눅스 기반으로)하거나 env 설정해서 가져오기
- (O) output user, password 변경 or keystore 저장
- (X) docker-compose 에서 실행하는 경우 단일사용자만 포트 개방

### TODO
- (O) elastic stack (e, l, k) docker-compose
- (O) logs 파일이 변경되면
  - 로그스태시 내의 file rotate 를 사용하지 않고 js를 이용하여 신규데이터 작성시
    기존 데이터를 삭제하고 작성하도록 함.
    - (sincedb_path 를 /dev/null 로 설정한 이유)
- (O) docker-compose logstash volume 설정 (logstash/pipeline/*.config)
- (X) Express.js 서버 생성
- (X) 서버, elk 동시에 docker-compose 이용하여 실행
    - 가능하다면 kubernetes 실습
- (X) circleci 활용방법 생각해보기

### +elasticsearch docker memory err
1. wsl -d docker-desktop
2. sysctl -w vm.max_map_count=262144