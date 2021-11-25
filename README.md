# Steps to reproduce

1. Start the apollo gql server with yarn start
2. Open a new terminal and run `yarn start-mesh`
3. A new browser tab should open the GraphiQL Editor on port 4001
4. Use the following query

```gql
mutation Test {
  A: changeName(name: "A")
  B: changeName(name: "B")
  C: changeName(name: "C")
  D: changeName(name: "D")
}
```

5. Go to the terminal output of the apollo gql server and check the `req.body`. There are 4 requests instead of one.

# Reason why it does not work

The default `graphql-js` execute function calls `executeFieldsSerially` which breaks down the concept behind the batch-executor of graphql-tools

https://github.com/graphql/graphql-js/blob/main/src/execution/execute.ts#L379

https://www.graphql-tools.com/docs/batch-execution#batch-the-executor
