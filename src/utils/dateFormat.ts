export function ukFormat(dateString) {
  const date = new Date(dateString)

  const datePart = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  // return `${datePart}<br><span class="text-[12px] text-muted-foreground">${timePart}</span>`
  return `${datePart}\n${timePart}`
}
