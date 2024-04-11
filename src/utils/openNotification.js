import { Notification, toast } from 'components/ui'

export default function openNotification (type, title, subtitle, duration = 3000) {
  if (type === 'error') type = 'danger'
  toast.push(
    <Notification
      title={title}
      type={type}
      closable
      duration={duration}
    >
      <p>{subtitle}</p>
    </Notification>
  )
}
