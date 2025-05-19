import z from "zod"

export const registerUserSchema= z.object({
   email:z.string().email().min(3).max(100),
   password:z.string().min(6).max(100),
})