import WriteForm from "./components/WriteForm"
import WriteLayout from "./layout/write-layout"

export default function Page() {
  return (
    <WriteLayout>
      <div>
        <WriteForm />
      </div>
    </WriteLayout>
  )
}
