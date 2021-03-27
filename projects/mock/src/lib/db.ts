import type * as pouch from 'pouchdb';
import { List, Rec, Todo, TodoCreate, TodoUpdate, User } from './models';
declare var PouchDB: typeof pouch;

const dbTodos = new PouchDB<Todo>('todos');
const dbUsers = new PouchDB<User>('users');

export async function seedDb() {
  const skip = Promise.resolve(null);

  const initialTodos = insertIds([
    { title: 'Meet Obi-Wan Kenobi', done: true },
    { title: 'Learn the Force', done: false },
    { title: 'Get a lightsaber', done: true },
  ]);
  dbTodos
    .info()
    .then((info) => (info.doc_count ? skip : dbTodos.bulkDocs(initialTodos)));

  const initialUsers = insertIds([
    {
      firstName: 'Luke',
      lastName: 'Skywalker',
      username: 'luke',
    },
  ]);
  dbUsers
    .info()
    .then((info) => (info.doc_count ? skip : dbUsers.bulkDocs(initialUsers)))
    .then(() => dbUsers.createIndex({ index: { fields: ['username'] } }));
}

export async function deleteTodo(id: string) {
  return dbTodos
    .get(id)
    .then((doc) => dbTodos.remove(doc))
    .then(mapToId);
}

export async function getTodos({
  limit,
  skip,
}: PouchDB.Core.AllDocsOptions): Promise<List<Todo>> {
  // there are better pagination strategies, but this is a mock, no need to worry about perf
  return dbTodos
    .allDocs({ include_docs: true, limit, skip })
    .then(mapToRecordList);
}

export async function getTodo(id: string | null): Promise<Rec<Todo> | null> {
  return id ? dbTodos.get(id).then(mapToRecord) : null;
}

export async function putTodo(
  id: string,
  todo: TodoUpdate
): Promise<string | null> {
  return dbTodos
    .get(id)
    .then((doc) =>
      dbTodos.put({
        ...doc,
        ...todo,
      })
    )
    .then(mapToId);
}

export async function postTodo(input: TodoCreate): Promise<Rec<Todo> | null> {
  const todo = { ...input, _id: createId(), done: false };
  return dbTodos.put(todo).then(mapToId).then(getTodo);
}

export async function getUserByUsername(
  username: string
): Promise<Rec<User> | null> {
  return username
    ? dbUsers
        .find({
          selector: { username },
          fields: ['_id', 'firstName', 'lastName'],
        })
        .then(({ docs: [user] }) => user)
        .then(mapToRecord)
    : null;
}

function mapToRecordList<T extends {}>(
  resp: PouchDB.Core.AllDocsResponse<T>
): List<T> {
  return {
    rows: resp.rows.map((row) => mapToRecord(row.doc!)!),
    totalCount: resp.total_rows,
  };
}

function mapToRecord<T extends {}>(
  doc: PouchDB.Core.ExistingDocument<T>
): Rec<T> | null {
  if (!doc) return null;
  const { _id, _rev, ..._doc } = doc;
  return { id: _id, ...((_doc as any) as T) };
}

function mapToId(resp: PouchDB.Core.Response) {
  return resp.ok ? resp.id : null;
}

function insertIds<T extends {}>(records: T[]): PouchDB.Core.NewDocument<T>[] {
  const ids = Array(records.length).fill(0).map(createId);
  ids.sort();
  return ids.map((_id, i) => ({ _id, ...records[i] }));
}

function createId() {
  return new Date().toJSON() + Math.random();
}
