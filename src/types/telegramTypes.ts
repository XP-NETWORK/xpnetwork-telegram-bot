export type TelegramUpdate = {
    update_id: number
    message?: TelegramMessage
    edited_message?: TelegramMessage
    channel_post?: TelegramMessage
    edited_channel_post?: TelegramMessage
    inline_query?: TelegramInlineQuery
    chosen_inline_result?:  TelegramChosenInlineResult
    callback_query?: TelegramCallbackQuery
    shipping_query?: TelegramShippingQuery
    pre_checkout_query?: TelegramPreCheckoutQuery
    poll?: TelegramPoll
    poll_answer?: TelegramPollAnswer
    my_chat_member?: TelegramChatMemberUpdated
    chat_member?: TelegramChatMemberUpdated
}

export type TelegramUser = {
    id: number
    is_bot: boolean
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    can_join_groups?: boolean
    can_read_all_group_messages?: boolean
    supports_inline_queries?: boolean
}

export enum TelegramChatMemberStatus {
    Creator = 'creator',
    Administrator = 'administrator',
    Member = 'member',
    Restricted = 'restricted',
    Left = 'left',
    Kicked = 'kicked'
}
export type TelegramMessage = {
    message_id: number
    from?: TelegramUser
    sender_chat?: TelegramChat
    date: number
    chat: TelegramChat
    forward_from?: TelegramUser
    forward_from_chat?: TelegramChat
    forward_from_message_id?: number
    forward_signature?: string
    forward_sender_name?: string
    forward_date?: number
    reply_to_message?: TelegramMessage
    via_bot?: TelegramUser
    edit_date?: number
    media_group_id?: string
    author_signature?: string
    text?: string
    entities?: TelegramMessageEntity[]
    animation?: TelegramAnimation
    audio?: TelegramAudio
    document?: TelegramDocument
    photo?: TelegramPhotoSize[]
    sticker?: TelegramSticker
    video?: TelegramVideo
    video_note?: TelegramVideoNote
    voice?: TelegramVoice
    caption?: string
    contact?: TelegramContact
    dice?: TelegramDice
    game?: TelegramGame
    poll?: TelegramPoll
    venue?: TelegramVenue
    location?: TelegramLocation
    new_chat_members?: TelegramUser[]
    left_chat_member?: TelegramUser
    new_chat_title?: string
    new_chat_photo?: TelegramPhotoSize[]
    delete_chat_photo?: true
    group_chat_created?: true
    supergroup_chat_created?: true
    channel_chat_created?: true
    message_auto_delete_timer_changed?: TelegramMessageAAutoDeleteTimerChange
    migrate_to_chat_id?: number
    pinned_message?: TelegramMessage
    invoice?: TelegramInvoice
    successful_payment?: TelegramSuccessfulPayment
    connected_website?: string
    passport_data?: TelegramPassportData
    proximity_alert_triggered?: TelegramProximityAlertTriggered
    voice_chat_started?: TelegramVoiceChatStart
    voice_chat_ended?: TelegramVoiceChatEnded
    voice_chat_participants_invited?: TelegramVoiceChatParticipantsInvited
    reply_markup?: TelegramInlineKeyboardMarkup

}

export type TelegramInlineQuery = {

}

export type TelegramChosenInlineResult = {

}

export enum TelegramQueries {
    NewCaptcha = 'new-captcha'
}

export type TelegramCallbackQuery = {
    id: string
    message?: TelegramMessage
    data?: string
    from: TelegramUser
}

export type TelegramShippingQuery = {

}

export type TelegramPreCheckoutQuery = {

}

export type TelegramPollAnswer = {

}

export type TelegramVoiceChatEnded = {

}

export type TelegramChatMember  = {
    user: TelegramUser
    status: TelegramChatMemberStatus
    custom_title?: string
    is_anonymous?: boolean
    can_be_edited?: boolean
    
}

export type TelegramChatMemberUpdated = {

}

export type TelegramInvoice = {

}

export type TelegramSuccessfulPayment = {

}

export type TelegramPassportData = {

}

export type TelegramProximityAlertTriggered = {

}

export type TelegramVoiceChatStart = {

}

export type VoiceChatEnded = {

}

export type TelegramVoiceChatParticipantsInvited = {

}

export type TelegramInlineKeyboardMarkup = {

}

export type TelegramMessageAAutoDeleteTimerChange = {

}

export type TelegramDice = {

}

export type TelegramContact ={

}

export type TelegramGame = {

}

export type TelegramPoll = {

}

export type TelegramVenue = {

}

export type TelegramLocation = {

}

export type TelegramVideoNote ={

}

export type TelegramAudio = {

}

export type TelegramDocument = {

}

export type TelegramPhotoSize = {

}

export type TelegramSticker = {

}

export type TelegramVideo ={

}

export type TelegramVoice ={

}

export type TelegramAnimation = {

}

export type TelegramMessageEntity = {

}

export type TelegramChat = {
    id: number
    type: string
    title?: string
    username?: string
    first_name?: string
    last_name?: string
    photo?: TelegramChatPhoto
    bio?: string
    description?: string
    invite_link?: string
    pinned_message?: TelegramMessage
    permissions?: TelegramChatPermissions
    slow_mode_delay?: number
    message_auto_delete_time?: number
    sticker_set_name?: string
    can_set_sticker_set?: boolean
    linked_chat_id?: BigInteger
    location?: TelegramChatLocation
}

export type TelegramChatLocation = {

}

export type TelegramChatPermissions = {

}

export type TelegramChatPhoto = {

}