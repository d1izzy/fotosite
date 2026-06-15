# В ФОКУСЕ — лендинг фотоцентра

Одностраничный сайт для ИП фотоуслуг в ТРЦ «Фокус», Челябинск.

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт откроется на http://localhost:5173

## Сборка

```bash
npm run build
npm run preview
```

## GitHub Pages

Проект настроен на автоматический деплой через GitHub Actions при push в ветку `main` или `master`.

После публикации сайт будет доступен по адресу:

`https://ВАШ_ЛОГИН.github.io/ИМЯ_РЕПОЗИТОРИЯ/`

### Первый раз: создать репозиторий и залить код

1. На [github.com](https://github.com) нажмите **New repository**
2. Имя репозитория, например: `fotosite` (без README и .gitignore — они уже в проекте)
3. В папке проекта выполните (подставьте свой логин):

```bash
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/fotosite.git
git push -u origin main
```

4. В репозитории на GitHub: **Settings → Pages → Build and deployment → Source** → выберите **GitHub Actions**
5. После успешного workflow (вкладка **Actions**) сайт появится по ссылке выше

### Вернуться к сохранённой версии (Git)

```bash
git log --oneline          # список версий
git checkout 0ad97c8       # вернуться к коммиту
git checkout main          # вернуться к последней версии
```
