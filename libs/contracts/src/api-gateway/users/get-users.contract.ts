import { z } from 'zod';

export namespace ApiUsersGetUsersContract {
  export const ResponseSchema = z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    username: z.string(),
    createdAt: z.date(),
  });

  export type Response = z.infer<typeof ResponseSchema>[];
}
