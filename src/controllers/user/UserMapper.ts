import DBConnection from "../../tools/DBConnection"
import { IUser } from "../../interfaces"

import mockedUsers from "../../tools/mockedUsers"

export default class UserMapper extends DBConnection {
  constructor() {
    super()
  }
  findUserById(id?: number): IUser | null {
    //DO REQUEST TO DATABASE AND RETURNED DATA MUST BE MAPPED TO USER MODEL
    try {
      const user = mockedUsers.find(e => e.id === id)
      if (!user) return null

      return user
    } catch (error) {
      console.log(error)
    }
  }

  findAllUsers(): IUser[] {
    return mockedUsers
  }


}
