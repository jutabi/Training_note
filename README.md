### training_note.conf
- logs 작성할 때 기존 내용 지우기
- input path 절대경로 변경(리눅스 기반으로)하거나 env 설정해서 가져오기
- output user, password 변경 or keystore 저장
  - docker-compose 에서 실행하는 경우 단일사용자만 포트 개방
- ../../bin/logstash -f training_note.conf 실행  
  (pwd = /usr/share/logstash/project/config)

### TODO
- elastic stack (e, l, k) docker-compose
- Express.js 서버 생성
- 서버, elk 동시에 docker-compose 이용하여 실행
    - 가능하다면 kubernetes 실습
- circleci 활용방법 생각해보기