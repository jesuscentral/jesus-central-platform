import { get } from '@vercel/edge-config'

export const getConfig = async () => {
  const config: { auth: boolean } | undefined = await get(
    `${process.env.NEXT_PUBLIC_BASE_PATH}`,
  )
  return config
}
