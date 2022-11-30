### Hexlet tests and linter status:
[![Actions Status](https://github.com/IvanBaryutin/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/IvanBaryutin/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/960a3bd5d6e7c8e98a3a/maintainability)](https://codeclimate.com/github/IvanBaryutin/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/960a3bd5d6e7c8e98a3a/test_coverage)](https://codeclimate.com/github/IvanBaryutin/frontend-project-46/test_coverage)

# Учебный проект «Вычислитель отличий»

Проект представляет собой CLI утилиту, которая сравнивает два конфигурационных файла.

## Возможности
Программа умеет принимать на вход два аргумента — пути до сравниваемых файлов. Отдельный аргумент используется для задания формата вывода результата сравнения файлов.

Поддерживаемые форматы входных файлов: JSON, YAML 
Поддерживаемые форматы вывода результата:
    - древовидный 'stylish' (используется по умолчанию)
    - плоский 'plain'
    - JSON 'json'



## Как установить

```

$ git clone git@github.com:IvanBaryutin/frontend-project-46.git
$ cd frontend-project-46
$ npm link
```


## Как пользоваться

```

# Вызвать помощь
gendiff -h

# Сравнить два файла (формат вывода результата по умолчанию)
gendiff file1.json file2.json

# Сравнить два файла (формат вывода плоский)
gendiff -f plain file1.yml file2.yml

# Сравнить два файла (формат вывода JSON)
gendiff -f json file1.yml file2.yml
```

### Asciinemas:

##### Сравнение двух файлов с выводом в формате по умолчанию

[![asciicast](https://asciinema.org/a/yUdhlP3aqtzHWoCNXfN2OTxne.svg)](https://asciinema.org/a/yUdhlP3aqtzHWoCNXfN2OTxne)

##### Сравнение двух файлов с выводом в формате plain

[![asciicast](https://asciinema.org/a/mpZLV8zOCOmriz65SsDgjU4M9.svg)](https://asciinema.org/a/mpZLV8zOCOmriz65SsDgjU4M9)

##### Сравнение двух файлов с выводом в формате JSON

[![asciicast](https://asciinema.org/a/gpZuMv0ZwQWTHdkbJWOyb11ZS.svg)](https://asciinema.org/a/gpZuMv0ZwQWTHdkbJWOyb11ZS)