import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, bracketMatching} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const jLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Name: t.variableName,
        ControlName: t.controlKeyword,
        String: t.string,
        Number: t.number,
        Graphic: t.operator,
        LineComment: t.lineComment,
        "( )": t.paren,
        "{{ }}": t.brace
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "NB."},
    // Prevent auto insertion of closing brackets for `[{"`.
    closeBrackets: {brackets: ["(", "'"]}
  }
})

export function j() {
  return new LanguageSupport(
    jLanguage,
    // limit bracket matching to just the delimeters specified in syntax.grammar
    bracketMatching({brackets: "()"})
  )
}
