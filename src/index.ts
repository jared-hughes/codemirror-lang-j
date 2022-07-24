import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const jLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Name: t.variableName,
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
    commentTokens: {line: "NB."}
  }
})

export function j() {
  return new LanguageSupport(jLanguage)
}
