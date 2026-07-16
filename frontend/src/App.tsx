import { PrimaryLayout } from '@/layouts/PrimaryLayout'
import { GaragePlaceholder } from '@/features/garage/components/GaragePlaceholder'
import { DriverProfilePlaceholder } from '@/features/driver-profile/components/DriverProfilePlaceholder'
import { RadioRoomPlaceholder } from '@/features/radio-room/components/RadioRoomPlaceholder'
import { StartupSequencePlaceholder } from '@/features/startup-sequence/components/StartupSequencePlaceholder'

function App() {
  return (
    <PrimaryLayout>
      <StartupSequencePlaceholder />
      <GaragePlaceholder />
      <DriverProfilePlaceholder />
      <RadioRoomPlaceholder />
    </PrimaryLayout>
  )
}

export default App
