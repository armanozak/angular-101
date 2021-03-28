import type {
  AsyncResponseResolverReturnType,
  MockedRequest,
  ResponseComposition,
  RestContext,
  RestRequest,
} from 'msw';
import { rest } from 'msw';
import {
  deleteTodo,
  getTodo,
  getTodos,
  getUserByUsername,
  postTodo,
  putTodo,
  seedDb,
} from './db';
import { validateTodoCreate, validateTodoUpdate } from './validation';

seedDb();

export const handlers = [
  rest.get(
    '/api/todos',
    handleErrors(async (req, res, ctx) => {
      const todos = await getTodos(getLimitAndSkip(req));
      return res(ctx.delay(2000), ctx.json(todos));
    })
  ),

  rest.delete(
    '/api/todos/:id',
    handleErrors(async (req, res, ctx) => {
      await deleteTodo(req.params.id);
      return res(ctx.status(204));
    })
  ),

  rest.get(
    '/api/todos/:id',
    handleErrors(async (req, res, ctx) => {
      const todo = await getTodo(req.params.id);
      return res(ctx.json(todo));
    })
  ),

  rest.post(
    '/api/todos',
    handleErrors(async (req, res, ctx) => {
      validateTodoCreate(req.body);
      const todo = await postTodo(req.body);
      return res(ctx.json(todo));
    })
  ),

  rest.put(
    '/api/todos/:id',
    handleErrors(async (req, res, ctx) => {
      validateTodoUpdate(req.body);
      await putTodo(req.params.id, req.body);
      return res(ctx.status(204));
    })
  ),

  rest.post(
    '/api/login',
    handleErrors(async (req, res, ctx) => {
      const { username } = req.body as any;
      const user = await getUserByUsername(username);
      return res(ctx.json(user));
    })
  ),
];

function handleErrors<T extends Resolver<any, any, any>>(resolver: T): T {
  return (async (req: any, res: any, ctx: any) => {
    try {
      return await resolver(req, res, ctx);
    } catch (err) {
      return res(ctx.status(err.status), ctx.text(err.message));
    }
  }) as any;
}

function getLimitAndSkip(req: MockedRequest<any>) {
  const limit = Math.min(1000, Number(req.url.searchParams.get('limit')) || 10);
  const skip = ((Number(req.url.searchParams.get('page')) || 1) - 1) * limit;
  return { limit, skip };
}

type Resolver<ReqBody, ResBody, ReqParams = {}> = (
  req: RestRequest<ReqBody, ReqParams>,
  res: ResponseComposition<ResBody>,
  context: RestContext
) => AsyncResponseResolverReturnType<any>;
