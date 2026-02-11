export default function NotificationItem({ title, message, date }) {
  return (
    <div className="border border-border rounded-sm p-3">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-sm text-textSecondary">{message}</p>
      <p className="text-xs text-textDisabled mt-1">{date}</p>
    </div>
  );
}
