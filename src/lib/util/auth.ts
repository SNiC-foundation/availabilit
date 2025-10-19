export const isAdmin = (user) => {
    console.log(user)
    return user && user.roles.map(role => role.name).includes('Admin')
}