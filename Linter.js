const Stack = require("./Stack");

class Linter {
    #text

    constructor(t) {
        this.#text = t
    }

    #onlyBrackets(codeFile) {
        return codeFile
            .match(/[\[\]\(\)\{\}]/g)
    }

    asLinted() {
        const text = this.#onlyBrackets(this.#text);
        const result = this.looper(text)
        if (result === true) {
            return {
                'success': true
            }
        } else return {
            'error': `missing ${result.missing}`

        }
    }

    bracketPairs = {
        '{': '}',
        '(': ')',
        '[': ']',
        '}': '{',
        ')': '(',
        ']': '['
    }

    openingBrackets = [
        '{',
        '(',
        '['
    ]

    looper(bracketsOnly) {
        const stackItem = new Stack()
        let result = true

        bracketsOnly.map(bracket => {
            const contents = stackItem.peek();
            if (this.openingBrackets.includes(bracket)) {
                stackItem.push(bracket)

            } else {
                if (this.bracketPairs[bracket] === contents) {
                    stackItem.pop()
                } else {
                    result = {
                        missing: this.bracketPairs[contents || bracket]
                    }
                }
            }
        })
        if (stackItem.peek()) {
            result = {
                missing: this.bracketPairs[stackItem.peek()]
            }
        }
        return result

    }

}

module.exports = Linter;