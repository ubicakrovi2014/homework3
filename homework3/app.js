// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'passed') {
    return attempts.filter((attempt) => attempt.passed === true)
  }

  if (filter === 'failed') {
    return attempts.filter((attempt) => attempt.passed === false)
  }

  return attempts
}

function renderAttempts(attempts) {
  const countElement = document.querySelector('#result-count')
  const listElement = document.querySelector('#result-list')
  const total = window.reportData.attempts.length
  const questionCount = window.reportData.questionCount
  let markup = ''

  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'

    markup += `
          <li class="result-item">
            <span class="result-name">${escapeHtml(attempt.name)}</span>
            <span>${attempt.score} из ${questionCount} (${attempt.percentage}%) — ${status}</span>
          </li>`
  })

  countElement.textContent = `Показано: ${attempts.length} из ${total}`
  listElement.innerHTML = markup
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const attempts = selectAttempts(select.value)
    renderAttempts(attempts)
  })
}

startFilter()
