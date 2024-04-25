import { createContext } from "react";

const UserContext = createContext(null)

export const UserContextProvider = UserContext.Provider

export default UserContext
