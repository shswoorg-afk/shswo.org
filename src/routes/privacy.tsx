import { createFileRoute } from '@tanstack/react-router'
import PrivacyPolicy from '../../components/privacy'
export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicy
})
