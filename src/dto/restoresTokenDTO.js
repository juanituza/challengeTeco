export default class RestoreTokenDTO{
    static getfrom = (user) => {
        return {
            email: user.email,
        }
    }
}