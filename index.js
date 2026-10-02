import axios from "axios"
import {decode} from '@gesslar/lpml'
import {FileObject} from "@gesslar/toolkit"

process.loadEnvFile(new URL(".env", import.meta.url))

const webhook     = process.env.WEBHOOK_URL

if(!webhook) {
  console.error("WEBHOOK_URL is not set in .env")
  process.exit(1)
}

const fileName    = "/frogdice/thresh/lib/etc/loyalty/loyalty.lpml"
const file        = new FileObject(fileName)
const contents    = await file.read();
const jsonContent = decode(contents)
const date        = new Date()
const today       = date.getDate() - 1
const fromCalendar= jsonContent.reward_calendar[today]
const reward      = jsonContent.rewards[fromCalendar]
const payload     = {
  content: `:trophy: Today's Loyalty Reward is __**${reward.name}**__. Grab it now!`
  }

try {
  await axios.post(webhook, payload)
} catch(err) {
  console.error(err)
}
