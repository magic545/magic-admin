import { basePermissions } from '@/settings'
import { RoleApi, UserApi } from '@/api'

export async function getUserInfo() {
  const res = await UserApi.getUser()
  const { id, username, profile, roles, currentRole } = res.data || {}
  return {
    id,
    username,
    avatar: profile?.avatar,
    nickName: profile?.nickName,
    gender: profile?.gender,
    address: profile?.address,
    email: profile?.email,
    roles,
    currentRole,
  }
}

export async function getPermissions() {
  let asyncPermissions = []
  try {
    const res = await RoleApi.getRolePermissions()
    asyncPermissions = res?.data || []
  } catch (error) {
    console.error(error)
  }
  return basePermissions.concat(asyncPermissions)
}
