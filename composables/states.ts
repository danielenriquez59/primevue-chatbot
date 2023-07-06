export const useTemperature = () => useState<number>('currentTemperature', () => 0.5)
export const useAgent = () => useState<object>('currentAgent', () => { return {name:"", info:"", systemprompt:""} })
export const useChatModel = () => useState<object>('currentChatModel', () => { return {name:"", tokens: 0 } })


