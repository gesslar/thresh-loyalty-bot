import axios from "axios"
import {decode} from '@gesslar/lpml'
import {FileObject} from "@gesslar/toolkit"

const fileName    = "/frogdice/thresh/lib/etc/loyalty/loyalty.lpml"
const file        = new FileObject(fileName)
const contents    = await file.read();
const jsonContent = decode(contents)
const date        = new Date()
const today       = date.getDate() - 1
const fromCalendar= jsonContent.reward_calendar[today]
const reward      = jsonContent.rewards[fromCalendar]
const _testhook    = "https://discord.com/api/webhooks/1554658222848217131/rltXBmkhfdEBtJq1xNUbDtDmn9y9_bAmHNRXD0uCBdi4bcHAcZsI_R2rId9DMa5gwEux"
const webhook     = "https://discordapp.com/api/webhooks/619540296115552266/M76BASJgLf8CR1L4EeUw2QrqlwRnUlFvjSZWpGQJcQECDKj5TVjdd2Hsxv8EDKrL4J90"
const payload     = {
  content: `:trophy: Today's Loyalty Reward is __**${reward.name}**__. Grab it now!`
  }

try {
  await axios.post(webhook, payload)
} catch(err) {
  console.error(err)
}
