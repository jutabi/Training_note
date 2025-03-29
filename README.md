### TODO
- (O) elastic stack (e, l, k) docker-compose
- (O) docker-compose volume 마운트를 사용,  logstash 의 sincedb_path 를 사용
- (O) docker-compose logstash volume 설정 (logstash/pipeline/*.config)
- (O) enable elasticsearch security
  - (O) docker-compose .env file
- (X) Express.js 서버 생성
- (X) 서버, elk 동시에 docker-compose 이용하여 실행
  - (X) 가능하다면 kubernetes 실습
- (X) circleci 활용방법 생각해보기
- (X) 운동기록 어플 생성, 서버 연동하기

### +elasticsearch docker memory err
1. wsl -d docker-desktop
2. sysctl -w vm.max_map_count=262144