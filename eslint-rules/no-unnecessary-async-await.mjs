export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Disallow unnecessary async/await when just returning a promise',
            category: 'Best Practices',
        },
        fixable: 'code',
        schema: [],
    },
    create(context) {
        const sourceCode = context.sourceCode

        return {
            ArrowFunctionExpression(node) {
                if (!node.async) return
                if (node.body.type !== 'BlockStatement') return

                const body = node.body
                if (body.body.length !== 1) return

                const statement = body.body[0]
                if (statement.type !== 'ReturnStatement') return
                if (!statement.argument) return

                const arg = statement.argument

                if (arg.type === 'AwaitExpression') {
                    context.report({
                        node,
                        message: 'Unnecessary async/await: remove async and await to return the promise directly',
                        fix(fixer) {
                            const asyncStart = sourceCode.getFirstToken(node)
                            const awaitToken = sourceCode.getTokenBefore(arg.argument)

                            const fixes = []

                            fixes.push(fixer.removeRange([asyncStart.range[0], asyncStart.range[1] + 1]))
                            fixes.push(fixer.removeRange([awaitToken.range[0], awaitToken.range[1] + 1]))

                            return fixes
                        },
                    })
                }
            },

            FunctionDeclaration(node) {
                if (!node.async) return
                if (node.body.type !== 'BlockStatement') return

                const body = node.body
                if (body.body.length !== 1) return

                const statement = body.body[0]
                if (statement.type !== 'ReturnStatement') return
                if (!statement.argument) return

                const arg = statement.argument

                if (arg.type === 'AwaitExpression') {
                    context.report({
                        node,
                        message: 'Unnecessary async/await: remove async and await to return the promise directly',
                        fix(fixer) {
                            const asyncToken = sourceCode.getFirstToken(node)
                            const awaitToken = sourceCode.getTokenBefore(arg.argument)

                            const fixes = []

                            fixes.push(fixer.removeRange([asyncToken.range[0], asyncToken.range[1] + 1]))
                            fixes.push(fixer.removeRange([awaitToken.range[0], awaitToken.range[1] + 1]))

                            return fixes
                        },
                    })
                }
            },

            FunctionExpression(node) {
                if (!node.async) return
                if (node.body.type !== 'BlockStatement') return

                const body = node.body
                if (body.body.length !== 1) return

                const statement = body.body[0]
                if (statement.type !== 'ReturnStatement') return
                if (!statement.argument) return

                const arg = statement.argument

                if (arg.type === 'AwaitExpression') {
                    context.report({
                        node,
                        message: 'Unnecessary async/await: remove async and await to return the promise directly',
                        fix(fixer) {
                            const asyncToken = sourceCode.getTokenBefore(node.body)
                            const awaitToken = sourceCode.getTokenBefore(arg.argument)

                            const fixes = []

                            fixes.push(fixer.removeRange([asyncToken.range[0], asyncToken.range[1] + 1]))
                            fixes.push(fixer.removeRange([awaitToken.range[0], awaitToken.range[1] + 1]))

                            return fixes
                        },
                    })
                }
            },
        }
    },
}
