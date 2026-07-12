import { format } from "date-fns"
import { redirect } from "next/navigation"
import { connection } from "next/server"

export default async function SchedulesPage() {
  await connection()

  const date = new Date()

  redirect(`/wardrobe/schedules/${format(date, "dd-MM-yyyy")}`)
}
