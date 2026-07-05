export function ukFormat(dateString: string, plainText = false): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

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

  if (plainText) return `${datePart} | ${timePart}`

  return `${datePart}<br><span class="text-[12px] text-muted-foreground">${timePart}</span>`
}
