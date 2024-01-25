import HttpError from '@wasp/core/HttpError.js'

export const getTasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Task.findMany({
    where: {
      userId: context.user.id
    }
  })
}

export const getTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const task = await context.entities.Task.findUnique({
    where: { id: args.taskId }
  });

  if (!task) { throw new HttpError(404, `Task with id ${args.taskId} not found`) }

  if (task.userId !== context.user.id) { throw new HttpError(400, `Task with id ${args.taskId} does not belong to the authenticated user`) }

  return task;
}
