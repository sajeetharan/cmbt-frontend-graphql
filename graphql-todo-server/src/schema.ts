
import 'graphql-import-node';
import * as typeDefs from './schema.graphql';
import {makeExecutableSchema} from 'graphql-tools';
import {GraphQLSchema} from 'graphql';
import {IResolvers} from 'graphql-tools';
import {v4 as uuidv4} from 'uuid';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export const inMemoryDb: {todos: {[id: string]: Todo}} = {
  todos: {
    '1': {
      id: '1',
      title: 'Todo 1',
      done: false
    }
  }
}

export const resolvers: IResolvers =  {
    Query: {
      getTodos(): Todo[] {
        return Object.values(inMemoryDb.todos);
      }
    },
    Mutation: {
      addTodo(_, {title,  done = false}: Todo): Todo[] {
        const id: string = uuidv4();
        inMemoryDb.todos = {
          ...inMemoryDb.todos,
          [id]: {
            id,
            title,
            done
          }
        };
        return Object.values(inMemoryDb.todos);
      },
      updateTodo(_, {id, done}: {id: string, done: boolean}): Todo[] {
        inMemoryDb.todos = {
          ...inMemoryDb.todos,
          [id]: {
            ...inMemoryDb.todos[id],
            id,
            done
          }
        };
        return Object.values(inMemoryDb.todos);
      }
    }
  };
  

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});
