import { z } from 'zod';

export namespace UsersServiceCreateUserCommandContract {
  export const RequestSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
  });

  export const ResponseSchema = z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    username: z.string(),
    createdAt: z.date(),
  });

  export type Request = z.infer<typeof RequestSchema>;
  export type Response = z.infer<typeof ResponseSchema>;
}
