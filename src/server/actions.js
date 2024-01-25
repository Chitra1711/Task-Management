import HttpError from '@wasp/core/HttpError.js'

export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const taskData = {
    title: args.title,
    description: args.description,
    dueDate: args.dueDate,
    userId: context.user.id
  };

  return context.entities.Task.create(taskData);
}

export const updateTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id: args.taskId }
  });
  if (task.userId !== context.user.id) { throw new HttpError(403) };

  const updatedTaskData = {};

  if (args.title) {
    updatedTaskData.title = args.title;
  }

  if (args.description) {
    updatedTaskData.description = args.description;
  }

  if (args.dueDate) {
    updatedTaskData.dueDate = args.dueDate;
  }

  return context.entities.Task.update({
    where: { id: args.taskId },
    data: updatedTaskData
  });
}

export const deleteTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  await context.entities.Task.delete({
    where: { id: args.taskId }
  });
}
