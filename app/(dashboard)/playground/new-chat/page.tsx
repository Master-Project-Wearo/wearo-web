"use client"

import { ContentWrapper } from "@/components/content-wrapper"
import { MessageComposer } from "@/components/message-composer"
import { useAuth } from "@/providers/auth-provider"

export default function NewChatPage() {
  const { user } = useAuth()

  return (
    <div className="flex flex-1 items-center justify-center">
      <ContentWrapper className="items-center text-center">
        <h1>
          Salut <span className="text-primary">{user?.nickname}</span>, une
          question ?
        </h1>
        <MessageComposer />
      </ContentWrapper>
    </div>
  )
}
