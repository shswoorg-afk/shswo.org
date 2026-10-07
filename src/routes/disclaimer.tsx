import { createFileRoute } from '@tanstack/react-router'
import Disclaimer from '../../components/disclaimer'
export const Route = createFileRoute('/disclaimer')({
  component: Disclaimer,
})
