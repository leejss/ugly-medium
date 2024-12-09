# Blog site

## DEV

### Authentication

- Sign up with email from scratch
- How to store password to the database ?

### Notes

- session table
- way to update db schema
- 세션이 존재하면, 로그인 상태로 간주한다. 그에 맞게 UI가 달라져야 한다.
- Profbile popover

  - popover root - container of the popover
  - popover trigger
  - popover content
  - center of the trigger

- auth provider

  - email and password
  - github

- How to apply the changes of schema with drizzle orm ?

  - db migration
  - version control of database schema
  - tracking database schema changes
  - providing the way to rollback the schema changes

- How to store github user to my own db? schema design

### Drizzle ORM

- CRUD 함수 구현하기
- 타입 추론 사용하기

### Drizzle kit workflow

- generate : 스키마 변경 사항을 추적하고 생성하는 명령어
- migrate : 스키마 변경 사항을 적용하는 명령어
- push : 스키마 변경 사항을 데이터베이스에 적용하는 명령어

### 패스워드 생성 절차

### 세션 생성 절차

- 해싱과 검증
- 데이터베이스에는 해싱된 세션 토큰 즉 세션 아이디를 저장하고
- 쿠키에는 오리지널 세션 토큰을 저장한다.
- 클라이언트사이드에서 세션 토큰을 검증해서 유저 세션을 가지고 오고 세션 만료시간을 검증한다.

### AuthMiddleware 구현하기

Middleware allows you to run code before a request is completed.  
Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

- check session

### Auth 성공과 실패에 대한 콜백 처리하기
