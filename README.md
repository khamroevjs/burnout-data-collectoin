# Система сбора и обработки данных психологических опросов. Подсистема сбора данных

<pre>
<code style="color: green">
.
├── <span style="color:red">Dockerfile:</span> Файл Dockerfile, используемый для создания Docker-образа приложения.
├── <span style="color:red">build.gradle.kts:</span> Файл сценария Gradle для настройки зависимостей и сборки проекта.
├── <span style="color:red">gradle:</span> Папка, содержащая файлы Gradle.
│   └── <span style="color:red">wrapper:</span> Папка, содержащая файлы Gradle Wrapper.
│       ├── <span style="color:red">gradle-wrapper.jar:</span> Файл JAR Gradle Wrapper, используемый для управления версией Gradle.
│       └── <span style="color:red">gradle-wrapper.properties:</span> Файл свойств Gradle Wrapper, содержащий информацию о версии Gradle.
├── <span style="color:red">gradlew:</span> Скрипт Gradle Wrapper для UNIX-систем.
├── <span style="color:red">gradlew.bat:</span> Скрипт Gradle Wrapper для Windows.
├── <span style="color:red">settings.gradle.kts:</span> Файл сценария Gradle, определяющий настройки проекта.
└── <span style="color:red">src:</span> Папка, содержащая исходный код проекта.
├── <span style="color:red">main:</span> Папка, содержащая основной исходный код проекта.
│   ├── <span style="color:red">kotlin:</span> Папка с исходным кодом на языке Kotlin.
│   │   └── com
│   │       └── burnoutstopper
│   │           └── <span style="color:red">gatewayservice:</span> Пакет, содержащий основную структуру проекта.
│   │               ├── <span style="color:red">config:</span> Папка, содержащая конфигурационные классы проекта.
│   │               │   └── <span style="color:red">security:</span> Папка, содержащая классы конфигурации безопасности.
│   │               ├── <span style="color:red">controller:</span> Папка, содержащая классы контроллеров проекта.
│   │               ├── <span style="color:red">dto:</span> Папка, содержащая классы DTO (Data Transfer Object) проекта.
│   │               │   ├── <span style="color:red">respondent:</span> Папка, содержащая классы DTO, связанные с информацией о респондентах.
│   │               │   └── <span style="color:red">results:</span> Папка, содержащая классы DTO, связанные с результатами.
│   │               └── <span style="color:red">service:</span> Папка, содержащая классы сервисов проекта.
│   │                   ├── <span style="color:red">respondent:</span> Папка, содержащая классы сервисов, связанные с респондентами.
│   │                   └── <span style="color:red">results:</span> Папка, содержащая классы сервисов, связанные с результатами.
│   └── <span style="color:red">resources:</span> Папка, содержащая ресурсы проекта.
│       ├── <span style="color:red">application.yml:</span> Файл конфигурации приложения в формате YAML.
│       └── <span style="color:red">banner.txt:</span> Файл, содержащий баннер, который отображается при запуске приложения.
└── <span style="color:red">test:</span> Папка, содержащая тестовый код проекта.
    └── <span style="color:red">kotlin:</span> Папка с тестовым исходным кодом на языке Kotlin.
        └── com
            └── burnoutstopper
                └── <span style="color:red">gatewayservice:</span> Пакет, содержащий тестовые классы проекта.
</code>
</pre>
