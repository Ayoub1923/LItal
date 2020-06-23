const users = []

export function getUsers(state = users, action) {
  if (action.type === "getusers")
    return action.item
  return state
}
