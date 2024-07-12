export class DateUtils {
  static formatDate(date: Date) {
    if (!(date instanceof Date)) {
      date = new Date(date)
    }
    return new Date(date).toLocaleDateString('US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }
}
