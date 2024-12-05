### Hexlet tests and linter status:
[![Actions Status](https://github.com/Maksonik/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Maksonik/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/1363879eb9b29da10dd2/maintainability)](https://codeclimate.com/github/Maksonik/frontend-project-46/maintainability)
[![Tests](https://github.com/Maksonik/frontend-project-46/actions/workflows/test_lint.yml/badge.svg)](https://github.com/Maksonik/frontend-project-46/actions/workflows/test_lint.yml)



**Gendiff** — это библиотека, предназначенная для сравнения двух файлов конфигурации (JSON или YAML) и отображения их различий в различных форматах: **stylish**, **plain**, **json**.

## Установка

1. Убедитесь, что у вас установлена Node.js версии 14 и выше.
2. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/ваш_репозиторий.git
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Свяжите библиотеку локально:
   ```bash
   npm link
   ```

## Использование

Запустите следующую команду в терминале:

```bash
gendiff [параметры] <первый_файл> <второй_файл>
```

### Примеры

1. Сравнение файлов с выводом в формате `stylish` (по умолчанию):
   ```bash
   gendiff file1.json file2.json
   ```

[![asciinema](https://asciinema.org/a/tS1v46zptWvcSCj67L8WjeycP)](https://asciinema.org/a/tS1v46zptWvcSCj67L8WjeycP)

2. Сравнение файлов с выводом в формате `plain`:
   ```bash
   gendiff --format plain file1.json file2.json
   ```

3. Сравнение файлов с выводом в формате `json`:
   ```bash
   gendiff --format json file1.yaml file2.yaml
   ```
