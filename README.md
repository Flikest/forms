чтобы запустить приложение в dev конфиге:
```bash
$ task dev-up
```
чтобы запустить приложение в prod кнфге:  
```bash
$ task prod-up
```
если нет task то
чтобы запустить приложение в dev конфиге:
```bash
$ docker-compose --env-file .env.local up -d
$ npm run start:prod
```
чтобы запустить приложение в prod кнфге: 
```bash
$ docker-compose --env-file .env.prod up -d
$ npm run start:prod
```
