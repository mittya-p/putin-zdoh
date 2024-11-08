window.addEventListener('load', function () {
  // Установим задержку для показа логотипа дольше (например, 3 секунды)
  setTimeout(function () {
    var preloader = document.getElementById('preloader')
    var content = document.getElementById('content')

    // Скрываем preloader
    preloader.style.display = 'none'

    // Показываем содержимое и плавно увеличиваем его непрозрачность
    content.style.display = 'flex'
    setTimeout(function () {
      content.style.opacity = 1
    }, 1000) // Небольшая задержка для плавного появления контента
  }, 5000) // Задержка в 3 секунды для показа логотипа
})
