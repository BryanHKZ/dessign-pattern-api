import { IUser } from "../../interfaces"

export default class UserMapper extends DBConnection {
  findUserById(id?: String):IUser|null {
    //DO REQUEST TO DATABASE AND RETURNED DATA MUST BE MAPPED TO USER MODEL
    //const data = await prisma.ctx.user.find(...)
    // return new User(data)
    return null
  }

  findAllUsers(): IUser[] {
    console.log(this.get("OBTENER USUARIOS"))
    return []
  }
}
