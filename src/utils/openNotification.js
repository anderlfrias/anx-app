import { Notification, toast } from 'components/ui'

export default function openNotification (type, title, subtitle, options = { duration: 3000, placement: 'top-end' }) {
  if (type === 'error') type = 'danger'
  toast.push(
    <Notification
      title={title}
      type={type}
      closable
      duration={options.duration}
    >
      <p>{subtitle}</p>
    </Notification>,
    { placement: options.placement }
  )
}
